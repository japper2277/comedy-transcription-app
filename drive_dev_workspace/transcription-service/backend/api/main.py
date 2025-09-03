from fastapi import FastAPI, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import uuid
import datetime
from .models import TranscriptionJobResponse, JobStatusResponse, JobStatus, TranscriptionModel
from .config import settings
from .logging_config import setup_logging, get_logger
import tempfile
import os

# Set up logging
setup_logging(settings.environment)
logger = get_logger("transcription_service")

# Try to import Google Cloud Storage, but make it optional for local development
try:
    import google.cloud.storage as storage
    GCS_AVAILABLE = True
except ImportError:
    logger.warning("Google Cloud Storage not available - using local file storage for development")
    GCS_AVAILABLE = False
    storage = None

# Try to import Google Drive client
try:
    from .google_drive_client import GoogleDriveClient
    GOOGLE_DRIVE_AVAILABLE = True
    if os.path.exists(settings.google_drive_credentials_path):
        logger.info("Google Drive credentials found - Google Drive storage enabled")
    else:
        logger.warning(f"Google Drive credentials not found at {settings.google_drive_credentials_path}")
        GOOGLE_DRIVE_AVAILABLE = False
except ImportError:
    logger.warning("Google Drive client not available")
    GOOGLE_DRIVE_AVAILABLE = False

# Try to import Celery worker
try:
    from celery_worker.tasks import process_transcription_job
    CELERY_AVAILABLE = True
except ImportError:
    logger.warning("Celery worker not available - using direct processing for development")
    CELERY_AVAILABLE = False

app = FastAPI(title="AI Transcription Service", version="1.0.0")

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize storage clients
storage_client = None
drive_client = None

# Initialize Google Cloud Storage (GCS)
if GCS_AVAILABLE:
    try:
        storage_client = storage.Client()
        print("SUCCESS: Google Cloud Storage initialized")
    except Exception as e:
        print(f"WARNING: GCS authentication failed: {e}")
        GCS_AVAILABLE = False
        storage_client = None

# Initialize Google Drive
if GOOGLE_DRIVE_AVAILABLE:
    try:
        drive_client = GoogleDriveClient()
        print("SUCCESS: Google Drive client initialized")
    except Exception as e:
        print(f"WARNING: Google Drive initialization failed: {e}")
        GOOGLE_DRIVE_AVAILABLE = False
        drive_client = None

# Simple in-memory job storage (replace with Redis/DB in production)
jobs_db = {}

# Local file storage for development
LOCAL_UPLOAD_DIR = "temp_uploads"
if not GCS_AVAILABLE:
    os.makedirs(LOCAL_UPLOAD_DIR, exist_ok=True)
    print(f"INFO: Using local file storage: {LOCAL_UPLOAD_DIR}")

@app.get("/")
async def root():
    return {"message": "AI Transcription Service", "status": "running"}

@app.get("/health")
async def health_check():
    logger.info("Health check requested")
    return {"status": "healthy", "timestamp": datetime.datetime.now().isoformat()}

@app.get("/debug/cors")
async def debug_cors():
    """Debug endpoint to check CORS configuration"""
    return {
        "cors_origins": settings.cors_origins,
        "environment": settings.environment,
        "timestamp": datetime.datetime.now().isoformat()
    }

@app.get("/debug/processes")
async def debug_processes():
    """Debug endpoint to check if multiple processes are running"""
    import psutil
    import os
    
    current_pid = os.getpid()
    python_processes = []
    
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        try:
            if proc.info['name'] == 'python.exe' and proc.info['cmdline']:
                cmdline = ' '.join(proc.info['cmdline'])
                if 'uvicorn' in cmdline and 'api.main:app' in cmdline:
                    python_processes.append({
                        'pid': proc.info['pid'],
                        'cmdline': cmdline,
                        'is_current': proc.info['pid'] == current_pid
                    })
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue
    
    return {
        "current_pid": current_pid,
        "backend_processes": python_processes,
        "process_count": len(python_processes),
        "timestamp": datetime.datetime.now().isoformat()
    }

