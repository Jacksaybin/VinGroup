// Development server startup script cho VinFast V-Green
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { neon } from '@neondatabase/serverless';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:1OgbCj9n7KS7@ep-dry-snow-a5hfhbqy.us-east-2.aws.neon.tech/neondb?sslmode=require';
const sql = neon(databaseUrl);

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, 'dist/public')));

// API Routes
app.get('/api/funds', async (req, res) => {
  try {
    const funds = await sql`
      SELECT * FROM investment_funds 
      ORDER BY daily_return DESC
    `;
    res.json(funds);
  } catch (error) {
    console.error('Error fetching funds:', error);
    res.status(500).json({ error: 'Lỗi khi tải danh sách quỹ' });
  }
});

app.get('/api/funds/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fund = await sql`
      SELECT * FROM investment_funds 
      WHERE id = ${id}
    `;
    
    if (fund.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy quỹ đầu tư' });
    }
    
    res.json(fund[0]);
  } catch (error) {
    console.error('Error fetching fund:', error);
    res.status(500).json({ error: 'Lỗi khi tải thông tin quỹ' });
  }
});

app.post('/api/investments', async (req, res) => {
  try {
    const { userId, fundId, amount, expectedReturn } = req.body;
    
    const result = await sql`
      INSERT INTO investments (user_id, fund_id, amount, expected_return, status)
      VALUES (${userId}, ${fundId}, ${amount}, ${expectedReturn}, 'active')
      RETURNING *
    `;
    
    res.json(result[0]);
  } catch (error) {
    console.error('Error creating investment:', error);
    res.status(500).json({ error: 'Lỗi khi tạo đầu tư' });
  }
});

app.get('/api/investments/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const investments = await sql`
      SELECT 
        i.*,
        f.name as fund_name,
        f.code as fund_code,
        f.daily_return
      FROM investments i
      JOIN investment_funds f ON i.fund_id = f.id
      WHERE i.user_id = ${userId}
      ORDER BY i.created_at DESC
    `;
    
    res.json(investments);
  } catch (error) {
    console.error('Error fetching user investments:', error);
    res.status(500).json({ error: 'Lỗi khi tải đầu tư của người dùng' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist/public/index.html'));
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const dbCheck = await sql`SELECT NOW() as timestamp`;
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      database: 'Connected',
      dbTime: dbCheck[0].timestamp
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      error: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log('🚀 VinFast V-Green Platform đang chạy!');
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔧 API: http://localhost:${PORT}/api`);
  console.log(`❤️  Health: http://localhost:${PORT}/health`);
  console.log('');
  console.log('🎯 Sẵn sàng phục vụ các nhà đầu tư VinFast!');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down VinFast V-Green Platform...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Shutting down VinFast V-Green Platform...');
  process.exit(0);
});
