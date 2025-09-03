# AI Comedy Transcription Service

A cloud-native transcription service that combines OpenAI Whisper for high-quality audio transcription with Gemini Flash 2.0 for intelligent comedy performance analysis.

## 🎭 What It Does

- **Audio Transcription**: Converts comedy performances to text using OpenAI Whisper
- **Comedy Analysis**: Analyzes transcripts with Gemini Flash 2.0 to identify jokes, timing, and performance insights
- **Set List Comparison**: Compares performed material against planned setlist
- **Professional Insights**: Provides actionable feedback for comedy improvement

## 🚀 Features

### Three AI Models Available:
1. **OpenAI Whisper Only** - High-quality transcription only
2. **Whisper + Gemini Flash 2.0** - Transcription + comedy analysis (recommended)
3. **Gemini Analysis Only** - For analyzing existing transcripts

### Supported Audio Formats:
- MP3, WAV, M4A, FLAC, MP4, WebM
- Up to 25MB file size limit
- Optimized for comedy performance recordings

### Comedy Analysis Features:
- Joke identification and categorization
- Set list comparison and tracking  
- New material detection
- Audience response analysis
- Performance timing insights
- Actionable improvement suggestions

## 📁 Project Structure

```
transcription-service/
├── backend/                 # FastAPI backend service
│   ├── api/
│   │   ├── main.py         # Main API endpoints
│   │   ├── models.py       # Pydantic models
│   │   └── config.py       # Configuration settings
│   ├── celery_worker/
│   │   ├── whisper_client.py    # OpenAI Whisper integration
│   │   ├── gemini_client.py     # Gemini Flash 2.0 integration
│   │   └── tasks.py             # Celery background tasks
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service calls
│   │   └── styles/         # CSS styling
│   └── package.json        # Node.js dependencies
└── .env                    # Environment variables
```

## ⚙️ Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- OpenAI API key
- Google Gemini API key

### 1. Clone and Setup Environment

```bash
cd transcription-service
cp .env.example .env
```

### 2. Configure API Keys

Edit `.env` file:

**For Production (Real AI Transcription):**
```bash
# Required API Keys
OPENAI_API_KEY=sk-your-openai-key-here
GEMINI_API_KEY=your-gemini-key-here

# Optional (for production)
GCS_BUCKET_NAME=your-bucket-name
GOOGLE_CLOUD_PROJECT=your-project-id
```

**For Development/Testing (Mock Mode):**
```bash
# Mock Mode - No API costs, returns test transcription
OPENAI_API_KEY=test
GEMINI_API_KEY=your-gemini-key-here

# Optional (for production)
GCS_BUCKET_NAME=your-bucket-name
GOOGLE_CLOUD_PROJECT=your-project-id
```

> **💡 Mock Mode**: Setting `OPENAI_API_KEY=test` enables mock transcription mode, which returns realistic test responses without using real AI APIs. Perfect for development, testing, and demos!

### 3. Start Services (Recommended Method)

Use the provided startup scripts to avoid common issues:

```bash
# Start both services cleanly (Windows)
scripts\start-all.bat

# Or start individually
scripts\start-backend.bat
scripts\start-frontend.bat

# Stop all services when done
scripts\stop-all.bat
```

**Manual Method (if needed):**
```bash
# Backend
cd backend
pip install -r requirements.txt
python -m uvicorn api.main:app --reload --host 0.0.0.0 --port 8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Backend will be available at: `http://localhost:8000`
Frontend will be available at: `http://localhost:3000` (or next available port)

## 🎯 How to Use

### 1. Open the Web Interface
Navigate to `http://localhost:3000`

### 2. Choose Your AI Model
- **OpenAI Whisper**: For transcription only
- **Whisper + Gemini Flash 2.0**: For transcription + comedy analysis (recommended)

### 3. Optional: Add Comedy Context
When using Gemini analysis:
- **Set List**: Paste your planned jokes for comparison
- **Custom Prompt**: Add specific analysis instructions

### 4. Upload Audio File
- Drag & drop or click to select your comedy recording
- Supported: MP3, WAV, M4A, FLAC, MP4, WebM (max 25MB)

### 5. View Results
- **Transcription**: Full text of your performance
- **Comedy Analysis**: AI-powered insights including:
  - Matched jokes from your setlist
  - New material identification
  - Performance strengths and areas for improvement
  - Timing and audience response analysis

