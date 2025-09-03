#!/usr/bin/env python3
"""
Set up local GCS emulator for development testing
"""

import os
import subprocess
import time
import sys

def setup_local_gcs():
    """Set up local GCS emulator for development"""
    
    print("Setting up local GCS emulator for development...")
    
    # Try to start GCS emulator with docker
    try:
        # Start GCS emulator in background
        cmd = [
            "docker", "run", "-d", 
            "--name", "gcs-emulator",
            "-p", "4443:4443",
            "fsouza/fake-gcs-server",
            "-scheme", "http",
            "-port", "4443"
        ]
        
        # Kill existing container if it exists
        subprocess.run(["docker", "rm", "-f", "gcs-emulator"], 
                      capture_output=True, check=False)
        
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        print(f"✅ GCS emulator started: {result.stdout.strip()}")
        
        # Wait for it to start
        time.sleep(3)
        
        # Set environment variables for local GCS
        os.environ["STORAGE_EMULATOR_HOST"] = "http://localhost:4443"
        os.environ["GCS_BUCKET_NAME"] = "test-transcription-files"
        
        print("✅ Environment configured for local GCS")
        print("   STORAGE_EMULATOR_HOST=http://localhost:4443")
        print("   GCS_BUCKET_NAME=test-transcription-files")
        
        # Create test bucket
        from google.cloud import storage
        
        # Initialize client with emulator
        client = storage.Client()
        
        # Create bucket if it doesn't exist
        bucket_name = "test-transcription-files"
        try:
            bucket = client.bucket(bucket_name)
            if not bucket.exists():
                bucket = client.create_bucket(bucket_name)
                print(f"✅ Created test bucket: {bucket_name}")
            else:
                print(f"✅ Test bucket already exists: {bucket_name}")
                
        except Exception as e:
            print(f"❌ Failed to create bucket: {e}")
            return False
        
        print("\n🚀 Local GCS emulator is ready!")
        print("   You can now run performance tests with streaming uploads")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to start GCS emulator: {e}")
        print("   Make sure Docker is running")
        return False
        
    except ImportError:
        print("❌ google-cloud-storage not installed")
        print("   Run: pip install google-cloud-storage")
        return False
        
    except Exception as e:
        print(f"❌ Setup failed: {e}")
        return False

if __name__ == "__main__":
    success = setup_local_gcs()
    sys.exit(0 if success else 1)