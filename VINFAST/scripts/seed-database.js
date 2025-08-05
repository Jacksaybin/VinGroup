import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Kết nối database
const sql = neon(process.env.DATABASE_URL || '');
const db = drizzle(sql);

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database with sample data...');

    // Chạy migration script
    const migrationSQL = `
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      -- Users table
      CREATE TABLE IF NOT EXISTS "users" (
        "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        "username" text NOT NULL UNIQUE,
        "password" text NOT NULL
      );

      -- Investment funds table
      CREATE TABLE IF NOT EXISTS "investment_funds" (
        "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" text NOT NULL,
        "code" text NOT NULL UNIQUE,
        "daily_return" numeric(5,3) NOT NULL,
        "duration" integer NOT NULL,
        "min_investment" text NOT NULL,
        "max_investment" text,
        "project_scale" text NOT NULL,
        "progress" integer NOT NULL,
        "category" text NOT NULL,
        "description" text NOT NULL,
        "image" text NOT NULL,
        "features" text[]
      );

      -- Investments table
      CREATE TABLE IF NOT EXISTS "investments" (
        "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" varchar NOT NULL,
        "fund_id" varchar NOT NULL,
        "amount" numeric(15,2) NOT NULL,
        "status" text NOT NULL DEFAULT 'active',
        "created_at" text NOT NULL DEFAULT NOW(),
        "expected_return" numeric(15,2),
        "actual_return" numeric(15,2),
        "withdrawn_at" text
      );

      -- Add foreign key constraints if they don't exist
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'investments_user_id_users_id_fk') THEN
          ALTER TABLE "investments" ADD CONSTRAINT "investments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'investments_fund_id_investment_funds_id_fk') THEN
          ALTER TABLE "investments" ADD CONSTRAINT "investments_fund_id_investment_funds_id_fk" FOREIGN KEY ("fund_id") REFERENCES "investment_funds"("id") ON DELETE no action ON UPDATE no action;
        END IF;
      END $$;

      -- Clear existing data
      TRUNCATE TABLE "investments" CASCADE;
      TRUNCATE TABLE "investment_funds" CASCADE;
      TRUNCATE TABLE "users" CASCADE;

      -- Insert sample investment funds data
      INSERT INTO "investment_funds" ("name", "code", "daily_return", "duration", "min_investment", "max_investment", "project_scale", "progress", "category", "description", "image", "features") VALUES
      ('Quỹ Phát Triển Trạm Sạc VinFast DC 40kW', 'VIC01', 0.082, 365, '10,000,000đ', '500,000,000đ', '2.5 tỷ VNĐ', 75, 'Hạ tầng sạc', 'Đầu tư phát triển mạng lưới trạm sạc DC 40kW cho xe điện VinFast', '/assets/quy-phat-trien-tram-sac-vinfast-dc-40kw.jpg', ARRAY['Lợi nhuận ổn định', 'Đầu tư bền vững', 'Hỗ trợ môi trường']),
      ('Quỹ Phát Triển Trạm Sạc VinFast DC 60kW', 'VIC03', 0.095, 540, '25,000,000đ', '1,000,000,000đ', '5.8 tỷ VNĐ', 60, 'Hạ tầng sạc', 'Mở rộng hệ thống trạm sạc nhanh DC 60kW tại các khu vực trọng điểm', '/assets/quy-phat-trien-tram-sac-vinfast-dc-60kw.jpg', ARRAY['Công nghệ tiên tiến', 'Vị trí chiến lược', 'Tăng trưởng cao']),
      ('Quỹ Phát Triển Trạm Sạc VinFast DC 80kW', 'VIC07', 0.105, 730, '50,000,000đ', '2,000,000,000đ', '12.3 tỷ VNĐ', 45, 'Hạ tầng sạc', 'Phát triển trạm sạc siêu nhanh DC 80kW cho tương lai giao thông xanh', '/assets/quy-phat-trien-tram-sac-vinfast-dc-80kw.jpg', ARRAY['Sạc siêu nhanh', 'Tiện ích cao', 'Đầu tư dài hạn']),
      ('Quỹ Phát Triển Trạm Sạc VinFast DC 120kW', 'VIC16', 0.118, 1095, '100,000,000đ', '5,000,000,000đ', '28.7 tỷ VNĐ', 30, 'Hạ tầng sạc', 'Xây dựng mạng lưới trạm sạc công suất cao DC 120kW', '/assets/quy-phat-trien-tram-sac-vinfast-dc-120kw.jpg', ARRAY['Công suất lớn', 'Phủ sóng rộng', 'Hiệu quả cao']),
      ('Quỹ Phát Triển Trạm Sạc VinFast DC 150kW', 'VIC25', 0.132, 1460, '200,000,000đ', '10,000,000,000đ', '45.2 tỷ VNĐ', 15, 'Hạ tầng sạc', 'Đầu tư phát triển trạm sạc công nghệ cao DC 150kW', '/assets/quy-phat-trien-tram-sac-vinfast-dc-150kw.jpg', ARRAY['Công nghệ đỉnh cao', 'Sạc cực nhanh', 'Tương lai xanh']),
      ('Quỹ Phát Triển Trạm Sạc VinFast 3D 300kW', '3D300', 0.145, 1825, '500,000,000đ', '20,000,000,000đ', '78.5 tỷ VNĐ', 5, 'Công nghệ 3D', 'Nghiên cứu phát triển công nghệ sạc 3D 300kW thế hệ mới', '/assets/quy-phat-trien-tram-sac-vinfast-3d-300kw.jpg', ARRAY['Đột phá công nghệ', 'Sạc không dây', 'Tương lai xa']),
      ('Quỹ Thể Tích Lũy VinGroup', 'VG001', 0.025, 30, '5,000,000đ', '100,000,000đ', '1.2 tỷ VNĐ', 95, 'Tích lũy', 'Quỹ tích lũy ngắn hạn với lợi nhuận ổn định cho nhà đầu tư thận trọng', '/assets/quy-mo-the-tich-luy-vingroup.jpg', ARRAY['Rủi ro thấp', 'Thanh khoản cao', 'Phù hợp mọi đối tượng']),
      ('Quỹ VinFast Gói Thương', 'VFT01', 0.035, 60, '15,000,000đ', '300,000,000đ', '3.5 tỷ VNĐ', 85, 'Gói thương', 'Gói đầu tư trung hạn với lợi nhuận cân bằng cho nhà đầu tư có kinh nghiệm', '/assets/quy-phat-trien-tram-sac-vinfast-goi-thuong.jpg', ARRAY['Lợi nhuận cân bằng', 'Thời gian hợp lý', 'Quản lý chuyên nghiệp']),
      ('Quỹ VinFast Gói VIP', 'VIP01', 0.055, 120, '50,000,000đ', '1,000,000,000đ', '15.8 tỷ VNĐ', 70, 'Gói VIP', 'Gói đầu tư VIP với lợi nhuận cao và dịch vụ chăm sóc đặc biệt', '/assets/quy-phat-trien-tram-sac-vinfast-goi-vip.jpg', ARRAY['Lợi nhuận cao', 'Dịch vụ VIP', 'Tư vấn 1-1']),
      ('Quỹ VinSmart VIC01', 'VS01', 0.075, 180, '75,000,000đ', '2,000,000,000đ', '22.4 tỷ VNĐ', 55, 'Công nghệ', 'Đầu tư vào công nghệ thông minh và IoT của VinSmart', '/assets/quy-phat-trien-tram-sac-vinfast-vic01.jpg', ARRAY['Công nghệ IoT', 'Tăng trưởng bền vững', 'Tiềm năng lớn']),
      ('Quỹ VinSmart VIC03', 'VS03', 0.085, 270, '100,000,000đ', '3,000,000,000đ', '35.7 tỷ VNĐ', 40, 'Công nghệ', 'Phát triển hệ sinh thái smart city và smart home VinSmart', '/assets/quy-phat-trien-tram-sac-vinfast-vic03.jpg', ARRAY['Smart City', 'Smart Home', 'Đô thị thông minh']),
      ('Quỹ VinTech VIC07', 'VT07', 0.095, 365, '150,000,000đ', '5,000,000,000đ', '48.9 tỷ VNĐ', 25, 'R&D', 'Nghiên cứu và phát triển công nghệ AI và Machine Learning', '/assets/quy-phat-trien-tram-sac-vinfast-vic07.jpg', ARRAY['AI & ML', 'R&D tiên tiến', 'Công nghệ tương lai']),
      ('Quỹ VinFuture VIC16', 'VF16', 0.125, 540, '300,000,000đ', '8,000,000,000đ', '67.3 tỷ VNĐ', 20, 'Tương lai', 'Đầu tư vào các công nghệ đột phá cho tương lai', '/assets/quy-phat-trien-tram-sac-vinfast-vic16.jpg', ARRAY['Công nghệ đột phá', 'Tầm nhìn xa', 'Đầu tư dài hạn']),
      ('Quỹ VinUniverse VIC25', 'VU25', 0.155, 730, '500,000,000đ', '15,000,000,000đ', '89.6 tỷ VNĐ', 10, 'Siêu dự án', 'Đầu tư vào hệ sinh thái công nghệ toàn diện VinUniverse', '/assets/quy-phat-trien-tram-sac-vinfast-vic25.jpg', ARRAY['Hệ sinh thái toàn diện', 'Tầm nhìn 2030', 'Siêu lợi nhuận']);

      -- Insert sample user for testing
      INSERT INTO "users" ("username", "password") VALUES ('demo_user', 'hashed_password_here');
    `;

    // Execute migration
    await sql(migrationSQL);

    console.log('✅ Database seeded successfully!');
    console.log('📊 Created:');
    console.log('  - 14 investment funds');
    console.log('  - 1 demo user');
    console.log('  - Database tables and constraints');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Chạy seed script
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase };
