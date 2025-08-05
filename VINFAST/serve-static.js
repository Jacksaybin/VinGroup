import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;

// Serve static files từ thư mục app-dist
app.use(express.static(path.join(__dirname, 'app-dist')));

// Handle client-side routing (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app-dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
  console.log(`📊 Admin Backend: http://localhost:${PORT}/#/admin-backend`);
  console.log(`📁 Serving từ: ${path.join(__dirname, 'app-dist')}`);
});
