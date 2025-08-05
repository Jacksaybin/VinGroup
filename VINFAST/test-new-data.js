// Script to clear cache and test new fund data
const baseURL = 'http://localhost:5001';

async function clearCacheAndTest() {
  try {
    console.log('🧹 Clearing cache...');
    
    // Clear cache
    const clearResponse = await fetch(`${baseURL}/api/admin/clear-cache`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (clearResponse.ok) {
      const clearResult = await clearResponse.json();
      console.log('✅ Cache cleared:', clearResult.message);
    } else {
      console.log('⚠️  Cache clear failed:', clearResponse.status);
    }
    
    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('\n📊 Testing new fund data...');
    
    // Test fund data
    const response = await fetch(`${baseURL}/api/investment-funds`);
    const funds = await response.json();
    
    console.log(`Total funds: ${funds.length}`);
    
    // Check first few funds
    console.log('\nFirst 3 funds:');
    funds.slice(0, 3).forEach((fund, index) => {
      console.log(`${index + 1}. ${fund.name} (${fund.code})`);
      console.log(`   - Daily Return: ${fund.dailyReturn * 100}%`);
      console.log(`   - Duration: ${fund.duration} days`);
      console.log(`   - Min Investment: ${fund.minInvestment}`);
      console.log(`   - Progress: ${fund.progress}%`);
      console.log('');
    });
    
    // Check specific funds
    const dc60 = funds.find(f => f.code === 'DC60');
    const vic25 = funds.find(f => f.code === 'VIC25');
    
    if (dc60) {
      console.log('✅ DC60 Found:');
      console.log(`   - Daily Return: ${dc60.dailyReturn * 100}% (Expected: 0.4%)`);
      console.log(`   - Duration: ${dc60.duration} days (Expected: 60)`);
      console.log(`   - Progress: ${dc60.progress}% (Expected: 200%)`);
    }
    
    if (vic25) {
      console.log('\n✅ VIC25 Found:');
      console.log(`   - Daily Return: ${vic25.dailyReturn * 100}% (Expected: 2.2%)`);
      console.log(`   - Duration: ${vic25.duration} days (Expected: 365)`);
      console.log(`   - Progress: ${vic25.progress}% (Expected: 1500%)`);
    }
    
    console.log('\n🎉 Data verification complete!');
    console.log(`🌐 Frontend URL: ${baseURL}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

clearCacheAndTest();
