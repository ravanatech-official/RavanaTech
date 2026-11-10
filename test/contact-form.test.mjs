import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import { bindContactForm } from '../assets/js/contact-form.js';

// Execute each real initialization entry point against synthetic SDK boundaries.
// No Firebase connection, Analytics request or production write is made.
for (const entry of ['index.html', 'firebase-init.js', 'assets/js/firebase-init.js']) {
    test(`${entry}: inquiries use the named database and await persistence`, async () => {
        let source = await readFile(new URL(`../${entry}`, import.meta.url), 'utf8');
        if (entry.endsWith('.html')) {
            source = [...source.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)]
                .map((match) => match[1]).find((script) => script.includes('window.saveInquiryToFirestore'));
            assert.ok(source, 'the production Firebase initialization module must be present');
        }
        source = source.replace(/^\s*import .* from "firebase\/[^\"]+";\s*$/gm, '')
            .replace(/^export (?=(?:const|let|async function))/gm, '');
        const persistence = deferred();
        const writes = [];
        const context = {
            window: {}, document: { getElementById: () => null },
            console: { info() {}, log() {}, warn() {} },
            initializeApp: (options) => ({ options }), getAnalytics: () => null,
            getFirestore: (app, databaseId = '(default)') => ({ projectId: app.options.projectId, databaseId }),
            initializeFirestore: (app, _settings, databaseId = '(default)') => ({ projectId: app.options.projectId, databaseId }),
            collection: (database, collectionPath) => ({ database, collectionPath }),
            serverTimestamp: () => 'SYNTHETIC_TIMESTAMP',
            addDoc: (target, data) => { writes.push({ target, data }); return persistence.promise; },
        };
        runInNewContext(source, context, { filename: entry, timeout: 1000 });
        const pending = context.window.saveInquiryToFirestore({
            name: 'Synthetic Test', email: 'test@example.invalid', system: 'Test', message: 'SYNTHETIC_ONLY',
        });
        assert.equal(writes.length, 1);
        assert.deepEqual(writes[0].target.database, {
            projectId: 'ravanatec',
            databaseId: 'ai-studio-ravanatitan-8de985fc-ffd0-4255-bc23-fd8f4d49d7d3',
        });
        assert.equal(writes[0].target.collectionPath, 'inquiries');
        assert.equal(writes[0].data.message, 'SYNTHETIC_ONLY');
        let settled = false;
        pending.then(() => { settled = true; });
        await Promise.resolve();
        assert.equal(settled, false, 'a queued write must not be reported as saved');
        persistence.resolve({ id: 'SYNTHETIC_CONFIRMED_REFERENCE' });
        const result = await pending;
        assert.equal(result.success, true);
        assert.equal(result.id, 'SYNTHETIC_CONFIRMED_REFERENCE');
    });
}

// Small DOM boundary doubles; browser rendering is checked separately.
function element(value = '') {
    let text = '';
    const node = {
        value, disabled: false, innerHTML: '<i></i> Submit', children: [],
        attributes: new Map(),
        appendChild(child) { this.children.push(child); },
        setAttribute(key, value) { this.attributes.set(key, value); },
        get textContent() { return text; },
        set textContent(value) { text = value; this.children = []; },
    };
    return node;
}

function fixture(saveInquiry, options = {}) {
    const fields = ['Test Customer', 'test@example.invalid', 'Business Website', 'Synthetic project inquiry only.'].map(element);
    const button = element();
    const feedback = element();
    const ids = ['sender-name', 'sender-email', 'sender-system', 'sender-message'];
    const form = {
        resetCount: 0, listeners: [], attributes: new Map(),
        ownerDocument: { createElement: () => element() },
        querySelector(selector) { return selector.startsWith('#') ? fields[ids.indexOf(selector.slice(1))] : button; },
        addEventListener(name, handler) { this.listeners.push({ name, handler }); },
        checkValidity() { return true; }, reportValidity() {},
        setAttribute(key, value) { this.attributes.set(key, value); },
        reset() { this.resetCount += 1; for (const field of fields) field.value = ''; },
    };
    const handler = bindContactForm(form, feedback, { saveInquiry, ...options });
    return { fields, button, feedback, form, submit: () => handler({ preventDefault() {} }) };
}

function deferred() {
    let resolve, reject;
    const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
    return { promise, resolve, reject };
}

