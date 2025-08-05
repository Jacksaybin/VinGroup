// Database migration script to create tables
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:1OgbCj9n7KS7@ep-dry-snow-a5hfhbqy.us-east-2.aws.neon.tech/neondb?sslmode=require';

async function runMigrations() {
  try {
    console.log('🚀 Starting database migrations...');
    
    const sql = neon(databaseUrl);
    
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Users table created/verified');
    
    // Create investment_funds table
    await sql`
      CREATE TABLE IF NOT EXISTS investment_funds (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        code TEXT UNIQUE NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        min_investment TEXT NOT NULL,
        daily_return TEXT NOT NULL,
        duration INTEGER NOT NULL,
        progress INTEGER DEFAULT 0,
        project_scale TEXT,
        features TEXT[],
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Investment funds table created/verified');
    
    // Create investments table
    await sql`
      CREATE TABLE IF NOT EXISTS investments (
        id TEXT PRIMARY KEY,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        fund_id TEXT REFERENCES investment_funds(id) ON DELETE CASCADE,
        amount TEXT NOT NULL,
        expected_return TEXT,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Investments table created/verified');
    
    // Insert sample user (if not exists)
    const existingUsers = await sql`SELECT COUNT(*) as count FROM users`;
    if (parseInt(existingUsers[0].count) === 0) {
      await sql`
        INSERT INTO users (id, username, email, password) 
        VALUES ('user1', 'demo_user', 'demo@vinfast.com', 'hashed_password_123')
      `;
      console.log('✅ Demo user created');
    }
    
    // Insert sample investment funds (if not exists)
    const existingFunds = await sql`SELECT COUNT(*) as count FROM investment_funds`;
    if (parseInt(existingFunds[0].count) === 0) {
      const sampleFunds = [
        {
          id: 'fund1',
          name: 'Quỹ Phát Triển Trạm Sạc VinFast DC 150kW',
          code: 'VIC-DC150',
          description: 'Đầu tư vào hệ thống trạm sạc nhanh công suất cao cho xe điện VinFast',
          category: 'Hạ tầng sạc',
          minInvestment: '10,000,000đ',
          dailyReturn: '0.001',
          duration: 365,
          progress: 75,
          projectScale: '500 tỷ VND',
          features: ['Công nghệ sạc nhanh DC 150kW', 'Tích hợp thanh toán số', 'Hỗ trợ nhiều loại xe điện', 'Bảo trì 24/7']
        },
        {
          id: 'fund2', 
          name: 'Quỹ Phát Triển Công Nghệ 3D VinFast',
          code: 'VIC-3D300',
          description: 'Đầu tư nghiên cứu và phát triển công nghệ in 3D cho sản xuất linh kiện ô tô',
          category: 'Công nghệ 3D',
          minInvestment: '50,000,000đ',
          dailyReturn: '0.0015',
          duration: 730,
          progress: 45,
          projectScale: '1,200 tỷ VND',
          features: ['Công nghệ in 3D tiên tiến', 'Sản xuất linh kiện chính xác cao', 'Giảm chi phí sản xuất', 'Tăng tốc độ phát triển sản phẩm']
        }
      ];
      
      for (const fund of sampleFunds) {
        await sql`
          INSERT INTO investment_funds (
            id, name, code, description, category, min_investment, 
            daily_return, duration, progress, project_scale, features
          ) VALUES (
            ${fund.id}, ${fund.name}, ${fund.code}, ${fund.description}, 
            ${fund.category}, ${fund.minInvestment}, ${fund.dailyReturn}, 
            ${fund.duration}, ${fund.progress}, ${fund.projectScale}, ${fund.features}
          )
        `;
      }
      console.log('✅ Sample investment funds created');
    }
    
    console.log('🎉 Database migrations completed successfully!');
    
    // Show current data
    const userCount = await sql`SELECT COUNT(*) as count FROM users`;
    const fundCount = await sql`SELECT COUNT(*) as count FROM investment_funds`;
    const investmentCount = await sql`SELECT COUNT(*) as count FROM investments`;
    
    console.log(`📊 Database Statistics:`);
    console.log(`   👥 Users: ${userCount[0].count}`);
    console.log(`   💰 Investment Funds: ${fundCount[0].count}`);
    console.log(`   📈 Investments: ${investmentCount[0].count}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('Full error:', error);
  }
}

runMigrations();
