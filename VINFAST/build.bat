@echo off
echo "=== VGreen Build Script ==="
echo "Stopping any running processes..."

echo "Killing node processes..."
taskkill /f /im node.exe 2>nul

echo "Waiting 2 seconds..."
timeout /t 2 /nobreak >nul

echo "Removing dist directory..."
if exist "dist" (
    echo "Removing dist folder..."
    rmdir /s /q "dist" 2>nul
    timeout /t 1 /nobreak >nul
)

echo "Starting build..."
npm run build

if %ERRORLEVEL% EQU 0 (
    echo "Build successful! Starting preview..."
    echo "Preview will be available at http://localhost:4173 or 4174"
    npm run preview
) else (
    echo "Build failed. Check the errors above."
    pause
)
