@echo off
echo Stopping all transcription service processes...

echo Stopping backend (Python) processes...
for /f "tokens=2" %%i in ('tasklist /fi "imagename eq python.exe" ^| findstr python') do (
    taskkill /f /pid %%i >nul 2>&1
)

echo Stopping frontend (Node.js) processes...
for /f "tokens=2" %%i in ('tasklist /fi "imagename eq node.exe" ^| findstr node') do (
    taskkill /f /pid %%i >nul 2>&1
)

echo All services stopped.
pause