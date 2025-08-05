# VinFast V-Green Development Server

Write-Host "🚀 Starting VinFast V-Green Development Servers..." -ForegroundColor Green

# Start Backend Server
Write-Host "📡 Starting Backend API Server..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm run dev"

# Wait a bit then start Frontend
Start-Sleep -Seconds 3
Write-Host "🌐 Starting Frontend Development Server..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; npm run dev"

Write-Host "✅ Both servers started!" -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "📡 Backend: http://localhost:5000" -ForegroundColor Yellow
Write-Host "👑 Admin: http://localhost:3000/#/admin-backend" -ForegroundColor Cyan