test('pending and repeated submits produce one write and no success before acknowledgement', async () => {
    const write = deferred();
    let calls = 0;
    const view = fixture(() => { calls += 1; return write.promise; });
    const pending = view.submit();
    await view.submit();
    assert.equal(calls, 1);
    assert.equal(view.button.disabled, true);
    assert.ok(view.fields.every((field) => field.disabled));
    assert.match(view.feedback.className, /pending/);
    assert.equal(view.form.resetCount, 0);
    write.resolve({ success: true, id: 'confirmed-reference' });
    await pending;
    assert.match(view.feedback.className, /success/);
    assert.match(view.feedback.textContent, /confirmed-reference/);
    assert.equal(view.form.resetCount, 1);
    assert.equal(view.button.disabled, false);
    assert.equal(view.form.attributes.get('aria-busy'), 'false');
});

for (const result of [undefined, null, { success: false }, { success: true }, { success: true, id: '' }, { success: true, id: '   ' }, { success: 'true', id: 'not-confirmed' }]) {
    test(`unconfirmed result ${JSON.stringify(result)} preserves the message and enables retry`, async () => {
        const view = fixture(async () => result);
        const values = view.fields.map((field) => field.value);
        await view.submit();
        assert.match(view.feedback.className, /error/);
        assert.deepEqual(view.fields.map((field) => field.value), values);
        assert.equal(view.form.resetCount, 0);
        assert.equal(view.button.disabled, false);
        assert.equal(view.feedback.children[0].textContent, 'Contact us on WhatsApp');
    });
}

test('permission/network rejection preserves input and a subsequent confirmed retry succeeds', async () => {
    let calls = 0;
    const view = fixture(async () => {
        calls += 1;
        if (calls === 1) throw new Error('permission-denied');
        return { success: true, id: 'retry-confirmed' };
    });
    await view.submit();
    assert.match(view.feedback.className, /error/);
    assert.equal(view.fields[3].value, 'Synthetic project inquiry only.');
    await view.submit();
    assert.equal(calls, 2);
    assert.match(view.feedback.className, /success/);
    assert.equal(view.form.resetCount, 1);
});

test('a known offline state does not queue a write or clear any fields', async () => {
    let calls = 0;
    const view = fixture(() => { calls += 1; }, { isOnline: () => false });
    await view.submit();
    assert.equal(calls, 0);
    assert.match(view.feedback.textContent, /offline/);
    assert.equal(view.form.resetCount, 0);
    assert.equal(view.button.disabled, false);
});

test('an unavailable Firebase helper produces an error rather than a receipt', async () => {
    const view = fixture(undefined);
    await view.submit();
    assert.match(view.feedback.className, /error/);
    assert.equal(view.form.resetCount, 0);
});

test('slow confirmation keeps the original request pending and clears its notice on settlement', async () => {
    const write = deferred();
    let calls = 0;
    const view = fixture(() => { calls += 1; return write.promise; }, { pendingNoticeMs: 1 });
    const pending = view.submit();
    await new Promise((resolve) => setTimeout(resolve, 10));
    assert.match(view.feedback.textContent, /still waiting for confirmation/);
    await view.submit();
    assert.equal(calls, 1);
    write.reject(new Error('unavailable'));
    await pending;
    await new Promise((resolve) => setTimeout(resolve, 10));
    assert.match(view.feedback.className, /error/);
    assert.equal(view.button.disabled, false);
    assert.equal(view.form.resetCount, 0);
});

test('validation failure never contacts the persistence service', async () => {
    let calls = 0;
    const view = fixture(() => { calls += 1; });
    view.fields[0].value = '   ';
    await view.submit();
    assert.equal(calls, 0);
    assert.match(view.feedback.className, /error/);
});

test('binding twice does not register another submission handler', () => {
    const view = fixture(async () => ({ success: true, id: 'reference' }));
    bindContactForm(view.form, view.feedback);
    assert.equal(view.form.listeners.length, 1);
});

test('success renders customer text literally and the WhatsApp handoff keeps the submitted data', async () => {
    const view = fixture(async () => ({ success: true, id: 'reference' }));
    view.fields[0].value = '<img src=x onerror=alert(1)>';
    await view.submit();
    assert.match(view.feedback.textContent, /<img src=x onerror=alert\(1\)>/);
    assert.equal(view.feedback.children.length, 1);
    const link = view.feedback.children[0];
    assert.match(decodeURIComponent(link.href), /Synthetic project inquiry only/);
    assert.match(decodeURIComponent(link.href), /<img src=x onerror=alert\(1\)>/);
    assert.equal(link.rel, 'noopener noreferrer');
});
