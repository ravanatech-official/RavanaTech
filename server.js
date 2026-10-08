import express from 'express';
import compression from 'compression';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Global Industrial Standards: Gzip Compression Middleware
app.use(compression());

// Global Industrial Standards: Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

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

// Serve conceptual projects directory directly under multiple common route paths
const conceptualProjectsDir = path.join(__dirname, 'conceptual projects');
app.use('/conceptual projects', express.static(conceptualProjectsDir));
app.use('/conceptual-projects', express.static(conceptualProjectsDir));
app.use('/conceptual%20projects', express.static(conceptualProjectsDir));

// API route to list all conceptual projects
app.get('/api/conceptual-projects', (req, res) => {
  try {
    if (!fs.existsSync(conceptualProjectsDir)) {
      return res.json({ success: true, count: 0, projects: [] });
    }
    const files = fs.readdirSync(conceptualProjectsDir).filter(f => f.endsWith('.html'));
    res.json({
      success: true,
      count: files.length,
      projects: files.map(filename => ({
        filename,
        url: `/conceptual projects/${encodeURIComponent(filename)}`,
        cleanUrl: `/conceptual-projects/${encodeURIComponent(filename)}`
      }))
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve all static files from root directory
app.use(express.static(__dirname));

// Dedicated Projects Archive Screen
app.get(['/projects', '/projects.html', '/gallery', '/gallery.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'projects.html'));
});

// Fallback to index.html for navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
});

