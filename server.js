import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Serve assets folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Static asset alias fallbacks
app.use('/assets/css', express.static(path.join(__dirname, 'assets/css')));
app.use('/assets/css', express.static(__dirname));
app.use('/assets/js', express.static(path.join(__dirname, 'assets/js')));
app.use('/assets/js', express.static(__dirname));
app.use('/assets/img', express.static(path.join(__dirname, 'assets/img')));
app.use('/assets/img', express.static(__dirname));

// Serve files from assets/img at root path as well (for image 01.jpg, etc.)
app.use(express.static(path.join(__dirname, 'assets/img')));

// Serve all static files from root directory
app.use(express.static(__dirname));

// Fallback to index.html for navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
});
