@echo off
echo Stopping any existing backend processes...

REM Kill any existing Python processes running the backend
for /f "tokens=2" %%i in ('tasklist /fi "imagename eq python.exe" ^| findstr python') do (
    taskkill /f /pid %%i >nul 2>&1
)

echo Starting fresh backend service...
cd /d "%~dp0\..\backend"
python -m uvicorn api.main:app --reload --host 0.0.0.0 --port 8000