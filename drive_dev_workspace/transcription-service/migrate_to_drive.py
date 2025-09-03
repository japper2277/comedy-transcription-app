#!/usr/bin/env python3
"""
Migrate entire set_list_calendar project to Google Drive
This script uploads the complete project structure to Google Drive for cloud-based development
"""

import os
import sys
import json
from pathlib import Path

# Add the backend API to the path
sys.path.append(str(Path(__file__).parent / "backend"))

from backend.api.google_drive_client import GoogleDriveClient
from backend.api.logging_config import get_logger

logger = get_logger("migrate_to_drive")

def main():
    """Main migration function"""
    
    # Project root directory (parent of transcription-service)
    project_root = Path(__file__).parent.parent
    project_name = "set_list_calendar_cloud"
    
    logger.info(f"Starting migration of project: {project_root}")
    logger.info(f"Project will be uploaded as: {project_name}")
    
    try:
        # Initialize Google Drive client
        credentials_path = project_root / "google-oauth-credentials.json"
        if not credentials_path.exists():
            logger.error(f"OAuth credentials not found at: {credentials_path}")
            logger.error("Please ensure google-oauth-credentials.json is in the project root")
            return False
        
        # Initialize client with OAuth for personal Google account
        client = GoogleDriveClient(credentials_path=str(credentials_path), use_oauth=True)
        
        # Define exclusion patterns for upload
        exclude_patterns = [
            '__pycache__',
            '*.pyc', 
            '*.pyo',
            '.git',
            'node_modules',
            '.env',
            '*.log',
            'fresh_venv',
            'venv',
            '.vscode',
            '.idea',
            'dist',
            'build',
            '*.tmp',
            'temp_uploads',
            'logs'
        ]
        
        logger.info(f"Excluding patterns: {exclude_patterns}")
        
        # Upload entire project directory
        logger.info("Starting project upload to Google Drive...")
        uploaded_files = client.upload_directory(
            local_dir=str(project_root),
            exclude_patterns=exclude_patterns
        )
        
        # Save upload manifest
        manifest_path = project_root / "drive_upload_manifest.json"
        with open(manifest_path, 'w') as f:
            # Convert Path objects to strings for JSON serialization
            manifest = {str(k): v for k, v in uploaded_files.items()}
            json.dump(manifest, f, indent=2)
        
        logger.info(f"Upload completed! {len(uploaded_files)} items uploaded")
        logger.info(f"Upload manifest saved to: {manifest_path}")
        
        # Get the root folder ID for future reference
        root_folder_id = uploaded_files.get(str(project_root))
        if root_folder_id:
            logger.info(f"Project root folder ID: {root_folder_id}")
            
            # Save folder ID to .env for future use
            env_path = project_root / "transcription-service" / ".env"
            env_lines = []
            
            # Read existing .env if it exists
            if env_path.exists():
                with open(env_path, 'r') as f:
                    env_lines = f.readlines()
            
            # Add or update Google Drive folder ID
            found_folder_id = False
            for i, line in enumerate(env_lines):
                if line.startswith('GOOGLE_DRIVE_PROJECT_FOLDER_ID='):
                    env_lines[i] = f'GOOGLE_DRIVE_PROJECT_FOLDER_ID={root_folder_id}\n'
                    found_folder_id = True
                    break
            
            if not found_folder_id:
                env_lines.append(f'GOOGLE_DRIVE_PROJECT_FOLDER_ID={root_folder_id}\n')
            
            # Write updated .env
            with open(env_path, 'w') as f:
                f.writelines(env_lines)
            
            logger.info(f"Updated .env with project folder ID: {root_folder_id}")
        
        return True
        
    except Exception as e:
        logger.error(f"Migration failed: {e}")
        return False

def list_uploaded_project():
    """List files in the uploaded project for verification"""
    try:
        project_root = Path(__file__).parent.parent
        credentials_path = project_root / "google-oauth-credentials.json"
        
        client = GoogleDriveClient(credentials_path=str(credentials_path), use_oauth=True)
        
        # Read manifest to get project folder ID
        manifest_path = project_root / "drive_upload_manifest.json"
        if not manifest_path.exists():
            logger.error("No upload manifest found. Run migration first.")
            return
        
        with open(manifest_path, 'r') as f:
            manifest = json.load(f)
        
        project_folder_id = manifest.get(str(project_root))
        if not project_folder_id:
            logger.error("Project folder ID not found in manifest")
            return
        
        # List files in project folder
        logger.info("Files in uploaded project:")
        files = client.list_files(
            query=f"'{project_folder_id}' in parents",
            max_results=50
        )
        
        for file in files:
            logger.info(f"- {file['name']} (ID: {file['id']})")
        
    except Exception as e:
        logger.error(f"Failed to list uploaded project: {e}")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Migrate project to Google Drive")
    parser.add_argument("--list", action="store_true", help="List uploaded files")
    args = parser.parse_args()
    
    if args.list:
        list_uploaded_project()
    else:
        success = main()
        if success:
            print("SUCCESS: Project migrated to Google Drive!")
            print("Run with --list to see uploaded files")
        else:
            print("FAILED: Project migration failed")
            sys.exit(1)