## 📊 API Endpoints

### Upload Audio File
```http
POST /v1/transcripts
Content-Type: multipart/form-data

Parameters:
- file: Audio file (required)
- model: "openai-whisper" | "whisper-plus-gemini" (optional)
- set_list: Planned setlist text (optional)
- custom_prompt: Analysis instructions (optional)
```

### Check Job Status
```http
GET /v1/transcripts/{job_id}
```

### List All Jobs
```http
GET /v1/jobs
```

### Health Check
```http
GET /health
```

## 🧪 Mock Mode (Development & Testing)

The transcription service includes a built-in **Mock Mode** for development and testing without API costs.

### **Enable Mock Mode**
Set `OPENAI_API_KEY=test` in your `.env` file:
```bash
OPENAI_API_KEY=test
```

### **Mock Mode Features**
✅ **Complete End-to-End Testing** - Full upload → processing → results flow  
✅ **No API Costs** - No charges for development and testing  
✅ **Realistic Responses** - Returns sample transcription text  
✅ **Same User Experience** - Frontend works identically to production  
✅ **Perfect for Demos** - Show complete functionality to clients  

### **Mock Response Example**
```json
{
  "job_id": "12345-abcd-6789",
  "status": "completed",
  "result": "[MOCK TRANSCRIPTION] This is a test transcription of the uploaded audio file 'comedy-set.mp3'. In production, this would contain the actual Whisper API transcription results.",
  "error": null
}
```

### **When to Use Mock Mode**
- 🛠️ **Local Development** - Test features without API dependency
- 🧪 **Integration Testing** - Verify frontend/backend communication
- 📱 **User Demos** - Show complete app functionality
- 💰 **Cost Control** - Develop without OpenAI charges

### **Switch to Production**
Replace `OPENAI_API_KEY=test` with your real OpenAI API key for live transcription.

## 💰 Business Model

**Profitable SaaS Model**: $5/month for 300 minutes of transcription
- **Cost**: $0.006/minute (OpenAI Whisper)
- **Revenue**: $5/month (300 minutes)
- **Profit**: $3.20/month per user (64% margin)

### Target Market:
- Stand-up comedians
- Comedy clubs
- Comedy writers
- Podcast hosts
- Performance coaches

## 🔧 Development

### Local Development
- Backend auto-reloads on code changes
- Frontend hot-reloads with Vite
- In-memory job storage for testing
- Local file storage (no cloud required)

### Production Deployment
- Deploy backend to Google Cloud Run
- Deploy frontend to Vercel/Netlify
- Use Redis for job storage
- Use Google Cloud Storage for files

### Adding Features
1. **Backend**: Add endpoints in `api/main.py`
2. **Frontend**: Add components in `src/components/`
3. **AI Integration**: Extend clients in `celery_worker/`

## 🚨 Troubleshooting

### Quick Fix for Most Issues:
```bash
# Stop all services and restart cleanly
scripts\stop-all.bat
scripts\start-all.bat
```

### Debug Endpoints:
When troubleshooting, check these endpoints:
- Health check: `http://localhost:8000/health`
- CORS config: `http://localhost:8000/debug/cors`
- Process info: `http://localhost:8000/debug/processes`
- Configuration: `http://localhost:8000/debug/config`

### Common Issues:

**"API Status: Offline" in frontend**
- Multiple backend processes running (use scripts to restart)
- CORS misconfiguration (check debug/cors endpoint)
- Frontend on unexpected port (check console output)

**"CORS policy" errors in browser**
- Use startup scripts to ensure clean process management
- Check frontend port in console output
- Verify CORS configuration includes your port

**"File upload fails"**
- Keep files under 25MB for reliability
- Use supported formats: MP3, WAV, M4A, FLAC, MP4, WebM
- Try shorter audio files (under 5 minutes)

**"Unicode/Emoji errors"**
- Never use emojis in backend Python code
- Use ASCII-only characters for console output

### Full Troubleshooting Guide:
See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed solutions.

## 📝 License

This project is part of the comedy transcription app ecosystem.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Add your improvements
4. Test with real audio files
5. Submit pull request

---

**Built with**: FastAPI, React, OpenAI Whisper, Gemini Flash 2.0, and ❤️ for comedy