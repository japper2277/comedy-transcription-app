# Cloud-Native Transcription Service Deployment Guide

This guide provides step-by-step instructions for deploying the transcription service to Google Cloud Platform with proper scalable architecture.

## 🏗️ Architecture Overview

**Production Architecture:**
- **FastAPI Backend**: Cloud Run service for API endpoints
- **Celery Workers**: Cloud Run service for background processing
- **Redis**: Google Cloud Memorystore for job queue
- **File Storage**: Google Cloud Storage bucket
- **Frontend**: Vercel/Netlify for React application

## 🚀 Quick Deployment

### Prerequisites
1. Google Cloud SDK installed and authenticated
2. Google Cloud project with billing enabled
3. OpenAI API key
4. Google Gemini API key

### 1. Deploy Backend Infrastructure

```bash
# Clone and navigate to the project
cd transcription-service

# Set your project ID
export GOOGLE_CLOUD_PROJECT=your-project-id

# Deploy all infrastructure and backend
chmod +x deploy.sh
./deploy.sh
```

This script will:
- ✅ Create GCS bucket for file storage
- ✅ Create Redis instance for Celery job queue
- ✅ Deploy FastAPI service to Cloud Run
- ✅ Configure auto-scaling and resource limits

### 2. Deploy Celery Workers

```bash
# Deploy background processing workers
chmod +x deploy-worker.sh
./deploy-worker.sh
```

### 3. Configure API Keys

```bash
# Set production API keys
gcloud run services update transcription-service \
  --region=us-central1 \
  --set-env-vars="OPENAI_API_KEY=sk-your-key,GEMINI_API_KEY=your-key"

gcloud run services update transcription-worker \
  --region=us-central1 \
  --set-env-vars="OPENAI_API_KEY=sk-your-key,GEMINI_API_KEY=your-key"
```

### 4. Deploy Frontend

#### Option A: Vercel (Recommended)
```bash
cd frontend
npx vercel --prod
# Set VITE_API_BASE_URL to your Cloud Run service URL
```

#### Option B: Netlify
```bash
cd frontend
npm run build
# Upload dist/ folder to Netlify
# Configure VITE_API_BASE_URL environment variable
```

## 🎯 Production URLs

After deployment, you'll have:

- **Backend API**: `https://transcription-service-HASH-uc.a.run.app`
- **Workers**: `https://transcription-worker-HASH-uc.a.run.app` (internal)
- **Frontend**: `https://transcription-frontend.vercel.app`

## ✅ Verification

Test your deployment:

```bash
# Health check
curl https://transcription-service-HASH-uc.a.run.app/health

# Upload test (replace with your actual URLs)
curl -X POST https://transcription-service-HASH-uc.a.run.app/v1/transcripts \
  -F "file=@test-audio.mp3" \
  -F "model=openai-whisper"
```

## 🔧 Production Features

**✅ Implemented:**
- Cloud-native FastAPI service on Cloud Run
- Proper Celery workers with Redis queue
- GCS file storage (no local storage)
- Auto-scaling and resource limits
- Production logging and error handling
- Secure CORS configuration
- Environment-based configuration

**📊 Scalability:**
- **Backend**: Auto-scales 0-10 instances
- **Workers**: Auto-scales 1-5 instances  
- **Redis**: 1GB memory, can be upgraded
- **Storage**: Unlimited GCS capacity
- **Processing**: Parallel job processing

**💰 Cost Optimization:**
- Auto-scaling to zero when idle
- 7-day file lifecycle policy
- Optimized resource allocation
- Pay-per-use pricing model

## 🛠️ Manual Steps (Alternative)

If you prefer manual deployment:

### 1. Create GCS Bucket
```bash
gsutil mb -p $GOOGLE_CLOUD_PROJECT gs://your-bucket-name
```

### 2. Create Redis Instance
```bash
gcloud redis instances create transcription-redis \
  --size=1 --region=us-central1
```

### 3. Deploy Backend
```bash
gcloud run deploy transcription-service --source .
```

### 4. Deploy Workers
```bash
gcloud run deploy transcription-worker \
  --dockerfile worker.Dockerfile
```

## 🚨 Troubleshooting

### Common Issues

**"Redis connection failed"**
- Verify Redis instance is created and running
- Check REDIS_URL environment variable format

**"GCS authentication failed"**
- Ensure Cloud Run service has proper IAM roles
- Verify GCS_BUCKET_NAME is correct

**"CORS policy error"**
- Update CORS_ORIGINS environment variable
- Include your frontend domain

### Debug Endpoints

- Health: `GET /health`
- Configuration: `GET /debug/config`
- CORS: `GET /debug/cors`

## 📊 Monitoring

Production monitoring via Google Cloud:
- **Logs**: Cloud Run → Logs tab
- **Metrics**: Cloud Run → Metrics tab  
- **Errors**: Error Reporting service
- **Uptime**: Cloud Monitoring

## 🔐 Security

Production security features:
- HTTPS only
- Secure CORS policies
- No sensitive data in logs
- Proper IAM roles
- File type validation
- Request size limits

---

**🎭 Built for Comedy Transcription at Scale**

This cloud-native architecture delivers:
- ⚡ Fast upload and processing
- 📈 Scales with demand
- 💰 Cost-effective pay-per-use
- 🔒 Enterprise security
- 🌍 Global CDN distribution