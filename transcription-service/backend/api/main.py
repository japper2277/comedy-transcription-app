from fastapi import FastAPI, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import uuid
import datetime
from .models import TranscriptionJobResponse, JobStatusResponse, JobStatus
from .config import settings
import tempfile
import os

# Try to import Google Cloud Storage, but make it optional for local development
try:
    import google.cloud.storage as storage
    GCS_AVAILABLE = True
except ImportError:
    GCS_AVAILABLE = False
    storage = None

# Try to import Celery worker
try:
    from celery_worker.tasks import process_transcription_job
    CELERY_AVAILABLE = True
except ImportError:
    CELERY_AVAILABLE = False

app = FastAPI(title="AI Transcription Service", version="1.0.0")

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize storage client (GCS or local)
if GCS_AVAILABLE:
    try:
        storage_client = storage.Client()
    except Exception:
        GCS_AVAILABLE = False
        storage_client = None
else:
    storage_client = None

# Simple in-memory job storage (replace with Redis/DB in production)
jobs_db = {}

# Local file storage for development
LOCAL_UPLOAD_DIR = "temp_uploads"
if not GCS_AVAILABLE:
    os.makedirs(LOCAL_UPLOAD_DIR, exist_ok=True)

@app.get("/")
async def root():
    return {"message": "AI Transcription Service", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.datetime.now().isoformat()}

@app.post("/v1/transcripts", status_code=status.HTTP_202_ACCEPTED, response_model=TranscriptionJobResponse)
async def create_transcription_job(
    file: UploadFile = File(...),
    model: str = "openai-whisper",
    set_list: str = "",
    custom_prompt: str = ""
):
    """
    Upload audio file and create transcription job
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    # Validate file type
    allowed_extensions = {'.mp3', '.wav', '.m4a', '.flac', '.mp4', '.webm'}
    file_ext = '.' + file.filename.split('.')[-1].lower()
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400, 
            detail=f"Unsupported file type. Allowed: {', '.join(allowed_extensions)}"
        )
    
    # Generate unique job ID and file key
    job_id = str(uuid.uuid4())
    file_key = f"uploads/{job_id}-{file.filename}"
    
    try:
        # Store file (GCS or local) - stream directly without reading into memory
        if GCS_AVAILABLE:
            # Stream upload to Google Cloud Storage
            bucket = storage_client.bucket(settings.gcs_bucket_name)
            blob = bucket.blob(file_key)
            blob.upload_from_file(file.file)
            file_path = file_key  # GCS path
        else:
            # Stream to local storage
            file_path = os.path.join(LOCAL_UPLOAD_DIR, f"{job_id}-{file.filename}")
            contents = await file.read()
            with open(file_path, "wb") as f:
                f.write(contents)
        
        # Store job info
        jobs_db[job_id] = {
            "job_id": job_id,
            "status": JobStatus.QUEUED,
            "file_key": file_key,
            "file_path": file_path,
            "filename": file.filename,
            "created_at": datetime.datetime.now().isoformat(),
            "result": None,
            "error": None
        }
        
        # Process transcription (Celery or direct)
        if CELERY_AVAILABLE:
            # Pass the correct parameters to match worker signature
            task = process_transcription_job.delay(
                job_id=job_id,
                gcs_file_path=file_path,
                filename=file.filename,
                model=model,
                set_list=set_list,
                custom_prompt=custom_prompt
            )
            message = f"Transcription job queued successfully (model: {model})"
        else:
            # Direct processing for development
            process_transcription_direct(job_id, file_path, model, set_list, custom_prompt)
            message = f"Transcription started (direct processing, model: {model})"
        
        return TranscriptionJobResponse(
            job_id=job_id,
            status=JobStatus.QUEUED,
            message=message
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process upload: {str(e)}"
        )

@app.get("/v1/transcripts/{job_id}", response_model=JobStatusResponse)
async def get_transcription_status(job_id: str):
    """
    Get transcription job status and result
    """
    if job_id not in jobs_db:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = jobs_db[job_id]
    
    return JobStatusResponse(
        job_id=job_id,
        status=job["status"],
        result=job.get("result"),
        error=job.get("error"),
        created_at=job["created_at"],
        completed_at=job.get("completed_at")
    )

@app.get("/v1/jobs")
async def list_jobs():
    """
    List all transcription jobs (for development)
    """
    return {"jobs": list(jobs_db.values())}

# Function to update job status (called by Celery worker)
def update_job_status(job_id: str, status: JobStatus, result: str = None, error: str = None):
    if job_id in jobs_db:
        jobs_db[job_id]["status"] = status
        if result:
            jobs_db[job_id]["result"] = result
        if error:
            jobs_db[job_id]["error"] = error
        if status in [JobStatus.COMPLETED, JobStatus.FAILED]:
            jobs_db[job_id]["completed_at"] = datetime.datetime.now().isoformat()

# Direct transcription processing for development (without Celery)
def process_transcription_direct(job_id: str, file_path: str, model: str = "openai-whisper", set_list: str = "", custom_prompt: str = ""):
    """Process transcription directly without Celery (for development)"""
    import threading
    
    def transcribe():
        try:
            # Update status to processing
            jobs_db[job_id]["status"] = JobStatus.PROCESSING
            result = {}
            
            # Transcription step
            if model in ["openai-whisper", "whisper-plus-gemini"]:
                try:
                    from celery_worker.whisper_client import WhisperClient
                    whisper_client = WhisperClient(api_key=settings.openai_api_key)
                    transcript = whisper_client.transcribe_audio(file_path)
                    result["transcript"] = transcript
                    
                except Exception as e:
                    error_msg = f"Transcription failed: {str(e)}"
                    update_job_status(job_id, JobStatus.FAILED, error=error_msg)
                    return
            
            # Analysis step
            if model in ["whisper-plus-gemini", "gemini-analysis-only"]:
                try:
                    from celery_worker.gemini_client import GeminiClient
                    gemini_client = GeminiClient()
                    
                    # Use existing transcript or empty string for analysis-only
                    transcript_for_analysis = result.get("transcript", "")
                    
                    analysis_result = gemini_client.analyze_comedy_performance(
                        transcript_for_analysis,
                        set_list or "",
                        custom_prompt
                    )
                    # Handle dict response from GeminiClient
                    if isinstance(analysis_result, dict) and analysis_result.get("success"):
                        result["analysis"] = analysis_result.get("analysis")
                    else:
                        result["analysis"] = analysis_result
                    
                except Exception as e:
                    error_msg = f"Analysis failed: {str(e)}"
                    update_job_status(job_id, JobStatus.FAILED, error=error_msg)
                    return
            
            # Update with success
            if model == "openai-whisper":
                update_job_status(job_id, JobStatus.COMPLETED, result=result.get("transcript", ""))
            else:
                # For Gemini models, store full result with both transcript and analysis
                jobs_db[job_id]["result"] = result.get("transcript", "")
                jobs_db[job_id]["analysis"] = result.get("analysis")
                jobs_db[job_id]["status"] = JobStatus.COMPLETED
                jobs_db[job_id]["completed_at"] = datetime.datetime.now().isoformat()
                
        except Exception as e:
            error_msg = f"Processing failed: {str(e)}"
            update_job_status(job_id, JobStatus.FAILED, error=error_msg)
    
    # Run transcription in background thread
    thread = threading.Thread(target=transcribe, daemon=True)
    thread.start()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.api_host, port=settings.api_port)