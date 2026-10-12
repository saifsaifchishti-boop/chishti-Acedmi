// Chishti Preparation Academy - PRO layer (v4)
// VU updates ticker (auto-refresh) · PWA install/offline · Deadlines · Profile · Course pages · Fee guide
// Urdu interface · Privacy & Terms · Global search · Report a problem · Accessibility
// Test Center extras · Admin: registrations dashboard, study-group links, campus verification date
(()=>{
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s),E=esc,RR=window.RR||(window.RR={});
const get=(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch{return d}},put=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
const trk=(a,b)=>{try{TRK(a,b)}catch{}};
const ago=t=>{const s=Math.max(0,(Date.now()-new Date(t))/1000);if(s<90)return 'just now';if(s<3600)return Math.round(s/60)+' min ago';if(s<86400)return Math.round(s/3600)+' h ago';return Math.round(s/86400)+' days ago'};
const fmtD=t=>{try{return new Date(t).toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'})}catch{return String(t).slice(0,10)}};
const fmtDT=t=>{try{return new Date(t).toLocaleString(undefined,{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}catch{return t}};
const WA=t=>`https://wa.me/${CFG.wa}?text=${encodeURIComponent(t)}`;

// ======================= styles =======================
const st=document.createElement('style');st.textContent=`
.skip{position:absolute;left:-999px;top:0;background:#fff;color:#000;padding:8px 14px;z-index:999}.skip:focus{left:8px;top:8px}
:focus-visible{outline:3px solid #f5b301!important;outline-offset:2px}
html.lgt{font-size:118%}html.lgt body{zoom:1.06}
body.hc{--bg:#fff;--ink:#000;--ln:#000;--mut:#1f1f1f;--soft:#eef;--card:#fff}body.hc a{text-decoration:underline}
[data-theme=dark] body.hc,body.hc[data-theme=dark]{--bg:#000;--ink:#fff;--card:#000;--ln:#fff;--mut:#e5e5e5;--soft:#111}
#vuTick{background:#0b1a36;color:#fff;font-size:13px;display:flex;align-items:center;gap:0;border-bottom:2px solid var(--hi,#f5b301);position:relative;z-index:15}
#vuTick .lb{flex:none;background:#f5b301;color:#1b1400;font-weight:800;padding:9px 12px;white-space:nowrap;cursor:pointer;border:0;font:800 13px Lexend,system-ui,sans-serif}
#vuTick .mq{flex:1;overflow:hidden;white-space:nowrap;position:relative;min-width:0}
#vuTick .tr{display:inline-block;padding-left:100%;animation:vumq var(--dur,60s) linear infinite}
#vuTick .mq:hover .tr,#vuTick .mq:focus-within .tr{animation-play-state:paused}
#vuTick a{color:#fff;margin-right:34px;text-decoration:none}#vuTick a:hover{text-decoration:underline}
#vuTick .nw{background:#10b981;color:#042;font-weight:800;border-radius:4px;padding:1px 6px;margin-right:6px;font-size:11px}
#vuTick .ck{flex:none;padding:0 12px;opacity:.75;font-size:11px;white-space:nowrap;cursor:pointer;background:none;border:0;color:#fff;font-family:inherit}
@keyframes vumq{to{transform:translateX(-100%)}}
@media(prefers-reduced-motion:reduce){#vuTick .tr{animation:none;padding:0}#vuTick .mq{overflow-x:auto}}
@media(max-width:640px){#vuTick .ck{display:none}}
.uk{display:inline-block;font-size:11px;font-weight:700;border-radius:999px;padding:2px 9px;background:var(--soft);color:var(--ac);margin-right:4px}
.uk.datesheet{background:#dbeafe;color:#1e40af}.uk.result{background:#dcfce7;color:#166534}.uk.admission{background:#fef3c7;color:#92400e}.uk.fee{background:#fee2e2;color:#991b1b}.uk.coursework{background:#ede9fe;color:#5b21b6}
.ui{display:flex;gap:10px;align-items:flex-start;justify-content:space-between;border:1px solid var(--ln);border-radius:12px;padding:10px 12px;margin:8px 0;background:var(--card)}
.ui.nw{border-left:5px solid #10b981}.ui small{color:var(--mut)}.ui a.t{color:var(--ink);font-weight:600;text-decoration:none;word-break:break-word}
.dl-i{display:flex;gap:10px;align-items:center;border:1px solid var(--ln);border-left:5px solid var(--ac);border-radius:12px;padding:9px 12px;margin:7px 0;background:var(--card)}
.dl-i.late{border-left-color:#dc2626}.dl-i.soon{border-left-color:#f59e0b}.dl-i.done{opacity:.55;border-left-color:#10b981}.dl-i .m{flex:1;min-width:0}.dl-i .m small{color:var(--mut);display:block}
.dl-i .cd{font-weight:800;font-size:13px;white-space:nowrap}.dl-i.late .cd{color:#dc2626}.dl-i.soon .cd{color:#b45309}
.rtl{direction:rtl;text-align:right;font-family:'Noto Nastaliq Urdu','Jameel Noori Nastaleeq',Lexend,system-ui,sans-serif;line-height:2}
.toast{position:fixed;left:50%;top:14px;transform:translateX(-50%);z-index:300;background:#12356b;color:#fff;padding:11px 18px;border-radius:12px;box-shadow:0 10px 30px #0005;max-width:92vw;font-size:14px;cursor:pointer}
.mdl{position:fixed;inset:0;background:#000a;z-index:250;display:grid;place-items:center;padding:14px}.mdl>div{background:var(--card);color:var(--ink);border-radius:16px;padding:18px;max-width:520px;width:100%;max-height:90vh;overflow:auto}
.bars{display:flex;align-items:flex-end;gap:4px;height:90px;margin:8px 0}.bars i{flex:1;background:linear-gradient(var(--hi,#f5b301),var(--ac));border-radius:4px 4px 0 0;min-height:2px;position:relative}.bars i:after{content:attr(data-v);position:absolute;top:-16px;left:0;right:0;text-align:center;font-size:10px;color:var(--mut);font-style:normal}
.rg{border:1px solid var(--ln);border-radius:12px;padding:10px 12px;margin:8px 0;background:var(--card)}.rg.nw{border-left:5px solid #f59e0b}.rg.ct{border-left:5px solid #10b981}
@media print{body.pp *{visibility:hidden}body.pp #printArea,body.pp #printArea *{visibility:visible}body.pp #printArea{position:absolute;left:0;top:0;width:100%;display:block!important;color:#000;background:#fff}}
`;document.head.appendChild(st);

// skip link + main id
document.body.insertAdjacentHTML('afterbegin','<a class="skip" href="#main">Skip to content</a>');const mn=$('main');if(mn&&!mn.id)mn.id='main';
$('#nav')&&$('#nav').setAttribute('aria-label','Main menu');

// ======================= new sections =======================
const NEW=['dl','fee','crs','upd','me','priv','srch'];
NEW.forEach(k=>{if($('#t-'+k))return;const s=document.createElement('section');s.id='t-'+k;s.innerHTML='<div class="card" id="x-'+k+'"></div>';$('main').appendChild(s)});
const H=(k,h)=>{$('#x-'+k).innerHTML=h;applyUr()};

// ======================= Urdu interface =======================
const UR={'Home':'ہوم','Admissions':'داخلے','Programs':'پروگرامز','Campuses':'کیمپس','Handouts':'ہینڈ آؤٹس','Study ▾':'مطالعہ ▾','Services ▾':'خدمات ▾','Important Links':'اہم لنکس','Reviews':'رائے','Contact':'رابطہ','Test Center':'ٹیسٹ سینٹر','Planner':'پلانر','Coding Lab':'کوڈنگ لیب','Study Tools':'اسٹڈی ٹولز','Past Papers':'پاسٹ پیپرز','AI Assistant':'AI اسسٹنٹ','Official LMS':'آفیشل LMS','Ticket Help':'ٹکٹ میں مدد','Registration':'رجسٹریشن','Bookshop':'بک شاپ','FAQ':'عمومی سوالات','Deadlines':'ڈیڈ لائنز','Courses':'کورسز','VU Updates':'VU اپ ڈیٹس','Fee Guide':'فیس گائیڈ','My Profile':'میرا پروفائل','Admin Panel':'ایڈمن پینل','Search':'تلاش','Dark / Light':'ڈارک / لائٹ','Quick access':'فوری رسائی','Official VU services':'یونیورسٹی کی سرکاری سروسز','Our channels':'ہمارے چینلز','Student reviews':'طلبہ کی رائے','Good to know':'ضروری بات','Handout library':'ہینڈ آؤٹ لائبریری','Search & download handouts':'ہینڈ آؤٹس تلاش اور ڈاؤن لوڈ کریں','AI practice MCQs':'AI سے پریکٹس MCQs','Plan & track exams':'امتحان کی منصوبہ بندی','GPA, marks & target':'GPA، نمبر اور ہدف','Direct VU login':'VU میں براہِ راست لاگ اِن','Student Registration':'طالب علم رجسٹریشن','Frequently Asked Questions':'اکثر پوچھے جانے والے سوالات','Privacy & Terms':'پرائیویسی اور شرائط','How to apply':'داخلہ کیسے لیں','Chishti Preparation Academy':'چشتی پریپریشن اکیڈمی','Privacy &amp; Terms':'پرائیویسی اور شرائط','Report a problem':'مسئلہ رپورٹ کریں','Install app':'ایپ انسٹال کریں','Student reviews ':'طلبہ کی رائے','Support':'مدد','Disclaimer':'دستبرداری','Study tools':'اسٹڈی ٹولز','Find Your Campus':'اپنا کیمپس تلاش کریں','Programs at Virtual University':'ورچوئل یونیورسٹی کے پروگرامز','Study Planner':'اسٹڈی پلانر','Past Papers and MCQs':'پاسٹ پیپرز اور MCQs','Important links':'اہم لنکس','Prepare smarter. Study with confidence.':'ہوشیاری سے تیاری کریں، اعتماد سے پڑھیں۔'};
let ui=get('cpa_ui','en');
function applyUr(){const on=ui=='ur';document.documentElement.lang=on?'ur':'en';
 $$('nav button,#subnav button,.util button,.tile b,.tile span,section h2,section h3,.hero h1,footer h4,footer a,.b,.chip,.mdl h3,#proHome h3').forEach(el=>{if(el.children.length&&!el.dataset.en)return;
  const cur=el.textContent.trim();if(!el.dataset.en){if(!UR[cur])return;el.dataset.en=cur}
  const en=el.dataset.en;if(on&&UR[en]){if(el.textContent!==UR[en])el.textContent=UR[en]}else if(!on&&el.textContent!==en)el.textContent=en});
 $$('#t-dl,#t-fee,#t-crs,#t-upd,#t-me,#t-priv,#t-srch').forEach(x=>x.classList.toggle('rtl',on&&x.dataset.rtl!='0'));
 const b=$('#urBtn');if(b)b.textContent=on?'English':'اردو'}
window.toggleUr=()=>{ui=ui=='ur'?'en':'ur';put('cpa_ui',ui);applyUr();const t=window.__cur;if(t&&RR[t])try{RR[t]()}catch{}applyUr();trk('lang_ui',ui)};
let urT;new MutationObserver(()=>{clearTimeout(urT);urT=setTimeout(()=>{if(ui=='ur'||document.querySelector('[data-en]'))applyUr()},120)}).observe(document.body,{childList:true,subtree:true});
const T=(en,ur)=>ui=='ur'?ur:en;

// ======================= util bar buttons =======================
const util=$('.util');
if(util){const sp=util.querySelector('.sp');
 sp&&sp.insertAdjacentHTML('afterend',`<button class="u" onclick="go('srch')" aria-label="Search the portal">Search</button><button class="u" id="urBtn" onclick="toggleUr()" aria-label="Urdu / English">اردو</button><button class="u" onclick="toggleLg()" aria-label="Larger text">A+</button><button class="u" onclick="toggleHc()" aria-label="High contrast">Contrast</button><button class="u" id="instBtn" style="display:none" onclick="installApp()">Install app</button>`)}
window.toggleLg=()=>{const o=document.documentElement.classList.toggle('lgt');put('cpa_lg',o)};
window.toggleHc=()=>{const o=document.body.classList.toggle('hc');put('cpa_hc',o)};
if(get('cpa_lg',false))document.documentElement.classList.add('lgt');if(get('cpa_hc',false))document.body.classList.add('hc');

// ======================= PWA =======================
let dip=null;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();dip=e;const b=$('#instBtn');if(b)b.style.display=''});
window.installApp=async()=>{if(dip){dip.prompt();try{await dip.userChoice}catch{}dip=null;$('#instBtn').style.display='none'}else modal(`<h3>Install on your phone</h3><p><b>Android (Chrome):</b> tap the ⋮ menu → <i>Install app</i> / <i>Add to Home screen</i>.</p><p><b>iPhone (Safari):</b> tap the Share button → <i>Add to Home Screen</i>.</p>`)};
window.addEventListener('appinstalled',()=>{const b=$('#instBtn');if(b)b.style.display='none';trk('pwa_installed','')});
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
const off=()=>{let b=$('#offBar');if(!navigator.onLine){if(!b)document.body.insertAdjacentHTML('afterbegin','<div id="offBar" style="background:#b45309;color:#fff;text-align:center;padding:6px;font-size:13px">You are offline. Saved pages, GPA tools, deadlines and your planner still work.</div>')}else b&&b.remove()};
addEventListener('online',off);addEventListener('offline',off);off();

// ======================= helpers: modal / toast =======================
function modal(h){const m=document.createElement('div');m.className='mdl';m.innerHTML='<div role="dialog" aria-modal="true">'+h+'<p style="text-align:right;margin:10px 0 0"><button class="b gr" id="mdx">Close</button></p></div>';document.body.appendChild(m);m.onclick=e=>{if(e.target==m||e.target.id=='mdx')m.remove()};applyUr();return m}
function toast(t,u){const x=document.createElement('div');x.className='toast';x.textContent=t;x.onclick=()=>{x.remove();u&&go(u)};document.body.appendChild(x);setTimeout(()=>x.remove(),9000)}
window.PRO_modal=modal;window.PRO_print=h=>{let pa=$('#printArea');if(!pa){document.body.insertAdjacentHTML('beforeend','<div id="printArea" style="display:none"></div>');pa=$('#printArea')}pa.innerHTML=h;document.body.classList.add('pp');setTimeout(()=>{window.print();setTimeout(()=>document.body.classList.remove('pp'),400)},60)};window.toast=toast;
function notify(title,body,tab){toast(title+(body?': '+body:''),tab);try{if('Notification' in window&&Notification.permission=='granted'){navigator.serviceWorker?.getRegistration().then(r=>{const o={body,icon:'icons/icon-192.png',tag:title};if(r&&r.showNotification)r.showNotification(title,o);else new Notification(title,o)})}}catch{}}

// ======================= VU UPDATES: ticker + tab =======================
let U=Object.assign({items:[],checked:null,lastChange:null,ok:0,total:0},get('cpa_upd',{}));let knownIds=new Set(get('cpa_upd_ids',U.items.map(x=>x.id||x.t)));let firstLoad=!localStorage.getItem('cpa_upd_ids');
const isNew=x=>Date.now()-new Date(x.d)<3*864e5;
const KINDS={datesheet:'Date sheet',result:'Result',admission:'Admission',fee:'Fee',coursework:'Coursework',notice:'Notice'};
async function loadUpd(manual){
 const base=`https://raw.githubusercontent.com/${CFG.repo}/HEAD/updates.json`;let j=null;
 for(const u of [base+'?t='+Date.now(),`https://raw.githubusercontent.com/${CFG.repo}/main/updates.json?t=${Date.now()}`]){try{const r=await fetch(u,{cache:'no-store'});if(r.ok){j=await r.json();break}}catch{}}
 if(j){const o=Array.isArray(j)?{items:j}:j;o.items=(o.items||[]).filter(x=>x&&x.t&&x.u).map(x=>({id:x.id||x.t,t:x.t,u:x.u,d:x.d,k:x.k||'notice'}));
  const fresh=o.items.filter(x=>!knownIds.has(x.id));U=Object.assign(U,o);put('cpa_upd',U);
  if(fresh.length){fresh.forEach(x=>knownIds.add(x.id));put('cpa_upd_ids',[...knownIds].slice(-400));if(!firstLoad)notify('New VU update',fresh[0].t+(fresh.length>1?` (+${fresh.length-1} more)`:''),'upd')}
  firstLoad=false;if(!localStorage.getItem('cpa_upd_ids'))put('cpa_upd_ids',[...knownIds]);U.fetchedAt=Date.now()}
 else if(manual)toast('Could not reach the updates feed. Showing the last saved list.');
 drawTick();if(window.__cur=='upd')RR.upd(true);homeCards()}
function drawTick(){let el=$('#vuTick');if(!el){document.querySelector('main').insertAdjacentHTML('beforebegin','<div id="vuTick" role="region" aria-label="Official VU updates"></div>');el=$('#vuTick')}
 const it=U.items.slice(0,12),nn=U.items.filter(isNew).length;
 const body=it.length?it.map(x=>`<a href="${E(x.u)}" target="_blank" rel="noopener">${isNew(x)?'<span class="nw">NEW</span>':''}${E(x.t)} <span style="opacity:.6">(${E(fmtD(x.d))})</span></a>`).join(''):'<span style="opacity:.85">Watching official VU pages for date sheets, results and admission news. Updates will appear here as soon as they are published.</span>';
 el.innerHTML=`<button class="lb" onclick="go('upd')" aria-label="Open all VU updates">VU Updates${nn?' · '+nn:''}</button><div class="mq"><div class="tr" style="--dur:${Math.max(40,it.length*9)}s">${body}</div></div><button class="ck" onclick="go('upd')">${U.checked?'Checked '+ago(U.checked):'Checking…'}</button>`}
loadUpd();setInterval(()=>loadUpd(),3*60*1000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)loadUpd()});addEventListener('online',()=>loadUpd());
let UF='all';
RR.upd=keep=>{const alerts=get('cpa_alert',false),ls=U.items.filter(x=>UF=='all'||x.k==UF);
 const body=`<h2>Official VU updates</h2><p class="mut">New date sheets, results, admission and fee notices found on the official Virtual University pages. Our server checks every 15 minutes and the newest items stay here until newer ones arrive. Always confirm on the official website.</p>
 <div class="row"><span class="mut">${U.checked?'Last checked: <b>'+E(ago(U.checked))+'</b> ('+E(fmtDT(U.checked))+')':'Waiting for first check…'}${U.total?` · ${U.ok}/${U.total} official pages read`:''}</span><button class="b sm gr" onclick="RR.updRefresh()">Refresh now</button></div>
 <div class="chips">${['all',...Object.keys(KINDS)].map(k=>`<button class="chip ${UF==k?'on':''}" onclick="RR.updF('${k}')">${k=='all'?'All':KINDS[k]}</button>`).join('')}</div>
 <div id="updList">${ls.length?ls.map(x=>`<div class="ui ${isNew(x)?'nw':''}"><div><span class="uk ${E(x.k)}">${E(KINDS[x.k]||'Notice')}</span>${isNew(x)?'<span class="uk" style="background:#10b981;color:#042">NEW</span>':''}<br><a class="t" href="${E(x.u)}" target="_blank" rel="noopener">${E(x.t)}</a><br><small>Found ${E(fmtDT(x.d))}</small></div><a class="b sm" href="${E(x.u)}" target="_blank" rel="noopener">Open</a></div>`).join(''):'<div class="notice">No updates in this list yet. They will appear automatically when the official pages publish something new.</div>'}</div>
 <div class="card" style="margin-top:12px"><h3>Get alerts</h3><p class="mut">Browser alerts work while the portal is open on your phone or computer (also as an installed app). For alerts when the app is closed, join our WhatsApp channel.</p>
 <button class="b ${alerts?'gr':'hi'}" onclick="RR.updAlert()">${alerts?'Browser alerts: ON (tap to turn off)':'Turn on browser alerts'}</button><a class="b wa" target="_blank" rel="noopener" href="${E(CFG.channel)}">WhatsApp Channel</a></div>
 <div class="card"><h3>Official pages</h3><div class="ca"><a href="https://www.vu.edu.pk/" target="_blank" rel="noopener">vu.edu.pk</a><a href="https://datesheet.vu.edu.pk/" target="_blank" rel="noopener">Date sheet portal</a><a href="https://vulms.vu.edu.pk/" target="_blank" rel="noopener">LMS</a><a href="https://www.vu.edu.pk/Admissions/Default" target="_blank" rel="noopener">Admissions</a></div></div>`;
 if(keep&&$('#x-upd'))$('#x-upd').innerHTML=body;else H('upd',body)};
RR.updF=k=>{UF=k;RR.upd(true)};RR.updRefresh=async()=>{await loadUpd(true)};
RR.updAlert=async()=>{if(get('cpa_alert',false)){put('cpa_alert',false);return RR.upd(true)}
 if(!('Notification' in window))return toast('This browser does not support notifications.');let p=Notification.permission;if(p!='granted')p=await Notification.requestPermission();
 if(p=='granted'){put('cpa_alert',true);toast('Alerts are on.')}else toast('Notifications are blocked in your browser settings.');RR.upd(true)};

// ======================= HOME: updates + my day =======================
function homeCards(){const h=$('#t-home');if(!h)return;let el=$('#proHome');if(!el){const a=h.querySelector('.stats');if(!a)return;a.insertAdjacentHTML('afterend','<div id="proHome"></div>');el=$('#proHome')}
 const up=U.items.slice(0,5),dls=getDL().filter(x=>!x.x).sort((a,b)=>a.d.localeCompare(b.d)).slice(0,3),tk=(typeof tasks!='undefined'?tasks:[]),td=new Date().toISOString().slice(0,10),today=tk.filter(x=>x.d==td&&!x.x).length;
 let last='';try{last=(LS('hist',[])[0])||''}catch{}
 el.innerHTML=`<div class="card"><h3>Latest from VU</h3>${up.length?up.map(x=>`<div class="ui ${isNew(x)?'nw':''}"><div><span class="uk ${E(x.k)}">${E(KINDS[x.k]||'Notice')}</span><a class="t" href="${E(x.u)}" target="_blank" rel="noopener">${E(x.t)}</a><br><small>${E(fmtD(x.d))}</small></div></div>`).join(''):'<p class="mut">No update yet. This list fills automatically from official VU pages.</p>'}<p style="margin:6px 0 0"><a href="#" onclick="go('upd');return false">All updates →</a>${U.checked?` <span class="mut">· checked ${E(ago(U.checked))}</span>`:''}</p></div>
 <div class="card"><h3>My day</h3><div class="sg"><div class="lk"><span>Study tasks today<small>Planner</small></span><b>${today}</b></div><div class="lk"><span>Next deadline<small>${dls[0]?E(dls[0].c+' · '+dls[0].t):'None added'}</small></span><b>${dls[0]?E(cdText(dls[0].d)):''}</b></div><div class="lk"><span>Last test<small>${E(last||'No test yet')}</small></span><b></b></div></div>
 <div class="ca"><a href="#" onclick="go('dl');return false">Deadlines</a><a href="#" onclick="go('plan');return false">Planner</a><a href="#" onclick="go('test');return false">Test Center</a></div></div>`}
setTimeout(homeCards,300);

// ======================= DEADLINES =======================
const getDL=()=>get('cpa_dl',[]),setDL=a=>put('cpa_dl',a);
const TYPES=['Assignment','Quiz','GDB','Midterm','Final term','Fee','Admission','Other'];
function cdText(d){const ms=new Date(d)-Date.now(),a=Math.abs(ms),m=Math.floor(a/6e4),h=Math.floor(m/60),dd=Math.floor(h/24);const t=dd>=1?dd+'d '+(h%24)+'h':h>=1?h+'h '+(m%60)+'m':m+'m';return ms<0?'Late '+t:t+' left'}
RR.dl=()=>{const pf=get('cpa_me',{}),cs=(pf.courses||'').split(/[,\s]+/).filter(Boolean),list=getDL().slice().sort((a,b)=>(a.x-b.x)||a.d.localeCompare(b.d)),now=Date.now();
 const row=x=>{const ms=new Date(x.d)-now,cl=x.x?'done':ms<0?'late':ms<2*864e5?'soon':'';return `<div class="dl-i ${cl}"><input type="checkbox" ${x.x?'checked':''} onchange="RR.dlTog('${x.id}')" aria-label="Done"><div class="m"><b>${E(x.c||'General')}</b> · ${E(x.ty)} · ${E(x.t)}<small>${E(fmtDT(x.d))}</small></div><span class="cd">${x.x?'Done':E(cdText(x.d))}</span><button class="b sm gr" onclick="RR.dlDel('${x.id}')" aria-label="Delete">×</button></div>`};
 H('dl',`<h2>Semester deadline tracker</h2><p class="mut">Keep every assignment, quiz, GDB, exam and fee date in one place. Get a reminder one day and one hour before. Dates are saved on this device only. Always copy exact dates from your LMS.</p>
 <div class="fl"><div><label>Course code</label><input id="dl-c" list="dl-cl" placeholder="CS101" maxlength="12"><datalist id="dl-cl">${cs.map(c=>`<option value="${E(c)}">`).join('')}</datalist></div><div><label>Type</label><select id="dl-t">${TYPES.map(t=>`<option>${t}</option>`).join('')}</select></div><div class="w"><label>Title</label><input id="dl-n" placeholder="Assignment 2 / GDB 1 / Quiz 3" maxlength="80"></div><div><label>Date and time</label><input id="dl-d" type="datetime-local"></div></div>
 <button class="b hi" style="margin-top:10px" onclick="RR.dlAdd()">Add deadline</button><button class="b gr" onclick="RR.dlNotif()">${get('cpa_dl_n',false)?'Reminders: ON':'Turn on reminders'}</button><button class="b gr" onclick="RR.dlIcs()">Export to calendar (.ics)</button><button class="b gr" onclick="RR.dlShare()">Share on WhatsApp</button>
 <h3 style="margin-top:14px">Your deadlines (${list.filter(x=>!x.x).length} pending)</h3>${list.map(row).join('')||'<p class="mut">No deadlines yet. Add your first one above.</p>'}`)};
RR.dlAdd=()=>{const c=($('#dl-c').value||'').trim().toUpperCase(),t=($('#dl-n').value||'').trim(),d=$('#dl-d').value;if(!t||!d)return toast('Enter a title and a date/time.');
 const a=getDL();a.push({id:Math.random().toString(36).slice(2,9),c,ty:$('#dl-t').value,t,d,x:0});setDL(a);trk('deadline_add',c);RR.dl();homeCards()};
RR.dlTog=id=>{const a=getDL(),x=a.find(y=>y.id==id);if(x)x.x=x.x?0:1;setDL(a);RR.dl();homeCards()};
RR.dlDel=id=>{setDL(getDL().filter(x=>x.id!=id));RR.dl();homeCards()};
RR.dlNotif=async()=>{if(get('cpa_dl_n',false)){put('cpa_dl_n',false);return RR.dl()}if(!('Notification' in window)){put('cpa_dl_n',true);toast('Reminders will show inside the portal.');return RR.dl()}
 let p=Notification.permission;if(p!='granted')p=await Notification.requestPermission();put('cpa_dl_n',true);toast(p=='granted'?'Reminders are on.':'Reminders will show inside the portal (browser notifications are blocked).');RR.dl()};
RR.dlIcs=()=>{const z=d=>new Date(d).toISOString().replace(/[-:]/g,'').replace(/\.\d+/,''),L=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Chishti Portal//EN'];getDL().filter(x=>!x.x).forEach(x=>{L.push('BEGIN:VEVENT','UID:'+x.id+'@chishti-portal','DTSTAMP:'+z(Date.now()),'DTSTART:'+z(x.d),'DTEND:'+z(new Date(x.d).getTime()+36e5),'SUMMARY:'+(x.c?x.c+' ':'')+x.ty+': '+x.t.replace(/[,;\n]/g,' '),'BEGIN:VALARM','TRIGGER:-P1D','ACTION:DISPLAY','DESCRIPTION:Deadline tomorrow','END:VALARM','END:VEVENT')});L.push('END:VCALENDAR');
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([L.join('\r\n')],{type:'text/calendar'}));a.download='vu-deadlines.ics';a.click()};
RR.dlShare=()=>{const t=getDL().filter(x=>!x.x).sort((a,b)=>a.d.localeCompare(b.d)).map(x=>`• ${x.c||''} ${x.ty}: ${x.t} - ${fmtDT(x.d)}`).join('\n')||'No pending deadlines';window.open('https://wa.me/?text='+encodeURIComponent('My VU deadlines:\n'+t))};
function dlCheck(){if(!get('cpa_dl_n',false))return;const sent=get('cpa_dl_s',{}),now=Date.now();let ch=false;getDL().filter(x=>!x.x).forEach(x=>{const ms=new Date(x.d)-now;[['d1',864e5,'in 1 day'],['h1',36e5,'in 1 hour']].forEach(([k,w,txt])=>{const key=x.id+k;if(ms>0&&ms<=w&&ms>w-9e5*4&&!sent[key]){sent[key]=1;ch=true;notify('Deadline '+txt,(x.c?x.c+' ':'')+x.ty+': '+x.t,'dl')}})});if(ch)put('cpa_dl_s',sent)}
setInterval(dlCheck,60000);setTimeout(dlCheck,5000);

