import os
from pathlib import Path

def load_env_file():
    """Load environment variables from .env file"""
    env_path = Path(__file__).parent.parent.parent / ".env"
    if env_path.exists():
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key.strip()] = value.strip()

# Load .env file
load_env_file()

class Settings:
    def __init__(self):
        # OpenAI
        self.openai_api_key = os.getenv("OPENAI_API_KEY", "")
        
        # Gemini
        self.gemini_api_key = os.getenv("GEMINI_API_KEY", "")
        
        # Google Cloud
        self.gcs_bucket_name = os.getenv("GCS_BUCKET_NAME", "")
        self.google_cloud_project = os.getenv("GOOGLE_CLOUD_PROJECT", "")
        
        # Google Drive
        self.google_drive_credentials_path = os.getenv("GOOGLE_DRIVE_CREDENTIALS_PATH", "google-drive-credentials.json")
        self.google_drive_folder_id = os.getenv("GOOGLE_DRIVE_FOLDER_ID", "")
        
        # Redis
        self.redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
        
        # API
        self.api_host = os.getenv("API_HOST", "0.0.0.0")
        self.api_port = int(os.getenv("API_PORT", "8000"))
        
        # CORS Configuration
        self.environment = os.getenv("ENVIRONMENT", "development")
        self.cors_origins = self._get_cors_origins()
        
        # Validate API keys on startup
        self._validate_api_keys()
    
    def _get_cors_origins(self):
        """Get CORS origins based on environment"""
        cors_origins_env = os.getenv("CORS_ORIGINS", "")
        
        if cors_origins_env:
            # Use environment-specified origins
            return cors_origins_env.split(",")
        
        if self.environment == "production":
            # Production: Allow Cloud Run and frontend domains
            return [
                "https://transcription-frontend-*.vercel.app",
                "https://transcription-frontend-*.netlify.app",
                "https://transcription-service-*.run.app",
                "*"  # Temporarily allow all origins for initial deployment
            ]
        else:
            # Development: Allow all common development ports
            return [
                "http://localhost:3000",
                "http://localhost:3001", 
                "http://localhost:3002",
                "http://localhost:3003",
                "http://localhost:3004",
                "http://localhost:3005",
                "http://localhost:5173",
                "http://127.0.0.1:3000",
                "http://127.0.0.1:3001",
                "http://127.0.0.1:3002",
                "http://127.0.0.1:3003",
                "http://127.0.0.1:3004",
                "http://127.0.0.1:3005",
                "http://127.0.0.1:5173"
            ]
    
    def _validate_api_keys(self):
        """Validate API keys on startup and provide helpful error messages"""
        print("Validating API keys...")
        
        # Check OpenAI API key
        if not self.openai_api_key:
            print("WARNING: OPENAI_API_KEY not set - will use mock mode")
        elif self.openai_api_key == "test":
            print("INFO: Using mock mode for OpenAI (OPENAI_API_KEY=test)")
        elif not self.openai_api_key.startswith("sk-"):
            print("WARNING: OPENAI_API_KEY doesn't look like a valid key (should start with 'sk-')")
        else:
            print("OpenAI API key configured")
        
        # Check Gemini API key
        if not self.gemini_api_key:
            print("ERROR: GEMINI_API_KEY not set - Gemini analysis will fail")
        elif len(self.gemini_api_key) < 20:
            print("WARNING: GEMINI_API_KEY seems too short - may be invalid")
        else:
            print("Gemini API key configured")
        
        # Check Google Cloud settings
        if self.gcs_bucket_name:
            print("Google Cloud Storage bucket configured")
        else:
            print("INFO: No GCS bucket configured - using local storage")
        
        print("API key validation complete")

settings = Settings()