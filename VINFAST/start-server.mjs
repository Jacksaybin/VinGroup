#!/usr/bin/env node
process.env.NODE_ENV = 'development';
process.env.PORT = '5000';

import('./server/index.ts').then(() => {
  console.log('✅ Server script executed successfully');
}).catch((error) => {
  console.error('❌ Server startup error:', error);
});
