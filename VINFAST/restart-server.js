// Script to restart server with fresh data
const { spawn } = require('child_process');

console.log('🔄 Restarting VinFast V-Green Server...');

// Kill existing processes
const killProcess = spawn('taskkill', ['/f', '/im', 'node.exe'], { shell: true });

killProcess.on('close', (code) => {
  console.log('🛑 Killed existing processes');
  
  // Wait a moment
  setTimeout(() => {
    console.log('🚀 Starting fresh server...');
    
    // Start new server
    const server = spawn('npx', ['tsx', 'server/index.ts'], {
      stdio: 'inherit',
      shell: true
    });
    
    server.on('error', (err) => {
      console.error('❌ Server start failed:', err);
    });
    
    console.log('✅ Server restarting...');
    
  }, 2000);
});