// ======================= PROFILE =======================
const progList=()=>Object.values(PROGS).flat();
RR.me=()=>{const p=get('cpa_me',{});H('me',`<h2>My profile</h2><p class="mut">Save your details once. The registration form, contact form, planner and course pages are filled in for you. Everything stays in this browser; nothing is sent to us until you submit a form.</p>
 <div class="fl"><div><label>Full name</label><input id="me-n" value="${E(p.n||'')}" autocomplete="name"></div><div><label>VU student ID</label><input id="me-i" value="${E(p.i||'')}" placeholder="BC123456789" maxlength="14"></div><div><label>WhatsApp / mobile</label><input id="me-p" type="tel" value="${E(p.p||'')}" autocomplete="tel"></div><div><label>Program</label><input id="me-g" list="me-gl" value="${E(p.g||'')}"><datalist id="me-gl">${progList().map(x=>`<option value="${E(x)}">`).join('')}</datalist></div><div><label>Semester</label><input id="me-s" value="${E(p.s||'')}" placeholder="e.g. 3rd"></div><div><label>City</label><input id="me-c" value="${E(p.c||'')}"></div><div class="w"><label>Campus</label><input id="me-k" list="me-kl" value="${E(p.k||'')}"><datalist id="me-kl">${(window.CAMPUSES||[]).map(c=>`<option value="${E(c.n)}">`).join('')}</datalist></div><div class="w"><label>Courses this semester (comma separated, e.g. CS101, MTH100, ENG101)</label><input id="me-co" value="${E(p.courses||'')}"></div></div>
 <button class="b hi" style="margin-top:10px" onclick="RR.meSave()">Save profile</button><button class="b gr" onclick="if(confirm('Delete saved profile?')){localStorage.removeItem('cpa_me');RR.me()}">Delete</button>`)};
