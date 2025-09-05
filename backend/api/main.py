from fastapi import FastAPI, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import uuid
import datetime
from .models import TranscriptionJobResponse, JobStatusResponse, JobStatus, TranscriptionModel
from .config import settings
from .logging_config import setup_logging, get_logger
import tempfile
import os
import redis
from celery import Celery

# Set up logging
setup_logging(settings.environment)
logger = get_logger("transcription_service")

# Initialize Redis connection
try:
    redis_client = redis.from_url(settings.redis_url)
    redis_client.ping()
    logger.info("Redis connection established")
except Exception as e:
    logger.error(f"Redis connection failed: {e}")
    redis_client = None

# Initialize Celery
celery_app = Celery(
    "transcription_worker",
    broker=settings.redis_url,
    backend=settings.redis_url,
    include=["celery_worker.tasks"]
)

# Configure Celery
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,  # 30 minutes
    task_soft_time_limit=25 * 60,  # 25 minutes
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=1000,
)

# Initialize Google Cloud Storage
try:
    from google.cloud import storage as gcs
    gcs_client = gcs.Client()
    bucket_name = settings.gcs_bucket_name
    bucket = gcs_client.bucket(bucket_name)
    logger.info(f"GCS client initialized for bucket: {bucket_name}")
    GCS_AVAILABLE = True
except Exception as e:
    logger.error(f"GCS initialization failed: {e}")
    GCS_AVAILABLE = False
    gcs_client = None
    bucket = None

# Import Celery tasks
try:
    from celery_worker.tasks import process_transcription_job
    CELERY_AVAILABLE = True
    logger.info("Celery tasks imported successfully")
except Exception as e:
    logger.error(f"Failed to import Celery tasks: {e}")
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
GOOGLE_DRIVE_AVAILABLE = False  # Set to False by default, will be True if Google Drive is properly configured

# Initialize Google Cloud Storage (GCS)
if GCS_AVAILABLE:
    try:
        storage_client = gcs.Client()
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

# Redis-based job storage for production scalability
def get_job_from_redis(job_id: str):
    """Get job data from Redis"""
    if not redis_client:
        return None
    try:
        job_data = redis_client.get(f"job:{job_id}")
        if job_data:
            return json.loads(job_data)
        return None
    except Exception as e:
        logger.error(f"Failed to get job {job_id} from Redis: {e}")
        return None

def save_job_to_redis(job_id: str, job_data: dict):
    """Save job data to Redis with 1 hour TTL"""
    if not redis_client:
        return False
    try:
        redis_client.setex(f"job:{job_id}", 3600, json.dumps(job_data))
        return True
    except Exception as e:
        logger.error(f"Failed to save job {job_id} to Redis: {e}")
        return False

def list_jobs_from_redis():
    """List all jobs from Redis"""
    if not redis_client:
        return []
    try:
        job_keys = redis_client.keys("job:*")
        jobs = []
        for key in job_keys:
            job_data = redis_client.get(key)
            if job_data:
                jobs.append(json.loads(job_data))
        return sorted(jobs, key=lambda x: x.get("created_at", ""), reverse=True)
    except Exception as e:
        logger.error(f"Failed to list jobs from Redis: {e}")
        return []

# Fallback in-memory storage for development
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