@app.get("/debug/config")
async def debug_config():
    """Debug endpoint to check configuration"""
    return {
        "api_host": settings.api_host,
        "api_port": settings.api_port,
        "environment": settings.environment,
        "cors_origins_count": len(settings.cors_origins),
        "has_openai_key": bool(settings.openai_api_key),
        "has_gemini_key": bool(settings.gemini_api_key),
        "timestamp": datetime.datetime.now().isoformat()
    }

@app.post("/v1/transcripts", status_code=status.HTTP_202_ACCEPTED, response_model=TranscriptionJobResponse)
async def create_transcription_job(
    file: UploadFile = File(...),
    model: str = "openai-whisper",
    set_list: str = "",
    custom_prompt: str = ""
):
    """
    Upload audio file and create transcription job with model selection
    """
    # Convert string model to enum
    try:
        model_enum = TranscriptionModel(model)
    except ValueError:
        raise HTTPException(status_code=400, detail=f"Invalid model: {model}. Valid models: {[m.value for m in TranscriptionModel]}")
    
    print(f"BACKEND DEBUG - New job request:")
    print(f"   File: {file.filename}")
    print(f"   Model: {model} -> {model_enum} (type: {type(model_enum)})")
    print(f"   Set list: {len(set_list)} chars")
    print(f"   Custom prompt: {len(custom_prompt)} chars")
    print(f"   Gemini API key configured: {'YES' if settings.gemini_api_key else 'NO'}")
    print(f"   Is whisper-plus-gemini: {model_enum == TranscriptionModel.WHISPER_PLUS_GEMINI}")
    
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
        # Read file contents
        contents = await file.read()
        file_storage_type = None
        
        # Store file (Priority: Google Drive > GCS > Local)
        if GOOGLE_DRIVE_AVAILABLE and drive_client:
            # Upload to Google Drive
            try:
                # Determine MIME type based on file extension
                mime_types = {
                    '.mp3': 'audio/mpeg',
                    '.wav': 'audio/wav',
                    '.m4a': 'audio/mp4',
                    '.flac': 'audio/flac',
                    '.mp4': 'video/mp4',
                    '.webm': 'video/webm'
                }
                file_ext = '.' + file.filename.split('.')[-1].lower()
                mime_type = mime_types.get(file_ext, 'application/octet-stream')
                
                drive_file_id = drive_client.upload_file(contents, f"{job_id}-{file.filename}", mime_type)
                file_path = drive_file_id  # Google Drive file ID
                file_storage_type = "google_drive"
                print(f"SUCCESS: File uploaded to Google Drive (ID: {drive_file_id})")
            except Exception as e:
                print(f"WARNING: Google Drive upload failed, falling back to GCS/local: {e}")
                GOOGLE_DRIVE_AVAILABLE = False
        
        if not file_storage_type and GCS_AVAILABLE:
            # Upload to Google Cloud Storage
            try:
                bucket = storage_client.bucket(settings.gcs_bucket_name)
                blob = bucket.blob(file_key)
                blob.upload_from_string(contents)
                file_path = file_key  # GCS path
                file_storage_type = "gcs"
                print(f"SUCCESS: File uploaded to Google Cloud Storage")
            except Exception as e:
                print(f"WARNING: GCS upload failed, falling back to local: {e}")
                GCS_AVAILABLE = False
        
        if not file_storage_type:
            # Save to local storage
            file_path = os.path.join(LOCAL_UPLOAD_DIR, f"{job_id}-{file.filename}")
            with open(file_path, "wb") as f:
                f.write(contents)
            file_storage_type = "local"
            print(f"SUCCESS: File saved locally")
        
        # Store job info
        jobs_db[job_id] = {
            "job_id": job_id,
            "status": JobStatus.QUEUED,
            "file_key": file_key,
            "file_path": file_path,
            "filename": file.filename,
            "storage_type": file_storage_type,
            "model": model_enum,
            "set_list": set_list,
            "custom_prompt": custom_prompt,
            "created_at": datetime.datetime.now().isoformat(),
            "result": None,
            "analysis": None,
            "error": None
        }
        
        # Process transcription (Celery or direct)
        if CELERY_AVAILABLE:
            task = process_transcription_job.delay(file_path, job_id, model_enum, set_list, custom_prompt)
            message = "Transcription job queued successfully"
        else:
            # Direct processing for development
            process_transcription_direct(job_id, file_path, model_enum, set_list, custom_prompt)
            message = "Transcription started (direct processing)"
        
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

