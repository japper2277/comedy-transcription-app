#!/usr/bin/env python3
"""
Upload Progress Monitor
Shows real-time progress of Google Drive upload
"""

import os
import sys
import time
from pathlib import Path

# Add the backend API to the path
sys.path.append(str(Path(__file__).parent / "backend"))

from backend.api.google_drive_client import GoogleDriveClient
from backend.api.logging_config import get_logger
import fnmatch

logger = get_logger("upload_monitor")

def count_local_files(project_root):
    """Count total files to upload (excluding patterns)"""
    exclude_patterns = [
        '__pycache__', '*.pyc', '*.pyo', '.git', 'node_modules', 
        '.env', '*.log', 'fresh_venv', 'venv', '.vscode', '.idea', 
        'dist', 'build', '*.tmp', 'temp_uploads', 'logs'
    ]
    
    total_files = 0
    for root, dirs, files in os.walk(project_root):
        # Filter directories
        dirs[:] = [d for d in dirs if not any(fnmatch.fnmatch(d, pattern) for pattern in exclude_patterns)]
        
        # Count files
        for file in files:
            if not any(fnmatch.fnmatch(file, pattern) for pattern in exclude_patterns):
                total_files += 1
    
    return total_files

def count_drive_files(client, folder_id):
    """Count files already uploaded to Drive folder"""
    try:
        files = client.list_files(
            query=f"'{folder_id}' in parents",
            max_results=1000
        )
        return len([f for f in files if f['mimeType'] != 'application/vnd.google-apps.folder'])
    except:
        return 0

def monitor_upload_progress():
    """Monitor and display upload progress"""
    project_root = Path(__file__).parent.parent
    credentials_path = project_root / "google-oauth-credentials.json"
    
    if not credentials_path.exists():
        print("OAuth credentials not found!")
        return
    
    try:
        # Initialize client
        client = GoogleDriveClient(credentials_path=str(credentials_path), use_oauth=True)
        
        # Count total local files
        print("Counting local files...")
        total_local_files = count_local_files(project_root)
        print(f"Total files to upload: {total_local_files}")
        
        # Check if upload manifest exists (indicates ongoing upload)
        manifest_path = project_root / "drive_upload_manifest.json"
        
        if manifest_path.exists():
            import json
            with open(manifest_path, 'r') as f:
                manifest = json.load(f)
            
            root_folder_id = manifest.get(str(project_root))
            if root_folder_id:
                print(f"Found existing upload, monitoring folder: {root_folder_id}")
                
                while True:
                    uploaded_files = count_drive_files(client, root_folder_id)
                    progress = (uploaded_files / total_local_files) * 100
                    
                    print(f"\r[{uploaded_files}/{total_local_files}] {progress:.1f}% complete", end="", flush=True)
                    
                    if uploaded_files >= total_local_files:
                        print("\nUpload completed!")
                        break
                    
                    time.sleep(5)  # Check every 5 seconds
            else:
                print("Upload not started yet")
        else:
            print("No upload manifest found. Start upload with: python migrate_to_drive.py")
            
    except KeyboardInterrupt:
        print("\nMonitoring stopped")
    except Exception as e:
        print(f"Error monitoring upload: {e}")

if __name__ == "__main__":
    monitor_upload_progress()