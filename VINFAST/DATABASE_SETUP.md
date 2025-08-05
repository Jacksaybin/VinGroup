# 🗄️ Database Integration Setup Guide

## 📋 Tổng quan
Hệ thống đã được tích hợp với **Neon Database** (PostgreSQL serverless) sử dụng **Drizzle ORM**.

## 🏗️ Cấu trúc Database

### 📊 Tables
1. **users** - Thông tin người dùng
2. **investment_funds** - Danh sách quỹ đầu tư  
3. **investments** - Lịch sử giao dịch đầu tư

### 🔗 Relationships
- `investments.user_id` → `users.id`
- `investments.fund_id` → `investment_funds.id`

## ⚙️ Setup Instructions

### 1. Tạo Neon Database
1. Truy cập [Neon Console](https://console.neon.tech)
2. Tạo project mới với tên: `vinfast-vgreen`
3. Copy connection string

### 2. Cấu hình Environment Variables
```bash
# Tạo file .env từ template
cp .env.example .env

# Cập nhật DATABASE_URL với connection string từ Neon
DATABASE_URL="postgresql://neondb_owner:abc123@ep-example-123.us-east-1.aws.neon.tech/vinfast_db?sslmode=require"
```

### 3. Chạy Database Setup
```bash
# Seed database với sample data
npm run db:seed

# Hoặc chạy migrations thủ công
npm run db:push
```

### 4. Xác nhận setup thành công
```bash
# Mở Drizzle Studio để xem database
npm run db:studio
```

## 🚀 API Endpoints

### Investment Funds
- `GET /api/investment-funds` - Lấy danh sách tất cả quỹ
- `GET /api/investment-funds/:id` - Lấy thông tin quỹ theo ID

### Investments  
- `POST /api/investments` - Tạo giao dịch đầu tư mới
- `GET /api/investments/:userId` - Lấy lịch sử đầu tư của user
- `PUT /api/investments/:id/withdraw` - Rút tiền đầu tư

## 📱 Frontend Integration

### Context Usage
```typescript
// Sử dụng InvestmentContext để quản lý state
const { funds, createInvestment, userInvestments } = useInvestment();
```

### Sample Data
Database đã được populate với 6 quỹ đầu tư mẫu:
- VIC01: DC 40kW (365 ngày, 8.2%/năm)
- VIC03: DC 60kW (540 ngày, 9.5%/năm) 
- VIC07: DC 80kW (730 ngày, 10.5%/năm)
- VIC16: DC 120kW (1095 ngày, 11.8%/năm)
- VIC25: DC 150kW (1460 ngày, 13.2%/năm)
- 3D300: 3D 300kW (1825 ngày, 14.5%/năm)

## 🔧 Troubleshooting

### Connection Issues
1. Kiểm tra DATABASE_URL trong file .env
2. Đảm bảo Neon database đang active
3. Kiểm tra network connectivity

### Migration Issues
```bash
# Reset và chạy lại migration
npm run db:push

# Hoặc xóa và tạo lại tables
npm run db:seed
```

### Development Tools
```bash
# Xem database schema
npm run db:studio

# Generate migration files
npm run db:generate
```

## 📈 Performance Optimizations

1. **Connection Pooling**: Neon tự động quản lý connection pool
2. **Query Optimization**: Sử dụng Drizzle ORM với typed queries
3. **Caching**: Frontend context caching với React Query
4. **Error Handling**: Comprehensive error handling trong API routes

## 🔐 Security Features

1. **SQL Injection Protection**: Drizzle ORM với prepared statements
2. **Environment Variables**: Sensitive data trong .env
3. **Type Safety**: Full TypeScript type checking
4. **Validation**: Input validation với Zod schemas

---

✅ **Database integration hoàn tất!** 
Frontend sẽ tự động fetch data từ database thay vì localStorage.