@app.get("/debug/queue")
async def debug_queue():
    """Debug endpoint to check queue status and find stuck jobs"""
    current_time = datetime.datetime.now()
    
    # Get all jobs from Redis or memory
    all_jobs = list_jobs_from_redis() if redis_client else list(jobs_db.values())
    
    stuck_jobs = []
    processing_jobs = []
    recent_jobs = []
    
    for job in all_jobs:
        job_status = job.get("status")
        created_at = job.get("created_at", "")
        updated_at = job.get("updated_at", created_at)
        
        # Calculate time since last update
        try:
            if updated_at:
                update_time = datetime.datetime.fromisoformat(updated_at.replace('Z', '+00:00').replace('+00:00', ''))
                minutes_since_update = (current_time - update_time).total_seconds() / 60
            else:
                minutes_since_update = -1
        except:
            minutes_since_update = -1
        
        job_info = {
            "job_id": job.get("job_id"),
            "filename": job.get("filename"),
            "status": job_status,
            "created_at": created_at,
            "updated_at": updated_at,
            "minutes_since_update": round(minutes_since_update, 1) if minutes_since_update >= 0 else "unknown",
            "progress": job.get("progress", 0),
            "message": job.get("message", ""),
            "model": job.get("model", "unknown")
        }
        
        # Categorize jobs
        if job_status == "processing" and minutes_since_update > 10:  # Stuck if processing for >10 minutes
            stuck_jobs.append(job_info)
        elif job_status == "processing":
            processing_jobs.append(job_info)
        elif minutes_since_update < 60:  # Recent jobs (last hour)
            recent_jobs.append(job_info)
    
    return {
        "total_jobs": len(all_jobs),
        "stuck_jobs": stuck_jobs,
        "processing_jobs": processing_jobs,
        "recent_jobs": recent_jobs[:10],  # Limit to 10 most recent
        "storage_type": "redis" if redis_client else "memory",
        "timestamp": current_time.isoformat()
    }

@app.post("/debug/reset-job/{job_id}")
async def reset_stuck_job(job_id: str):
    """Reset a stuck job back to queued status"""
    # Get job from Redis or memory
    job = get_job_from_redis(job_id) if redis_client else jobs_db.get(job_id)
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Reset job status
    job.update({
        "status": "queued",
        "progress": 0,
        "message": "Job reset - ready for reprocessing",
        "error": None,
        "updated_at": datetime.datetime.now().isoformat()
    })
    
    # Save back to storage
    if redis_client:
        save_job_to_redis(job_id, job)
    else:
        jobs_db[job_id] = job
    
    # Restart processing
    file_path = job.get("file_key", job.get("file_path", ""))
    model = TranscriptionModel(job.get("model", "openai-whisper"))
    set_list = job.get("set_list", "")
    custom_prompt = job.get("custom_prompt", "")
    
    # Restart direct processing
    import threading
    threading.Thread(
        target=process_transcription_direct,
        args=(job_id, file_path, model, set_list, custom_prompt),
        daemon=True
    ).start()
    
    return {
        "message": f"Job {job_id} has been reset and restarted",
        "job_status": job["status"],
        "timestamp": datetime.datetime.now().isoformat()
    }