RR.meSave=()=>{const v=k=>($('#me-'+k).value||'').trim();put('cpa_me',{n:v('n'),i:v('i').toUpperCase(),p:v('p'),g:v('g'),s:v('s'),c:v('c'),k:v('k'),courses:v('co').toUpperCase()});toast('Profile saved.')};
const g1=window.go;window.go=function(t){g1(t);try{const p=get('cpa_me',{});
 if(t=='reg'){const s=(i,v)=>{const e=$('#'+i);if(e&&v&&!e.value)e.value=v};setTimeout(()=>{s('rg-name',p.n);s('rg-phone',p.p);s('rg-city',p.c);s('rg-id',p.i);s('rg-camp',p.k)},60)}
 if(t=='contact'){const e=$('#cn');if(e&&p.n&&!e.value)e.value=p.n}
 if(t=='plan'){const e=$('#as');if(e&&p.courses&&!e.value)e.value=p.courses.replace(/\s*,\s*/g,', ')}
 if(t=='camp'&&!$('#repBtn')&&$('#x-camp')){const f=$('#x-camp').querySelector('.notice');f&&f.insertAdjacentHTML('afterend','<p><button id="repBtn" class="b sm gr" onclick="RR.report(\'Wrong campus information\')">Report wrong campus info</button></p>')}
 if(t=='chat'||t=='test')aiNote(t)}catch(e){console.error(e)}applyUr()};
