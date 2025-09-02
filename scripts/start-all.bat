@echo off
echo Starting AI Transcription Service...
echo.

REM Create scripts directory if it doesn't exist
if not exist "%~dp0" mkdir "%~dp0"

echo Starting backend service...
start "Backend Service" cmd /k "%~dp0start-backend.bat"

REM Wait a moment for backend to start
timeout /t 3 /nobreak > nul

echo Starting frontend service...
start "Frontend Service" cmd /k "%~dp0start-frontend.bat"

echo.
echo Services are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000 (or next available port)
echo.
echo Press any key to exit (services will continue running)
pause