from pydantic import BaseModel

class GeminiAnalysisRequest(BaseModel):
    job_id: str
    set_list: str = ""
    custom_prompt: str = ""

@app.post("/v1/gemini-analysis")
async def run_gemini_analysis(request: GeminiAnalysisRequest):
    """
    Run Gemini analysis on an existing transcription
    """
    print(f"BACKEND: Running Gemini analysis for job {request.job_id}")
    
    if request.job_id not in jobs_db:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = jobs_db[request.job_id]
    
    if job["status"] != JobStatus.COMPLETED:
        raise HTTPException(status_code=400, detail="Job must be completed to run analysis")
    
    if not job.get("result"):
        raise HTTPException(status_code=400, detail="No transcript available for analysis")
    
    transcript = job["result"]
    
    try:
        from celery_worker.gemini_client import GeminiClient
        gemini_client = GeminiClient(api_key=settings.gemini_api_key)
        
        print(f"BACKEND: Analyzing transcript ({len(transcript)} chars)")
        print(f"BACKEND: Set list: {len(request.set_list)} chars")
        print(f"BACKEND: Custom prompt: {len(request.custom_prompt)} chars")
        
        analysis_result = gemini_client.analyze_transcript(transcript, request.set_list, request.custom_prompt)
        
        # Store analysis result in job
        jobs_db[request.job_id]["analysis"] = analysis_result
        
        print(f"SUCCESS: Gemini analysis completed for job {request.job_id}")
        return analysis_result
        
    except Exception as e:
        error_msg = f"Gemini analysis failed: {str(e)}"
        print(f"ERROR: {error_msg}")
        raise HTTPException(status_code=500, detail=error_msg)

