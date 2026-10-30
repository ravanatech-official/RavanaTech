import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { chromium } from 'playwright-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let server, browser, origin;

before(async () => {
    const app = express();
    app.get('/contact', (_request, response) => response.sendFile(path.join(root, 'public-build/index.html')));
    app.use(express.static(path.join(root, 'public-build')));
    server = app.listen(0, '127.0.0.1');
    await new Promise((resolve, reject) => {
        server.once('listening', resolve);
        server.once('error', reject);
    });
    origin = `http://127.0.0.1:${server.address().port}`;
    // GitHub's Ubuntu runner and the developer's Windows machine provide
    // Chrome. Missing Chrome is a test failure, never a silently skipped suite.
    browser = await chromium.launch({ channel: 'chrome', headless: true });
});

after(async () => {
    if (browser) await browser.close();
    if (server) await new Promise((resolve) => server.close(resolve));
});

async function openForm(viewport, { firebaseUnavailable = false } = {}) {
    const context = await browser.newContext({ viewport, serviceWorkers: 'block' });
    let restWrites = 0;
    await context.addInitScript(() => { window.__qaWriteCalls = 0; });
    await context.route('**/*', async (route) => {
        const url = new URL(route.request().url());
        if (url.origin === origin) {
            if (url.pathname === '/api/inquiry') {
                restWrites += 1;
                return route.fulfill({ status: 404, body: 'No synthetic REST endpoint' });
            }
            return route.continue();
        }
        // No request may leave the loopback fixture. Even Firebase SDK imports
        // are synthetic modules; no production inquiry or Analytics is sent.
        if (url.hostname === 'www.gstatic.com' && /\/firebase-[\w-]+\.js$/.test(url.pathname)) {
            if (firebaseUnavailable) return route.abort();
            let body = '';
            if (url.pathname.endsWith('/firebase-app.js')) {
                body = 'export function initializeApp() { return {}; }';
            } else if (url.pathname.endsWith('/firebase-analytics.js')) {
                body = 'export function getAnalytics() { return null; }';
            } else if (url.pathname.endsWith('/firebase-firestore.js')) {
                body = `
                    export function getFirestore() { return {}; }
                    export function collection() { return {}; }
                    export function serverTimestamp() { return 'SYNTHETIC_TIMESTAMP'; }
                    export function addDoc(_collection, data) {
                        window.__qaWriteCalls += 1;
                        window.__qaSubmitted = data;
                        return new Promise((resolve, reject) => {
                            window.__qaResolve = () => resolve({ id: 'SYNTHETIC_CONFIRMED_REFERENCE' });
                            window.__qaReject = () => reject(new Error('Synthetic permission denial'));
                        });
                    }
                `;
            }
            return route.fulfill({ status: 200, contentType: 'text/javascript', body });
        }
        return route.fulfill({ status: 200, contentType: url.pathname.endsWith('.js') ? 'text/javascript' : 'text/css', body: '' });
    });
    const page = await context.newPage();
    await page.goto(`${origin}/contact`, { waitUntil: 'networkidle' });
    await page.locator('#sender-name').fill('<img src=x onerror=alert(1)>');
    await page.locator('#sender-email').fill('test@example.invalid');
    await page.locator('#sender-message').fill('SYNTHETIC_BROWSER_INQUIRY_ONLY');
    return { context, page, restWrites: () => restWrites };
}

for (const [label, viewport] of [
    ['desktop', { width: 1440, height: 1000 }],
    ['mobile', { width: 390, height: 844 }],
]) {
    test(`${label}: pending, failure, retry and confirmed success preserve the right form state`, { timeout: 45000 }, async () => {
        const view = await openForm(viewport);
        const { page } = view;
        try {
            await page.locator('#contact-form button[type="submit"]').click();
            await page.waitForFunction(() => window.__qaWriteCalls === 1);
            await page.locator('#contact-form').dispatchEvent('submit');
            assert.equal(await page.evaluate(() => window.__qaWriteCalls), 1);
            assert.equal(await page.locator('#form-feedback.pending').isVisible(), true);
            assert.equal(await page.locator('#sender-message').isDisabled(), true);
            assert.equal(await page.locator('#form-feedback.success').count(), 0);

            await page.evaluate(() => window.__qaReject());
            await page.waitForSelector('#form-feedback.error');
            assert.equal(await page.locator('#sender-message').inputValue(), 'SYNTHETIC_BROWSER_INQUIRY_ONLY');
            assert.equal(await page.locator('#contact-form button[type="submit"]').isEnabled(), true);

            await page.locator('#contact-form button[type="submit"]').click();
            await page.waitForFunction(() => window.__qaWriteCalls === 2);
            await page.evaluate(() => window.__qaResolve());
            await page.waitForSelector('#form-feedback.success');
            assert.match(await page.locator('#form-feedback').innerText(), /SYNTHETIC_CONFIRMED_REFERENCE/);
            assert.match(await page.locator('#form-feedback').innerText(), /<img src=x onerror=alert\(1\)>/);
            assert.equal(await page.locator('#form-feedback img').count(), 0);
            assert.equal(await page.locator('#sender-message').inputValue(), '');
            const handoff = await page.locator('#form-feedback a').getAttribute('href');
            assert.match(decodeURIComponent(handoff), /SYNTHETIC_BROWSER_INQUIRY_ONLY/);
            assert.equal(view.restWrites(), 0);
        } finally {
            await view.context.close();
        }
    });
}

test('offline browser retains the draft without queueing a write', { timeout: 45000 }, async () => {
    const { context, page } = await openForm({ width: 390, height: 844 });
    try {
        await context.setOffline(true);
        await page.locator('#contact-form button[type="submit"]').click();
        await page.waitForSelector('#form-feedback.error');
        assert.match(await page.locator('#form-feedback').innerText(), /offline/i);
        assert.equal(await page.evaluate(() => window.__qaWriteCalls), 0);
        assert.equal(await page.locator('#sender-message').inputValue(), 'SYNTHETIC_BROWSER_INQUIRY_ONLY');
    } finally {
        await context.close();
    }
});

test('blocked Firebase SDK still leaves a working error state and the message intact', { timeout: 45000 }, async () => {
    const { context, page } = await openForm({ width: 1440, height: 1000 }, { firebaseUnavailable: true });
    try {
        await page.locator('#contact-form button[type="submit"]').click();
        await page.waitForSelector('#form-feedback.error');
        assert.equal(await page.locator('#form-feedback.success').count(), 0);
        assert.equal(await page.locator('#sender-message').inputValue(), 'SYNTHETIC_BROWSER_INQUIRY_ONLY');
        assert.equal(await page.locator('#contact-form button[type="submit"]').isEnabled(), true);
    } finally {
        await context.close();
    }
});
