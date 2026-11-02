const { chromium }=require('playwright');
const fs=require('fs');
(async()=>{fs.mkdirSync('.view-refactor',{recursive:true});const browser=await chromium.launch({channel:'msedge',headless:true});try{const page=await browser.newPage();await page.goto('http://127.0.0.1:8000');
const states={overview:'overview',payments:'payment',audiences:'audience',reports:'report',settings:'settings','payment-setups':'payment-setups','whatsapp-templates':'templates','coupon-templates':'coupon-templates'};
for(const [folder,hash] of Object.entries(states)){await page.evaluate(h=>{location.hash=h},hash);await page.waitForTimeout(100);fs.writeFileSync(`.view-refactor/${folder}-index.html`,await page.locator('#other-page').innerHTML());}
for(const [folder,hash,form] of [['payment-setups','payment-setups/create','payment-form'],['whatsapp-templates','templates/create','template-form'],['coupon-templates','coupon-templates/create','coupon-form']]){await page.evaluate(h=>{location.hash=h},hash);await page.locator('#'+form).waitFor();fs.writeFileSync(`.view-refactor/${folder}-create.html`,await page.locator('#other-page').innerHTML());}
await page.evaluate(()=>{location.hash='campaign'});await page.locator('#new-campaign').click();fs.writeFileSync('.view-refactor/campaigns-create.html',await page.locator('#wizard').innerHTML());
const data=await page.evaluate(()=>({campaigns,data,templates,paymentSetups,couponTemplates}));fs.writeFileSync('.view-refactor/data.json',JSON.stringify(data,null,2));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
