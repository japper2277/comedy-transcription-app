"""
Debug script to test direct processing with explicit logging
"""
import sys
sys.path.append('.')
import os
import uuid

# Setup
from api.config import settings
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = settings.google_drive_credentials_path

# Import and setup
from api.main import jobs_db, JobStatus, update_job_status

def debug_process_transcription_direct(job_id: str, file_path: str, model: str = "openai-whisper", set_list: str = "", custom_prompt: str = ""):
    """Debug version of process_transcription_direct with extensive logging"""
    print(f"\n=== DEBUG DIRECT PROCESSING ===")
    print(f"Job ID: {job_id}")
    print(f"File path: {file_path}")
    print(f"Model parameter: '{model}'")
    print(f"Set list: '{set_list}'")
    print(f"Custom prompt: '{custom_prompt}'")
    
    # Initialize job
    jobs_db[job_id] = {
        'job_id': job_id,
        'status': JobStatus.QUEUED,
        'result': None,
        'analysis': None
    }
    
    try:
        print(f"\n--- Starting processing ---")
        jobs_db[job_id]["status"] = JobStatus.PROCESSING
        result = {}
        
        # Transcription step
        print(f"Checking transcription: model in ['openai-whisper', 'whisper-plus-gemini']")
        transcription_needed = model in ["openai-whisper", "whisper-plus-gemini"]
        print(f"Transcription needed: {transcription_needed}")
        
        if transcription_needed:
            print("DOING WHISPER TRANSCRIPTION")
            try:
                from celery_worker.whisper_client import WhisperClient
                whisper_client = WhisperClient(api_key=settings.openai_api_key)
                transcript = whisper_client.transcribe_audio(file_path)
                result["transcript"] = transcript
                print(f"Transcription result: {transcript[:100]}...")
            except Exception as e:
                print(f"Transcription error: {e}")
                return
        else:
            print("SKIPPING WHISPER TRANSCRIPTION")
        
        # Analysis step
        print(f"\nChecking analysis: model in ['whisper-plus-gemini', 'gemini-analysis-only']")
        analysis_needed = model in ["whisper-plus-gemini", "gemini-analysis-only"]
        print(f"Analysis needed: {analysis_needed}")
        
        if analysis_needed:
            print("DOING GEMINI ANALYSIS")
            try:
                from celery_worker.gemini_client import GeminiClient
                gemini_client = GeminiClient()
                
                transcript_for_analysis = result.get("transcript", "")
                print(f"Transcript for analysis: {len(transcript_for_analysis)} chars")
                
                analysis_result = gemini_client.analyze_comedy_performance(
                    transcript_for_analysis,
                    set_list,
                    custom_prompt
                )
                print(f"Analysis result type: {type(analysis_result)}")
                
                if isinstance(analysis_result, dict) and analysis_result.get("success"):
                    result["analysis"] = analysis_result.get("analysis")
                    print(f"Analysis extracted: {len(result['analysis'])} chars")
                else:
                    result["analysis"] = analysis_result
                    print(f"Analysis stored as-is: {analysis_result}")
                
            except Exception as e:
                print(f"Analysis error: {e}")
                import traceback
                traceback.print_exc()
                return
        else:
            print("SKIPPING GEMINI ANALYSIS")
        
        # Final job update
        print(f"\n--- Final update ---")
        print(f"Model: {model}")
        print(f"Result keys: {list(result.keys())}")
        
        if model == "openai-whisper":
            print("Using openai-whisper final update")
            update_job_status(job_id, JobStatus.COMPLETED, result=result.get("transcript", ""))
        else:
            print("Using Gemini final update")
            jobs_db[job_id]["result"] = result.get("transcript", "")
            jobs_db[job_id]["analysis"] = {
                "success": True,
                "analysis": result.get("analysis"),
                "error": None
            }
            jobs_db[job_id]["status"] = JobStatus.COMPLETED
            import datetime
            jobs_db[job_id]["completed_at"] = datetime.datetime.now().isoformat()
        
        print("Processing completed successfully")
        
    except Exception as e:
        print(f"Processing failed: {e}")
        import traceback
        traceback.print_exc()


# Test it
print("=== TESTING DEBUG DIRECT PROCESSING ===")

job_id = str(uuid.uuid4())
debug_process_transcription_direct(
    job_id=job_id,
    file_path="test.wav",
    model="gemini-analysis-only",
    set_list="Programming jokes about debugging and deployments",
    custom_prompt="Focus on technical humor and coding struggles"
)

# Check final result
print(f"\n=== FINAL JOB STATE ===")
job = jobs_db.get(job_id, {})
for key, value in job.items():
    if key == 'analysis' and value:
        print(f"{key}: {str(value)[:150]}...")
    else:
        print(f"{key}: {value}")