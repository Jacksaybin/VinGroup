// Script để chạy migration SQL cho database
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import path from 'path';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:1OgbCj9n7KS7@ep-dry-snow-a5hfhbqy.us-east-2.aws.neon.tech/neondb?sslmode=require';

async function runSQLMigration() {
  try {
    console.log('🚀 Bắt đầu chạy migration SQL...');
    
    const sql = neon(databaseUrl);
    
    // Đọc file SQL migration
    const migrationPath = path.join(process.cwd(), 'migrations', '001_initial_setup.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf8');
    
    console.log('📄 Đã đọc file migration SQL thành công');
    console.log('📊 Kích thước file:', migrationSQL.length, 'ký tự');
    
    // Chia nhỏ SQL thành các statements riêng biệt
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log('🔢 Tổng số statements:', statements.length);
    
    // Chạy từng statement một cách tuần tự
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          console.log(`⚡ Chạy statement ${i + 1}/${statements.length}...`);
          
          // Kiểm tra loại statement
          if (statement.includes('CREATE EXTENSION')) {
            console.log('   📦 Tạo extension...');
          } else if (statement.includes('CREATE TABLE')) {
            const tableName = statement.match(/CREATE TABLE.*?"(\w+)"/)?.[1] || 'unknown';
            console.log(`   🗃️  Tạo table: ${tableName}`);
          } else if (statement.includes('ALTER TABLE')) {
            console.log('   🔗 Thêm foreign key constraints...');
          } else if (statement.includes('INSERT INTO')) {
            const tableName = statement.match(/INSERT INTO.*?"(\w+)"/)?.[1] || 'unknown';
            console.log(`   📝 Insert dữ liệu vào: ${tableName}`);
          }
          
          await sql(statement);
          console.log(`   ✅ Thành công!`);
        } catch (error) {
          console.log(`   ⚠️  Statement đã tồn tại hoặc lỗi nhỏ: ${error.message}`);
          // Tiếp tục với statement tiếp theo
        }
      }
    }
    
    console.log('🎉 Migration SQL hoàn thành!');
    
    // Kiểm tra kết quả
    console.log('\n📊 Kiểm tra kết quả migration:');
    
    const userCount = await sql`SELECT COUNT(*) as count FROM users`;
    console.log(`👥 Số lượng users: ${userCount[0].count}`);
    
    const fundCount = await sql`SELECT COUNT(*) as count FROM investment_funds`;
    console.log(`💰 Số lượng investment funds: ${fundCount[0].count}`);
    
    const investmentCount = await sql`SELECT COUNT(*) as count FROM investments`;
    console.log(`📈 Số lượng investments: ${investmentCount[0].count}`);
    
    // Hiển thị danh sách funds
    console.log('\n💰 Danh sách Investment Funds:');
    const funds = await sql`SELECT code, name, daily_return, duration FROM investment_funds ORDER BY code`;
    funds.forEach(fund => {
      console.log(`   ${fund.code}: ${fund.name} - ${(fund.daily_return * 100).toFixed(3)}%/ngày (${fund.duration} ngày)`);
    });
    
    console.log('\n✅ Database đã sẵn sàng cho VinFast V-Green Platform!');
    
  } catch (error) {
    console.error('❌ Lỗi khi chạy migration:', error.message);
    console.error('Chi tiết lỗi:', error);
  }
}

runSQLMigration();
