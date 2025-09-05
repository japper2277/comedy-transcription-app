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

# Load API keys from .env file
if [ -f .env ]; then
    export $(grep -E "^(OPENAI_API_KEY|GEMINI_API_KEY)=" .env | xargs)
fi

echo "🔄 Deploying Celery Worker to Cloud Run"
echo "Worker Service: $WORKER_SERVICE_NAME"
echo "Redis URL: $REDIS_URL"

# Build and deploy worker
gcloud run deploy $WORKER_SERVICE_NAME \
    --source . \
    --dockerfile worker.Dockerfile \
    --use-cloud-build \
    --region=$REGION \
    --platform=managed \
    --no-allow-unauthenticated \
    --memory=2Gi \
    --cpu=2 \
    --max-instances=5 \
    --min-instances=2 \
    --set-env-vars="ENVIRONMENT=production" \
    --set-env-vars="GOOGLE_CLOUD_PROJECT=$PROJECT_ID" \
    --set-env-vars="REDIS_URL=$REDIS_URL" \
    --set-env-vars="GCS_BUCKET_NAME=${PROJECT_ID}-transcription-files" \
    --set-env-vars="OPENAI_API_KEY=$OPENAI_API_KEY" \
    --set-env-vars="GEMINI_API_KEY=$GEMINI_API_KEY" \
    --project=$PROJECT_ID

echo "✅ Celery worker deployed successfully!"
echo "🔧 API keys automatically deployed from .env file"