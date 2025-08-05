// Script to clear cache and reload data
async function clearCache() {
  try {
    console.log('🧹 Clearing cache...');
    
    const response = await fetch('http://localhost:5000/api/admin/clear-cache', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Cache cleared successfully:', result.message);
      
      // Wait a moment then test new data
      setTimeout(async () => {
        console.log('\n📊 Testing updated fund data...');
        
        const fundsResponse = await fetch('http://localhost:5000/api/investment-funds');
        const funds = await fundsResponse.json();
        
        console.log(`Total funds loaded: ${funds.length}`);
        
        // Check first fund
        const firstFund = funds[0];
        console.log('\nFirst fund details:');
        console.log(`- Name: ${firstFund.name}`);
        console.log(`- Code: ${firstFund.code}`);
        console.log(`- Daily Return: ${firstFund.dailyReturn * 100}%`);
        console.log(`- Duration: ${firstFund.duration} days`);
        console.log(`- Min Investment: ${firstFund.minInvestment}`);
        console.log(`- Progress: ${firstFund.progress}%`);
        
        console.log('\n🎉 Data update verification complete!');
        
      }, 2000);
      
    } else {
      console.log('❌ Failed to clear cache:', response.status);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

clearCache();
