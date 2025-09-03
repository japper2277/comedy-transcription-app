# Google Drive API Setup Guide

## Step 1: Enable Google Drive API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Go to "APIs & Services" → "Library"
4. Search for "Google Drive API"
5. Click "Enable"

## Step 2: Create Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill in service account details:
   - Name: `transcription-service-drive`
   - Description: `Service account for transcription service file storage`
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

## Step 3: Create and Download Key

1. Find your new service account in the credentials list
2. Click on it to open details
3. Go to "Keys" tab
4. Click "Add Key" → "Create new key"
5. Select "JSON" format
6. Click "Create"
7. **Save the downloaded JSON file as `google-drive-credentials.json` in your project root**

## Step 4: Share Drive Folder (Optional)

If you want to use a specific folder:

1. Create a folder in your Google Drive
2. Right-click the folder → "Share"
3. Add the service account email (from the JSON file) with "Editor" permissions
4. Copy the folder ID from the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
5. Add to your `.env` file: `GOOGLE_DRIVE_FOLDER_ID=your_folder_id`

## Step 5: Environment Variables

Add to your `.env` file:

```
GOOGLE_DRIVE_CREDENTIALS_PATH=google-drive-credentials.json
GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here  # Optional
```

## How It Works

Your transcription service now uses this priority order for file storage:

1. **Google Drive** (unlimited space) - First choice
2. **Google Cloud Storage** - Fallback if Drive fails
3. **Local storage** - Final fallback

Files are automatically:
- Uploaded to Google Drive when you submit audio
- Downloaded temporarily for transcription processing
- Cleaned up after processing

## Testing

Once set up, your transcription service will automatically use Google Drive storage. You'll see logs like:

```
SUCCESS: Google Drive client initialized
SUCCESS: File uploaded to Google Drive (ID: abc123...)
```