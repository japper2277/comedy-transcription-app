# AI Transcription Service - Troubleshooting Guide

## Quick Start (Prevention First!)

### ✅ Recommended Startup Method
Use the provided scripts to avoid common issues:
```bash
# Start both services cleanly
scripts\start-all.bat

# Or start individually
scripts\start-backend.bat
scripts\start-frontend.bat

# Stop all services
scripts\stop-all.bat
```

## Common Issues & Solutions

### 🔴 Problem: API Status Shows "Offline" in Frontend

**Symptoms:**
- Frontend loads but shows "API Status: Offline" 
- Console errors about CORS or network failures

**Diagnosis:**
1. Check if backend is running: `curl http://localhost:8000/health`
2. Check CORS configuration: `curl http://localhost:8000/debug/cors`
3. Check for multiple processes: `curl http://localhost:8000/debug/processes`

**Solutions:**
```bash
# 1. Stop all processes and restart cleanly
scripts\stop-all.bat
scripts\start-all.bat

# 2. Check which ports are in use
netstat -an | findstr :8000
netstat -an | findstr :3000

# 3. If frontend is on unexpected port, check console output for actual port
```

### 🔴 Problem: Multiple Backend Processes Running

**Symptoms:**
- Changes to backend code don't take effect
- CORS configuration changes ignored
- Conflicting behavior

**Diagnosis:**
```bash
# Check debug endpoint
curl http://localhost:8000/debug/processes

# Manual process check
tasklist | findstr python.exe
```

**Solutions:**
```bash
# Clean restart (recommended)
scripts\stop-all.bat
scripts\start-backend.bat

# Manual cleanup
taskkill /f /im python.exe
```

### 🔴 Problem: CORS Errors

**Symptoms:**
- Browser console shows CORS errors
- "Access to fetch at... has been blocked by CORS policy"

**Diagnosis:**
```bash
# Check current CORS configuration
curl http://localhost:8000/debug/cors

# Test CORS manually
curl -H "Origin: http://localhost:3005" http://localhost:8000/health
```

**Solutions:**
1. **Development Environment:** CORS should auto-configure for ports 3000-3005
2. **Custom Frontend Port:** Add to .env file:
   ```
   CORS_ORIGINS=http://localhost:YOUR_PORT
   ```
3. **Multiple Ports:** Comma-separated list:
   ```
   CORS_ORIGINS=http://localhost:3000,http://localhost:3002,http://localhost:8080
   ```

### 🔴 Problem: Unicode/Emoji Errors in Backend

**Symptoms:**
- `UnicodeEncodeError: 'charmap' codec can't encode character`
- Backend crashes when printing

**Prevention:**
- Never use emojis in backend print statements or logs
- Use ASCII-only characters for console output
- Emojis are OK in frontend React components

**Solutions:**
1. Remove emojis from Python code
2. Use text alternatives: "ERROR:" instead of "❌", "INFO:" instead of "ℹ️"

### 🔴 Problem: Frontend Won't Connect to Backend

**Symptoms:**
- Network errors in browser console
- Fetch requests fail

**Diagnosis Steps:**
1. **Backend Health:** `curl http://localhost:8000/health`
2. **Frontend Port:** Check console output for actual port
3. **CORS Test:** `curl -H "Origin: http://localhost:FRONTEND_PORT" http://localhost:8000/health`
4. **Process Check:** `curl http://localhost:8000/debug/processes`

**Solutions:**
1. Ensure both services are running
2. Check firewall/antivirus blocking connections
3. Try different frontend port
4. Restart both services cleanly

### 🔴 Problem: File Upload Fails

**Symptoms:**
- Upload hangs or fails
- 413 Request Entity Too Large
- 500 Internal Server Error

**Solutions:**
1. **File Size:** Keep under 25MB for reliability
2. **File Format:** Use MP3, WAV, M4A, FLAC, MP4, WebM
3. **Memory Issues:** Try shorter audio files (under 5 minutes)
4. **Network:** Check stable internet connection

## Debug Endpoints

When troubleshooting, use these endpoints:

```bash
# Basic health check
curl http://localhost:8000/health

# CORS configuration
curl http://localhost:8000/debug/cors

# Process information
curl http://localhost:8000/debug/processes

# Configuration check
curl http://localhost:8000/debug/config
```

## Environment Configuration

### Development (.env file)
```
ENVIRONMENT=development
OPENAI_API_KEY=your-key-here
GEMINI_API_KEY=your-key-here

# Optional CORS override
CORS_ORIGINS=http://localhost:3000,http://localhost:3002

# Optional port override
API_PORT=8000
```

### Production (.env file)
```
ENVIRONMENT=production
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
API_HOST=0.0.0.0
API_PORT=8000
```

## Port Allocation

**Default Ports:**
- Backend: 8000
- Frontend: 3000 (will auto-increment if occupied)

**Frontend Port Detection:**
The frontend (Vite) will automatically try ports 3000, 3001, 3002, etc. Check the console output to see which port was selected.

## Prevention Checklist

Before starting development:
- [ ] Use the provided startup scripts
- [ ] Stop all services before making configuration changes  
- [ ] Check debug endpoints if something seems wrong
- [ ] Keep audio files under 25MB
- [ ] No emojis in backend Python code
- [ ] Use .env file for configuration overrides

## Getting Help

1. Check this troubleshooting guide first
2. Use debug endpoints to gather information
3. Include debug endpoint outputs when reporting issues
4. Note your operating system and browser
5. Include relevant console errors (both frontend and backend)

---

**Remember:** Most issues are caused by multiple processes running or CORS configuration problems. The startup scripts prevent these issues!