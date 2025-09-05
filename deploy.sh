#!/bin/bash

# Transcription Service Cloud Deployment Script
# This script deploys the transcription service to Google Cloud Platform

set -e

# Configuration
PROJECT_ID=${GOOGLE_CLOUD_PROJECT:-"transcription-service-prod"}
REGION="us-central1"
SERVICE_NAME="transcription-service"
GCS_BUCKET_NAME="${PROJECT_ID}-transcription-files"
REDIS_INSTANCE_NAME="transcription-redis"

echo "🚀 Deploying Transcription Service to Google Cloud"
echo "Project: $PROJECT_ID"
echo "Region: $REGION"

# Step 1: Create GCS bucket for file storage
echo "📦 Creating GCS bucket: $GCS_BUCKET_NAME"
gsutil mb -p $PROJECT_ID -c STANDARD -l $REGION gs://$GCS_BUCKET_NAME || echo "Bucket may already exist"
gsutil lifecycle set lifecycle.json gs://$GCS_BUCKET_NAME || echo "Lifecycle policy not set"

# Step 2: Create Redis instance for Celery
echo "📡 Creating Redis instance: $REDIS_INSTANCE_NAME"
gcloud redis instances create $REDIS_INSTANCE_NAME \
    --size=1 \
    --region=$REGION \
    --redis-version=redis_6_x \
    --project=$PROJECT_ID || echo "Redis instance may already exist"

# Get Redis IP
REDIS_IP=$(gcloud redis instances describe $REDIS_INSTANCE_NAME --region=$REGION --format="get(host)" --project=$PROJECT_ID)
REDIS_URL="redis://$REDIS_IP:6379/0"

# Load API keys from .env file
if [ -f .env ]; then
    export $(grep -E "^(OPENAI_API_KEY|GEMINI_API_KEY)=" .env | xargs)
fi

echo "Redis URL: $REDIS_URL"
echo "API Keys loaded from .env"

# Step 3: Build and deploy to Cloud Run
echo "🏗️ Building and deploying to Cloud Run"
gcloud run deploy $SERVICE_NAME \
    --source . \
    --use-cloud-build \
    --region=$REGION \
    --platform=managed \
    --allow-unauthenticated \
    --port=8000 \
    --memory=2Gi \
    --cpu=1 \
    --max-instances=10 \
    --min-instances=2 \
    --set-env-vars="ENVIRONMENT=production" \
    --set-env-vars="GCS_BUCKET_NAME=$GCS_BUCKET_NAME" \
    --set-env-vars="GOOGLE_CLOUD_PROJECT=$PROJECT_ID" \
    --set-env-vars="REDIS_URL=$REDIS_URL" \
    --set-env-vars="OPENAI_API_KEY=$OPENAI_API_KEY" \
    --set-env-vars="GEMINI_API_KEY=$GEMINI_API_KEY" \
    --project=$PROJECT_ID

# Get service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="get(status.url)" --project=$PROJECT_ID)

echo "✅ Deployment complete!"
echo "🌐 Service URL: $SERVICE_URL"
echo "📁 GCS Bucket: gs://$GCS_BUCKET_NAME"
echo "📡 Redis: $REDIS_URL"

# Test the deployment
echo "🧪 Testing deployment..."
curl -s "$SERVICE_URL/health" | grep -q "healthy" && echo "✅ Health check passed" || echo "❌ Health check failed"

echo ""
echo "🎯 Next steps:"
echo "1. Deploy Celery workers: ./deploy-worker.sh"
echo "2. Run performance test: python performance_test.py $SERVICE_URL"
echo "3. Configure domain and SSL certificate"
echo "4. Set up monitoring and logging"