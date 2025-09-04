# Environment Setup Guide

## The Issue
You're getting "Gemini analysis failed: Not Found" because the Gemini API key is not configured.

## Solution

### 1. Create a .env file
Create a file named `.env` in the `transcription-service` directory with the following content:

```env
# AI API Keys (REQUIRED - Get these from OpenAI and Google AI Studio)
OPENAI_API_KEY=your-openai-api-key-here
GEMINI_API_KEY=your-gemini-api-key-here

# Google Cloud Configuration (Optional for local development)
GOOGLE_CLOUD_PROJECT=your-project-id
GCS_BUCKET_NAME=your-bucket-name

# Redis Configuration (Optional for local development)
REDIS_URL=redis://localhost:6379/0

# API Configuration
ENVIRONMENT=development
API_HOST=0.0.0.0
API_PORT=8000

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 2. Get API Keys

#### OpenAI API Key:
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Replace `your-openai-api-key-here` with your actual key

#### Gemini API Key:
1. Go to https://aistudio.google.com/app/apikey
2. Create a new API key
3. Replace `your-gemini-api-key-here` with your actual key

### 3. Install Dependencies
The `google-generativeai` package has been added to requirements.txt. Install it:

```bash
cd transcription-service/backend
pip install -r requirements.txt
```

### 4. Restart the Service
After creating the .env file with valid API keys, restart your transcription service.

## Testing
Once configured, the Gemini analysis should work properly for models like:
- `whisper-plus-gemini`
- `gemini-analysis-only`

## What Was Fixed
1. **Missing API Key**: The Gemini API key was not configured, causing "Not Found" errors
2. **Missing Dependency**: Added `google-generativeai==0.3.2` to requirements.txt
3. **Missing Endpoint**: Added the `/v1/gemini-analysis` endpoint that the frontend was trying to call

## Next Steps
1. Create the `.env` file with your actual API keys
2. Install the updated dependencies: `pip install -r requirements.txt`
3. Restart the backend service
4. The Gemini analysis should now work properly!
