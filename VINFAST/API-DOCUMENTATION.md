# 🔗 VinFast V-Green API Documentation

## 📋 Overview

VinFast V-Green Platform cung cấp RESTful API để quản lý các quỹ đầu tư, tạo đầu tư và theo dõi portfolio. Tất cả API endpoints sử dụng JSON format và hỗ trợ CORS.

**Base URL**: `http://localhost:3000/api`

## 🔧 API Endpoints

### 1. Health & System

#### GET `/health`
Kiểm tra trạng thái hệ thống và kết nối database.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-08-03T10:30:00.000Z",
  "database": "Connected",
  "dbTime": "2025-08-03T10:30:00.123Z",
  "dbVersion": "PostgreSQL"
}
```

#### GET `/stats`
Lấy thống kê tổng quan platform.

**Response:**
```json
{
  "users": 1,
  "funds": 6,
  "investments": 5,
  "totalInvested": "750000000"
}
```

### 2. Investment Funds

#### GET `/investment-funds`
Lấy danh sách tất cả quỹ đầu tư.

**Query Parameters:**
- `category` (optional): Lọc theo category ("Hạ tầng sạc", "Công nghệ 3D")
- `sortBy` (optional): Sắp xếp theo field ("dailyReturn", "progress", "duration")
- `order` (optional): Thứ tự sắp xếp ("asc", "desc", default: "desc")

**Example:**
```
GET /investment-funds?category=Hạ tầng sạc&sortBy=dailyReturn&order=desc
```

**Response:**
```json
[
  {
    "id": "fund1",
    "name": "Quỹ Phát Triển Trạm Sạc VinFast DC 150kW",
    "code": "VIC25",
    "daily_return": "0.132",
    "duration": 1460,
    "min_investment": "200,000,000",
    "max_investment": "10,000,000,000",
    "project_scale": "45.2 tỷ VNĐ",
    "progress": 15,
    "category": "Hạ tầng sạc",
    "description": "Đầu tư phát triển trạm sạc công nghệ cao DC 150kW",
    "image": "/assets/quy-phat-trien-tram-sac-vinfast-dc-150kw.jpg",
    "features": ["Công nghệ đỉnh cao", "Sạc cực nhanh", "Tương lai xanh"]
  }
]
```

#### GET `/investment-funds/:id`
Lấy thông tin chi tiết một quỹ đầu tư.

**Response:**
```json
{
  "id": "fund1",
  "name": "Quỹ Phát Triển Trạm Sạc VinFast DC 150kW",
  "code": "VIC25",
  "daily_return": "0.132",
  "duration": 1460,
  "min_investment": "200,000,000",
  // ... other fields
}
```

### 3. Investments

#### POST `/investments`
Tạo đầu tư mới.

**Request Body:**
```json
{
  "userId": "user_id",
  "fundId": "fund_id",
  "amount": "50000000",
  "expectedReturn": "5000000"
}
```

**Validation:**
- `userId`, `fundId`, `amount` là required
- User và Fund phải tồn tại trong database
- `amount` phải >= `min_investment` của fund

**Response (201 Created):**
```json
{
  "investment": {
    "id": "investment_id",
    "user_id": "user_id",
    "fund_id": "fund_id",
    "amount": "50000000",
    "expected_return": "5000000",
    "status": "active",
    "created_at": "2025-08-03T10:30:00.000Z"
  },
  "fund": {
    "id": "fund_id",
    "name": "Quỹ Phát Triển Trạm Sạc VinFast DC 150kW",
    "code": "VIC25"
    // ... other fund fields
  }
}
```

#### GET `/investments/:userId`
Lấy danh sách đầu tư của user.

**Query Parameters:**
- `status` (optional): Lọc theo trạng thái ("active", "withdrawn")
- `limit` (optional): Số lượng records (default: 50)
- `offset` (optional): Vị trí bắt đầu (default: 0)

**Example:**
```
GET /investments/user123?status=active&limit=10&offset=0
```

**Response:**
```json
{
  "investments": [
    {
      "investment": {
        "id": "investment_id",
        "user_id": "user_id",
        "fund_id": "fund_id",
        "amount": "50000000",
        "expected_return": "5000000",
        "status": "active",
        "created_at": "2025-08-03T10:30:00.000Z"
      },
      "fund": {
        "id": "fund_id",
        "name": "Quỹ Phát Triển Trạm Sạc VinFast DC 150kW",
        "code": "VIC25",
        "daily_return": "0.132"
      }
    }
  ],
  "summary": {
    "totalInvested": "150000000",
    "totalExpectedReturn": "15000000",
    "activeCount": 3,
    "withdrawnCount": 1
  },
  "pagination": {
    "limit": 10,
    "offset": 0,
    "total": 3
  }
}
```

#### PUT `/investments/:id/withdraw`
Rút đầu tư (chuyển status thành "withdrawn").

**Request Body:**
```json
{
  "actualReturn": "6000000"
}
```

**Validation:**
- Investment phải tồn tại và có status "active"

**Response:**
```json
{
  "investment": {
    "id": "investment_id",
    "user_id": "user_id",
    "fund_id": "fund_id",
    "amount": "50000000",
    "expected_return": "5000000",
    "actual_return": "6000000",
    "status": "withdrawn",
    "withdrawn_at": "2025-08-03T11:00:00.000Z"
  },
  "fund": {
    // ... fund details
  }
}
```

### 4. Portfolio Analysis

#### GET `/portfolio/:userId`
Phân tích portfolio đầu tư của user.

**Response:**
```json
{
  "summary": {
    "totalInvested": 150000000,
    "totalExpectedReturn": 15000000,
    "totalCurrentValue": 165000000,
    "totalGain": 15000000,
    "totalGainPercent": 10.0,
    "activeInvestments": 3,
    "totalInvestments": 4
  },
  "distribution": {
    "byFund": {
      "VIC01": {
        "amount": 50000000,
        "count": 2,
        "name": "Quỹ Phát Triển Trạm Sạc VinFast DC 40kW"
      },
      "VIC25": {
        "amount": 100000000,
        "count": 1,
        "name": "Quỹ Phát Triển Trạm Sạc VinFast DC 150kW"
      }
    },
    "byCategory": {
      "Hạ tầng sạc": {
        "amount": 150000000,
        "count": 3
      }
    }
  },
  "investments": [
    // ... array of all investments with fund details
  ]
}
```

## 🔒 Error Handling

### Standard Error Response
```json
{
  "error": "Error message",
  "message": "Detailed error description",
  "timestamp": "2025-08-03T10:30:00.000Z"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request (validation errors)
- `404` - Not Found (resource not found)
- `500` - Internal Server Error

### Common Validation Errors

**Investment Creation:**
```json
{
  "error": "Missing required fields: userId, fundId, amount"
}
```

**Minimum Investment:**
```json
{
  "error": "Minimum investment is 200,000,000đ"
}
```

**Resource Not Found:**
```json
{
  "error": "Investment fund not found"
}
```

## 🚀 Usage Examples

### JavaScript/Fetch
```javascript
// Get all funds sorted by daily return
const response = await fetch('/api/investment-funds?sortBy=dailyReturn&order=desc');
const funds = await response.json();

// Create new investment
const investment = await fetch('/api/investments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    fundId: 'fund456',
    amount: '50000000',
    expectedReturn: '5000000'
  })
});

// Get user portfolio
const portfolio = await fetch('/api/portfolio/user123');
const data = await portfolio.json();
```

### cURL Examples
```bash
# Health check
curl http://localhost:3000/api/health

# Get investment funds
curl "http://localhost:3000/api/investment-funds?category=Hạ tầng sạc"

# Create investment
curl -X POST http://localhost:3000/api/investments \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","fundId":"fund456","amount":"50000000"}'

# Get user investments
curl "http://localhost:3000/api/investments/user123?status=active&limit=10"
```

## 📊 Rate Limiting

Hiện tại API không có rate limiting, nhưng trong production nên implement:
- 100 requests/minute per IP
- 1000 requests/hour per user
- Burst limit: 10 requests/second

## 🔧 CORS

API hỗ trợ CORS với:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization`

## 📝 Logging

Tất cả API requests được log với format:
```
[2025-08-03T10:30:00.000Z] GET /api/investment-funds - 127.0.0.1
```

---

**📞 Support**: Để hỗ trợ API integration, liên hệ team phát triển VinFast V-Green Platform.
