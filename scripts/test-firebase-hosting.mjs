import { cp, mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectId = 'demo-ravana-public-file-security';
const localCli = path.join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'firebase.cmd' : 'firebase');

async function unusedLoopbackPort() {
  const server = net.createServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const port = server.address().port;
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  return port;
}

function shellQuote(value) {
  if (process.platform === 'win32') return `'${value.replaceAll("'", "''")}'`;
  return `'${value.replaceAll("'", "'\\''")}'`;
}

if (!await readFile(localCli).then(() => true, () => false)) {
  throw new Error('Firebase CLI is missing from node_modules/.bin. Run npm ci; do not install it globally.');
}

const workspace = await mkdtemp(path.join(os.tmpdir(), 'ravana-firebase-hosting-'));
try {
  const publicDir = path.join(root, 'public-build');
  await cp(publicDir, path.join(workspace, 'public-build'), { recursive: true });

  const config = JSON.parse(await readFile(path.join(root, 'firebase.json'), 'utf8'));
  const port = await unusedLoopbackPort();
  config.emulators = {
    hosting: { host: '127.0.0.1', port },
    ui: { enabled: false },
    singleProjectMode: true,
  };
  await writeFile(path.join(workspace, 'firebase.json'), JSON.stringify(config, null, 2));

  const marker = 'SYNTHETIC_HOSTING_PRIVATE_FIXTURE_ONLY';
  const fixturePaths = [
    'data/leads-db.json', 'server.js', 'server.ts', 'package.json', 'package-lock.json', '.env',
    '.git/HEAD', 'firebase-init.js', 'firebase-applet-config.json', 'vite.config.ts', 'metadata.json',
    'src/types.ts', 'assets/data/leads-db.json', 'assets/server.js', 'assets/js/data/leads-db.json',
    'assets/js/server.js', 'assets/js/package.json', 'assets/js/.git/HEAD', 'assets/css/server.js',
    'assets/img/data/leads-db.json',
  ];
  for (const relativePath of fixturePaths) {
    const fixture = path.join(workspace, relativePath);
    await mkdir(path.dirname(fixture), { recursive: true });
    const content = relativePath === 'data/leads-db.json'
      ? JSON.stringify({ inquiries: [{ marker }] })
      : relativePath === 'package.json'
        ? JSON.stringify({ name: 'hosting-test-fixture', type: 'module', marker })
        : marker;
    await writeFile(fixture, content, 'utf8');
  }

  const command = 'node --test test/firebase-hosting-http.test.mjs';
  const args = [
    'emulators:exec', '--only', 'hosting', '--project', projectId,
    '--config', path.join(workspace, 'firebase.json'), command,
  ];
  const env = { ...process.env, CI: 'true', XDG_CONFIG_HOME: path.join(workspace, 'firebase-cli-config') };
  for (const key of [
    'FIREBASE_TOKEN', 'FIREBASE_CLI_TOKEN', 'FIREBASE_SERVICE_ACCOUNT',
    'FIREBASE_SERVICE_ACCOUNT_RAVANATEC', 'FIREBASE_CONFIG',
    'GOOGLE_APPLICATION_CREDENTIALS', 'GCLOUD_PROJECT', 'GOOGLE_CLOUD_PROJECT',
  ]) delete env[key];
  env.FIREBASE_HOSTING_TEST_URL = `http://127.0.0.1:${port}`;
  env.FIREBASE_CLI_DISABLE_UPDATE_CHECK = 'true';

  const child = process.platform === 'win32'
    ? spawn('powershell.exe', [
      '-NoLogo', '-NoProfile', '-Command',
      `& ${shellQuote(localCli)} ${args.map(shellQuote).join(' ')}; exit $LASTEXITCODE`,
    ], { cwd: root, env, windowsHide: true, stdio: 'inherit' })
    : spawn(localCli, args, { cwd: root, env, stdio: 'inherit' });
  const exitCode = await new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', (code, signal) => {
      if (signal) reject(new Error(`Firebase Hosting emulator stopped by ${signal}`));
      else resolve(code ?? 1);
    });
  });
  if (exitCode !== 0) throw new Error(`Firebase Hosting emulator regression suite failed with exit code ${exitCode}.`);
} finally {
  await rm(workspace, { recursive: true, force: true });
}