@app.delete("/debug/cleanup-jobs")
async def cleanup_old_jobs():
    """Clean up old completed/failed jobs (older than 1 hour)"""
    current_time = datetime.datetime.now()
    cleanup_count = 0
    
    if redis_client:
        # For Redis, jobs auto-expire after 1 hour, but we can list what's there
        all_jobs = list_jobs_from_redis()
        return {
            "message": "Redis jobs auto-expire after 1 hour",
            "current_jobs": len(all_jobs),
            "timestamp": current_time.isoformat()
        }
    else:
        # For memory storage, manually clean up old jobs
        jobs_to_remove = []
        for job_id, job in jobs_db.items():
            if job.get("status") in ["completed", "failed"]:
                completed_at = job.get("completed_at")
                if completed_at:
                    try:
                        completion_time = datetime.datetime.fromisoformat(completed_at)
                        hours_since_completion = (current_time - completion_time).total_seconds() / 3600
                        if hours_since_completion > 1:
                            jobs_to_remove.append(job_id)
                    except:
                        pass
        
        # Remove old jobs
        for job_id in jobs_to_remove:
            del jobs_db[job_id]
            cleanup_count += 1
        
        return {
            "message": f"Cleaned up {cleanup_count} old jobs",
            "remaining_jobs": len(jobs_db),
            "timestamp": current_time.isoformat()
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
        
        # Declare globals for modification
        global GOOGLE_DRIVE_AVAILABLE, GCS_AVAILABLE
        
        # Upload to Google Cloud Storage (production-first approach)
        if GCS_AVAILABLE and bucket:
            try:
                blob = bucket.blob(file_key)
                blob.upload_from_string(contents, content_type=file.content_type or 'application/octet-stream')
                file_path = file_key  # GCS path
                file_storage_type = "gcs"
                logger.info(f"File uploaded to GCS: gs://{bucket_name}/{file_key}")
            except Exception as e:
                logger.error(f"GCS upload failed: {e}")
                raise HTTPException(status_code=500, detail=f"File storage failed: {str(e)}")
        else:
            # Fallback for development
            os.makedirs(LOCAL_UPLOAD_DIR, exist_ok=True)
            file_path = os.path.join(LOCAL_UPLOAD_DIR, f"{job_id}-{file.filename}")
            with open(file_path, "wb") as f:
                f.write(contents)
            file_storage_type = "local"
            logger.info(f"File saved locally: {file_path}")
        
        # Create job record
        job_data = {
            "job_id": job_id,
            "status": "queued",
            "filename": file.filename,
            "file_key": file_key if file_storage_type == "gcs" else file_path,
            "storage_type": file_storage_type,
            "model": model,
            "set_list": set_list,
            "custom_prompt": custom_prompt,
            "created_at": datetime.datetime.now().isoformat(),
            "updated_at": datetime.datetime.now().isoformat(),
            "progress": 0,
            "message": "Job queued",
            "result": None,
            "error": None
        }
        
        # Save job to Redis (or fallback to memory)
        if redis_client:
            save_job_to_redis(job_id, job_data)
        else:
            jobs_db[job_id] = job_data
        
        # Queue job for processing with Celery
        if CELERY_AVAILABLE and file_storage_type == "gcs":
            # Production: Use Celery with GCS
            task = process_transcription_job.delay(
                job_id=job_id,
                gcs_file_path=file_key,
                filename=file.filename,
                model=model,
                set_list=set_list,
                custom_prompt=custom_prompt
            )
            message = "Transcription job queued for processing"
            logger.info(f"Job {job_id} queued with Celery task {task.id}")
        else:
            # Development fallback: Direct processing
            import threading
            threading.Thread(
                target=process_transcription_direct,
                args=(job_id, file_path, model, set_list, custom_prompt),
                daemon=True
            ).start()
            message = "Transcription started (development mode)"
            logger.info(f"Job {job_id} started with direct processing")
        
        return TranscriptionJobResponse(
            job_id=job_id,
            status=JobStatus.QUEUED,
            message=message
        )
        
    except Exception as e:
        import traceback
        error_msg = f"Failed to process upload: {str(e)}"
        logger.error(f"Upload error for file {file.filename}: {error_msg}")
        logger.error(f"Full traceback: {traceback.format_exc()}")
        print(f"ERROR: {error_msg}")
        print(f"Full traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail=error_msg
        )

@app.get("/v1/transcripts/{job_id}", response_model=JobStatusResponse)
async def get_transcription_status(job_id: str):
    """
    Get transcription job status and result
    """
    # Try Redis first, fallback to in-memory
    job = get_job_from_redis(job_id) if redis_client else jobs_db.get(job_id)
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
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
    List all transcription jobs
    """
    # Try Redis first, fallback to in-memory
    jobs = list_jobs_from_redis() if redis_client else list(jobs_db.values())
    return {"jobs": jobs}

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
    Handles local files, Google Drive files, and GCS files with timeout protection
    """
    import threading
    import time
    from concurrent.futures import ThreadPoolExecutor, TimeoutError
    
    def transcribe():
        cleanup_func = None
        try:
            # Update status to processing
            if job_id in jobs_db:
                jobs_db[job_id]["status"] = JobStatus.PROCESSING
                jobs_db[job_id]["updated_at"] = datetime.datetime.now().isoformat()
                jobs_db[job_id]["message"] = "Starting transcription..."
            else:
                logger.error(f"Job {job_id} not found in jobs_db during processing start")
                return
            
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
                    # Update progress
                    jobs_db[job_id]["message"] = "Preparing audio file..."
                    jobs_db[job_id]["progress"] = 10
                    
                    # Get file for transcription (handles different storage types)
                    local_file_path, cleanup_func = get_file_for_transcription(job_id)
                    
                    print(f"BACKEND DEBUG: Initializing WhisperClient with API key present: {'YES' if settings.openai_api_key else 'NO'}")
                    
                    # Check if we should use mock mode for testing
                    if not settings.openai_api_key or settings.openai_api_key == "test":
                        print("BACKEND DEBUG: Using mock transcription mode (no valid API key)")
                        
                        # Update progress for mock processing
                        jobs_db[job_id]["message"] = "Processing with mock transcription..."
                        jobs_db[job_id]["progress"] = 50
                        
                        # Simulate processing time
                        time.sleep(2)
                        
                        transcript = """[MOCK COMEDY TRANSCRIPTION]

Good evening everyone! So I was at the grocery store yesterday, and this lady in front of me had like 47 items in the express lane. The sign says "10 items or less" but apparently math is optional now. I'm standing there doing mental calculations like I'm preparing for the SATs.

And you know what really gets me? People who say "I could care less." That means you DO care! At least a little bit! The phrase is "I COULDN'T care less!" If you could care less, then you're admitting there's room for less caring in your emotional spectrum.

Speaking of things that annoy me - why do they call it rush hour when nobody's moving? It should be called "park hour" or "contemplate your life choices hour."

[Audience laughter]

But seriously folks, technology these days... My phone knows everything about me. It knows where I go, what I buy, who I call. But ask it to understand me when I say "Call Mom" and suddenly it's like I'm speaking ancient Aramiac.

Thank you, you've been a wonderful audience!

[End of mock transcription - uploaded file: """ + jobs_db[job_id]['filename'] + """]"""
                        
                        if cleanup_func:
                            cleanup_func()
                        print(f"SUCCESS: Mock transcription completed for job {job_id}")
                    else:
                        from celery_worker.whisper_client import WhisperClient
                        
                        # Update progress
                        jobs_db[job_id]["message"] = "Transcribing with OpenAI Whisper..."
                        jobs_db[job_id]["progress"] = 30
                        
                        whisper_client = WhisperClient(api_key=settings.openai_api_key)
                        
                        print(f"BACKEND DEBUG: Starting transcription for file: {local_file_path}")
                        transcript = whisper_client.transcribe_audio(local_file_path)
                        
                        # Clean up temp file if needed
                        if cleanup_func:
                            cleanup_func()
                        
                        print(f"SUCCESS: OpenAI Whisper transcription completed for job {job_id}")
                    
                except Exception as e:
                    import traceback
                    error_msg = f"OpenAI Whisper transcription failed: {str(e)}"
                    print(f"ERROR: {error_msg}")
                    print(f"Full traceback: {traceback.format_exc()}")
                    
                    # Ensure cleanup happens even on error
                    if cleanup_func:
                        try:
                            cleanup_func()
                        except Exception as cleanup_error:
                            print(f"Cleanup error: {cleanup_error}")
                    
                    update_job_status(job_id, JobStatus.FAILED, error=error_msg)
                    return
                    
            elif model == TranscriptionModel.WHISPER_PLUS_GEMINI:
                try:
                    # Update progress
                    jobs_db[job_id]["message"] = "Preparing for Whisper + Gemini processing..."
                    jobs_db[job_id]["progress"] = 10
                    
                    # Get file for transcription (handles different storage types)
                    local_file_path, cleanup_func = get_file_for_transcription(job_id)
                    
                    # Update progress
                    jobs_db[job_id]["message"] = "Transcribing with OpenAI Whisper..."
                    jobs_db[job_id]["progress"] = 30
                    
                    # First transcribe with Whisper
                    if not settings.openai_api_key or settings.openai_api_key == "test":
                        # Mock transcription
                        time.sleep(2)
                        transcript = "Mock comedy performance transcript for Gemini analysis."
                        print("BACKEND DEBUG: Using mock transcription for Whisper + Gemini mode")
                    else:
                        from celery_worker.whisper_client import WhisperClient
                        whisper_client = WhisperClient(api_key=settings.openai_api_key)
                        transcript = whisper_client.transcribe_audio(local_file_path)
                    
                    # Clean up temp file if needed
                    if cleanup_func:
                        cleanup_func()
                    
                    print(f"SUCCESS: Whisper transcription completed for job {job_id}")
                    
                    # Update progress for Gemini analysis
                    jobs_db[job_id]["message"] = "Analyzing with Gemini..."
                    jobs_db[job_id]["progress"] = 70
                    
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
                    import traceback
                    error_msg = f"Whisper + Gemini processing failed: {str(e)}"
                    print(f"ERROR: {error_msg}")
                    print(f"Full traceback: {traceback.format_exc()}")
                    
                    # Ensure cleanup happens even on error
                    if cleanup_func:
                        try:
                            cleanup_func()
                        except Exception as cleanup_error:
                            print(f"Cleanup error: {cleanup_error}")
                    
                    update_job_status(job_id, JobStatus.FAILED, error=error_msg)
                    return
                    
            elif model == TranscriptionModel.GEMINI_ANALYSIS:
                # This would be for analyzing existing transcripts
                error_msg = "Gemini-only analysis requires existing transcript. Use Whisper + Gemini instead."
                update_job_status(job_id, JobStatus.FAILED, error=error_msg)
                print(f"ERROR: {error_msg}")
                return
            
            # Update with success
            if job_id in jobs_db:
                jobs_db[job_id].update({
                    "status": JobStatus.COMPLETED,
                    "result": transcript,
                    "analysis": analysis,
                    "progress": 100,
                    "message": "Processing complete",
                    "completed_at": datetime.datetime.now().isoformat(),
                    "updated_at": datetime.datetime.now().isoformat()
                })
                print(f"SUCCESS: Job {job_id} completed successfully")
            else:
                print(f"WARNING: Job {job_id} not found in jobs_db during completion")
                
        except Exception as e:
            import traceback
            error_msg = f"Processing failed: {str(e)}"
            print(f"ERROR: Processing failed for job {job_id}: {error_msg}")
            print(f"Full traceback: {traceback.format_exc()}")
            
            # Ensure cleanup happens even on unexpected errors
            if cleanup_func:
                try:
                    cleanup_func()
                except Exception as cleanup_error:
                    print(f"Final cleanup error: {cleanup_error}")
            
            # Always update job status to failed
            try:
                if job_id in jobs_db:
                    jobs_db[job_id].update({
                        "status": JobStatus.FAILED,
                        "error": error_msg,
                        "message": f"Processing failed: {error_msg}",
                        "completed_at": datetime.datetime.now().isoformat(),
                        "updated_at": datetime.datetime.now().isoformat()
                    })
                else:
                    print(f"WARNING: Job {job_id} not found in jobs_db during error handling")
            except Exception as status_error:
                print(f"Failed to update job status: {status_error}")
    
    # Run transcription in background thread with timeout protection
    def run_with_timeout():
        timeout_seconds = 300  # 5 minutes timeout for local processing
        with ThreadPoolExecutor(max_workers=1) as executor:
            future = executor.submit(transcribe)
            try:
                future.result(timeout=timeout_seconds)
            except TimeoutError:
                error_msg = f"Processing timed out after {timeout_seconds} seconds"
                print(f"ERROR: {error_msg}")
                if job_id in jobs_db:
                    jobs_db[job_id].update({
                        "status": JobStatus.FAILED,
                        "error": error_msg,
                        "message": "Processing timed out",
                        "completed_at": datetime.datetime.now().isoformat(),
                        "updated_at": datetime.datetime.now().isoformat()
                    })
            except Exception as e:
                error_msg = f"Thread execution failed: {str(e)}"
                print(f"ERROR: {error_msg}")
                if job_id in jobs_db:
                    jobs_db[job_id].update({
                        "status": JobStatus.FAILED,
                        "error": error_msg,
                        "message": "Thread execution failed",
                        "completed_at": datetime.datetime.now().isoformat(),
                        "updated_at": datetime.datetime.now().isoformat()
                    })
    
    # Start the timeout-protected thread
    thread = threading.Thread(target=run_with_timeout, daemon=True)
    thread.start()
    print(f"Started processing job {job_id} with 5-minute timeout protection")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.api_host, port=settings.api_port)