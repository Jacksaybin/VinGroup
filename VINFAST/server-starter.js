const { spawn } = require('child_process');
const path = require('path');

// Change to the VINFAST directory
process.chdir(path.join(__dirname, '.'));

console.log('Starting VinFast V-Green Server...');
console.log('Current directory:', process.cwd());

// Start the server
const server = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
});

console.log('Server started with PID:', server.pid);
