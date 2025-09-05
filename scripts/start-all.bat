@echo off
echo ==============================================
echo    AI Transcription Service Startup
echo ==============================================
echo.

REM Create scripts directory if it doesn't exist
if not exist "%~dp0" mkdir "%~dp0"

echo [1/3] Checking for existing services on ports...
echo Checking port 3000 (frontend)...
netstat -an | findstr :3000 >nul
if %ERRORLEVEL% EQU 0 (
    echo   - Found service on port 3000
) else (
    echo   - Port 3000 is free
)

echo Checking port 8000 (backend)...
netstat -an | findstr :8000 >nul
if %ERRORLEVEL% EQU 0 (
    echo   - Found service on port 8000
) else (
    echo   - Port 8000 is free
)
echo.

echo [2/3] Starting backend service...
start "Backend Service" cmd /k "%~dp0start-backend.bat"

REM Wait a moment for backend to start
echo Waiting for backend to initialize...
timeout /t 5 /nobreak > nul

echo [3/3] Starting frontend service...
start "Frontend Service" cmd /k "%~dp0start-frontend.bat"

echo.
echo ==============================================
echo           Services Started Successfully!
echo ==============================================
echo Backend API: http://localhost:8000
echo Frontend:   http://localhost:3000
echo.
echo Both services are running in separate windows.
echo Close those windows to stop the services.
echo.
echo Press any key to exit this launcher...
pause