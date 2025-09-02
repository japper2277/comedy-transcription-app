#!/bin/bash

# Deploy Celery Worker to Cloud Run
set -e

PROJECT_ID=${GOOGLE_CLOUD_PROJECT:-"transcription-service-prod"}
REGION="us-central1"
WORKER_SERVICE_NAME="transcription-worker"

# Get Redis URL from existing instance
REDIS_INSTANCE_NAME="transcription-redis"
REDIS_IP=$(gcloud redis instances describe $REDIS_INSTANCE_NAME --region=$REGION --format="get(host)" --project=$PROJECT_ID)
REDIS_URL="redis://$REDIS_IP:6379/0"

echo "🔄 Deploying Celery Worker to Cloud Run"
echo "Worker Service: $WORKER_SERVICE_NAME"
echo "Redis URL: $REDIS_URL"

# Build and deploy worker
gcloud run deploy $WORKER_SERVICE_NAME \
    --source . \
    --dockerfile worker.Dockerfile \
    --region=$REGION \
    --platform=managed \
    --no-allow-unauthenticated \
    --memory=2Gi \
    --cpu=2 \
    --max-instances=5 \
    --min-instances=1 \
    --set-env-vars="ENVIRONMENT=production" \
    --set-env-vars="GOOGLE_CLOUD_PROJECT=$PROJECT_ID" \
    --set-env-vars="REDIS_URL=$REDIS_URL" \
    --set-env-vars="GCS_BUCKET_NAME=${PROJECT_ID}-transcription-files" \
    --project=$PROJECT_ID

echo "✅ Celery worker deployed successfully!"
echo "🔧 Remember to set API keys:"
echo "   gcloud run services update $WORKER_SERVICE_NAME --region=$REGION --set-env-vars=\"OPENAI_API_KEY=your-key,GEMINI_API_KEY=your-key\""