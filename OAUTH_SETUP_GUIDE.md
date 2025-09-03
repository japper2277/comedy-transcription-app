# Google Drive OAuth Setup Guide

Follow these steps to create OAuth credentials for your personal Google account, allowing unlimited access to your Google Drive.

## Step 1: Create OAuth Credentials in Google Cloud Console

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select your project** (the same one you used for the service account)
3. **Navigate to APIs & Services** → **Credentials**
4. **Click "Create Credentials"** → **OAuth client ID**

## Step 2: Configure OAuth Client

1. **Choose Application Type**: Desktop application
2. **Name**: `Set List Calendar Desktop App`
3. **Click "Create"**

## Step 3: Download Credentials

1. **Click the download button** (⬇️) next to your new OAuth client ID
2. **Save the JSON file** as `google-oauth-credentials.json` in your project root:
   ```
   C:\Users\Jared\Documents\setlist_calendar\set_list_calendar - Copy\google-oauth-credentials.json
   ```

## Step 4: Install Dependencies

Run this command to install the OAuth library:

```bash
cd transcription-service/backend
pip install google-auth-oauthlib google-api-python-client
```

## Step 5: Test OAuth Setup

Run the OAuth authentication test:

```bash
cd transcription-service
python test_oauth_setup.py
```

This will:
- Open your browser for Google login
- Ask for permission to access your Drive
- Create a token file for future use
- Test uploading a small file to verify it works

## What Happens Next

Once OAuth is set up:
1. ✅ **Unlimited storage** in your personal Google Drive
2. ✅ **Full read/write access** to create folders and upload your entire project
3. ✅ **Automatic token refresh** - no need to re-authenticate
4. ✅ **Desktop sync** - Use Google Drive Desktop to edit files locally

## File Structure After Setup

```
your-project/
├── google-oauth-credentials.json       # OAuth client credentials
├── google-oauth-credentials_token.pickle  # Your auth token (auto-created)
├── transcription-service/
└── ... (rest of your project)
```

## Security Notes

- ✅ `google-oauth-credentials.json` - Safe to keep (client ID only)
- ⚠️ `google-oauth-credentials_token.pickle` - Contains your access token, add to .gitignore
- The token auto-refreshes and never expires as long as you use the app

## Troubleshooting

**"File not found" error**: Make sure `google-oauth-credentials.json` is in the project root

**"Permission denied"**: The OAuth flow will open a browser window - make sure to complete the login

**"Redirect URI mismatch"**: Make sure you selected "Desktop application" type when creating the OAuth client