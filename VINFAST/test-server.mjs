// Simple test server for investment funds
import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Test investment funds data
const testFunds = [
  {
    id: "DC40",
    name: "Quỹ Phát Triển Trạm Sạc DC 40kW",
    code: "DC40",
    category: "Hạ tầng sạc",
    duration: 365,
    minInvestment: "25,000,000 VND",
    maxInvestment: "500,000,000 VND",
    projectScale: "50 trạm sạc",
    dailyReturn: "0.031",
    progress: 85,
    image: "/assets/quy-phat-trien-tram-sac-vinfast-dc-40kw.jpg",
    description: "Quỹ đầu tư phát triển hệ thống trạm sạc DC 40kW tại các khu dân cư và văn phòng",
    features: ["ROI 11.3%/năm", "Thanh khoản cao", "An toàn"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "DC60",
    name: "Quỹ Phát Triển Trạm Sạc DC 60kW",
    code: "DC60",
    category: "Hạ tầng sạc",
    duration: 365,
    minInvestment: "50,000,000 VND",
    maxInvestment: "800,000,000 VND",
    projectScale: "75 trạm sạc",
    dailyReturn: "0.033",
    progress: 78,
    image: "/assets/quy-phat-trien-tram-sac-vinfast-dc-60kw.jpg",
    description: "Quỹ đầu tư phát triển trạm sạc DC 60kW cho các khu vực thương mại và trung tâm mua sắm",
    features: ["ROI 12.0%/năm", "Thanh khoản tốt", "Ổn định"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "DC80",
    name: "Quỹ Phát Triển Trạm Sạc DC 80kW",
    code: "DC80",
    category: "Hạ tầng sạc",
    duration: 365,
    minInvestment: "75,000,000 VND",
    maxInvestment: "1,200,000,000 VND",
    projectScale: "100 trạm sạc",
    dailyReturn: "0.035",
    progress: 92,
    image: "/assets/quy-phat-trien-tram-sac-vinfast-dc-80kw.jpg",
    description: "Quỹ phát triển hệ thống trạm sạc DC 80kW tại các trung tâm thương mại lớn",
    features: ["ROI 12.8%/năm", "Tăng trưởng ổn định", "Rủi ro thấp"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// API endpoint for investment funds
app.get('/api/investment-funds', (req, res) => {
  console.log('📊 API call: /api/investment-funds');
  res.json(testFunds);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`✅ Test server running on http://localhost:${port}`);
  console.log(`📊 Investment funds API available at http://localhost:${port}/api/investment-funds`);
});
