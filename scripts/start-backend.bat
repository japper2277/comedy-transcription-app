@echo off
echo Stopping any existing backend processes...

REM Kill processes using port 8000 (more precise than killing all Python processes)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000') do (
    echo Killing process %%a using port 8000
    taskkill /f /pid %%a >nul 2>&1
)

REM Also kill any uvicorn processes specifically
for /f "tokens=2" %%i in ('tasklist /fi "imagename eq python.exe" ^| findstr python') do (
    for /f "tokens=*" %%j in ('wmic process where ProcessId^=%%i get CommandLine /format:list ^| findstr uvicorn') do (
        echo Killing uvicorn process %%i
        taskkill /f /pid %%i >nul 2>&1
    )
)

echo Starting fresh backend service...
cd /d "%~dp0\..\backend"
python -m uvicorn api.main:app --reload --host 0.0.0.0 --port 8000