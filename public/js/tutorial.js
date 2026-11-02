(() => {
    'use strict';
    const tour = document.querySelector('#intro-tour');
    if (!tour) return;
    const card = tour.querySelector('.tour-card');
    const spotlight = tour.querySelector('.tour-spotlight');
    const back = document.querySelector('#tour-back');
    const next = document.querySelector('#tour-next');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const steps = [
        {target:'.brand',icon:'grid',section:'Selamat datang',title:'Kenali workspace MyAds',description:'Kelola pengingat tagihan WhatsApp hingga kupon apresiasi dari satu tempat. Mari kenali alurnya dalam 7 langkah singkat.'},
        {target:'nav a[href="/payment-setups"]',icon:'card',section:'Persiapan · Pembayaran',title:'Mulai dari setup pembayaran',description:'Buat nama pembayaran, isi nominal rupiah, lalu pilih metode dan batas waktunya. Setup ini menghasilkan link pembayaran untuk tombol CTA.'},
        {target:'nav a[href="/whatsapp-templates"]',icon:'message',section:'Persiapan · Pesan',title:'Siapkan template WhatsApp',description:'Tulis pesan dan atur maksimal 2 tombol CTA. Tombol pertama wajib memilih nama pembayaran yang sudah dibuat; linknya akan terisi otomatis.'},
        {target:'nav a[href="/coupon-templates"]',icon:'ticket',section:'Persiapan · Apresiasi',title:'Buat template kupon',description:'Atur merchant, reward, kuota, masa berlaku, dan pesan kupon. Preview menampilkan pesan WhatsApp biasa beserta tombol untuk melihat kupon.'},
        {target:'nav a[href="/campaigns"]',icon:'send',section:'Operasional · Pengiriman',title:'Gabungkan semuanya di campaign',description:'Pilih template WhatsApp, file audience, tanggal dan waktu pengiriman WIB. Pilih juga template kupon yang digunakan setelah pelanggan berhasil membayar.'},
        {target:'nav a[href="/payments"]',icon:'receipt',section:'Operasional · Pemantauan',title:'Pantau pembayaran pelanggan',description:'Lihat transaksi dan status pembayaran di menu ini. Menu Laporan menyediakan ringkasan pesan terkirim, pembayaran berhasil, dan kupon yang ditukarkan.'},
        {target:'#tour-trigger',icon:'check',section:'Siap digunakan',title:'Anda siap membuat campaign',description:'Urutannya: pembayaran → template WhatsApp → template kupon → campaign. Buka Panduan kapan saja untuk mengulang. Saat ini semua aktivitas masih berupa demo UI.'}
    ];
    let index = 0;
    let restoreFocus = null;
    let target = null;
    let raf;
    function position() {
        if (!tour.open || !target) return;
        const rect = target.getBoundingClientRect();
        const padding = 5;
        Object.assign(spotlight.style,{left:(rect.left-padding)+'px',top:(rect.top-padding)+'px',width:(rect.width+padding*2)+'px',height:(rect.height+padding*2)+'px'});
        const width = innerWidth, height = innerHeight;
        const cardWidth = Math.min(390,width-28), cardHeight = Math.min(card.offsetHeight,height-28);
        let left,top;
        if (width < 650) {left=(width-cardWidth)/2;top=height-cardHeight-14;}
        else {
            left=rect.right+24;
            if(left+cardWidth>width-16)left=rect.left-cardWidth-24;
            if(left<16)left=(width-cardWidth)/2;
            top=Math.min(Math.max(16,rect.top-16),height-cardHeight-16);
        }
        card.style.left=Math.max(14,left)+'px';card.style.top=Math.max(14,top)+'px';
    }
    function render() {
        const step=steps[index];
        target=document.querySelector(step.target);
        if(!target||target.getBoundingClientRect().width===0)target=document.querySelector('#tour-trigger');
        target.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'nearest',inline:'nearest'});
        document.querySelector('#tour-section').textContent=step.section;
        document.querySelector('#tour-title').textContent=step.title;
        document.querySelector('#tour-description').textContent=step.description;
        tour.querySelector('.tour-symbol').innerHTML=uiIcon(step.icon);
        document.querySelector('#tour-counter').textContent=`${index+1} dari ${steps.length}`;
        tour.querySelector('.tour-progress').setAttribute('aria-valuenow',String(index+1));
        tour.querySelector('.tour-progress>span').style.width=((index+1)/steps.length*100)+'%';
        back.disabled=index===0;next.textContent=index===steps.length-1?'Selesai':'Lanjut';
        card.classList.remove('entering');void card.offsetWidth;card.classList.add('entering');
        position();next.focus({preventScroll:true});
    }
    function start(event) {
        restoreFocus=event?.currentTarget||document.activeElement;
        index=0;
        if(!tour.open)tour.showModal();
        render();
    }
    function finish(){tour.close();}
    document.querySelector('#guide').onclick=start;
    document.querySelector('#tour-trigger').onclick=start;
    document.querySelector('#tour-skip').onclick=finish;
    next.onclick=()=>{if(index===steps.length-1)finish();else{index++;render();}};
    back.onclick=()=>{if(index>0){index--;render();}};
    tour.addEventListener('close',()=>{if(restoreFocus?.isConnected)restoreFocus.focus({preventScroll:true});target=null;});
    tour.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();next.click();}else if(event.key==='ArrowLeft'){event.preventDefault();back.click();}});
    function schedule(){cancelAnimationFrame(raf);raf=requestAnimationFrame(position);}
    addEventListener('resize',schedule);
    document.addEventListener('scroll',schedule,true);
    new ResizeObserver(schedule).observe(card);
})();
