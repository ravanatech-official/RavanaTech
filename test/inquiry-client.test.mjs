import assert from 'node:assert/strict';
import { test } from 'node:test';
import { tsImport } from 'tsx/esm/api';

const { postInquiry } = await tsImport('../src/lib/inquiry.ts', import.meta.url);
const inquiry = { name: 'Test Customer', email: 'test@example.invalid', service: 'Website', message: 'Synthetic inquiry only.' };

test('the API client accepts only a successful, server-generated receipt', async () => {
    const id = await postInquiry(inquiry, async (url, options) => {
        assert.equal(url, '/api/inquiry');
        assert.equal(options.method, 'POST');
        assert.deepEqual(JSON.parse(options.body), { ...inquiry, source: 'react_website_contact_form' });
        return new Response(JSON.stringify({ success: true, leadId: 'server-reference' }), { status: 200 });
    });
    assert.equal(id, 'server-reference');
});

for (const [status, payload] of [
    [400, { success: false }], [500, { success: true, leadId: 'invalid-receipt' }],
    [200, { success: false, leadId: 'invalid-receipt' }], [200, {}],
    [200, { success: true }], [200, { success: true, leadId: '   ' }],
]) {
    test(`the API client rejects HTTP ${status} with ${JSON.stringify(payload)}`, async () => {
        await assert.rejects(postInquiry(inquiry, async () => new Response(JSON.stringify(payload), { status })));
    });
}

test('HTML/invalid JSON and network failures never become generated receipts', async () => {
    await assert.rejects(postInquiry(inquiry, async () => new Response('<html>Not found</html>', { status: 404 })));
    await assert.rejects(postInquiry(inquiry, async () => { throw new Error('network unavailable'); }));
});
