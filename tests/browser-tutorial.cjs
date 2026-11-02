const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto((process.env.TEST_URL||'http://127.0.0.1:8000')+'/campaigns/create');
  await page.locator('[data-key="name"]').fill('Draft tetap tersimpan');
  for(const viewport of [{width:1440,height:1000},{width:390,height:844}]){
   await page.setViewportSize(viewport);
   await page.locator('#tour-trigger').click();await page.locator('#intro-tour[open]').waitFor();
   assert.equal(await page.locator('#tour-counter').textContent(),'1 dari 7');
   assert.equal(await page.locator('#tour-back').isDisabled(),true);
   for(let step=1;step<=7;step++){
    assert.equal(await page.locator('#tour-counter').textContent(),`${step} dari 7`);
    const box=await page.locator('.tour-card').boundingBox();assert.ok(box.x>=0&&box.y>=0&&box.x+box.width<=viewport.width+1&&box.y+box.height<=viewport.height+1,'Card fits viewport');
    await page.locator('#tour-next').click();
   }
   await page.locator('#intro-tour').waitFor({state:'hidden'});
   assert.equal(await page.locator('[data-key="name"]').inputValue(),'Draft tetap tersimpan');
   await page.locator('#tour-trigger').click();await page.locator('#tour-next').click();await page.locator('#tour-back').click();assert.equal(await page.locator('#tour-counter').textContent(),'1 dari 7');
   await page.locator('#tour-skip').click();await page.locator('#intro-tour').waitFor({state:'hidden'});
   await page.locator('#tour-trigger').click();await page.keyboard.press('Escape');await page.locator('#intro-tour').waitFor({state:'hidden'});
  }
  await page.setViewportSize({width:1440,height:1000});await page.locator('#guide').click();await page.locator('#intro-tour[open]').waitFor();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#tour-counter').textContent(),'2 dari 7');await page.keyboard.press('Escape');
  await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#tour-trigger').click();assert.equal(await page.locator('.tour-spotlight').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
  assert.deepEqual(errors,[]);console.log('PASS: 7 steps, Next/Back/Skip/Finish, restart, Escape, arrow keys, draft preservation, desktop/mobile, reduced motion, no browser errors.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
