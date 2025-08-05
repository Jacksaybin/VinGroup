CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
	"username" text NOT NULL UNIQUE,
	"email" text NOT NULL UNIQUE,
	"password" text NOT NULL,
	"created_at" timestamp NOT NULL DEFAULT NOW(),
	"updated_at" timestamp NOT NULL DEFAULT NOW()
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

-- Add foreign key constraints
ALTER TABLE "investments" ADD CONSTRAINT "investments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "investments" ADD CONSTRAINT "investments_fund_id_investment_funds_id_fk" FOREIGN KEY ("fund_id") REFERENCES "investment_funds"("id") ON DELETE no action ON UPDATE no action;

-- Insert sample investment funds data
INSERT INTO "investment_funds" ("name", "code", "daily_return", "duration", "min_investment", "max_investment", "project_scale", "progress", "category", "description", "image", "features") VALUES
('Quỹ Phát Triển Trạm Sạc VinFast DC 40kW', 'VIC01', 0.082, 365, '10,000,000', '500,000,000', '2.5 tỷ VNĐ', 75, 'Hạ tầng sạc', 'Đầu tư phát triển mạng lưới trạm sạc DC 40kW cho xe điện VinFast', '/assets/quy-phat-trien-tram-sac-vinfast-dc-40kw.jpg', ARRAY['Lợi nhuận ổn định', 'Đầu tư bền vững', 'Hỗ trợ môi trường']),
('Quỹ Phát Triển Trạm Sạc VinFast DC 60kW', 'VIC03', 0.095, 540, '25,000,000', '1,000,000,000', '5.8 tỷ VNĐ', 60, 'Hạ tầng sạc', 'Mở rộng hệ thống trạm sạc nhanh DC 60kW tại các khu vực trọng điểm', '/assets/quy-phat-trien-tram-sac-vinfast-dc-60kw.jpg', ARRAY['Công nghệ tiên tiến', 'Vị trí chiến lược', 'Tăng trưởng cao']),
('Quỹ Phát Triển Trạm Sạc VinFast DC 80kW', 'VIC07', 0.105, 730, '50,000,000', '2,000,000,000', '12.3 tỷ VNĐ', 45, 'Hạ tầng sạc', 'Phát triển trạm sạc siêu nhanh DC 80kW cho tương lai giao thông xanh', '/assets/quy-phat-trien-tram-sac-vinfast-dc-80kw.jpg', ARRAY['Sạc siêu nhanh', 'Tiện ích cao', 'Đầu tư dài hạn']),
('Quỹ Phát Triển Trạm Sạc VinFast DC 120kW', 'VIC16', 0.118, 1095, '100,000,000', '5,000,000,000', '28.7 tỷ VNĐ', 30, 'Hạ tầng sạc', 'Xây dựng mạng lưới trạm sạc công suất cao DC 120kW', '/assets/quy-phat-trien-tram-sac-vinfast-dc-120kw.jpg', ARRAY['Công suất lớn', 'Phủ sóng rộng', 'Hiệu quả cao']),
('Quỹ Phát Triển Trạm Sạc VinFast DC 150kW', 'VIC25', 0.132, 1460, '200,000,000', '10,000,000,000', '45.2 tỷ VNĐ', 15, 'Hạ tầng sạc', 'Đầu tư phát triển trạm sạc công nghệ cao DC 150kW', '/assets/quy-phat-trien-tram-sac-vinfast-dc-150kw.jpg', ARRAY['Công nghệ đỉnh cao', 'Sạc cực nhanh', 'Tương lai xanh']),
('Quỹ Phát Triển Trạm Sạc VinFast 3D 300kW', '3D300', 0.145, 1825, '500,000,000', '20,000,000,000', '78.5 tỷ VNĐ', 5, 'Công nghệ 3D', 'Nghiên cứu phát triển công nghệ sạc 3D 300kW thế hệ mới', '/assets/quy-phat-trien-tram-sac-vinfast-3d-300kw.jpg', ARRAY['Đột phá công nghệ', 'Sạc không dây', 'Tương lai xa']);

-- Insert sample user for testing
INSERT INTO "users" ("username", "email", "password") VALUES ('demo_user', 'demo_user@example.com', 'hashed_password_here');
