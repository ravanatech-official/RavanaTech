import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-routes-and-conceptual-projects',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url ? decodeURIComponent(req.url) : '';
          
          if (url.startsWith('/api/health')) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              status: 'HEALTHY',
              version: '3.0.0-react',
              architecture: 'React 19 + Vite Supercharged',
              metrics: {
                latency: '0.2ms',
                readyBlueprints: 50
              }
            }));
            return;
          }

          if (url.startsWith('/api/conceptual-projects')) {
            const conceptualDir = path.resolve(import.meta.dirname, 'conceptual projects');
            let files: string[] = [];
            if (fs.existsSync(conceptualDir)) {
              files = fs.readdirSync(conceptualDir).filter(f => f.endsWith('.html'));
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              count: files.length,
              projects: files.map(filename => ({
                filename,
                url: `/conceptual projects/${encodeURIComponent(filename)}`,
                cleanUrl: `/conceptual-projects/${encodeURIComponent(filename)}`
              }))
            }));
            return;
          }

          if (url.startsWith('/api/document-sim') && req.method === 'POST') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              engine: 'Ravana Tech Cognitive OCR & EDMS Pipeline',
              timestamp: new Date().toISOString(),
              document: {
                docId: 'SUB-STR-2026-0442',
                title: 'Architectural Facade Glazing & Structural Framing Submittal',
                discipline: 'Structural & Architectural',
                revision: 'Rev 03',
                status: 'CODE 1 - APPROVED WITH NO COMMENTS',
                issuingParty: 'Al-Farooq Façade Engineering LLC',
                receivedDate: new Date().toISOString().split('T')[0],
                normalizedFilename: 'RT-EDMS_SUB_STR_0442_REV03_APP.pdf',
                cloudPath: '/Google_Cloud/EDMS/2026/Structural/Submittals/Approved/',
                confidence: '99.98%'
              }
            }));
            return;
          }

          if (url.startsWith('/api/inquiry') && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  message: 'Inquiry received by Ravana Tech dispatch queue.',
                  inquiryId: 'INQ-' + Date.now(),
                  timestamp: new Date().toISOString()
                }));
              } catch (e) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
              }
            });
            return;
          }

          next();
        });
      }
    }
  ],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  preview: {
    host: '0.0.0.0',
    port: 3000
  }
});
