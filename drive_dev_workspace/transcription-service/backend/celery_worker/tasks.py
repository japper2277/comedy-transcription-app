from celery import Celery
import google.cloud.storage as storage
import tempfile
import os
from .celery_app import celery_app
from .whisper_client import WhisperClient

# Initialize clients
storage_client = storage.Client()
whisper_client = WhisperClient()

@celery_app.task(bind=True)
def process_transcription_job(self, file_key: str, job_id: str):
    """
    Process transcription job:
    1. Download file from GCS
    2. Transcribe with OpenAI Whisper
    3. Update job status
    """
    try:
        # Update status to processing
        self.update_state(state='PROCESSING', meta={'job_id': job_id})
        
        # Download file from Google Cloud Storage
        bucket = storage_client.bucket(os.getenv("GCS_BUCKET_NAME"))
        blob = bucket.blob(file_key)
        
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.tmp') as temp_file:
            blob.download_to_filename(temp_file.name)
            temp_path = temp_file.name
        
        try:
            # Transcribe audio
            transcript = whisper_client.transcribe_audio(temp_path)
            
            # Update job status via API (you'd need to import the function)
            # For now, return success
            return {
                'job_id': job_id,
                'status': 'completed',
                'result': transcript,
                'message': 'Transcription completed successfully'
            }
            
        finally:
            # Clean up temporary file
            if os.path.exists(temp_path):
                os.unlink(temp_path)
                
    except Exception as exc:
        # Update job status to failed
        error_msg = f'Transcription failed: {str(exc)}'
        
        self.update_state(
            state='FAILURE',
            meta={
                'job_id': job_id,
                'error': error_msg,
                'status': 'failed'
            }
        )
        
        return {
            'job_id': job_id,
            'status': 'failed',
            'error': error_msg
        }