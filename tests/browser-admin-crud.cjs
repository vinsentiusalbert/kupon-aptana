const {chromium}=require('playwright');
const assert=require('node:assert/strict');

(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const errors=[];
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  page.on('pageerror',e=>errors.push(e.message));
  const base=process.env.TEST_URL||'http://127.0.0.1:8000';
  const visit=async p=>{const response=await page.goto(base+p);assert.equal(response.status(),200,p);};
  for(const menu of ['overview','campaigns','payments','audiences','reports','payment-setups','whatsapp-templates','coupon-templates','settings']){await visit('/'+menu);await page.locator('main h1').first().waitFor();}
  await visit('/payment-setups/create');
  await page.locator('[name="setupName"]').fill('Pembayaran QA');
  await page.locator('[name="amount"]').fill('175000');
  await page.locator('#payment-form button[type="submit"]').click();
  await page.waitForURL(/\/payment-setups\/demo-/);const paymentUrl=page.url();
  await page.locator('#record-detail').getByText('Pembayaran QA',{exact:true}).waitFor();
  const checkout=await page.locator('#record-detail a.primary').getAttribute('href');
  await visit(new URL(checkout).pathname+new URL(checkout).search);
  assert.equal(await page.locator('#checkout-amount').textContent(),'Rp175.000');
  await visit(new URL(paymentUrl).pathname+'/edit');
  await page.locator('[name="amount"]').fill('200000');
  await page.locator('#payment-form button[type="submit"]').click();await page.waitForURL(paymentUrl);
  await page.locator('#record-detail').getByText('Rp200.000',{exact:true}).waitFor();
  await visit('/whatsapp-templates/create');
  await page.locator('[name="name"]').fill('Template QA');
  await page.locator('[data-payment-choice] select').selectOption({label:'Pembayaran QA'});
  await page.locator('#add-cta').click();
  await page.locator('[data-cta-name]').nth(1).fill('Bantuan');
  await page.locator('[data-cta-url]').nth(1).fill('https://example.com/bantuan');
  assert.equal(await page.locator('#add-cta').isDisabled(),true);
  await page.locator('#template-form button[type="submit"]').click();
  await page.waitForURL(/\/whatsapp-templates\/demo-/);const templateUrl=page.url();
  await page.locator('#record-detail').getByText('Template QA',{exact:true}).waitFor();
  await visit(new URL(templateUrl).pathname+'/edit');
  assert.equal(await page.locator('[data-payment-choice] select').first().locator('option:checked').textContent(),'Pembayaran QA');
  assert.equal(await page.locator('[data-cta-name]').count(),2);
  await page.locator('[name="name"]').fill('Template QA Edit');
  await page.locator('#template-form button[type="submit"]').click();await page.waitForURL(templateUrl);
  await visit('/coupon-templates/create');
  for(const [k,v] of Object.entries({name:'Kupon QA',merchant:'Merchant QA',reward:'Diskon 20%',terms:'Satu kali penggunaan.',url:'https://example.com/kupon-qa'}))await page.locator(`[name="${k}"]`).fill(v);
  assert.equal(await page.locator('#coupon-live-preview .reward-card').count(),0);
  await page.locator('#coupon-form button[type="submit"]').click();await page.waitForURL(/\/coupon-templates\/demo-/);const couponUrl=page.url();
  await visit(new URL(couponUrl).pathname+'/edit');await page.locator('[name="quota"]').fill('2000');await page.locator('#coupon-form button[type="submit"]').click();await page.waitForURL(couponUrl);
  await visit('/campaigns/create');
  await page.locator('[data-key="name"]').fill('Campaign QA');
  await page.locator('[data-key="templateId"]').selectOption({label:'Template QA Edit'});
  await page.locator('[data-key="couponId"]').selectOption({label:'Kupon QA'});
  assert.ok((await page.locator('#preview-message').textContent()).includes('200.000'));
  assert.ok(decodeURIComponent(await page.locator('#preview-cta a').first().getAttribute('href')).includes('Pembayaran QA'));
  await page.locator('#next').click();await page.locator('#modal[open]').waitFor();await page.locator('#close-modal').click();
  await page.locator('#save').click();await page.waitForURL(/\/campaigns\/demo-/);const campaignUrl=page.url();
  await visit(new URL(campaignUrl).pathname+'/edit');await page.locator('[data-key="name"]').fill('Campaign QA Edit');await page.locator('#save').click();await page.waitForURL(campaignUrl);
  // Referential checks keep the payment/CTA/campaign chain intact.
  await page.goto(paymentUrl);await page.locator('#delete-button').click();await page.locator('#confirm-delete').click();assert.equal(await page.locator('#confirm-delete').isDisabled(),true);await page.locator('#cancel-delete').click();
  for(const recordUrl of [campaignUrl,templateUrl,couponUrl,paymentUrl]){await page.goto(recordUrl);await page.locator('#delete-button').click();await page.locator('#confirm-delete').click();await page.waitForURL(new URL(recordUrl).origin+new URL(recordUrl).pathname.split('/').slice(0,2).join('/'));}
  await visit('/payment-preview?setup=invalid');await page.getByText('Link demo tidak valid').waitFor();
  await visit('/campaigns/not-found');await page.getByText('Data tidak ditemukan').waitFor();
  await page.setViewportSize({width:390,height:844});
  for(const route of ['/campaigns','/payment-setups/create','/whatsapp-templates/create','/coupon-templates/create','/campaigns/create']){await visit(route);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'mobile overflow '+route);}
  assert.deepEqual(errors,[]);
  console.log('PASS: all menus; create/read/edit/delete for four modules; linked CTA/coupon; max 2 CTA; deletion dependencies; invalid URLs; mobile layout; no browser errors.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
