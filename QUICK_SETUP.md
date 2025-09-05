# Quick GCP Setup for Your Project

## Your Project Details:
- **Project ID**: `comedy-feedback`
- **Bucket Name**: `comedy-transcription-bucket`

## Step 1: Create Service Account
1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts?project=comedy-feedback
2. Click "Create Service Account"
3. **Name**: `transcription-service`
4. **Role**: `Storage Admin`

## Step 2: Download Credentials  
1. Click on the new service account
2. Go to "Keys" tab
3. "Add Key" > "Create New Key" > **JSON**
4. Save as: `C:\Users\Jared\Documents\setlist_calendar\set_list_calendar - Copy\transcription-service\google-service-account.json`

## Step 3: Create GCS Bucket
1. Go to: https://console.cloud.google.com/storage/browser?project=comedy-feedback
2. Click "Create Bucket"
3. **Name**: `comedy-transcription-bucket`
4. **Location**: Choose closest to you
5. Leave other settings default

## Step 4: Test Setup
After completing steps 1-3, run:
```bash
cd transcription-service
python -c "from api.main import CELERY_AVAILABLE; print('CELERY_AVAILABLE:', CELERY_AVAILABLE)"
```

## Alternative: Quick Test Setup
If you want to test without full GCP setup, let me know and I can modify the code to work with local storage temporarily.