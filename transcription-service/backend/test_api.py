"""
Test script to verify Gemini analysis is returned by API
Temporarily forces direct processing to bypass Redis/Celery issues
"""
import sys
sys.path.append('.')
import os
import tempfile

# Set up environment
from api.config import settings
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = settings.google_drive_credentials_path

# Temporarily force direct processing by setting CELERY_AVAILABLE to False
import api.main
api.main.CELERY_AVAILABLE = False

print("=== TESTING API WITH FORCED DIRECT PROCESSING ===")
print(f"CELERY_AVAILABLE forced to: {api.main.CELERY_AVAILABLE}")

try:
    from fastapi.testclient import TestClient
    from api.main import app
    
    client = TestClient(app)
    
    # Create test audio file
    with open('test_audio.wav', 'wb') as f:
        f.write(b"fake audio content for testing gemini analysis")
    
    # Test gemini-analysis-only endpoint
    with open('test_audio.wav', 'rb') as f:
        response = client.post(
            '/v1/transcripts',
            files={'file': ('test_audio.wav', f, 'audio/wav')},
            data={
                'model': 'gemini-analysis-only',
                'set_list': 'Programming jokes: Git merge conflicts, production bugs, code reviews',
                'custom_prompt': 'Focus on software development humor and coding struggles'
            }
        )
    
    print(f"\nAPI Response: {response.status_code}")
    
    if response.status_code == 202:
        job_data = response.json()
        job_id = job_data['job_id']
        print(f"Job created: {job_id}")
        print(f"Processing method: {job_data.get('message')}")
        
        # Wait for direct processing to complete
        import time
        print("\nWaiting for direct processing...")
        
        for attempt in range(25):  # Up to 25 seconds
            time.sleep(1)
            
            status_response = client.get(f'/v1/transcripts/{job_id}')
            
            if status_response.status_code == 200:
                status_data = status_response.json()
                job_status = status_data.get('status')
                
                # Progress indicator
                if attempt % 5 == 0:
                    print(f"Attempt {attempt+1}: Status = {job_status}")
                
                if job_status == 'completed':
                    print("\n🎉 JOB COMPLETED!")
                    
                    # Check for analysis field
                    analysis = status_data.get('analysis')
                    result = status_data.get('result')
                    
                    print(f"Result field: {str(result)[:100] if result else 'None'}")
                    
                    if analysis:
                        print(f"\nANALYSIS FOUND!")
                        print(f"Analysis preview: {str(analysis)[:250]}...")
                        print(f"\n🎉 SUCCESS: GEMINI ANALYSIS IS WORKING!")
                        print("The API correctly returns the analysis field!")
                        break
                    else:
                        print(f"\nNO ANALYSIS FIELD")
                        print(f"Available response fields: {list(status_data.keys())}")
                        # Print the actual response for debugging
                        print(f"Full response: {status_data}")
                        break
                        
                elif job_status == 'failed':
                    error = status_data.get('error')
                    print(f"\nJOB FAILED: {error}")
                    break
            else:
                print(f"Status check failed: {status_response.status_code}")
                break
        else:
            print(f"\nTIMEOUT after {attempt+1} attempts")
            # Get final status
            final_response = client.get(f'/v1/transcripts/{job_id}')
            if final_response.status_code == 200:
                final_data = final_response.json()
                print(f"Final status: {final_data}")
                
    else:
        print(f"API request failed: {response.json()}")
        
    # Cleanup
    try:
        os.unlink('test_audio.wav')
    except:
        pass
        
except Exception as e:
    print(f"ERROR: {str(e)}")
    import traceback
    traceback.print_exc()