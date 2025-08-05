// Demo script để showcase toàn bộ tính năng VinFast V-Green Platform
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:1OgbCj9n7KS7@ep-dry-snow-a5hfhbqy.us-east-2.aws.neon.tech/neondb?sslmode=require';

async function showcaseDemo() {
  console.log('🎬 VinFast V-Green Platform - LIVE DEMO');
  console.log('=' .repeat(60));
  console.log('');
  
  try {
    const sql = neon(databaseUrl);
    
    // 1. Platform Overview
    console.log('📊 PLATFORM OVERVIEW');
    console.log('-'.repeat(30));
    
    const stats = await Promise.all([
      sql`SELECT COUNT(*) as count FROM users`,
      sql`SELECT COUNT(*) as count FROM investment_funds`,
      sql`SELECT COUNT(*) as count FROM investments`
    ]);
    
    console.log(`👥 Registered Users: ${stats[0][0].count}`);
    console.log(`💰 Available Funds: ${stats[1][0].count}`);
    console.log(`📈 Active Investments: ${stats[2][0].count}`);
    console.log('');
    
    // 2. Investment Funds Showcase
    console.log('💰 INVESTMENT FUNDS PORTFOLIO');
    console.log('-'.repeat(40));
    
    const funds = await sql`
      SELECT 
        code, 
        name, 
        daily_return, 
        duration, 
        min_investment, 
        progress,
        category
      FROM investment_funds 
      ORDER BY daily_return ASC
    `;
    
    funds.forEach((fund, index) => {
      const dailyPercent = (parseFloat(fund.daily_return) * 100).toFixed(3);
      const totalReturn = (parseFloat(fund.daily_return) * fund.duration * 100).toFixed(2);
      const yearlyReturn = (parseFloat(fund.daily_return) * 365 * 100).toFixed(1);
      
      console.log(`${index + 1}. 📦 ${fund.code} - ${fund.category}`);
      console.log(`   📝 ${fund.name}`);
      console.log(`   💵 Min Investment: ${fund.min_investment} VNĐ`);
      console.log(`   📊 Returns: ${dailyPercent}%/day | ${yearlyReturn}%/year | ${totalReturn}% total`);
      console.log(`   ⏱️  Duration: ${fund.duration} days`);
      console.log(`   📈 Progress: ${fund.progress}% funded`);
      console.log('');
    });
    
    // 3. ROI Analysis
    console.log('📈 RETURN ON INVESTMENT ANALYSIS');
    console.log('-'.repeat(40));
    
    const roiAnalysis = await sql`
      SELECT 
        code,
        name,
        daily_return,
        duration,
        (daily_return * duration) as total_return_ratio,
        CASE 
          WHEN daily_return * 365 > 0.5 THEN 'High Risk - High Return'
          WHEN daily_return * 365 > 0.3 THEN 'Medium Risk - Good Return'
          ELSE 'Low Risk - Stable Return'
        END as risk_category
      FROM investment_funds
      ORDER BY (daily_return * duration) DESC
    `;
    
    console.log('🏆 TOP PERFORMING FUNDS:');
    roiAnalysis.slice(0, 3).forEach((fund, index) => {
      const totalPercent = (parseFloat(fund.total_return_ratio) * 100).toFixed(2);
      console.log(`   ${index + 1}. ${fund.code}: ${totalPercent}% total return (${fund.risk_category})`);
    });
    console.log('');
    
    // 4. Investment Simulation
    console.log('🎯 INVESTMENT SIMULATION');
    console.log('-'.repeat(30));
    
    const sampleInvestments = [
      { amount: 10000000, fundCode: 'VIC01' },
      { amount: 50000000, fundCode: 'VIC07' },
      { amount: 200000000, fundCode: 'VIC25' }
    ];
    
    for (const investment of sampleInvestments) {
      const fund = funds.find(f => f.code === investment.fundCode);
      if (fund) {
        const dailyProfit = investment.amount * parseFloat(fund.daily_return);
        const monthlyProfit = dailyProfit * 30;
        const totalProfit = dailyProfit * fund.duration;
        
        console.log(`💼 Investment: ${investment.amount.toLocaleString()} VNĐ in ${fund.code}`);
        console.log(`   📅 Daily Profit: ${dailyProfit.toLocaleString()} VNĐ`);
        console.log(`   📆 Monthly Profit: ${monthlyProfit.toLocaleString()} VNĐ`);
        console.log(`   🎯 Total Expected: ${totalProfit.toLocaleString()} VNĐ`);
        console.log(`   ⚡ ROI: ${((totalProfit / investment.amount) * 100).toFixed(2)}%`);
        console.log('');
      }
    }
    
    // 5. Technology Stack
    console.log('🔧 TECHNOLOGY STACK');
    console.log('-'.repeat(25));
    console.log('Frontend: React 18 + TypeScript + TailwindCSS');
    console.log('Backend: Node.js + Express + Drizzle ORM');
    console.log('Database: PostgreSQL (Neon Serverless)');
    console.log('Build: Vite + VS Code');
    console.log('Mobile: Responsive Design + Touch Gestures');
    console.log('');
    
    // 6. Access Information
    console.log('🌐 ACCESS INFORMATION');
    console.log('-'.repeat(25));
    console.log('🖥️  Web Platform: http://localhost:3000');
    console.log('📱 Mobile Optimized: ✅ Responsive Design');
    console.log('🔗 API Endpoints: http://localhost:3000/api');
    console.log('❤️  Health Check: http://localhost:3000/health');
    console.log('');
    
    // 7. Features Summary
    console.log('⭐ FEATURES SUMMARY');
    console.log('-'.repeat(25));
    console.log('✅ Real-time Investment Data');
    console.log('✅ Mobile Responsive Interface');
    console.log('✅ Vietnamese Language Support');
    console.log('✅ Database Persistence');
    console.log('✅ Touch-friendly Gestures');
    console.log('✅ Investment Calculator');
    console.log('✅ Progress Tracking');
    console.log('✅ VinFast Branding');
    console.log('');
    
    console.log('🎉 VINFAST V-GREEN PLATFORM IS LIVE!');
    console.log('Ready to serve Vietnamese investors! 🇻🇳');
    console.log('=' .repeat(60));
    
  } catch (error) {
    console.error('❌ Demo Error:', error.message);
  }
}

showcaseDemo();