function aiNote(t){const s=$('#t-'+t);if(s&&!s.querySelector('.ainote'))s.insertAdjacentHTML('afterbegin','<div class="notice ainote" style="margin-bottom:10px">AI answers and questions can be wrong or incomplete. Always check with your official handouts and the LMS before the exam.</div>')}

// ======================= COURSE PAGES =======================
let CRS='';
RR.crs=c=>{if(typeof c=='string')CRS=c.toUpperCase().trim();const pf=get('cpa_me',{}),cs=(pf.courses||'').split(/[,\s]+/).filter(Boolean);
 const code=CRS,idx=code?files.map((f,i)=>[f,i]).filter(([f])=>f.toUpperCase().includes(code)):[],pp=code?(cfg.papers||[]).filter(x=>(x.n||'').toUpperCase().includes(code)):[],gr=code?(cfg.groups||[]).filter(x=>(x.n||'').toUpperCase().includes(code)):[],dl=code?getDL().filter(x=>x.c==code&&!x.x):[];
 const notes=get('cpa_notes',{});
 H('crs',`<h2>Course page</h2><p class="mut">Everything for one course on a single page: handouts, past papers, lectures, study group and your own deadlines and notes.</p>
 <div class="row"><input id="cr-c" list="cr-l" placeholder="Course code, e.g. CS101" value="${E(code)}" style="flex:1 1 180px" onkeydown="if(event.key=='Enter')RR.crs(this.value)"><datalist id="cr-l">${cs.map(x=>`<option value="${E(x)}">`).join('')}</datalist><button class="b" onclick="RR.crs($('#cr-c').value)">Open</button></div>
 ${cs.length?`<div class="chips">${cs.map(x=>`<button class="chip ${x==code?'on':''}" onclick="RR.crs('${E(x)}')">${E(x)}</button>`).join('')}</div>`:'<p class="mut">Tip: add your courses in <a href="#" onclick="go(\'me\');return false">My Profile</a> to see them as buttons.</p>'}
 ${code?`<div class="card"><h3>${E(code)} handouts and files (${idx.length})</h3>${idx.slice(0,40).map(([f,i])=>`<div class="file"><span>${E(f)}</span><button class="b sm gr" onclick="dl(${i})">Download</button>${/\.(pdf|txt)$/i.test(f)?`<button class="b sm" onclick="useFile(${i})">Test / Explain</button>`:''}</div>`).join('')||'<p class="mut">No handout with this code yet. Try the <a href="#" onclick="findFiles(\''+E(code)+'\');return false">full library search</a>.</p>'}</div>
 <div class="card"><h3>Past papers</h3>${pp.map(x=>`<div class="lk"><span>${E(x.n)}</span><a class="b sm" href="${E(x.u)}" target="_blank" rel="noopener">Open</a></div>`).join('')||'<p class="mut">No past paper listed yet for this course.</p>'}</div>
 <div class="card"><h3>Lectures and study help</h3><div class="ca"><a target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(code+' VU lecture')}">YouTube lectures</a><a target="_blank" rel="noopener" href="https://ocw.vu.edu.pk/">VU Courseware</a><a target="_blank" rel="noopener" href="https://vulms.vu.edu.pk/">Official LMS</a></div>
 <div class="row" style="margin-top:8px"><button class="b sm" onclick="show($('#cr-ai'),'List the 10 most important topics a Virtual University of Pakistan student should study for the course ${E(code)}, with one line on each. Say that the official course outline must be confirmed on the LMS.')">AI: important topics</button></div><div class="out" id="cr-ai"></div></div>
 <div class="card"><h3>Study group</h3>${gr.map(x=>`<div class="lk"><span>${E(x.n)}</span><a class="b wa sm" href="${E(x.u)}" target="_blank" rel="noopener">Join WhatsApp group</a></div>`).join('')||'<p class="mut">No group link added yet. Ask the administrator on WhatsApp to add one.</p>'}</div>
 <div class="card"><h3>My deadlines for ${E(code)}</h3>${dl.map(x=>`<div class="lk"><span>${E(x.ty)}: ${E(x.t)}<small>${E(fmtDT(x.d))}</small></span><b>${E(cdText(x.d))}</b></div>`).join('')||'<p class="mut">None. <a href="#" onclick="go(\'dl\');return false">Add a deadline</a></p>'}</div>
 <div class="card"><h3>My notes</h3><textarea id="cr-n" rows="5" style="width:100%" placeholder="Notes saved on this device">${E(notes[code]||'')}</textarea></div>`:''}`);
 const n=$('#cr-n');if(n)n.oninput=()=>{const a=get('cpa_notes',{});a[code]=n.value;put('cpa_notes',a)}};

