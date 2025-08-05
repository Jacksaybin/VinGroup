Write-Host "🌱 Setting up VinFast V-Green Database..." -ForegroundColor Green

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ .env file not found. Creating template..." -ForegroundColor Red
    Write-Host "Please update the DATABASE_URL in .env file with your Neon database credentials" -ForegroundColor Yellow
    exit 1
}

# Load environment variables from .env file
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^=]+)=(.*)$') {
        [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
    }
}

# Check if DATABASE_URL is set
$dbUrl = [Environment]::GetEnvironmentVariable("DATABASE_URL", "Process")
if (-not $dbUrl -or $dbUrl -eq "postgresql://neondb_owner:your_password@your_host.neon.tech/your_database?sslmode=require") {
    Write-Host "❌ Please update DATABASE_URL in .env file with your actual Neon database credentials" -ForegroundColor Red
    Write-Host "Get your DATABASE_URL from: https://console.neon.tech" -ForegroundColor Yellow
    exit 1
}

Write-Host "📊 Database URL configured successfully" -ForegroundColor Green
Write-Host "🔄 Running database seeding..." -ForegroundColor Cyan

# Run the seeding script
try {
    node scripts/seed-database.js
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database seeded successfully with 14 investment funds!" -ForegroundColor Green
        Write-Host "🚀 Ready to run: npm run dev" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Database seeding failed" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error running seed script: $_" -ForegroundColor Red
}
