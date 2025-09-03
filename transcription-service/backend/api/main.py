from fastapi import FastAPI, UploadFile, File, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import uuid
import datetime
from .models import TranscriptionJobResponse, JobStatusResponse, JobStatus
from .config import settings
import tempfile
import os

# Apply fakeredis patch for local development - disabled for testing
# try:
#     import fakeredis_patch
# except ImportError:
#     pass

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
    CELERY_AVAILABLE = False  # Force direct processing for testing
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
    model: str = Form("openai-whisper"),
    set_list: str = Form(""),
    custom_prompt: str = Form("")
):
    """
    Upload audio file and create transcription job
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    # Validate file type
    allowed_extensions = {'.mp3', '.wav', '.m4a', '.flac', '.mp4', '.webm', '.txt'}
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
        analysis=job.get("analysis"),
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

@app.post("/v1/gemini-analysis")
async def run_gemini_analysis(
    job_id: str = Form(...),
    set_list: str = Form(""),
    custom_prompt: str = Form("")
):
    """
    Run Gemini analysis on an existing transcription job
    """
    if job_id not in jobs_db:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = jobs_db[job_id]
    
    # Check if job has a transcript
    if not job.get("result"):
        raise HTTPException(status_code=400, detail="No transcript available for analysis")
    
    try:
        # Update status to processing
        jobs_db[job_id]["status"] = JobStatus.PROCESSING
        
        # Run Gemini analysis
        import google.generativeai as genai
        genai.configure(api_key=settings.gemini_api_key)
        
        model_client = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        prompt = f"""Analyze this comedy performance transcript and provide detailed feedback:

Transcript: {job["result"]}
Set List: {set_list}
Custom Instructions: {custom_prompt}

Please provide analysis covering:
1. Timing and delivery
2. Joke structure and setup/punchline effectiveness  
3. Audience engagement and response
4. Areas for improvement
5. Overall performance assessment"""
        
        response = model_client.generate_content(prompt)
        analysis = response.text
        
        # Update job with analysis
        jobs_db[job_id]["analysis"] = analysis
        jobs_db[job_id]["status"] = JobStatus.COMPLETED
        jobs_db[job_id]["completed_at"] = datetime.datetime.now().isoformat()
        
        return {
            "job_id": job_id,
            "status": JobStatus.COMPLETED,
            "analysis": analysis,
            "message": "Gemini analysis completed successfully"
        }
        
    except Exception as e:
        error_msg = f"Gemini analysis failed: {str(e)}"
        jobs_db[job_id]["error"] = error_msg
        jobs_db[job_id]["status"] = JobStatus.FAILED
        jobs_db[job_id]["completed_at"] = datetime.datetime.now().isoformat()
        
        raise HTTPException(
            status_code=500,
            detail=error_msg
        )

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
    import os
    
    # For development, run synchronously to avoid threading issues
    # In production, use Celery which handles this properly
    use_threading = os.getenv('USE_THREADING', 'false').lower() == 'true'
    
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
            
            # Analysis step - Direct Gemini implementation
            if model in ["whisper-plus-gemini", "gemini-analysis-only"]:
                try:
                    import google.generativeai as genai
                    genai.configure(api_key=settings.gemini_api_key)
                    
                    model_client = genai.GenerativeModel('gemini-2.0-flash-exp')
                    
                    # Use file content for analysis-only mode
                    if model == "gemini-analysis-only":
                        # Handle both GCS and local file paths
                        stored_file_path = jobs_db[job_id]["file_path"]
                        
                        if GCS_AVAILABLE and stored_file_path.startswith("uploads/"):
                            # Download from GCS
                            bucket = storage_client.bucket(settings.gcs_bucket_name)
                            blob = bucket.blob(stored_file_path)
                            transcript_for_analysis = blob.download_as_text()
                        else:
                            # Read from local file
                            with open(stored_file_path, 'r', encoding='utf-8') as f:
                                transcript_for_analysis = f.read()
                    else:
                        transcript_for_analysis = result.get("transcript", "")
                    
                    prompt = f"""Analyze this comedy performance transcript and provide detailed feedback:

Transcript: {transcript_for_analysis}
Set List: {set_list}
Custom Instructions: {custom_prompt}

Please provide analysis covering:
1. Timing and delivery
2. Joke structure and setup/punchline effectiveness  
3. Audience engagement and response
4. Areas for improvement
5. Overall performance assessment"""
                    
                    response = model_client.generate_content(prompt)
                    result["analysis"] = response.text
                    
                except Exception as e:
                    error_msg = f"Analysis failed: {str(e)}"
                    jobs_db[job_id]["error"] = error_msg
                    print(f"Analysis error for job {job_id}: {e}")
                    import traceback
                    traceback.print_exc()
            
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
            print(f"Processing error for job {job_id}: {e}")
            import traceback
            traceback.print_exc()
            update_job_status(job_id, JobStatus.FAILED, error=error_msg)
    
    if use_threading:
        # Run in background thread (can be problematic with environment variables)
        thread = threading.Thread(target=transcribe, daemon=True)
        thread.start()
    else:
        # Run synchronously for reliable development testing
        transcribe()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.api_host, port=settings.api_port)