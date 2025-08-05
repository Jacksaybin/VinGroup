Write-Host "🔄 Restarting VinFast V-Green System..." -ForegroundColor Cyan

# Tìm và đóng tất cả các process node hiện tại
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force

# Khởi động Backend
Start-Process powershell -ArgumentList "-NoExit","-Command","cd C:\VINFAST - VGREEN\server; npm run dev"
Write-Host "✅ Backend starting on port 5000" -ForegroundColor Green

# Đợi backend khởi động
Start-Sleep -Seconds 3

# Khởi động Frontend
Start-Process powershell -ArgumentList "-NoExit","-Command","cd C:\VINFAST - VGREEN\client; npm run dev" 
Write-Host "✅ Frontend starting on port 3001" -ForegroundColor Green

Write-Host "🚀 System ready! Opening interfaces..." -ForegroundColor Yellow

# Mở các interfaces
Start-Sleep -Seconds 3
Start-Process "http://localhost:5000"
Start-Process "http://localhost:3001"
