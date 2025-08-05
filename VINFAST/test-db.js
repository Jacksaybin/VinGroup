// Quick test script to check database connection
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:1OgbCj9n7KS7@ep-dry-snow-a5hfhbqy.us-east-2.aws.neon.tech/neondb?sslmode=require';

async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing database connection...');
    
    const sql = neon(databaseUrl);
    
    // Test basic query
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Database connection successful!');
    console.log('📅 Current time from database:', result[0].current_time);
    
    // Check if tables exist
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    console.log('📊 Tables in database:', tables.map(t => t.table_name));
    
    // Check users table
    try {
      const userCount = await sql`SELECT COUNT(*) as count FROM users`;
      console.log('👥 Users in database:', userCount[0].count);
    } catch (error) {
      console.log('⚠️ Users table not found, may need to run migrations');
    }
    
    // Check investment_funds table
    try {
      const fundCount = await sql`SELECT COUNT(*) as count FROM investment_funds`;
      console.log('💰 Investment funds in database:', fundCount[0].count);
    } catch (error) {
      console.log('⚠️ Investment funds table not found, may need to run migrations');
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('🔧 Please check your DATABASE_URL and network connection');
  }
}

testDatabaseConnection();