// ======================= FEE & VOUCHER GUIDE =======================
RR.fee=()=>{const du=get('cpa_fee',[]);H('fee',`<h2>Fee and voucher guide</h2><div class="notice">Fee amounts and last dates change every semester. This is a step-by-step guide only. Always take the amount and last date from your own LMS voucher.</div>
 <div class="card"><h3>Steps to pay your semester fee</h3><ol class="steps"><li><b>Log in to the official LMS</b> with your student ID and password at vulms.vu.edu.pk.</li><li><b>Open the fee section</b> (Fee / Voucher menu) and generate or download your voucher for the current semester.</li><li><b>Check the details</b>: your name, student ID, semester and total amount. Note the last date printed on the voucher.</li><li><b>Pay through the channel printed on the voucher</b> (bank branch, mobile banking or approved wallet apps). Never pay to a personal account.</li><li><b>Keep the paid slip or receipt</b> and take a photo. It is your proof of payment.</li><li><b>Check on the LMS after 24-48 hours</b> that the payment shows as paid. If it does not, raise a ticket with your receipt.</li></ol>
 <div class="ca"><a target="_blank" rel="noopener" href="${E(OFF.lms)}">Open LMS</a><a href="#" onclick="go('tix');return false">Raise a fee ticket</a><a href="#" onclick="go('faq');return false">FAQ</a></div></div>
 <div class="card"><h3>Remind me before the last date</h3><div class="fl"><div><label>Last date on my voucher</label><input id="fe-d" type="date"></div><div><label>Note (optional)</label><input id="fe-n" placeholder="Semester Spring 2027 fee"></div></div><button class="b hi" style="margin-top:8px" onclick="RR.feeAdd()">Add fee reminder</button><p class="mut">Adds a "Fee" item to your deadline tracker with the reminders you enabled there.</p></div>
 <div class="card"><h3>Common problems</h3><details><summary>Payment done but still shows unpaid</summary><p>Wait 48 hours, then raise a ticket with the receipt photo and your student ID.</p></details><details><summary>Voucher is not generating</summary><p>Clear the browser cache, try again at a quiet time of day, and raise a ticket if it continues.</p></details><details><summary>Paid after the last date</summary><p>Contact the Finance / Admissions department through the Student Support System and ask about a late-fee voucher.</p></details></div>`)};
