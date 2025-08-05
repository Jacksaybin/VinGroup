Write-Host "🚀 Starting VinFast V-Green Development..." -ForegroundColor Green

# Kiểm tra thư mục
if (!(Test-Path "server")) {
    Write-Host "❌ Thư mục server không tồn tại!" -ForegroundColor Red
    exit
}

if (!(Test-Path "client")) {
    Write-Host "❌ Thư mục client không tồn tại!" -ForegroundColor Red  
    exit
}

# Khởi động Backend
Write-Host "📡 Starting Backend Server..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm run dev"

# Đợi 3 giây
Start-Sleep -Seconds 3

# Khởi động Frontend  
Write-Host "🌐 Starting Frontend Server..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; npm run dev"

# Đợi 5 giây rồi test
Start-Sleep -Seconds 5

Write-Host "🔧 Testing connections..." -ForegroundColor Yellow
try {
    $backend = Invoke-RestMethod "http://localhost:5000" -ErrorAction Stop
    Write-Host "✅ Backend: Running" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend: Failed" -ForegroundColor Red
}

Write-Host "🎯 URLs:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "   Admin:    http://localhost:3000/#/admin-backend" -ForegroundColor White
