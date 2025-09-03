#!/usr/bin/env python3
"""
Google Drive Sync Utility for Cloud-Based Development
This utility allows you to sync your project between Google Drive and local development environment
"""

import os
import sys
import json
import time
from pathlib import Path
from datetime import datetime
import fnmatch

# Add the backend API to the path
sys.path.append(str(Path(__file__).parent / "backend"))

from backend.api.google_drive_client import GoogleDriveClient
from backend.api.logging_config import get_logger

logger = get_logger("drive_sync")

class DriveProjectSyncer:
    def __init__(self, credentials_path=None):
        """Initialize Drive sync utility"""
        self.project_root = Path(__file__).parent.parent
        self.credentials_path = credentials_path or self.project_root / "google-oauth-credentials.json"
        self.manifest_path = self.project_root / "drive_upload_manifest.json"
        self.sync_cache_path = self.project_root / ".drive_sync_cache.json"
        
        # Initialize Google Drive client
        self.client = GoogleDriveClient(credentials_path=str(self.credentials_path), use_oauth=True)
        
        # Load project folder ID from manifest
        self.project_folder_id = self._load_project_folder_id()
        
        logger.info("Drive Project Syncer initialized")
    
    def _load_project_folder_id(self):
        """Load project folder ID from upload manifest"""
        if not self.manifest_path.exists():
            logger.error("Upload manifest not found. Run migrate_to_drive.py first.")
            raise FileNotFoundError("Project not yet uploaded to Drive")
        
        with open(self.manifest_path, 'r') as f:
            manifest = json.load(f)
        
        project_folder_id = manifest.get(str(self.project_root))
        if not project_folder_id:
            raise ValueError("Project folder ID not found in manifest")
        
        logger.info(f"Loaded project folder ID: {project_folder_id}")
        return project_folder_id
    
    def download_project_from_drive(self, local_dir=None):
        """Download entire project from Google Drive to local directory"""
        if local_dir is None:
            local_dir = self.project_root / "drive_sync_workspace"
        
        local_dir = Path(local_dir)
        local_dir.mkdir(exist_ok=True)
        
        logger.info(f"Downloading project from Google Drive to: {local_dir}")
        
        # Get all files in project folder
        all_files = self._get_all_drive_files(self.project_folder_id)
        
        # Download files maintaining directory structure
        downloaded_files = {}
        for drive_path, file_info in all_files.items():
            if file_info['mimeType'] == 'application/vnd.google-apps.folder':
                # Create local directory
                local_path = local_dir / drive_path
                local_path.mkdir(parents=True, exist_ok=True)
                logger.info(f"Created directory: {local_path}")
            else:
                # Download file
                local_path = local_dir / drive_path
                local_path.parent.mkdir(parents=True, exist_ok=True)
                
                try:
                    file_content = self.client.download_file(file_info['id'])
                    with open(local_path, 'wb') as f:
                        f.write(file_content)
                    
                    downloaded_files[str(local_path)] = file_info['id']
                    logger.info(f"Downloaded: {drive_path} -> {local_path}")
                except Exception as e:
                    logger.error(f"Failed to download {drive_path}: {e}")
        
        # Save sync cache
        sync_cache = {
            'last_sync': datetime.now().isoformat(),
            'local_dir': str(local_dir),
            'downloaded_files': downloaded_files
        }
        
        with open(self.sync_cache_path, 'w') as f:
            json.dump(sync_cache, f, indent=2)
        
        logger.info(f"Project downloaded successfully to: {local_dir}")
        return str(local_dir)
    
    def upload_changes_to_drive(self, local_dir=None):
        """Upload local changes back to Google Drive"""
        if local_dir is None:
            # Load from sync cache
            if not self.sync_cache_path.exists():
                logger.error("No sync cache found. Download project first.")
                return False
            
            with open(self.sync_cache_path, 'r') as f:
                sync_cache = json.load(f)
            
            local_dir = Path(sync_cache['local_dir'])
        else:
            local_dir = Path(local_dir)
        
        if not local_dir.exists():
            logger.error(f"Local directory not found: {local_dir}")
            return False
        
        logger.info(f"Uploading changes from: {local_dir}")
        
        # Find modified files
        modified_files = self._find_modified_files(local_dir)
        
        if not modified_files:
            logger.info("No changes detected")
            return True
        
        logger.info(f"Uploading {len(modified_files)} changed files...")
        
        # Upload modified files
        for local_file in modified_files:
            try:
                relative_path = local_file.relative_to(local_dir)
                
                # Find corresponding Drive folder
                drive_folder_id = self._find_drive_folder_for_path(relative_path.parent)
                
                # Upload file
                file_id = self.client.upload_local_file(
                    str(local_file),
                    local_file.name,
                    drive_folder_id
                )
                
                logger.info(f"Uploaded: {relative_path}")
                
            except Exception as e:
                logger.error(f"Failed to upload {local_file}: {e}")
        
        # Update sync cache
        self._update_sync_cache(local_dir)
        
        logger.info("Upload completed")
        return True
    
    def watch_and_sync(self, local_dir=None, interval=5):
        """Watch local directory for changes and auto-sync to Drive"""
        if local_dir is None:
            if not self.sync_cache_path.exists():
                logger.error("No sync cache found. Download project first.")
                return
            
            with open(self.sync_cache_path, 'r') as f:
                sync_cache = json.load(f)
            
            local_dir = Path(sync_cache['local_dir'])
        
        local_dir = Path(local_dir)
        
        logger.info(f"Watching directory for changes: {local_dir}")
        logger.info(f"Sync interval: {interval} seconds")
        logger.info("Press Ctrl+C to stop watching")
        
        try:
            while True:
                modified_files = self._find_modified_files(local_dir)
                if modified_files:
                    logger.info(f"Detected {len(modified_files)} changes, uploading...")
                    self.upload_changes_to_drive(local_dir)
                
                time.sleep(interval)
                
        except KeyboardInterrupt:
            logger.info("Stopped watching for changes")
    
    def _get_all_drive_files(self, folder_id, path=""):
        """Recursively get all files in Drive folder"""
        files = {}
        
        # Get files in current folder
        folder_contents = self.client.list_files(
            query=f"'{folder_id}' in parents",
            max_results=1000
        )
        
        for item in folder_contents:
            item_path = os.path.join(path, item['name']) if path else item['name']
            files[item_path] = item
            
            # If it's a folder, recurse
            if item['mimeType'] == 'application/vnd.google-apps.folder':
                subfolder_files = self._get_all_drive_files(item['id'], item_path)
                files.update(subfolder_files)
        
        return files
    
    def _find_modified_files(self, local_dir):
        """Find files that have been modified since last sync"""
        if not self.sync_cache_path.exists():
            # No cache, consider all files as new
            return list(local_dir.rglob('*'))
        
        with open(self.sync_cache_path, 'r') as f:
            sync_cache = json.load(f)
        
        last_sync = datetime.fromisoformat(sync_cache['last_sync'])
        modified_files = []
        
        exclude_patterns = ['__pycache__', '*.pyc', '*.pyo', '.git', 'node_modules', '.env', '*.log']
        
        for file_path in local_dir.rglob('*'):
            if file_path.is_file():
                # Skip excluded files
                if any(fnmatch.fnmatch(file_path.name, pattern) for pattern in exclude_patterns):
                    continue
                
                # Check modification time
                file_mtime = datetime.fromtimestamp(file_path.stat().st_mtime)
                if file_mtime > last_sync:
                    modified_files.append(file_path)
        
        return modified_files
    
    def _find_drive_folder_for_path(self, relative_path):
        """Find Drive folder ID for given relative path"""
        if str(relative_path) == ".":
            return self.project_folder_id
        
        # For now, return project root folder ID
        # In a full implementation, this would traverse the Drive folder structure
        return self.project_folder_id
    
    def _update_sync_cache(self, local_dir):
        """Update sync cache with current timestamp"""
        sync_cache = {
            'last_sync': datetime.now().isoformat(),
            'local_dir': str(local_dir),
            'downloaded_files': {}  # Would contain file mapping in full implementation
        }
        
        with open(self.sync_cache_path, 'w') as f:
            json.dump(sync_cache, f, indent=2)

def main():
    """Main CLI interface"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Google Drive Project Sync Utility")
    parser.add_argument("action", choices=["download", "upload", "watch"], 
                       help="Sync action to perform")
    parser.add_argument("--dir", help="Local directory path")
    parser.add_argument("--interval", type=int, default=5, 
                       help="Watch interval in seconds (for watch mode)")
    
    args = parser.parse_args()
    
    try:
        syncer = DriveProjectSyncer()
        
        if args.action == "download":
            local_dir = syncer.download_project_from_drive(args.dir)
            print(f"SUCCESS: Project downloaded to {local_dir}")
            print("You can now edit the files locally and use 'upload' or 'watch' to sync changes")
            
        elif args.action == "upload":
            success = syncer.upload_changes_to_drive(args.dir)
            if success:
                print("SUCCESS: Changes uploaded to Google Drive")
            else:
                print("FAILED: Upload failed")
                
        elif args.action == "watch":
            syncer.watch_and_sync(args.dir, args.interval)
            
    except Exception as e:
        logger.error(f"Sync operation failed: {e}")
        print(f"FAILED: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()