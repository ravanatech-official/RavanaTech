import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'public-build');

// Public files are deliberately enumerated here. The demo pages are sourced
// from the public gallery registry and constrained to safe, flat HTML names.
const rootFiles = [
  'index.html',
  'projects.html',
  'services.html',
  'googled6cb87aabbea33cf.html',
  'styles.css',
  'main.js',
  'ravana.webp',
  'favicon.ico',
  'favicon.png',
  'favicon.svg',
  'apple-touch-icon.png',
  'manifest.json',
  'manifest.webmanifest',
  'assets/js/projects-data.js',
  'assets/js/gallery.js',
  'assets/js/main.js',
  'assets/js/firebase-init.js',
  'assets/js/contact-form.js',
  'assets/img/image_01_opt.webp',
  'assets/img/image_01_1791448896391.jpg',
  'assets/img/ravana_banner_opt.webp',
  'assets/img/ravana_banner_1791448914226.jpg',
  'assets/img/work1.jpg',
  'assets/img/work2.jpg',
  'assets/img/work3.jpg',
  'assets/img/work4.jpg',
  'assets/img/work5.jpg',
  'assets/img/work6.jpg',
  // Gallery cards use these root-relative image URLs.
  'work1.jpg',
  'work2.jpg',
  'work3.jpg',
  'work4.jpg',
  'work5.jpg',
  'work6.jpg',
];

const mappedFiles = [
  {
    source: 'src/assets/images/ravana_tech_logo_1792581937150.jpg',
    destination: 'assets/img/ravana_tech_logo_1792581937150.jpg',
  },
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const relativePath of rootFiles) {
  await cp(path.join(root, relativePath), path.join(output, relativePath));
}
for (const { source, destination } of mappedFiles) {
  await cp(path.join(root, source), path.join(output, destination));
}

const registry = await readFile(path.join(root, 'assets/js/projects-data.js'), 'utf8');
const demoNames = [...registry.matchAll(/"filename"\s*:\s*"([^"/\\]+\.html)"/g)]
  .map((match) => match[1]);
if (demoNames.length !== 50 || new Set(demoNames).size !== demoNames.length) {
  throw new Error(`Expected 50 unique gallery demo filenames, found ${demoNames.length}.`);
}

const demoDirectory = path.join(output, 'conceptual projects');
await mkdir(demoDirectory, { recursive: true });
for (const filename of demoNames) {
  if (!/^[\w .-]+\.html$/.test(filename)) {
    throw new Error(`Unsafe demo filename in gallery registry: ${filename}`);
  }
  const source = path.join(root, 'conceptual projects', filename);
  const destination = path.join(demoDirectory, filename);
  await cp(source, destination);
}

console.log(`Built public site at ${path.relative(root, output)} (${rootFiles.length + mappedFiles.length + demoNames.length} allowlisted files).`);