RR.feeAdd=()=>{const d=$('#fe-d').value;if(!d)return toast('Choose the last date.');const a=getDL();a.push({id:Math.random().toString(36).slice(2,9),c:'FEE',ty:'Fee',t:($('#fe-n').value||'Semester fee last date').trim(),d:d+'T17:00',x:0});setDL(a);toast('Added to your deadlines.','dl')};

// ======================= PRIVACY & TERMS =======================
RR.priv=()=>{H('priv',`<h2>Privacy policy and terms</h2><p class="mut">Last updated: October 2026. This portal is an independent study-support service for Virtual University of Pakistan students. It is not the official university website.</p>
 <div class="card"><h3>What we collect</h3><ul><li><b>Usage data</b>: anonymous visit and click events (pages opened, downloads, device type, browser, referring site) linked to a random ID stored in your browser. We use this to improve the portal.</li><li><b>Forms you submit</b>: registration, contact, review and problem-report forms may contain your name, phone number, email, city, program and message. We receive these only when you press Submit.</li><li><b>Saved on your device only</b>: your profile, deadlines, notes, planner tasks and test scores live in your browser storage. We cannot see them.</li></ul></div>
 <div class="card"><h3>How we use it</h3><ul><li>To reply to your registration or message, usually on WhatsApp.</li><li>To understand which features students use.</li><li>We do not sell your data and we do not show third-party ads.</li></ul></div>
 <div class="card"><h3>Passwords and logins</h3><p>Never share your VU password with anyone. The Official LMS tab opens the university's own login page. This portal never asks for or sees your VU password.</p></div>
 <div class="card"><h3>AI features</h3><p>Questions you send to the AI assistant, test generator and explanations are processed by external AI services to create the answer. Do not type personal or confidential information into them. AI output can be wrong; verify with official handouts and the LMS.</p></div>
 <div class="card"><h3>Services we rely on</h3><p>Supabase (stores forms and usage events), GitHub (stores study files and the updates feed), Vercel (hosting) and public CDNs for libraries. These providers process data under their own policies.</p></div>
 <div class="card"><h3>Your choices</h3><ul><li>Clear this site's data in your browser settings to remove everything saved on your device.</li><li>To ask us to delete a registration or message you submitted, contact us on WhatsApp with the name and number you used.</li></ul></div>
 <div class="card"><h3>Terms of use</h3><ul><li>Study material and tools are provided to help you prepare. They do not replace official university material.</li><li>Dates, fees, results, eligibility and rules published by Virtual University are the only authority. We try to keep information accurate but do not guarantee it.</li><li>Do not misuse the portal, attempt to break it, or upload unlawful content.</li><li>We are not responsible for losses caused by relying on unofficial information or AI output.</li></ul></div>
 <div class="card"><h3>Contact</h3><p>Questions about this policy: WhatsApp <a href="${WA('Privacy question about the portal')}" target="_blank" rel="noopener">+${E(CFG.wa)}</a>.</p></div>`)};

