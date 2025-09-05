@echo off
echo Stopping any existing frontend processes...

REM Kill processes using port 3000 (more precise than killing all Node processes)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do (
    echo Killing process %%a using port 3000
    taskkill /f /pid %%a >nul 2>&1
)

REM Also kill processes on port 4173 (Vite preview port)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4173') do (
    echo Killing process %%a using port 4173
    taskkill /f /pid %%a >nul 2>&1
)

REM Kill any Vite dev server processes specifically
for /f "tokens=2" %%i in ('tasklist /fi "imagename eq node.exe" ^| findstr node') do (
    for /f "tokens=*" %%j in ('wmic process where ProcessId^=%%i get CommandLine /format:list ^| findstr vite') do (
        echo Killing vite process %%i
        taskkill /f /pid %%i >nul 2>&1
    )
)

echo Starting fresh frontend service...
cd /d "%~dp0\..\frontend"
npm run dev