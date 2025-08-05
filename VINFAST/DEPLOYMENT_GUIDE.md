# 🚀 Hướng Dẫn Triển Khai VGreen

## ✅ Trạng Thái Hiện Tại
- ✅ Build thành công
- ✅ Preview tại: http://localhost:4174/
- ✅ Files build sẵn sàng trong `dist/`

## 🌐 Các Phương Pháp Triển Khai

### 1. **Vercel (Khuyên dùng)**
```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel

# Hoặc connect với GitHub và auto-deploy
```

**Ưu điểm:**
- Miễn phí cho dự án cá nhân
- CI/CD tự động
- CDN toàn cầu
- HTTPS tự động

### 2. **Netlify**
```bash
# Cài đặt Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist/public
```

**Ưu điểm:**
- Drag & drop deploy
- Form handling
- Functions serverless

### 3. **GitHub Pages**
```bash
# Cài đặt gh-pages
npm install --save-dev gh-pages

# Thêm script vào package.json:
# "deploy": "gh-pages -d dist/public"

# Deploy
npm run deploy
```

### 4. **Railway/Render**
- Upload project lên GitHub
- Connect với Railway/Render
- Auto-deploy từ GitHub

### 5. **VPS/Server Riêng**
```bash
# Copy files dist/ lên server
scp -r dist/* user@server:/var/www/html/

# Hoặc dùng Docker
```

## 🔧 Chuẩn Bị Trước Khi Deploy

### Environment Variables
Tạo file `.env.production`:
```env
VITE_API_URL=https://your-api-domain.com
VITE_NODE_ENV=production
```

### Build Optimization
```bash
# Analyze bundle size
npm install --save-dev webpack-bundle-analyzer
npm run build -- --analyze

# Optimize images
npm install --save-dev vite-plugin-imagemin
```

## 📱 Mobile PWA Setup
Để triển khai như PWA, thêm vào `vite.config.ts`:
```typescript
import { VitePWA } from 'vite-plugin-pwa'

plugins: [
  VitePWA({
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    },
    includeAssets: ['favicon.ico', 'vinfast-vgreen-logo.png'],
    manifest: {
      name: 'VGreen - VinFast Investment',
      short_name: 'VGreen',
      description: 'Nền tảng đầu tư trạm sạc điện VinFast',
      theme_color: '#22c55e',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: 'vinfast-vgreen-logo.png',
          sizes: '192x192',
          type: 'image/png'
        }
      ]
    }
  })
]
```

## 🔄 CI/CD với GitHub Actions
Tạo `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🎯 Khuyến Nghị

**Cho Dự Án Demo:**
1. **Vercel** - Đơn giản, nhanh, miễn phí

**Cho Production:**
1. **Vercel Pro** hoặc **AWS Amplify**
2. Setup custom domain
3. Enable analytics
4. Configure error monitoring

## 📞 Hỗ Trợ
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- Railway: https://docs.railway.app

## 🚀 Lệnh Nhanh
```bash
# Build & Deploy Vercel
npm run build && vercel --prod

# Build & Deploy Netlify  
npm run build && netlify deploy --prod --dir=dist/public
```