// ======================= GLOBAL SEARCH =======================
let SQ='';
RR.srch=()=>{H('srch',`<h2>Search the portal</h2><div class="row"><input id="sq" type="search" placeholder="Campus, program, handout, link, FAQ, deadline…" value="${E(SQ)}" style="flex:1 1 240px" autofocus></div><div id="sr"></div>`);const i=$('#sq');i.oninput=()=>{SQ=i.value;srRun()};srRun();setTimeout(()=>i.focus(),50)};
function srRun(){const q=SQ.trim().toLowerCase(),el=$('#sr');if(q.length<2){el.innerHTML='<p class="mut">Type at least 2 letters.</p>';return}
 const has=s=>String(s||'').toLowerCase().includes(q),G=[];
 const camp=(window.CAMPUSES||[]).filter(c=>has(c.n+' '+c.city+' '+c.c+' '+c.a)).slice(0,6);if(camp.length)G.push(['Campuses',camp.map(c=>`<div class="lk"><span>${E(c.n.replace(/^Virtual University\s*/i,'VU '))}<small>${E(c.city)} · ${E(c.c)}</small></span><button class="b sm" onclick="CS_open('${E(c.city)}')">View</button></div>`)]);
 const pr=Object.entries(PROGS).flatMap(([l,a])=>a.filter(n=>has(n)).map(n=>[l,n])).slice(0,6);if(pr.length)G.push(['Programs',pr.map(([l,n])=>`<div class="lk"><span>${E(n)}<small>${E(l)}</small></span><button class="b sm" onclick="go('prog')">Open</button></div>`)]);
 const lk=[...(window.VUCORE||[]),...(window.IMPL||[]).flatMap(g=>g.i),...(cfg.links||[])].filter(l=>has(l.n)).slice(0,6);if(lk.length)G.push(['Links',lk.map(l=>`<div class="lk"><span>${E(l.n)}</span><a class="b sm" href="${E(l.u)}" target="_blank" rel="noopener">Open</a></div>`)]);
 const fq=(window.FQ||[]).filter(x=>has(x[0]+' '+x[1])).slice(0,5);if(fq.length)G.push(['FAQ',fq.map(x=>`<details><summary>${E(x[0])}</summary><p>${E(x[1])}</p></details>`)]);
 const fl=files.map((f,i)=>[f,i]).filter(([f])=>has(f)).slice(0,8);if(fl.length)G.push(['Handouts and files',fl.map(([f,i])=>`<div class="file"><span>${E(f)}</span><button class="b sm gr" onclick="dl(${i})">Download</button></div>`)]);
 const pp=(cfg.papers||[]).filter(x=>has(x.n)).slice(0,5);if(pp.length)G.push(['Past papers',pp.map(x=>`<div class="lk"><span>${E(x.n)}</span><a class="b sm" href="${E(x.u)}" target="_blank" rel="noopener">Open</a></div>`)]);
 const up=U.items.filter(x=>has(x.t)).slice(0,5);if(up.length)G.push(['VU updates',up.map(x=>`<div class="lk"><span>${E(x.t)}<small>${E(fmtD(x.d))}</small></span><a class="b sm" href="${E(x.u)}" target="_blank" rel="noopener">Open</a></div>`)]);
 const dl=getDL().filter(x=>has(x.c+' '+x.t)).slice(0,5);if(dl.length)G.push(['My deadlines',dl.map(x=>`<div class="lk"><span>${E(x.c)} ${E(x.t)}<small>${E(fmtDT(x.d))}</small></span><button class="b sm" onclick="go('dl')">Open</button></div>`)]);
 el.innerHTML=G.map(([t,a])=>`<div class="card"><h3>${t}</h3>${a.join('')}</div>`).join('')||'<div class="notice">Nothing found. Try another word or ask the <a href="#" onclick="go(\'chat\');return false">AI assistant</a>.</div>';
 clearTimeout(srRun.t);srRun.t=setTimeout(()=>trk('search',q),1500)}
window.CS_open=city=>{go('camp');setTimeout(()=>{const i=$('#csq');if(i){i.value=city;i.dispatchEvent(new Event('input'))}},80)};
document.addEventListener('input',e=>{if(e.target.id=='csq'){clearTimeout(e.target._t);e.target._t=setTimeout(()=>{if(e.target.value.trim().length>2)trk('campus_search',e.target.value.trim())},1500)}});

// ======================= REPORT A PROBLEM =======================
RR.report=(pre)=>{modal(`<h3>Report a problem</h3><p class="mut">Wrong campus number, broken link, wrong information? Tell us and we will fix it.</p><div class="fl"><div class="w"><label>Type</label><select id="rp-t">${['Wrong campus information','Broken link','Wrong date or fee information','Portal not working','Other'].map(x=>`<option ${x==pre?'selected':''}>${x}</option>`).join('')}</select></div><div class="w"><label>Details (include page name, campus or link)</label><textarea id="rp-d" rows="4" maxlength="400"></textarea></div></div><button class="b hi" onclick="RR.reportGo()">Send</button>`)};
RR.reportGo=()=>{const t=$('#rp-t').value,d=($('#rp-d').value||'').trim();if(d.length<5)return toast('Please write a few words about the problem.');trk('report',t+': '+d);document.querySelector('.mdl')?.remove();toast('Thank you. Your report was sent.');window.open(WA('Problem report\n'+t+'\n'+d),'_blank')};
const ftc=document.querySelector('footer a[onclick*="priv"]');if(ftc)ftc.insertAdjacentHTML('afterend','<a onclick="RR.report()">Report a problem</a>');

// ======================= TEST CENTER: weak topics, retest, PDF =======================
const fin0=window.finish;
if(typeof fin0=='function'){window.finish=function(){fin0.apply(this,arguments);try{
 if(!Q||Q.type!='mcq')return;const wrong=[];Q.forEach((q,i)=>{const c=document.querySelector(`input[name=q${i}]:checked`);if(!c||+c.value!=+q.a)wrong.push(i)});
 window.__wrong=wrong.map(i=>Q[i]);window.__lastQ=Q.slice();let s=Q.length-wrong.length;
 const old=get('cpa_tests',[]);old.unshift({d:new Date().toISOString(),doc:(typeof doc!='undefined'&&doc?.name)||'',s,n:Q.length});put('cpa_tests',old.slice(0,40));
 let box=$('#testExtra');if(!box){$('#quizcard').insertAdjacentHTML('beforeend','<div id="testExtra" style="margin-top:12px"></div>');box=$('#testExtra')}
 box.innerHTML=`<div class="row">${wrong.length?`<button class="b hi" onclick="RR.retest()">Retest ${wrong.length} wrong answer${wrong.length>1?'s':''}</button><button class="b gr" onclick="RR.weak()">Weak topics report</button>`:'<b style="color:#0a7a52">Perfect score. Well done!</b>'}<button class="b gr" onclick="RR.resultPdf()">Download result (PDF)</button></div><div class="out" id="weakOut" style="display:none"></div>`;trk('test_done',s+'/'+Q.length)}catch(e){console.error(e)}}}
RR.retest=()=>{if(!window.__wrong?.length)return;const r=window.__wrong.map(q=>({...q}));Q=r;Q.type='mcq';drawQuiz(Math.max(120,r.length*60))};
RR.weak=()=>{const el=$('#weakOut');el.style.display='block';const wl=(window.__wrong||[]).map((q,i)=>`${i+1}. ${q.q} (correct: ${(q.o||[])[+q.a]||''})`).join('\n');show(el,`A Virtual University student answered these exam questions wrongly. Group them into 3-5 weak topics, say in one line what to revise for each, and suggest a 3-step revision plan. ${L()}\n${wl}`)};
RR.resultPdf=()=>{const pf=get('cpa_me',{}),items=(window.__lastQ||Q||[]).map((q,i)=>{const c=document.querySelector(`input[name=q${i}]:checked`),ok=c&&+c.value==+q.a;return `<div style="margin:8px 0;padding:8px;border:1px solid #999;border-radius:6px"><b>${i+1}. ${E(q.q)}</b><br>Your answer: ${c?E((q.o||[])[+c.value]):'<i>not answered</i>'} ${ok?'✔':'✘'}<br>Correct: ${E((q.o||[])[+q.a]||'')}${q.e?'<br><small>'+E(q.e)+'</small>':''}</div>`}).join('');
 PRO_print(`<h2>Test result - Chishti Preparation Academy</h2><p>${E(pf.n||'')} ${E(pf.i||'')} · ${new Date().toLocaleDateString()} · ${E($('#score')?.textContent||'')}</p>${items}<p style="font-size:11px">AI-generated questions can contain mistakes. Verify with official handouts.</p>`)};

