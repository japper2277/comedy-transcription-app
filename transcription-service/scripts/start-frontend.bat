@echo off
echo Stopping any existing frontend processes...

REM Kill any existing Node.js processes 
for /f "tokens=2" %%i in ('tasklist /fi "imagename eq node.exe" ^| findstr node') do (
    taskkill /f /pid %%i >nul 2>&1
)

echo Starting fresh frontend service...
cd /d "%~dp0\..\frontend"
npm run dev