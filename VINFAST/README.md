# 🚀 VinFast V-Green Investment Platform

## 🎯 Giới Thiệu

**VinFast V-Green** là nền tảng đầu tư trực tuyến chuyên biệt cho các dự án hạ tầng sạc xe điện và công nghệ xanh của VinFast. Platform cung cấp cơ hội đầu tư vào 6 quỹ đầu tư khác nhau với lợi nhuận hấp dẫn từ **8.2% - 14.5% mỗi ngày**.

## 💰 Các Quỹ Đầu Tư

| Mã Quỹ | Tên Quỹ | Lợi Nhuận/Ngày | Thời Gian | Đầu Tư Tối Thiểu |
|---------|----------|----------------|------------|------------------|
| **VIC01** | DC 40kW | 8.2% | 365 ngày | 10,000,000 VNĐ |
| **VIC03** | DC 60kW | 9.5% | 540 ngày | 25,000,000 VNĐ |
| **VIC07** | DC 80kW | 10.5% | 730 ngày | 50,000,000 VNĐ |
| **VIC16** | DC 120kW | 11.8% | 1095 ngày | 100,000,000 VNĐ |
| **VIC25** | DC 150kW | 13.2% | 1460 ngày | 200,000,000 VNĐ |
| **3D300** | 3D 300kW | 14.5% | 1825 ngày | 500,000,000 VNĐ |

## 🔧 Công Nghệ

- **Frontend**: React 18 + TypeScript + TailwindCSS
- **Backend**: Node.js + Express + Drizzle ORM  
- **Database**: PostgreSQL (Neon Serverless)
- **Build Tool**: Vite
- **Mobile**: Responsive Design + Touch Gestures

## 🚀 Cài Đặt & Chạy

### 1. Cài Đặt Dependencies
```bash
cd "VINFAST - VGREEN/VINFAST"
npm install
```

### 2. Setup Database
```bash
# Chạy migration để tạo tables và dữ liệu mẫu
node run-migration.js

# Test database connection
node test-complete.js
```

### 3. Build Frontend
```bash
npm run build
```

### 4. Start Server
```bash
# Start development server
node start-server.js
```

### 5. Access Platform
- **Web Interface**: http://localhost:3000
- **API Endpoints**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/health

## 📱 Tính Năng

### ✅ **Core Features**
- 🔍 **Browse Investment Funds**: Xem danh sách 6 quỹ đầu tư VinFast
- 💰 **Investment Calculator**: Tính toán lợi nhuận theo thời gian thực
- 📊 **Real-time Data**: Dữ liệu cập nhật từ database PostgreSQL
- 📱 **Mobile Responsive**: Giao diện tối ưu cho mobile và tablet
- 🎯 **Investment Tracking**: Theo dõi tiến độ và lợi nhuận đầu tư

### ✅ **UI/UX Features**
- 🇻🇳 **Vietnamese Interface**: Hoàn toàn bằng tiếng Việt
- 👆 **Touch Gestures**: Swipe navigation cho mobile
- 🎨 **VinFast Branding**: Design theo thương hiệu VinFast
- ⚡ **Fast Loading**: Optimized performance với Vite
- 🔒 **Type Safety**: Full TypeScript integration

### ✅ **Technical Features**
- 🗄️ **Database Persistence**: PostgreSQL với Neon serverless
- 🔗 **RESTful API**: CRUD operations cho funds và investments
- 📈 **Real-time Updates**: Live data synchronization
- 🛡️ **Error Handling**: Comprehensive error management
- 🧪 **Testing**: Automated database và API testing

## 📊 API Endpoints

### GET /api/funds
Lấy danh sách tất cả quỹ đầu tư
```json
[
  {
    "id": "fund1",
    "name": "Quỹ Phát Triển Trạm Sạc VinFast DC 40kW",
    "code": "VIC01",
    "daily_return": "0.082",
    "duration": 365,
    "min_investment": "10,000,000",
    "category": "Hạ tầng sạc"
  }
]
```

### GET /api/funds/:id
Lấy thông tin chi tiết một quỹ đầu tư

### POST /api/investments
Tạo đầu tư mới
```json
{
  "userId": "user_id",
  "fundId": "fund_id", 
  "amount": "10000000",
  "expectedReturn": "500000"
}
```

### GET /api/investments/user/:userId
Lấy danh sách đầu tư của user

## 📁 Cấu Trúc Project

```
VINFAST/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── hooks/          # Custom hooks
│   └── public/             # Static assets
├── server/                 # Backend API
│   ├── routes.ts           # API routes
│   └── index.ts            # Server entry
├── shared/                 # Shared types & schemas
│   └── schema.ts           # Database schema & types
├── migrations/             # Database migrations
│   └── 001_initial_setup.sql
└── dist/                   # Built files
```

## 🧪 Testing

### Test Database Connection
```bash
node test-db.js
```

### Comprehensive System Test
```bash
node test-complete.js
```

### Demo Showcase
```bash
node demo-showcase.js
```

## 🎯 Investment Examples

### Ví Dụ Đầu Tư VIC01 (10M VNĐ)
- **Vốn đầu tư**: 10,000,000 VNĐ
- **Lợi nhuận hàng ngày**: 820,000 VNĐ (8.2%)
- **Lợi nhuận hàng tháng**: 24,600,000 VNĐ
- **Tổng lợi nhuận (365 ngày)**: 299,300,000 VNĐ
- **ROI**: 2,993% sau 1 năm

### Ví Dụ Đầu Tư VIC25 (200M VNĐ)
- **Vốn đầu tư**: 200,000,000 VNĐ  
- **Lợi nhuận hàng ngày**: 26,400,000 VNĐ (13.2%)
- **Lợi nhuận hàng tháng**: 792,000,000 VNĐ
- **Tổng lợi nhuận (1460 ngày)**: 38,544,000,000 VNĐ
- **ROI**: 19,272% sau 4 năm

## 🌟 Highlights

- ⚡ **Performance**: Sub-second loading times
- 📱 **Mobile First**: Touch-optimized interface  
- 🇻🇳 **Vietnamese**: Native language support
- 🔒 **Secure**: Production-ready security measures
- 📊 **Analytics**: Real-time investment tracking
- 🎨 **Design**: Modern VinFast-branded UI

## 🚀 Production Ready

Platform đã sẵn sàng cho:
- ✅ Real user registrations
- ✅ Investment transactions  
- ✅ Mobile app deployment
- ✅ Database scaling
- ✅ Production hosting

## 📞 Support

Để được hỗ trợ kỹ thuật hoặc thông tin về đầu tư, vui lòng liên hệ team phát triển VinFast V-Green Platform.

---

**🎉 VinFast V-Green - Đầu tư thông minh cho tương lai xanh! 🌱**