// ======================= ADMIN: registrations dashboard + extras =======================
const da=window.drawAdmin;
window.drawAdmin=function(){da.apply(this,arguments);if(typeof adm=='undefined'||!adm||!$('#adm'))return;
 cfg.groups=cfg.groups||[];
 const host=$('#adm');host.insertAdjacentHTML('beforeend',`<div class="card"><h3>Campus data verification</h3><p class="mut">Shown to students on the Campuses page.</p><div class="row"><input id="cv" type="date" value="${E(cfg.campusVerified||'')}"><button class="b sm" onclick="cfg.campusVerified=$('#cv').value;saveCfg();toast('Saved. Download portal-config.json to publish.')">Save date</button></div></div>
 <div class="card"><h3>Course study groups (WhatsApp)</h3><div id="e-groups"></div></div><div class="card" id="regDash"><p class="mut">Loading registrations…</p></div><div class="card" id="anaDash"><p class="mut">Loading analytics…</p></div>`);
 ed2('groups',[['n','Course code / name'],['u','WhatsApp group link']]);regLoad();anaLoad()};
let RG={rows:[],f:'all',q:''};
async function regLoad(){const sb=window.__sb,el=$('#regDash');if(!sb||!el)return;const{data,error}=await sb.from('registrations').select('*').order('created_at',{ascending:false}).limit(1000);
 if(error){el.innerHTML='<h3>Registrations</h3><p class="mut">'+E(error.message)+' (run sql/registrations.sql in Supabase)</p>';return}RG.rows=data||[];regDraw()}
function regDraw(){const el=$('#regDash');if(!el)return;const q=RG.q.toLowerCase(),L=RG.rows.filter(r=>(RG.f=='all'||(r.status||'new')==RG.f)&&(!q||Object.values(r).join(' ').toLowerCase().includes(q)));
 const days={};for(let i=13;i>=0;i--){days[new Date(Date.now()-i*864e5).toISOString().slice(0,10)]=0}RG.rows.forEach(r=>{const k=String(r.created_at).slice(0,10);if(k in days)days[k]++});const mx=Math.max(1,...Object.values(days));
 el.innerHTML=`<h3>Registrations (${RG.rows.length}) · new: ${RG.rows.filter(r=>(r.status||'new')=='new').length}</h3><div class="bars" aria-label="Registrations per day, last 14 days">${Object.entries(days).map(([d,n])=>`<i data-v="${n}" title="${d}: ${n}" style="height:${Math.max(3,n/mx*100)}%"></i>`).join('')}</div><p class="mut" style="margin:0">Last 14 days</p>
 <div class="row"><select onchange="RG_.f(this.value)">${[['all','All'],['new','New'],['contacted','Contacted']].map(o=>`<option value="${o[0]}" ${RG.f==o[0]?'selected':''}>${o[1]}</option>`).join('')}</select><input type="text" placeholder="Search name, phone, city" value="${E(RG.q)}" oninput="RG_.q(this.value)" style="flex:1 1 180px"><button class="b sm gr" onclick="RG_.csv()">Export CSV</button><button class="b sm gr" onclick="regLoad2()">Refresh</button></div>
 ${L.slice(0,150).map(r=>`<div class="rg ${(r.status||'new')=='new'?'nw':'ct'}"><b>${E(r.name)}</b> · ${E(r.city||'')} · <span class="mut">${E(fmtDT(r.created_at))}</span><br>${E(r.phone||'')} ${r.email?'· '+E(r.email):''}<br><small>${E(r.program||'')}</small>${r.msg?`<br><small class="mut">${E(r.msg)}</small>`:''}<div class="ca"><a target="_blank" rel="noopener" href="${E(WAN(r.phone||''))}">WhatsApp</a><a href="${E(TELH(r.phone||''))}">Call</a><a href="#" onclick="RG_.set(${r.id},'${(r.status||'new')=='new'?'contacted':'new'}');return false">${(r.status||'new')=='new'?'Mark contacted':'Mark new'}</a></div></div>`).join('')||'<p class="mut">No registrations match.</p>'}`}
window.regLoad2=regLoad;
window.RG_={f:v=>{RG.f=v;regDraw()},q:v=>{RG.q=v;clearTimeout(RG_.t);RG_.t=setTimeout(regDraw,250)},
 async set(id,s){const{error}=await window.__sb.from('registrations').update({status:s}).eq('id',id);if(error)return toast('Could not update: '+error.message);const r=RG.rows.find(x=>x.id==id);if(r)r.status=s;regDraw()},
 csv(){const c=['id','created_at','name','phone','email','program','city','msg','status'],s=RG.rows.map(r=>c.map(k=>'"'+String(r[k]??'').replace(/"/g,'""')+'"').join(',')).join('\n'),a=document.createElement('a');a.href=URL.createObjectURL(new Blob([c.join(',')+'\n'+s],{type:'text/csv'}));a.download='registrations.csv';a.click()}};
async function anaLoad(){const sb=window.__sb,el=$('#anaDash');if(!sb||!el)return;const since=new Date(Date.now()-30*864e5).toISOString();
 const{data,error}=await sb.from('events').select('type,detail,created_at').in('type',['campus_search','search','report','deadline_add','pwa_installed','test_done','tab']).gte('created_at',since).limit(5000);
 if(error){el.innerHTML='<p class="mut">'+E(error.message)+'</p>';return}
 const top=(t,n=8)=>Object.entries(data.filter(x=>x.type==t).reduce((o,x)=>{const k=String(x.detail||'').toLowerCase().trim();if(k)o[k]=(o[k]||0)+1;return o},{})).sort((a,b)=>b[1]-a[1]).slice(0,n),b=l=>l.length?l.map(([k,c])=>`<div class="pg"><span>${E(k)}</span><b>${c}</b></div>`).join(''):'<p class="mut">No data</p>';
 el.innerHTML=`<h3>More analytics (30 days)</h3><div class="sg"><div><h4>Most opened tabs</h4>${b(top('tab',10))}</div><div><h4>Campus searches</h4>${b(top('campus_search'))}</div><div><h4>Portal searches</h4>${b(top('search'))}</div><div><h4>Problem reports</h4>${data.filter(x=>x.type=='report').slice(0,10).map(x=>`<div class="pg"><span>${E(x.detail)}</span></div>`).join('')||'<p class="mut">None</p>'}</div></div><p class="mut">Installs: ${data.filter(x=>x.type=='pwa_installed').length} · Tests finished: ${data.filter(x=>x.type=='test_done').length} · Deadlines added: ${data.filter(x=>x.type=='deadline_add').length}</p>`}

// ======================= campuses: verification date =======================
const rc=RR.camp;if(rc)RR.camp=function(){rc.apply(this,arguments);try{const n=$('#x-camp .notice');if(n&&!$('#cvNote'))n.insertAdjacentHTML('beforeend',`<br><span id="cvNote"><b>Last verified:</b> ${cfg.campusVerified?E(fmtD(cfg.campusVerified)):'data copied from the official page (date not set)'}. Found a mistake? Use the report button below.</span>`)}catch{}};

// ======================= safe tracking wrapper for clicks on updates =======================
document.addEventListener('click',e=>{const a=e.target.closest('#vuTick a,#updList a.t');if(a)trk('update_click',a.textContent.trim().slice(0,100))});
applyUr();setTimeout(applyUr,800);
})();
