#!/usr/bin/env node

/**
 * Test script để kiểm tra 14 quỹ đầu tư và hình ảnh
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { investmentFunds } from '../shared/schema.js';

async function testFundsAndImages() {
  try {
    console.log('🔍 Kiểm tra database và quỹ đầu tư...');
    
    // Kết nối database
    const sql = neon(process.env.DATABASE_URL || '');
    const db = drizzle(sql);
    
    // Lấy tất cả quỹ đầu tư
    const funds = await db.select().from(investmentFunds);
    
    console.log(`\n📊 Tìm thấy ${funds.length} quỹ đầu tư trong database:`);
    console.log('=' .repeat(80));
    
    funds.forEach((fund, index) => {
      console.log(`${index + 1}. ${fund.name}`);
      console.log(`   Mã quỹ: ${fund.code}`);
      console.log(`   Lãi suất: ${fund.dailyReturn}% / ngày`);
      console.log(`   Thời gian: ${fund.duration} ngày`);
      console.log(`   Đầu tư tối thiểu: ${fund.minInvestment}`);
      console.log(`   Quy mô: ${fund.projectScale}`);
      console.log(`   Tiến độ: ${fund.progress}%`);
      console.log(`   Danh mục: ${fund.category}`);
      console.log(`   Hình ảnh: ${fund.image}`);
      console.log(`   Tính năng: ${fund.features ? fund.features.join(', ') : 'Không có'}`);
      console.log('-' .repeat(80));
    });
    
    console.log(`\n✅ Tổng cộng: ${funds.length} quỹ đầu tư`);
    
    if (funds.length >= 14) {
      console.log('🎉 Đã có đủ 14 quỹ đầu tư!');
    } else {
      console.log(`⚠️  Chỉ có ${funds.length} quỹ, cần thêm ${14 - funds.length} quỹ nữa`);
    }
    
    // Kiểm tra hình ảnh
    console.log('\n🖼️  Kiểm tra đường dẫn hình ảnh:');
    console.log('=' .repeat(80));
    
    const imagePaths = [...new Set(funds.map(fund => fund.image))];
    imagePaths.forEach((imagePath, index) => {
      console.log(`${index + 1}. ${imagePath}`);
    });
    
    console.log(`\nTổng cộng ${imagePaths.length} hình ảnh unique được sử dụng`);
    
    // Kiểm tra theo danh mục
    console.log('\n📂 Phân loại theo danh mục:');
    console.log('=' .repeat(80));
    
    const categories = {};
    funds.forEach(fund => {
      if (!categories[fund.category]) {
        categories[fund.category] = [];
      }
      categories[fund.category].push(fund.name);
    });
    
    Object.entries(categories).forEach(([category, fundNames]) => {
      console.log(`${category}: ${fundNames.length} quỹ`);
      fundNames.forEach(name => {
        console.log(`  - ${name}`);
      });
    });
    
  } catch (error) {
    console.error('❌ Lỗi khi kiểm tra:', error);
  }
}

// Chạy test
testFundsAndImages();
