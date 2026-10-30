import assert from 'node:assert/strict';
import http from 'node:http';
import { test } from 'node:test';

const baseUrl = process.env.FIREBASE_HOSTING_TEST_URL;
if (!baseUrl || new URL(baseUrl).protocol !== 'http:' || new URL(baseUrl).hostname !== '127.0.0.1') {
  throw new Error('FIREBASE_HOSTING_TEST_URL must point to a loopback Firebase Hosting emulator.');
}

function request(method, route, redirects = 0, redirectHistory = []) {
  assert.ok(redirects <= 3, `too many redirects for ${route}`);
  const target = new URL(baseUrl);
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: target.hostname, port: target.port, method, path: route, agent: false }, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
          let next;
          try {
            next = new URL(res.headers.location, target);
            assert.equal(next.origin, target.origin, 'redirect must remain on the emulator origin');
            assert.equal(next.hostname, '127.0.0.1', 'redirect must remain loopback-only');
          } catch (error) {
            reject(error);
            return;
          }
          const nextPath = `${next.pathname}${next.search}`;
          resolve(request(method, nextPath, redirects + 1, [
            ...redirectHistory,
            { status: res.statusCode, method, location: nextPath },
          ]));
          return;
        }
        resolve({
          method,
          redirects: redirectHistory,
          status: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(chunks).toString('utf8'),
        });
      });
    });
    req.once('error', reject);
    req.end();
  });
}

test('Firebase Hosting serves main pages, known clean routes, assets, and demos', async (t) => {
  const accessible = [
    ['/', /RAVANA TECH/i, null], ['/home', /RAVANA TECH/i, null], ['/about', /RAVANA TECH/i, null],
    ['/systems', /RAVANA TECH/i, null], ['/services', /Web Solutions & Services/i, null],
    ['/projects', /Conceptual Blueprints Archive/i, null], ['/contact', /RAVANA TECH/i, null],
    ['/ai-lab', /RAVANA TECH/i, null], ['/automation', /RAVANA TECH/i, null],
    ['/lab', /RAVANA TECH/i, null], ['/experience', /RAVANA TECH/i, null],
    ['/projects.html', /Conceptual Blueprints Archive/i, '/projects'],
    ['/archive', /Conceptual Blueprints Archive/i, null],
    ['/services.html', /Web Solutions & Services/i, '/services'],
    ['/all-services', /Web Solutions & Services/i, null],
    ['/styles.css', /:root/], ['/main.js', /initDeckRoute/], ['/assets/js/gallery.js', /renderGallery/],
    ['/assets/img/image_01_opt.webp', null],
    ['/assets/img/ravana_tech_logo_1792581937150.jpg', null],
    ['/manifest.webmanifest', /icons/], ['/ravana.webp', null], ['/work1.jpg', null],
    ['/conceptual%20projects/Conceptual%20Site%20for%20Bakery.html', /React Artifact/, '/conceptual%20projects/Conceptual%20Site%20for%20Bakery'],
    ['/conceptual%20projects/Conceptual_Site_for_Yoga_Studio.html', /Yoga Studio/i, '/conceptual%20projects/Conceptual_Site_for_Yoga_Studio'],
  ];
  for (const [route, expected, redirectTo = null] of accessible) {
    await t.test(`GET ${route}`, async () => {
      const response = await request('GET', route);
      assert.equal(response.status, 200, `${route} returned ${response.status}`);
      assert.deepEqual(response.redirects.map((redirect) => redirect.location), redirectTo ? [redirectTo] : []);
      assert.ok(response.redirects.every((redirect) => redirect.method === 'GET'));
      if (expected) assert.match(response.body, expected);
      else {
        assert.ok(response.body.length > 0, `${route} returned an empty body`);
        assert.doesNotMatch(response.headers['content-type'] || '', /text\/html/i);
      }
    });
    if (redirectTo) {
      await t.test(`HEAD ${route} redirects to ${redirectTo} without changing method`, async () => {
        const response = await request('HEAD', route);
        assert.equal(response.status, 200);
        assert.deepEqual(response.redirects.map((redirect) => redirect.location), [redirectTo]);
        assert.ok(response.redirects.every((redirect) => redirect.method === 'HEAD'));
        assert.equal(response.method, 'HEAD');
        assert.equal(response.body, '');
      });
    }
  }
});

test('Firebase Hosting rejects private files, aliases, and normalized traversal for GET and HEAD', async (t) => {
  const marker = 'SYNTHETIC_HOSTING_PRIVATE_FIXTURE_ONLY';
  const privatePaths = [
    '/data/leads-db.json', '/assets/data/leads-db.json', '/assets/js/data/leads-db.json',
    '/server.js', '/assets/server.js', '/assets/js/server.js', '/server.ts',
    '/package.json', '/package-lock.json', '/.env', '/.git/HEAD',
    '/firebase-init.js', '/firebase-applet-config.json', '/vite.config.ts', '/src/types.ts', '/metadata.json',
    '/assets/js/package.json', '/assets/js/.git/HEAD', '/assets/css/server.js',
    '/assets/img/data/leads-db.json', '/assets/js/../../package.json',
    '/assets%2fjs%2f..%2f..%2fpackage.json', '/conceptual%20projects/../server.js',
    '/%252e%252egit/HEAD',
  ];

  for (const route of privatePaths) {
    await t.test(`GET ${route}`, async () => {
      const response = await request('GET', route);
      assert.ok([403, 404].includes(response.status), `private path returned ${response.status}`);
      assert.doesNotMatch(response.body, new RegExp(marker));
    });
    await t.test(`HEAD ${route}`, async () => {
      const response = await request('HEAD', route);
      assert.ok([403, 404].includes(response.status), `private path returned ${response.status}`);
      assert.equal(response.body, '');
    });
  }
});

test('Firebase Hosting returns 404 for unknown paths with GET and HEAD', async (t) => {
  for (const method of ['GET', 'HEAD']) {
    await t.test(`${method} /does-not-exist`, async () => {
      const response = await request(method, '/does-not-exist');
      assert.equal(response.status, 404);
      if (method === 'GET') assert.doesNotMatch(response.body, /RAVANA TECH/i);
      else assert.equal(response.body, '');
    });
  }
});