# Function to update job status (called by Celery worker)
def get_file_for_transcription(job_id: str):
    """
    Get file content for transcription based on storage type
    Returns: (file_path, cleanup_function)
    """
    if job_id not in jobs_db:
        raise ValueError(f"Job {job_id} not found")
    
    job = jobs_db[job_id]
    storage_type = job.get("storage_type", "local")
    file_path = job["file_path"]
    
    if storage_type == "google_drive":
        # Download from Google Drive to temp file
        try:
            file_content = drive_client.download_file(file_path)  # file_path is the Drive file ID
            temp_file_path = f"temp_{job_id}_{job['filename']}"
            with open(temp_file_path, "wb") as f:
                f.write(file_content)
            
            def cleanup():
                try:
                    os.remove(temp_file_path)
                except:
                    pass
            
            return temp_file_path, cleanup
            
        except Exception as e:
            raise Exception(f"Failed to download file from Google Drive: {e}")
    
    elif storage_type == "gcs":
        # Download from GCS to temp file  
        try:
            bucket = storage_client.bucket(settings.gcs_bucket_name)
            blob = bucket.blob(file_path)
            temp_file_path = f"temp_{job_id}_{job['filename']}"
            blob.download_to_filename(temp_file_path)
            
            def cleanup():
                try:
                    os.remove(temp_file_path)
                except:
                    pass
            
            return temp_file_path, cleanup
            
        except Exception as e:
            raise Exception(f"Failed to download file from GCS: {e}")
    
    else:  # local storage
        # File is already local, no cleanup needed
        def no_cleanup():
            pass
        return file_path, no_cleanup

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
def process_transcription_direct(job_id: str, file_path: str, model: TranscriptionModel, set_list: str = "", custom_prompt: str = ""):
    """
    Process transcription directly without Celery (for development)
    Handles local files, Google Drive files, and GCS files
    """
    """Process transcription directly without Celery (for development)"""
    import threading
    
    def transcribe():
        try:
            # Update status to processing
            jobs_db[job_id]["status"] = JobStatus.PROCESSING
            
            transcript = None
            analysis = None
            
            # Process based on selected model  
            import sys
            sys.stdout.flush()
            
            print(f"BACKEND DEBUG: Processing model = '{model}' (type: {type(model)})", flush=True)
            print(f"BACKEND DEBUG: OPENAI_WHISPER = '{TranscriptionModel.OPENAI_WHISPER}' (type: {type(TranscriptionModel.OPENAI_WHISPER)})", flush=True)
            print(f"BACKEND DEBUG: WHISPER_PLUS_GEMINI = '{TranscriptionModel.WHISPER_PLUS_GEMINI}' (type: {type(TranscriptionModel.WHISPER_PLUS_GEMINI)})", flush=True)
            
            if model == TranscriptionModel.OPENAI_WHISPER:
                try:
                    # Get file for transcription (handles different storage types)
                    local_file_path, cleanup_func = get_file_for_transcription(job_id)
                    
                    from celery_worker.whisper_client import WhisperClient
                    whisper_client = WhisperClient(api_key=settings.openai_api_key)
                    transcript = whisper_client.transcribe_audio(local_file_path)
                    
                    # Clean up temp file if needed
                    cleanup_func()
                    
                    print(f"SUCCESS: OpenAI Whisper transcription completed for job {job_id}")
                    
                except Exception as e:
                    error_msg = f"OpenAI Whisper transcription failed: {str(e)}"
                    update_job_status(job_id, JobStatus.FAILED, error=error_msg)
                    print(f"ERROR: {error_msg}")
                    return
                    
            elif model == TranscriptionModel.WHISPER_PLUS_GEMINI:
                try:
                    # Get file for transcription (handles different storage types)
                    local_file_path, cleanup_func = get_file_for_transcription(job_id)
                    
                    # First transcribe with Whisper
                    from celery_worker.whisper_client import WhisperClient
                    whisper_client = WhisperClient(api_key=settings.openai_api_key)
                    transcript = whisper_client.transcribe_audio(local_file_path)
                    
                    # Clean up temp file if needed
                    cleanup_func()
                    
                    print(f"SUCCESS: Whisper transcription completed for job {job_id}")
                    
                    # Then analyze with Gemini
                    print(f"BACKEND DEBUG: Starting Gemini analysis for job {job_id}")
                    print(f"BACKEND DEBUG: Transcript length: {len(transcript)} chars")
                    print(f"BACKEND DEBUG: Set list length: {len(set_list)} chars")
                    
                    from celery_worker.gemini_client import GeminiClient
                    gemini_client = GeminiClient(api_key=settings.gemini_api_key)
                    analysis_result = gemini_client.analyze_transcript(transcript, set_list, custom_prompt)
                    analysis = analysis_result
                    
                    print(f"BACKEND DEBUG: Gemini response: {type(analysis_result)}")
                    print(f"BACKEND DEBUG: Analysis result keys: {analysis_result.keys() if isinstance(analysis_result, dict) else 'Not a dict'}")
                    print(f"SUCCESS: Gemini analysis completed for job {job_id}")
                    
                except Exception as e:
                    error_msg = f"Whisper + Gemini processing failed: {str(e)}"
                    update_job_status(job_id, JobStatus.FAILED, error=error_msg)
                    print(f"ERROR: {error_msg}")
                    return
                    
            elif model == TranscriptionModel.GEMINI_ANALYSIS:
                # This would be for analyzing existing transcripts
                error_msg = "Gemini-only analysis requires existing transcript. Use Whisper + Gemini instead."
                update_job_status(job_id, JobStatus.FAILED, error=error_msg)
                print(f"ERROR: {error_msg}")
                return
            
            # Update with success
            jobs_db[job_id].update({
                "status": JobStatus.COMPLETED,
                "result": transcript,
                "analysis": analysis,
                "completed_at": datetime.datetime.now().isoformat()
            })
            print(f"SUCCESS: Job {job_id} completed successfully")
                
        except Exception as e:
            error_msg = f"Processing failed: {str(e)}"
            update_job_status(job_id, JobStatus.FAILED, error=error_msg)
            print(f"ERROR: Processing failed for job {job_id}: {error_msg}")
    
    # Run transcription in background thread
    thread = threading.Thread(target=transcribe, daemon=True)
    thread.start()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.api_host, port=settings.api_port)