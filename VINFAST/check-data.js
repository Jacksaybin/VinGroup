// Quick test to check if data is updated correctly
const { tempFundsData } = require('./server/temp-funds');

console.log('🔍 Checking updated fund data:');
console.log('Total funds:', tempFundsData.length);

console.log('\n📊 Sample fund data:');
const dc60 = tempFundsData.find(f => f.code === 'DC60');
if (dc60) {
  console.log('DC60 Fund:');
  console.log('- Name:', dc60.name);
  console.log('- Daily Return:', dc60.dailyReturn);
  console.log('- Duration:', dc60.duration, 'days');
  console.log('- Min Investment:', dc60.minInvestment);
  console.log('- Progress:', dc60.progress + '%');
}

const vic25 = tempFundsData.find(f => f.code === 'VIC25');
if (vic25) {
  console.log('\nVIC25 Fund:');
  console.log('- Name:', vic25.name);
  console.log('- Daily Return:', vic25.dailyReturn);
  console.log('- Duration:', vic25.duration, 'days');
  console.log('- Min Investment:', vic25.minInvestment);
  console.log('- Progress:', vic25.progress + '%');
}

console.log('\n✅ Data verification complete');
