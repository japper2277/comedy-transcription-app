from celery import Celery
import os
import tempfile
from typing import Optional
from .whisper_client import WhisperClient
from .gemini_client import GeminiClient
from google.cloud import storage as gcs
import redis
import json
import logging
from datetime import datetime

# Apply fakeredis patch for local development
try:
    import sys
    sys.path.append('..')
    import fakeredis_patch
except ImportError:
    pass

logger = logging.getLogger(__name__)

# Initialize Celery
celery_app = Celery(
    "transcription_worker",
    broker=os.getenv("REDIS_URL", "redis://localhost:6379/0"),
    backend=os.getenv("REDIS_URL", "redis://localhost:6379/0")
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

# Initialize GCS client
gcs_client = gcs.Client()

@celery_app.task(bind=True)
def process_transcription_job(
    self,
    job_id: str,
    gcs_file_path: str,
    filename: str,
    model: str = "openai-whisper",
    set_list: Optional[str] = None,
    custom_prompt: Optional[str] = None
):
    """
    Process a transcription job using Celery.
    
    Args:
        job_id: Unique job identifier
        gcs_file_path: Path to the audio file in GCS
        filename: Original filename
        model: AI model to use
        set_list: Optional setlist for comparison
        custom_prompt: Optional custom analysis prompt
    """
    try:
        # Update job status to processing
        redis_client = redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379/0"))
        job_data = {
            "job_id": job_id,
            "filename": filename,
            "status": "processing",
            "progress": 10,
            "message": "Downloading audio file...",
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
        }
        redis_client.setex(f"job:{job_id}", 3600, json.dumps(job_data))
        
        # Download file from GCS
        bucket_name = os.getenv("GCS_BUCKET_NAME")
        bucket = gcs_client.bucket(bucket_name)
        blob = bucket.blob(gcs_file_path)
        
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(filename)[1]) as temp_file:
            blob.download_to_filename(temp_file.name)
            temp_file_path = temp_file.name
        
        try:
            result = {}
            
            # Update progress
            job_data["progress"] = 30
            job_data["message"] = "Transcribing audio..."
            job_data["updated_at"] = datetime.utcnow().isoformat()
            redis_client.setex(f"job:{job_id}", 3600, json.dumps(job_data))
            
            # Transcription step
            if model in ["openai-whisper", "whisper-plus-gemini"]:
                whisper_client = WhisperClient()
                transcript = whisper_client.transcribe_audio(temp_file_path)
                result["transcript"] = transcript
                
                # Update progress
                job_data["progress"] = 70
                job_data["message"] = "Transcription complete..."
                job_data["updated_at"] = datetime.utcnow().isoformat()
                redis_client.setex(f"job:{job_id}", 3600, json.dumps(job_data))
            
            # Analysis step
            if model in ["whisper-plus-gemini", "gemini-analysis-only"]:
                job_data["progress"] = 80
                job_data["message"] = "Analyzing with Gemini..."
                job_data["updated_at"] = datetime.utcnow().isoformat()
                redis_client.setex(f"job:{job_id}", 3600, json.dumps(job_data))
                
                gemini_client = GeminiClient()
                
                # Use existing transcript or empty string
                transcript_for_analysis = result.get("transcript", "")
                
                analysis = gemini_client.analyze_comedy_performance(
                    transcript_for_analysis,
                    set_list or "",
                    custom_prompt
                )
                result["analysis"] = analysis
            
            # Update job as completed
            job_data.update({
                "status": "completed",
                "progress": 100,
                "message": "Processing complete",
                "result": result,
                "updated_at": datetime.utcnow().isoformat()
            })
            redis_client.setex(f"job:{job_id}", 3600, json.dumps(job_data))
            
            logger.info(f"Job {job_id} completed successfully")
            return result
            
        finally:
            # Clean up temporary file
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
    
    except Exception as e:
        logger.error(f"Job {job_id} failed: {str(e)}")
        
        # Update job as failed
        job_data = {
            "job_id": job_id,
            "filename": filename,
            "status": "failed",
            "progress": 0,
            "message": f"Processing failed: {str(e)}",
            "error": str(e),
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
        }
        
        try:
            redis_client = redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379/0"))
            redis_client.setex(f"job:{job_id}", 3600, json.dumps(job_data))
        except:
            pass
        
        # Re-raise the exception for Celery to handle
        raise self.retry(exc=e, countdown=60, max_retries=3)