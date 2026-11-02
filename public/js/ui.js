// Shared local SVG icons; no external icon runtime or network request.
const uiIconPaths={
 grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
 message:'<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2V11.5a9.5 9.5 0 0 1 19 0Z"/><path d="M7 9h10M7 13h7"/>',
 card:'<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 9h20M6 15h4"/>',
 ticket:'<path d="M3 5h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4Z"/><path d="M15 5v3m0 3v2m0 3v3"/>',
 receipt:'<path d="m5 3 3 2 4-2 4 2 3-2v18l-3-2-4 2-4-2-3 2Z"/><path d="M9 9h6m-6 4h6"/>',
 users:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m3 10v-3a6 6 0 0 0-2-4"/>',
 chart:'<path d="M3 3v18h18M8 16v-5m5 5V7m5 9V4"/>',
 settings:'<path d="m9 3-1 3-3 1v3l-2 2 2 2v3l3 1 1 3h6l1-3 3-1v-3l2-2-2-2V7l-3-1-1-3Z"/><circle cx="12" cy="12" r="3"/>',
 bell:'<path d="M18 8a6 6 0 0 0-12 0c0 8-3 8-3 10h18c0-2-3-2-3-10M10 22h4"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',
 arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',back:'<path d="M20 12H4m6-6-6 6 6 6"/>',external:'<path d="M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',upload:'<path d="M12 16V4m-5 5 5-5 5 5M4 16v5h16v-5"/>',
 search:'<circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 5 5"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
 chevron:'<path d="m7 10 5 5 5-5"/>',check:'<path d="m5 12 4 4L19 6"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',mic:'<rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 11h18"/>'
};
function uiIcon(name){return `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${uiIconPaths[name]||uiIconPaths.info}</svg>`;}
function polishUI(){
 document.querySelectorAll('[data-icon]:not([data-icon-ready])').forEach(el=>{el.innerHTML=uiIcon(el.dataset.icon);el.dataset.iconReady='true';});
 const map={'◉':'send','◫':'grid','▣':'card','♧':'ticket','♙':'users','▥':'chart','⚙':'settings','↗':'external','⇧':'upload','⌕':'search','↓':'download','＋':'plus','←':'back','→':'arrow','⋯':'more','⌄':'chevron','ⓘ':'info','⌑':'lock'};
 document.querySelectorAll('button,button>span:not([data-icon]),a,.stats i,.campaign-symbol,.banner-icon,.upload>span,.mini-flow,.bottom-note,.search,.encrypted,.preview-note,.phone-bottom,.phone-bottom>span,.workspace>span,.profile>span:last-child,td').forEach(el=>{
  if(el.closest('svg,[data-icon]')||el.matches('.brand'))return;
  [...el.childNodes].filter(n=>n.nodeType===3).forEach(n=>{
   if(!Object.keys(map).some(k=>n.textContent.includes(k)))return;
   const fragment=document.createDocumentFragment();for(const ch of n.textContent){if(map[ch]){const span=document.createElement('span');span.className='inline-icon';span.innerHTML=uiIcon(el.matches('.phone-bottom')&&ch==='♧'?'mic':map[ch]);fragment.append(span);}else fragment.append(document.createTextNode(ch));}n.replaceWith(fragment);
  });
 });
 document.querySelectorAll('nav [data-page]').forEach(b=>{b.setAttribute('aria-current',b.classList.contains('active')?'page':'false');});
 document.querySelectorAll('[data-filter]').forEach(b=>{b.setAttribute('role','tab');b.setAttribute('aria-selected',String(b.classList.contains('selected')));});
}
let uiFrame;
const uiObserver=new MutationObserver(()=>{cancelAnimationFrame(uiFrame);uiFrame=requestAnimationFrame(polishUI);});
uiObserver.observe(document.body,{childList:true,subtree:true});polishUI();
