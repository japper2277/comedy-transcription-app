import os
import io
import pickle
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload, MediaIoBaseDownload
from google.auth.transport.requests import Request
from google.oauth2 import service_account
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from .logging_config import get_logger

logger = get_logger("google_drive")

class GoogleDriveClient:
    def __init__(self, credentials_path=None, use_oauth=None):
        """
        Initialize Google Drive client with OAuth or service account credentials
        
        Args:
            credentials_path: Path to credentials JSON file
            use_oauth: If True, use OAuth flow; if False, use service account; if None, auto-detect
        """
        self.credentials_path = credentials_path or os.getenv("GOOGLE_DRIVE_CREDENTIALS_PATH", "google-drive-credentials.json")
        self.folder_id = os.getenv("GOOGLE_DRIVE_FOLDER_ID", None)  # Optional: specific folder
        self.token_path = self.credentials_path.replace('.json', '_token.pickle')
        
        # Auto-detect OAuth vs Service Account if not specified
        if use_oauth is None:
            use_oauth = os.getenv("GOOGLE_DRIVE_USE_OAUTH", "true").lower() == "true"
        
        self.use_oauth = use_oauth
        self.scopes = ['https://www.googleapis.com/auth/drive']
        
        try:
            if self.use_oauth:
                credentials = self._get_oauth_credentials()
            else:
                credentials = self._get_service_account_credentials()
            
            self.service = build('drive', 'v3', credentials=credentials)
            auth_type = "OAuth" if self.use_oauth else "Service Account"
            logger.info(f"Google Drive client initialized successfully ({auth_type})")
            
        except Exception as e:
            logger.error(f"Failed to initialize Google Drive client: {e}")
            raise
    
    def _get_oauth_credentials(self):
        """Get OAuth credentials for personal Google account"""
        creds = None
        
        # Load existing token
        if os.path.exists(self.token_path):
            with open(self.token_path, 'rb') as token:
                creds = pickle.load(token)
        
        # If there are no (valid) credentials available, let the user log in
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                if not os.path.exists(self.credentials_path):
                    raise FileNotFoundError(f"OAuth credentials file not found: {self.credentials_path}")
                
                flow = InstalledAppFlow.from_client_secrets_file(
                    self.credentials_path, self.scopes)
                creds = flow.run_local_server(port=0)
                
            # Save the credentials for the next run
            with open(self.token_path, 'wb') as token:
                pickle.dump(creds, token)
        
        return creds
    
    def _get_service_account_credentials(self):
        """Get service account credentials (fallback)"""
        if not os.path.exists(self.credentials_path):
            raise FileNotFoundError(f"Service account credentials not found: {self.credentials_path}")
        
        return service_account.Credentials.from_service_account_file(
            self.credentials_path,
            scopes=self.scopes
        )
    
    def upload_file(self, file_content: bytes, filename: str, mime_type: str = 'application/octet-stream') -> str:
        """
        Upload file to Google Drive
        
        Args:
            file_content: File content as bytes
            filename: Name for the file in Google Drive
            mime_type: MIME type of the file
            
        Returns:
            File ID of uploaded file
        """
        try:
            file_metadata = {
                'name': filename
            }
            
            # If folder_id is specified, upload to that folder
            if self.folder_id:
                file_metadata['parents'] = [self.folder_id]
            
            # Create media upload object from bytes
            media = MediaIoBaseUpload(
                io.BytesIO(file_content),
                mimetype=mime_type,
                resumable=True
            )
            
            # Upload file
            file = self.service.files().create(
                body=file_metadata,
                media_body=media,
                fields='id'
            ).execute()
            
            file_id = file.get('id')
            logger.info(f"File uploaded to Google Drive: {filename} (ID: {file_id})")
            return file_id
            
        except Exception as e:
            logger.error(f"Failed to upload file to Google Drive: {e}")
            raise
    
    def download_file(self, file_id: str) -> bytes:
        """
        Download file from Google Drive
        
        Args:
            file_id: Google Drive file ID
            
        Returns:
            File content as bytes
        """
        try:
            request = self.service.files().get_media(fileId=file_id)
            file_buffer = io.BytesIO()
            downloader = MediaIoBaseDownload(file_buffer, request)
            
            done = False
            while done is False:
                status, done = downloader.next_chunk()
            
            file_content = file_buffer.getvalue()
            logger.info(f"File downloaded from Google Drive (ID: {file_id}, Size: {len(file_content)} bytes)")
            return file_content
            
        except Exception as e:
            logger.error(f"Failed to download file from Google Drive: {e}")
            raise
    
    def delete_file(self, file_id: str) -> bool:
        """
        Delete file from Google Drive
        
        Args:
            file_id: Google Drive file ID
            
        Returns:
            True if successful
        """
        try:
            self.service.files().delete(fileId=file_id).execute()
            logger.info(f"File deleted from Google Drive (ID: {file_id})")
            return True
            
        except Exception as e:
            logger.error(f"Failed to delete file from Google Drive: {e}")
            return False
    
    def get_file_info(self, file_id: str) -> dict:
        """
        Get file metadata from Google Drive
        
        Args:
            file_id: Google Drive file ID
            
        Returns:
            File metadata dictionary
        """
        try:
            file_info = self.service.files().get(
                fileId=file_id,
                fields='id,name,size,createdTime,modifiedTime,mimeType'
            ).execute()
            
            logger.info(f"Retrieved file info from Google Drive: {file_info.get('name')}")
            return file_info
            
        except Exception as e:
            logger.error(f"Failed to get file info from Google Drive: {e}")
            raise
    
    def list_files(self, query: str = None, max_results: int = 10) -> list:
        """
        List files in Google Drive
        
        Args:
            query: Search query (optional)
            max_results: Maximum number of results
            
        Returns:
            List of file metadata dictionaries
        """
        try:
            query_params = {
                'pageSize': max_results,
                'fields': 'files(id,name,size,createdTime,mimeType)'
            }
            
            if query:
                query_params['q'] = query
            
            if self.folder_id:
                folder_query = f"'{self.folder_id}' in parents"
                if query:
                    query_params['q'] = f"{query} and {folder_query}"
                else:
                    query_params['q'] = folder_query
            
            results = self.service.files().list(**query_params).execute()
            files = results.get('files', [])
            
            logger.info(f"Listed {len(files)} files from Google Drive")
            return files
            
        except Exception as e:
            logger.error(f"Failed to list files from Google Drive: {e}")
            raise
    
    def create_folder(self, folder_name: str, parent_folder_id: str = None) -> str:
        """
        Create a folder in Google Drive
        
        Args:
            folder_name: Name of the folder
            parent_folder_id: Parent folder ID (optional)
            
        Returns:
            Folder ID
        """
        try:
            file_metadata = {
                'name': folder_name,
                'mimeType': 'application/vnd.google-apps.folder'
            }
            
            if parent_folder_id:
                file_metadata['parents'] = [parent_folder_id]
            
            folder = self.service.files().create(
                body=file_metadata,
                fields='id'
            ).execute()
            
            folder_id = folder.get('id')
            logger.info(f"Created folder in Google Drive: {folder_name} (ID: {folder_id})")
            return folder_id
            
        except Exception as e:
            logger.error(f"Failed to create folder in Google Drive: {e}")
            raise
    
    def upload_local_file(self, local_path: str, drive_filename: str = None, parent_folder_id: str = None) -> str:
        """
        Upload a local file to Google Drive
        
        Args:
            local_path: Path to local file
            drive_filename: Name for file in Drive (defaults to local filename)
            parent_folder_id: Parent folder ID (optional)
            
        Returns:
            File ID of uploaded file
        """
        try:
            if not os.path.exists(local_path):
                raise FileNotFoundError(f"Local file not found: {local_path}")
            
            filename = drive_filename or os.path.basename(local_path)
            
            with open(local_path, 'rb') as f:
                file_content = f.read()
            
            # Determine MIME type based on file extension
            mime_type = self._get_mime_type(local_path)
            
            file_metadata = {
                'name': filename
            }
            
            # Use parent_folder_id if provided, otherwise use self.folder_id
            if parent_folder_id:
                file_metadata['parents'] = [parent_folder_id]
            elif self.folder_id:
                file_metadata['parents'] = [self.folder_id]
            
            # Create media upload object
            media = MediaIoBaseUpload(
                io.BytesIO(file_content),
                mimetype=mime_type,
                resumable=True
            )
            
            # Upload file
            file = self.service.files().create(
                body=file_metadata,
                media_body=media,
                fields='id'
            ).execute()
            
            file_id = file.get('id')
            logger.info(f"Local file uploaded to Google Drive: {local_path} -> {filename} (ID: {file_id})")
            return file_id
            
        except Exception as e:
            logger.error(f"Failed to upload local file to Google Drive: {e}")
            raise
    
    def upload_directory(self, local_dir: str, drive_parent_id: str = None, exclude_patterns: list = None) -> dict:
        """
        Upload entire directory structure to Google Drive
        
        Args:
            local_dir: Local directory path
            drive_parent_id: Parent folder ID in Drive (optional)
            exclude_patterns: List of patterns to exclude (e.g., ['__pycache__', '*.pyc'])
            
        Returns:
            Dictionary mapping local paths to Drive file IDs
        """
        import fnmatch
        
        exclude_patterns = exclude_patterns or ['__pycache__', '*.pyc', '*.pyo', '.git', 'node_modules', '.env', '*.log']
        uploaded_files = {}
        
        try:
            # Create root folder in Drive
            root_folder_name = os.path.basename(local_dir.rstrip('/\\'))
            root_folder_id = self.create_folder(root_folder_name, drive_parent_id)
            uploaded_files[local_dir] = root_folder_id
            
            # Walk through directory structure
            for root, dirs, files in os.walk(local_dir):
                # Filter out excluded directories
                dirs[:] = [d for d in dirs if not any(fnmatch.fnmatch(d, pattern) for pattern in exclude_patterns)]
                
                # Calculate relative path from local_dir
                rel_path = os.path.relpath(root, local_dir)
                
                if rel_path == '.':
                    current_folder_id = root_folder_id
                else:
                    # Create nested folder structure
                    current_folder_id = self._create_nested_folders(rel_path, root_folder_id)
                    uploaded_files[root] = current_folder_id
                
                # Upload files in current directory
                for file in files:
                    # Skip excluded files
                    if any(fnmatch.fnmatch(file, pattern) for pattern in exclude_patterns):
                        logger.info(f"Skipping excluded file: {file}")
                        continue
                    
                    local_file_path = os.path.join(root, file)
                    try:
                        file_id = self.upload_local_file(local_file_path, file, current_folder_id)
                        uploaded_files[local_file_path] = file_id
                    except Exception as e:
                        logger.error(f"Failed to upload file {local_file_path}: {e}")
                        continue
            
            logger.info(f"Directory upload completed: {len(uploaded_files)} items uploaded")
            return uploaded_files
            
        except Exception as e:
            logger.error(f"Failed to upload directory to Google Drive: {e}")
            raise
    
    def _create_nested_folders(self, path: str, parent_id: str) -> str:
        """Create nested folder structure and return the deepest folder ID"""
        parts = path.split(os.sep)
        current_parent_id = parent_id
        
        for part in parts:
            # Check if folder already exists
            existing_folders = self.list_files(
                query=f"name='{part}' and mimeType='application/vnd.google-apps.folder' and '{current_parent_id}' in parents"
            )
            
            if existing_folders:
                current_parent_id = existing_folders[0]['id']
            else:
                current_parent_id = self.create_folder(part, current_parent_id)
        
        return current_parent_id
    
    def _get_mime_type(self, file_path: str) -> str:
        """Get MIME type based on file extension"""
        import mimetypes
        mime_type, _ = mimetypes.guess_type(file_path)
        return mime_type or 'application/octet-stream'