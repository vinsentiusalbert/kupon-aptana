const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    try {
        const page = await browser.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(process.env.TEST_URL || 'http://127.0.0.1:8000');
        await page.locator('[data-page="payment-setups"]').click();
        await page.locator('a[href="#payment-setups/create"]').click();
        await page.locator('#payment-form [name="setupName"]').fill('Pembayaran uji');
        await page.locator('#payment-form [name="amount"]').fill('175000');
        await page.locator('#payment-form button[type="submit"]').click();
        await page.locator('#modal[open]').waitFor();
        await page.locator('#close-modal').click();
        assert.ok(await page.locator('#other-page').getByText('Pembayaran uji', { exact: true }).count());

        await page.locator('[data-page="templates"]').click();
        await page.locator('#new-template').click();
        await page.locator('#template-form [name="name"]').fill('Template uji');
        await page.locator('#cta-payment-setup').selectOption({ label: 'Pembayaran uji' });
        await page.locator('#template-form button[type="submit"]').click();
        await page.waitForURL('**/#templates');
        await page.locator('#other-page').getByText('Template uji', { exact: true }).waitFor();

        await page.locator('[data-page="coupon-templates"]').click();
        await page.locator('a[href="#coupon-templates/create"]').click();
        for (const [name, value] of Object.entries({ name: 'Kupon uji', merchant: 'Merchant uji', reward: 'Diskon 20%', terms: 'Satu kali penggunaan.', url: 'https://example.com/kupon-uji' })) {
            await page.locator(`#coupon-form [name="${name}"]`).fill(value);
        }
        await page.locator('#coupon-form button[type="submit"]').click();
        await page.waitForURL('**/#coupon-templates');
        await page.locator('#other-page').getByText('Kupon uji', { exact: true }).waitFor();

        await page.locator('[data-page="campaign"]').click();
        await page.locator('#new-campaign').click();
        await page.locator('[data-key="templateId"]').selectOption({ label: 'Template uji' });
        await page.locator('[data-key="couponId"]').selectOption({ label: 'Kupon uji' });
        const cta = await page.locator('#preview-cta a').getAttribute('href');
        assert.ok(decodeURIComponent(cta).includes('Pembayaran uji'));
        assert.deepEqual(errors, []);
        console.log('PASS: create and save payment, WhatsApp template, coupon template; campaign uses new templates; no browser errors.');
    } finally {
        await browser.close();
    }
})().catch(error => { console.error(error); process.exitCode = 1; });
