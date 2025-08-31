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
        
        # Google Cloud
        self.gcs_bucket_name = os.getenv("GCS_BUCKET_NAME", "")
        self.google_cloud_project = os.getenv("GOOGLE_CLOUD_PROJECT", "")
        
        # Redis
        self.redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
        
        # API
        self.api_host = os.getenv("API_HOST", "0.0.0.0")
        self.api_port = int(os.getenv("API_PORT", "8000"))

settings = Settings()