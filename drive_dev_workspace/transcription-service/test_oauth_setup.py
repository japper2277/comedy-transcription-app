#!/usr/bin/env python3
"""
Test OAuth setup for Google Drive integration
This script will authenticate with your personal Google account and test Drive access
"""

import os
import sys
from pathlib import Path

# Add the backend API to the path
sys.path.append(str(Path(__file__).parent / "backend"))

from backend.api.google_drive_client import GoogleDriveClient
from backend.api.logging_config import get_logger

logger = get_logger("oauth_test")

def test_oauth_setup():
    """Test OAuth authentication and basic Drive operations"""
    
    project_root = Path(__file__).parent.parent
    credentials_path = project_root / "google-oauth-credentials.json"
    
    logger.info("Testing OAuth setup for Google Drive...")
    logger.info(f"Looking for credentials at: {credentials_path}")
    
    if not credentials_path.exists():
        logger.error("OAuth credentials file not found!")
        logger.error("Please follow the OAUTH_SETUP_GUIDE.md first")
        return False
    
    try:
        # Initialize Google Drive client with OAuth
        logger.info("Initializing Google Drive client with OAuth...")
        client = GoogleDriveClient(credentials_path=str(credentials_path), use_oauth=True)
        
        # Test 1: List files in Drive (to verify authentication works)
        logger.info("Test 1: Listing files in your Google Drive...")
        files = client.list_files(max_results=5)
        logger.info(f"Found {len(files)} files in your Drive")
        for file in files:
            logger.info(f"  - {file['name']} ({file.get('mimeType', 'unknown')})")
        
        # Test 2: Create a test folder
        logger.info("Test 2: Creating test folder...")
        test_folder_id = client.create_folder("OAuth_Test_Folder")
        logger.info(f"Created test folder with ID: {test_folder_id}")
        
        # Test 3: Upload a small test file
        logger.info("Test 3: Uploading test file...")
        test_content = b"Hello from OAuth test! This verifies your Google Drive integration is working."
        test_file_id = client.upload_file(
            file_content=test_content,
            filename="oauth_test.txt",
            mime_type="text/plain"
        )
        logger.info(f"Uploaded test file with ID: {test_file_id}")
        
        # Test 4: Download the file back
        logger.info("Test 4: Downloading test file...")
        downloaded_content = client.download_file(test_file_id)
        if downloaded_content == test_content:
            logger.info("SUCCESS: Downloaded content matches uploaded content!")
        else:
            logger.error("ERROR: Downloaded content doesn't match!")
            return False
        
        # Clean up test files
        logger.info("Cleaning up test files...")
        client.delete_file(test_file_id)
        client.delete_file(test_folder_id)  # This will also work for folders
        
        logger.info("=" * 60)
        logger.info("SUCCESS: OAuth setup is working perfectly!")
        logger.info("You can now upload your entire project to Google Drive")
        logger.info("=" * 60)
        
        return True
        
    except Exception as e:
        logger.error(f"OAuth setup test failed: {e}")
        logger.error("Please check the OAUTH_SETUP_GUIDE.md for troubleshooting")
        return False

def show_next_steps():
    """Show what to do after successful OAuth setup"""
    print("\nNEXT STEPS:")
    print("1. Your OAuth authentication is working!")
    print("2. Run the project migration:")
    print("   python migrate_to_drive.py")
    print("3. This will upload your entire project to Google Drive")
    print("4. Then use Google Drive Desktop to sync and edit locally")

if __name__ == "__main__":
    success = test_oauth_setup()
    
    if success:
        show_next_steps()
    else:
        print("FAILED: Please follow OAUTH_SETUP_GUIDE.md")
        sys.exit(1)