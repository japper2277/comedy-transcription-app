# AI Transcription Service

Cloud-native transcription service built with FastAPI, Celery, and React. Upload audio files and get high-accuracy transcriptions powered by OpenAI Whisper.

## Features

- 🎤 **High-Quality Transcription** - OpenAI Whisper API integration
- ⚡ **Async Processing** - Celery workers for background transcription
- 📊 **Usage Tracking** - 300-minute monthly limits with $5/month pricing
- 🔄 **Real-time Updates** - Job status polling and progress tracking
- 📱 **Modern UI** - Clean React dashboard for job management
- 🐳 **Docker Ready** - Full containerized development environment

## Quick Start

### Prerequisites
- Docker & Docker Compose
- OpenAI API key
- Google Cloud Storage bucket (optional for local dev)

### Setup

1. **Clone and navigate:**
```bash
cd transcription-service
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your API keys
```

3. **Start services:**
```bash
cd infrastructure
docker-compose up -d
```

4. **Access the application:**
- Frontend: http://localhost:3000
- API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Architecture

```
transcription-service/
├── backend/                 # FastAPI + Celery
│   ├── api/                 # REST API endpoints
│   ├── celery_worker/       # Background job processing
│   └── requirements.txt     # Python dependencies
├── frontend/                # React SPA
│   ├── src/components/      # UI components
│   ├── src/services/        # API integration
│   └── package.json         # Node dependencies
└── infrastructure/          # Docker setup
    └── docker-compose.yml   # Multi-service orchestration
```

## Business Model

- **Pricing:** $5/month for 300 minutes
- **Overage:** $0.02/minute
- **Cost Structure:** ~$1.80/user in API costs (40% gross margin)
- **Competitive:** Matches Otter.ai per-minute pricing

## Development

### Local Development (without Docker)

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Start Redis
redis-server

# Start API
uvicorn api.main:app --reload --port 8000

# Start Celery worker (separate terminal)
celery -A celery_worker.celery_app worker --loglevel=info
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### API Endpoints

- `POST /v1/transcripts` - Upload audio file
- `GET /v1/transcripts/{job_id}` - Get job status
- `GET /v1/jobs` - List all jobs
- `GET /health` - Health check

### Usage Flow

1. User uploads audio file via React frontend
2. FastAPI uploads file to GCS and queues Celery job
3. Celery worker downloads file, calls OpenAI Whisper API
4. Frontend polls for job completion and displays results
5. Usage tracking enforces 300-minute monthly limits

## Deployment

### Google Cloud Platform
```bash
# Deploy to Cloud Run
gcloud run deploy transcription-api --source backend/
gcloud run deploy transcription-frontend --source frontend/

# Set up Celery workers on GKE or higher-CPU Cloud Run instances
```

### Environment Variables
```bash
OPENAI_API_KEY=sk-...
GCS_BUCKET_NAME=your-bucket
GOOGLE_CLOUD_PROJECT=your-project
REDIS_URL=redis://localhost:6379/0
```

## Cost Analysis

**Per 300-minute user/month:**
- OpenAI Whisper API: $1.80
- Cloud compute: $0.60
- Storage: $0.03
- Infrastructure: $0.50
- **Total cost:** $2.93
- **Revenue:** $5.00
- **Gross margin:** $2.07 (41.4%)

## Monitoring

- Health checks at `/health`
- Celery task monitoring
- Job failure tracking and retry logic
- Usage analytics for billing

---

**Ready for production deployment with proven unit economics and scalable architecture.**