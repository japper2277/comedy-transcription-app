# Google Cloud Platform Setup Instructions

## Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your **Project ID** (not the name, but the ID)

## Step 2: Enable Required APIs
1. In Google Cloud Console, go to "APIs & Services" > "Library"
2. Enable these APIs:
   - **Cloud Storage API**
   - **Cloud Storage JSON API** (if available)

## Step 3: Create a Service Account
1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Name: `transcription-service`
4. Description: `Service account for AI transcription service`
5. Click "Create and Continue"

## Step 4: Grant Permissions
Add these roles to your service account:
- **Storage Admin** (or Storage Object Admin for more security)
- **Storage Legacy Bucket Reader** (if needed)

## Step 5: Create and Download Credentials
1. Click on your newly created service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Choose **JSON** format
5. Download the file
6. **Rename it to:** `google-credentials.json`
7. **Move it to:** `C:\Users\Jared\Documents\setlist_calendar\set_list_calendar - Copy\transcription-service\google-credentials.json`

## Step 6: Create a GCS Bucket
1. Go to "Cloud Storage" > "Buckets"
2. Click "Create Bucket"
3. Choose a unique name like: `your-transcription-bucket-[random-number]`
4. Choose location (US or closer to you)
5. Leave other settings as default
6. Click "Create"

## Step 7: Update Configuration
After completing the above steps, run this command to configure your service:

```bash
# The setup script will update your .env file with the correct values
```

## Security Notes
- Keep your `google-credentials.json` file secure
- Add `*.json` to your `.gitignore` file
- Never commit credentials to version control