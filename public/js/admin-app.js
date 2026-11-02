/* UI-only demo state; the Laravel GET routes render the per-menu Blade pages. */
(() => {
    'use strict';
    const $ = s => document.querySelector(s);
    const $$ = s => [...document.querySelectorAll(s)];
    const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const menu = document.body.dataset.menu;
    const action = document.body.dataset.action;
    const id = document.body.dataset.recordId;
    const storageKey = 'myads-ui-records-v1';
    let db;
    try { db = JSON.parse(sessionStorage.getItem(storageKey)); } catch { db = null; }
    if (!db || Object.keys(AdminSeed).some(key => !Array.isArray(db[key]))) db = structuredClone(AdminSeed);
    const persist = () => { try { sessionStorage.setItem(storageKey, JSON.stringify(db)); return true; } catch { toast('Penyimpanan browser tidak tersedia. Aktifkan session storage untuk menyimpan demo.'); return false; } };
    const money = n => 'Rp' + new Intl.NumberFormat('id-ID').format(n);
    const url = (section, record = '', suffix = '') => '/' + section + (record ? '/' + encodeURIComponent(record) : '') + suffix;
    const payment = key => db['payment-setups'].find(p => p.id === key);
    const template = key => db['whatsapp-templates'].find(t => t.id === key);
    const coupon = key => db['coupon-templates'].find(c => c.id === key);
    const validUrl = value => { try { return ['http:', 'https:'].includes(new URL(value).protocol); } catch { return false; } };
    const paymentLink = p => location.origin + '/payment-preview?setup=' + encodeURIComponent(JSON.stringify({name:p.name,amount:p.amount,methods:p.methods,expiry:p.expiry}));
    const ctaUrl = c => c.kind === 'payment' ? (payment(c.paymentId) ? paymentLink(payment(c.paymentId)) : '') : c.url;
    const ctaMarkup = c => validUrl(ctaUrl(c)) ? `<a class="cta-link" href="${esc(ctaUrl(c))}" target="_blank" rel="noopener noreferrer"><span data-icon="external"></span> ${esc(c.name || 'Nama CTA')}</a>` : `<span class="cta-link">${esc(c.name || 'Nama CTA')}</span>`;
    const buttons = list => list.map(ctaMarkup).join('');
    const replacement = (message, amount = 0) => message.replaceAll('{{nama}}', 'Ardiansyah').replaceAll('{{no_pelanggan}}', '1234567890').replaceAll('{{tagihan}}', money(amount));
    function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('show'); clearTimeout(toast.timer); toast.timer = setTimeout(() => $('#toast').classList.remove('show'), 4000); }
    function modal(content) { $('#modal-body').innerHTML = content; if (!$('#modal').open) $('#modal').showModal(); }
    $('#close-modal').onclick = () => $('#modal').close();
    $('#modal').addEventListener('click', e => { if (e.target === $('#modal')) $('#modal').close(); });
    $('#notification').onclick = () => modal('<h2>Notifikasi</h2><p>Belum ada notifikasi baru. Anda sedang menggunakan mode demo.</p>');
    $('#guide').onclick = () => modal('<h2>Alur persiapan campaign</h2><ol><li>Buat nama pembayaran, nominal, dan metode.</li><li>Buat template WhatsApp dan pilih pembayaran untuk CTA.</li><li>Buat template kupon serta pesan apresiasi.</li><li>Buat campaign, pilih template pesan dan kupon, lalu atur pengiriman.</li></ol><p>Data hanya disimpan dalam sesi browser ini, tanpa transaksi atau pengiriman nyata.</p>');
    function options(el, records, selected, placeholder) {
        if (!el) return;
        el.innerHTML = records.length ? records.map(r => `<option value="${esc(r.id)}">${esc(r.name)}</option>`).join('') : `<option value="">${esc(placeholder || 'Belum ada data')}</option>`;
        el.value = records.some(r => r.id === selected) ? selected : (records[0]?.id || '');
    }
    function save(record, section = menu) {
        const index = db[section].findIndex(r => r.id === record.id);
        if (index === -1) db[section].push(record); else db[section][index] = record;
        if (persist()) location.href = url(section, record.id);
    }
    const newId = () => 'demo-' + crypto.randomUUID();
    const existing = db[menu]?.find(r => r.id === id);
    function missing() { $('main').innerHTML = `<section class="panel form-panel"><h1>Data tidak ditemukan</h1><p>Data demo mungkin sudah dihapus atau sesi browser telah berakhir.</p><a class="primary" href="/${menu}">Kembali ke daftar</a></section>`; }
    if (['edit','show'].includes(action) && !existing) { missing(); return; }
    function actions(record) { return `<div class="table-actions"><a class="secondary" href="${url(menu,record.id)}">Detail</a><a class="secondary" href="${url(menu,record.id,'/edit')}">Edit</a></div>`; }
    const statusClass = {Aktif:'active-status',Draft:'draft',Terjadwal:'scheduled',Selesai:'completed'};
    function renderIndex() {
        const body = $('#records-body'); if (!body) return;
        let records = db[menu];
        if (menu === 'campaigns') {
            const query = $('#search').value.toLowerCase();
            const filter = $('[data-filter].selected')?.dataset.filter || 'Semua';
            records = records.filter(r => r.name.toLowerCase().includes(query) && (filter === 'Semua' || r.status === filter));
            body.innerHTML = records.map(r => `<tr><td><div class="campaign-name"><span class="campaign-symbol" data-icon="send"></span><div><b>${esc(r.name)}</b><small>${esc(r.id)} · WhatsApp broadcast</small></div></div></td><td><span class="badge ${statusClass[r.status] || 'draft'}">${esc(r.status)}</span></td><td>${esc(r.audienceCount || '—')}<small class="subtext">pelanggan</small></td><td>${esc(r.paid || '—')}</td><td>${esc(coupon(r.couponId)?.reward || 'Belum diatur')}</td><td>${esc(r.start)} — ${esc(r.end)}</td><td>${actions(r)}</td></tr>`).join('');
            $('#row-count').textContent = `Menampilkan ${records.length} dari ${db[menu].length} campaign`;
            $$('.count,.nav-count').forEach(e => e.textContent = db.campaigns.length);
            $$('[data-filter]').forEach(b => { const count = b.querySelector('span'); if (count) count.textContent = b.dataset.filter === 'Semua' ? db.campaigns.length : db.campaigns.filter(r => r.status === b.dataset.filter).length; });
        } else if (menu === 'payment-setups') {
            body.innerHTML = records.map(p => `<tr><td><b>${esc(p.name)}</b><small class="subtext">Midtrans · Demo</small></td><td>${money(p.amount)}</td><td>${p.methods.map(esc).join(', ')}</td><td>${esc(p.expiry)} jam</td><td><a class="secondary" href="${esc(paymentLink(p))}" target="_blank" rel="noopener">Preview link <span data-icon="external"></span></a></td><td>${actions(p)}</td></tr>`).join('');
        } else if (menu === 'whatsapp-templates') {
            body.innerHTML = records.map(t => `<tr><td><b>${esc(t.name)}</b></td><td>Pengingat tagihan</td><td>Indonesia</td><td>${t.ctas.map(c => esc(c.name)).join('<br>')}</td><td>${actions(t)}</td></tr>`).join('');
        } else if (menu === 'coupon-templates') {
            body.innerHTML = records.map(c => `<tr><td><b>${esc(c.name)}</b></td><td>${esc(c.reward)}<small class="subtext">${esc(c.merchant)}</small></td><td>${esc(c.quota)}</td><td>${esc(c.valid)}</td><td>${actions(c)}</td></tr>`).join('');
        }
        if (!records.length) body.innerHTML = '<tr><td colspan="7" class="empty">Belum ada data yang sesuai. Buat data baru untuk memulai.</td></tr>';
    }
    if (action === 'index') {
        renderIndex();
        if (menu === 'campaigns') {
            $('#search').oninput = renderIndex;
            $('#channel').onchange = renderIndex;
            $$('[data-filter]').forEach(b => b.onclick = () => { $$('[data-filter]').forEach(t => t.classList.toggle('selected', t === b)); renderIndex(); });
            $('#export').onclick = () => { const csv = '\uFEFF' + [['Nama','Status','Tanggal pengiriman','Waktu'],...db.campaigns.map(r => [r.name,r.status,r.sendDate,r.time])].map(row => row.map(v => '"'+String(v).replaceAll('"','""')+'"').join(',')).join('\r\n'); const href = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})); const a = document.createElement('a'); a.href=href; a.download='campaign-demo.csv'; a.click(); setTimeout(()=>URL.revokeObjectURL(href),1000); };
        }
        if ($('#settings-save')) $('#settings-save').onclick = () => toast('Perubahan ini adalah preview UI pengaturan.');
    }
    function setValues(form, values) { for (const [key,value] of Object.entries(values)) { const el = form.elements.namedItem(key); if (el && 'value' in el && !['method'].includes(key)) el.value = value; } }
    function formValue(form, name) { return form.elements.namedItem(name).value.trim(); }
    function paymentForm() {
        const form = $('#payment-form');
        const p = existing || {name:'',amount:'',expiry:'24',methods:['QRIS','GoPay']};
        setValues(form,{setupName:p.name,amount:p.amount,expiry:p.expiry});
        form.querySelectorAll('[name="method"]').forEach(el => el.checked = p.methods.includes(el.value));
        const read = () => ({name:formValue(form,'setupName'),amount:Number(formValue(form,'amount')),methods:[...form.querySelectorAll('[name="method"]:checked')].map(e=>e.value),expiry:formValue(form,'expiry')});
        const refresh = () => { const v=read(); $('#payment-preview-name').textContent=v.name || 'Nama setup pembayaran'; $('#payment-preview-amount').textContent=v.amount>0?money(v.amount):'Rp—'; $('#payment-preview-methods').textContent=(v.methods.join(' · ')||'Pilih metode')+' · '+v.expiry+' jam'; };
        form.addEventListener('input',refresh); refresh();
        form.onsubmit=e=>{e.preventDefault(); const v=read(); if(!form.reportValidity()||!v.name||!Number.isSafeInteger(v.amount)||v.amount<1||v.amount>999999999999||!v.methods.length){toast('Isi nama, nominal, dan minimal satu metode pembayaran.');return;} save({...v,id:existing?.id||newId()});};
    }
    function whatsappForm() {
        const form=$('#template-form');
        const t=existing||{name:'',message:'Halo {{nama}},\n\nTagihan IndiHome Anda sebesar {{tagihan}}. Silakan lakukan pembayaran melalui tombol berikut.',ctas:[{name:'Bayar Sekarang',kind:'payment',paymentId:db['payment-setups'][0]?.id||'',url:'{{payment_url}}'}]};
        setValues(form,t); const ctAs=structuredClone(t.ctas);
        const refresh=()=>{const p=payment(ctAs[0].paymentId);$('#template-preview').textContent=replacement(formValue(form,'message'),p?.amount||0);$('#template-cta').innerHTML=buttons(ctAs);$('#message-count').textContent=formValue(form,'message').length+' / 2.000 karakter';};
        function drawCtas(){
            $('#cta-fields').replaceChildren();
            ctAs.forEach((c,i)=>{
                const fragment=$('#cta-row').content.cloneNode(true);
                fragment.querySelector('[data-cta-heading]').textContent='Tombol CTA '+(i+1)+(i===0?' · Pembayaran wajib':'');
                const name=fragment.querySelector('[data-cta-name]');name.value=c.name;name.oninput=()=>{c.name=name.value;refresh();};
                const remove=fragment.querySelector('[data-cta-remove]');remove.hidden=i===0;remove.onclick=()=>{ctAs.splice(i,1);drawCtas();refresh();};
                const setup=fragment.querySelector('[data-payment-choice]');setup.hidden=i!==0;
                const choice=setup.querySelector('select');choice.required=i===0;choice.disabled=i!==0;
                const link=fragment.querySelector('[data-cta-url]');link.readOnly=i===0;link.type=i===0?'text':'url';link.value=ctaUrl(c);link.required=i!==0;
                link.oninput=()=>{c.url=link.value;link.setCustomValidity('');refresh();};
                if(i===0){options(choice,db['payment-setups'],c.paymentId,'Buat setup pembayaran terlebih dahulu');c.paymentId=choice.value;link.value=ctaUrl(c);choice.onchange=()=>{c.paymentId=choice.value;link.value=ctaUrl(c);refresh();};}
                fragment.querySelector('[data-cta-note]').textContent=i===0?'Link mengikuti nama pembayaran yang dipilih. Campaign otomatis menggunakan CTA ini.':'URL lengkap dengan https:// atau http://.';
                $('#cta-fields').append(fragment);
            });
            $('#add-cta').disabled=ctAs.length>=2;$('#add-cta').textContent=ctAs.length>=2?'Maksimal 2 CTA':'+ Tambah CTA';
        }
        $('#add-cta').onclick=()=>{if(ctAs.length<2){ctAs.push({name:'',kind:'link',url:''});drawCtas();refresh();}};
        form.addEventListener('input',refresh);drawCtas();refresh();
        form.onsubmit=e=>{e.preventDefault();if(!form.reportValidity())return;const value={id:existing?.id||newId(),name:formValue(form,'name'),type:'reminder',message:formValue(form,'message'),ctas:ctAs.map(c=>({...c,name:c.name.trim(),url:(c.url||'').trim()}))};if(!value.name||!value.message||!payment(value.ctas[0]?.paymentId)||value.ctas.some((c,i)=>!c.name||(i>0&&!validUrl(c.url)))){toast('Lengkapi nama, pesan, pembayaran, dan link CTA yang valid.');return;}save(value);};
    }
    function couponForm(){
        const form=$('#coupon-form');
        const c=existing||{name:'',merchant:'',reward:'',quota:1000,valid:'2026-12-31',terms:'',message:'Halo {{nama}}, terima kasih! Pembayaran Anda berhasil. Berikut kupon untuk Anda.',cta:'Lihat Kupon',url:''};
        setValues(form,c);form.elements.namedItem('cta').maxLength=25;
        const read=()=>Object.fromEntries(['name','merchant','reward','quota','valid','terms','message','cta','url'].map(k=>[k,k==='quota'?Number(formValue(form,k)):formValue(form,k)]));
        const refresh=()=>{const value=read();$('#coupon-live-preview .message>div').textContent=replacement(value.message);$('#coupon-live-preview .wa-cta').innerHTML=buttons([{name:value.cta,url:value.url}]);$('#coupon-live-preview>.preview-note').textContent=value.terms;};
        form.addEventListener('input',refresh);refresh();
        form.onsubmit=e=>{e.preventDefault();const value=read();if(!form.reportValidity()||!value.name||!value.merchant||!value.reward||!value.terms||!value.message||!value.cta||!Number.isSafeInteger(value.quota)||value.quota<1||!validUrl(value.url)){toast('Lengkapi informasi dan gunakan link kupon HTTP/HTTPS yang valid.');return;}save({...value,id:existing?.id||newId()});};
    }
    function couponSummary(c){return c?`<b>${esc(c.name)}</b><br>${esc(c.reward)} · ${esc(c.merchant)}<br>Kuota ${esc(c.quota)} · Berlaku hingga ${esc(c.valid)}`:'Belum ada template kupon. Buat di menu Template Kupon.';}
    function campaignForm(){
        const form=$('#campaign-form');
        const r=existing||{name:'',start:'2026-11-02',end:'2026-11-30',sendDate:'2026-11-02',time:'09:00',sender:'IndiHome · +62 811 1000 100',templateId:db['whatsapp-templates'][0]?.id,couponId:db['coupon-templates'][0]?.id,status:'Draft',audienceFile:''};
        const fields=[...form.querySelectorAll('[data-key]')];fields.forEach(el=>{if(el.dataset.key in r)el.value=r[el.dataset.key];el.required=true;});
        options(form.querySelector('[data-key="templateId"]'),db['whatsapp-templates'],r.templateId,'Buat template WhatsApp terlebih dahulu');
        options(form.querySelector('[data-key="couponId"]'),db['coupon-templates'],r.couponId,'Buat template kupon terlebih dahulu');
        const read=()=>({...r,...Object.fromEntries(fields.map(el=>[el.dataset.key,el.value.trim()]))});
        const refresh=()=>{const v=read(),t=template(v.templateId),p=payment(t?.ctas[0]?.paymentId),c=coupon(v.couponId);$('#preview-message').textContent=t?replacement(t.message,p?.amount||0):'Pilih template WhatsApp.';$('#preview-message').style.whiteSpace='pre-wrap';$('#preview-cta').innerHTML=t?buttons(t.ctas):'';$('#selected-template-summary-templateId').innerHTML=t?`<b>${esc(t.name)}</b><br>Pembayaran: ${esc(p?.name||'Belum tersedia')}<br>${t.ctas.map(c=>esc(c.name)).join(' · ')}`:'Belum ada template.';$('#coupon-selection').innerHTML=couponSummary(c);};
        fields.forEach(el=>el.addEventListener('input',refresh));
        $('#audience-file').onchange=e=>{r.audienceFile=e.target.files[0]?.name||'';$('#file-note').textContent=r.audienceFile?`${r.audienceFile} dipilih · demo tanpa upload`:'Belum ada file dipilih';};
        if(r.audienceFile)$('#file-note').textContent='File demo: '+r.audienceFile;
        $('#preview-coupon').onclick=()=>{const c=coupon(read().couponId);if(c)modal(`<h2>Preview pesan kupon</h2><div class="message" style="border:1px solid #e5e9ef"><div style="white-space:pre-wrap">${esc(replacement(c.message))}</div><small>09.41 ✓✓</small><div class="wa-cta">${buttons([{name:c.cta,url:c.url}])}</div></div>`);};
        function validate(){const v=read();if(!form.reportValidity())return false;if(!v.name||!template(v.templateId)||!coupon(v.couponId)){toast('Lengkapi nama dan pilihan template.');return false;}if(v.start>v.end||v.sendDate<v.start||v.sendDate>v.end){toast('Tanggal pengiriman harus berada dalam periode campaign.');return false;}return true;}
        $('#next').onclick=()=>{if(!validate())return;const v=read();modal(`<h2>Review campaign</h2><p><b>${esc(v.name)}</b><br>Template: ${esc(template(v.templateId).name)}<br>Pengiriman: ${esc(v.sendDate)} · ${esc(v.time)} WIB</p><div class="info">Setelah pembayaran berhasil:<br>${couponSummary(coupon(v.couponId))}</div><p>Campaign belum dikirim. Gunakan Simpan draft untuk menyimpan data demo.</p>`);};
        form.onsubmit=e=>{e.preventDefault();if(validate())save({...read(),id:existing?.id||newId()});};refresh();
    }
    if(['create','edit'].includes(action)){({'payment-setups':paymentForm,'whatsapp-templates':whatsappForm,'coupon-templates':couponForm,campaigns:campaignForm}[menu])?.();}
    function detail(){
        const record=existing;let entries=[];
        if(menu==='payment-setups')entries=[['Nama pembayaran',record.name],['Nominal',money(record.amount)],['Metode',record.methods.join(', ')],['Batas waktu',record.expiry+' jam']];
        if(menu==='whatsapp-templates')entries=[['Nama template',record.name],['Pesan',record.message],['Pembayaran',payment(record.ctas[0].paymentId)?.name||'Tidak tersedia']];
        if(menu==='coupon-templates')entries=[['Nama template',record.name],['Merchant',record.merchant],['Reward',record.reward],['Kuota',record.quota],['Berlaku hingga',record.valid],['Syarat & ketentuan',record.terms],['Pesan',record.message]];
        if(menu==='campaigns')entries=[['Nama campaign',record.name],['Status',record.status],['Template WhatsApp',template(record.templateId)?.name||'Tidak tersedia'],['Periode',record.start+' — '+record.end],['Pengiriman',record.sendDate+' · '+record.time+' WIB'],['File audience',record.audienceFile||'Belum dipilih'],['Kupon setelah pembayaran',coupon(record.couponId)?.name||'Tidak tersedia']];
        $('#record-detail').innerHTML='<dl class="record-details">'+entries.map(([label,value])=>`<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('')+'</dl>';
        if(menu==='payment-setups')$('#record-detail').insertAdjacentHTML('beforeend',`<label class="field">Link pembayaran demo<input readonly value="${esc(paymentLink(record))}"></label><a class="primary" href="${esc(paymentLink(record))}" target="_blank" rel="noopener">Preview pembayaran</a>`);
        if(menu==='whatsapp-templates')$('#record-detail').insertAdjacentHTML('beforeend',`<div class="info">Tombol CTA${buttons(record.ctas)}</div>`);
        if(menu==='coupon-templates')$('#record-detail').insertAdjacentHTML('beforeend',`<div class="info">Tombol kupon${buttons([{name:record.cta,url:record.url}])}</div>`);
        $('#delete-button').onclick=()=>$('#delete-dialog').showModal();$('#cancel-delete').onclick=()=>$('#delete-dialog').close();
        $('#confirm-delete').onclick=()=>{
            let used=false;
            if(menu==='payment-setups')used=db['whatsapp-templates'].some(t=>t.ctas.some(c=>c.paymentId===id));
            if(menu==='whatsapp-templates')used=db.campaigns.some(c=>c.templateId===id);
            if(menu==='coupon-templates')used=db.campaigns.some(c=>c.couponId===id);
            if(used){$('#delete-description').textContent='Data ini masih digunakan oleh template atau campaign. Ubah pilihannya terlebih dahulu sebelum menghapus.';$('#confirm-delete').disabled=true;return;}
            db[menu]=db[menu].filter(r=>r.id!==id);if(persist())location.href='/'+menu;
        };
    }
    if(action==='show')detail();
    if(action==='checkout'){
        let p;try{p=JSON.parse(new URLSearchParams(location.search).get('setup'));if(!p||typeof p.name!=='string'||!Number.isSafeInteger(p.amount)||p.amount<1||p.amount>999999999999||!Array.isArray(p.methods)||!p.methods.length||!p.methods.every(m=>['QRIS','GoPay','Virtual account','Kartu kredit / debit'].includes(m))||!['6','12','24','48'].includes(p.expiry))throw Error();}catch{$('#checkout-content').innerHTML='<div class="panel form-panel"><h1>Link demo tidak valid</h1><p>Gunakan link dari Setup Pembayaran.</p></div>';return;}
        $('#checkout-name').textContent=p.name;$('#checkout-amount').textContent=money(p.amount);$('#checkout-expiry').textContent=p.expiry+' jam';$('#checkout-methods').innerHTML=p.methods.map((m,i)=>`<label class="choice"><input type="radio" name="checkout-method" ${i===0?'checked':''}>${esc(m)}</label>`).join('');$('#payment-demo-button').onclick=()=>modal('<h2>Simulasi pembayaran</h2><p>Demo ini tidak membuat atau memproses transaksi nyata.</p>');
    }
})();
