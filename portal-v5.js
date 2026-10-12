// Chishti Preparation Academy - v5 layer: merged material catalog, groups, live admin controls, theme, exam-pattern builder
(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],E=esc,sleep=ms=>new Promise(r=>setTimeout(r,ms));
const trk=(a,b)=>{try{TRK(a,b)}catch{}},sbc=()=>window.__sb;
const v5=window.v5={};
// ---------- smooth, professional theme ----------
const PAL=[['#12356b','#f5b301','#0f2a57','#1d6fa5'],['#4f46e5','#f59e0b','#312e81','#0f766e'],['#0f766e','#f97316','#064e3b','#0e7490'],['#9d174d','#fbbf24','#581c87','#be185d'],['#1e40af','#34d399','#0c4a6e','#6d28d9']];
const st=document.createElement('style');st.textContent=`
@property --ac{syntax:'<color>';inherits:true;initial-value:#12356b}@property --hi{syntax:'<color>';inherits:true;initial-value:#f5b301}
@property --h1{syntax:'<color>';inherits:true;initial-value:#0f2a57}@property --h2{syntax:'<color>';inherits:true;initial-value:#1d6fa5}
:root{transition:--ac 3s ease,--hi 3s ease,--h1 3s ease,--h2 3s ease}
.top,.hero{background:linear-gradient(125deg,var(--h1),var(--h2))!important;color:#fff}
.hero{border-radius:20px!important;padding:30px 22px!important;box-shadow:0 14px 36px -14px var(--h1)}
.card{border-radius:16px!important;box-shadow:0 6px 22px -14px #0a1a3680}
.tile{border-radius:16px!important;transition:transform .2s,box-shadow .2s;border-top:4px solid var(--c,var(--ac))!important}.tile:hover{transform:translateY(-3px);box-shadow:0 12px 24px -12px var(--c,var(--ac))}
nav button.on,#subnav button.on{background:linear-gradient(135deg,var(--h1),var(--h2))!important;color:#fff!important}
.b:not(.gr):not(.wa):not(.hi){background:var(--ac)}.b.hi{background:var(--hi)!important;color:#1b1400!important}
.tick{background:linear-gradient(90deg,color-mix(in srgb,var(--hi) 25%,#fff),#fff)!important;border-left:5px solid var(--hi)}
.v5x{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}.v5x>div{border:1px solid var(--ln);border-radius:14px;padding:12px;background:var(--card)}
.v5x h4{margin:0 0 8px;color:var(--ac)}.v5x .ch{display:flex;flex-wrap:wrap;gap:6px}.v5x .ch button,.v5c{border:1px solid var(--ln);background:var(--soft);color:var(--ink);border-radius:999px;padding:6px 12px;cursor:pointer;font:inherit}
.v5c.on{background:var(--ac);color:#fff}.bd{display:inline-block;font-size:11px;padding:2px 8px;border-radius:99px;background:var(--soft);color:var(--ac);font-weight:700;margin:0 4px}
.v5n{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px;margin:8px 0}.v5n div{background:var(--soft);border-radius:12px;padding:10px;text-align:center}.v5n b{display:block;font-size:22px;color:var(--ac)}
.v5sw{display:inline-block;width:34px;height:34px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px var(--ln);cursor:pointer;margin:3px;background:linear-gradient(135deg,var(--a),var(--b))}
@media(prefers-reduced-motion:reduce){:root{transition:none}}`;document.head.appendChild(st);
let tm=null;
function applyTheme(){const t=(typeof cfg!=='undefined'&&cfg.theme)||{auto:true,every:10,idx:0},r=document.documentElement.style;clearInterval(tm);
 const set=p=>{r.setProperty('--ac',p[0]);r.setProperty('--hi',p[1]);r.setProperty('--h1',p[2]);r.setProperty('--h2',p[3])};
 if(t.auto===false&&t.c){set(t.c);return}
 let i=t.idx||0;set(PAL[i%PAL.length]);tm=setInterval(()=>{if(document.hidden)return;i=(i+1)%PAL.length;set(PAL[i])},Math.max(5,t.every||10)*1000)}
// ---------- subnav fix: Study / Services open from any page ----------
const ost=window.subToggle;if(ost)window.subToggle=n=>{const s=$('#subnav'),was=s.classList.contains('open')&&s.dataset.g==n;ost(n);if(!was)s.classList.add('open')};
// ---------- new sections ----------
const TB=[['cat','All Materials'],['vg','VU Groups']];
TB.forEach(([k])=>{if(!$('#t-'+k)){const s=document.createElement('section');s.id='t-'+k;s.innerHTML='<div class="card" id="x-'+k+'"></div>';$('main').appendChild(s)}});
try{TB.forEach(t=>TABS.push(t))}catch{}
const gb=$('#nav [data-g="Study"]');if(gb)gb.insertAdjacentHTML('beforebegin',TB.map(t=>`<button data-t="${t[0]}" onclick="go('${t[0]}')">${t[1]}</button>`).join(''));
const RR=window.RR||(window.RR={});
// ---------- merged catalog ----------
const CODE=/\b([A-Za-z]{2,4})[\s-]?(\d{3})([A-Za-z]?)\b/,KL={handout:'Handout',highlighted:'Highlighted',midterm:'Midterm',final:'Final term',current:'Current paper',quiz:'Quiz',assign:'Assignment',gdb:'GDB',other:'Other'};
const KG={'':null,H:['handout','highlighted'],P:['midterm','final','current'],M:['midterm'],F:['final'],C:['current'],Q:['quiz','assign','gdb'],O:['other']};
const norm=s=>String(s||'').toLowerCase().replace(/\.[a-z0-9]{2,4}$/,'').replace(/vupark|official|highlighted|handouts?|by [a-z-]+|download|solved|past papers?|final ?term|mid ?term|[^a-z0-9]+/g,' ').trim();
const kindOf=(s,d='other')=>{s=s.toLowerCase();return /highlight/.test(s)?'highlighted':/current/.test(s)?'current':/mid/.test(s)?'midterm':/final/.test(s)?'final':/quiz/.test(s)?'quiz':/assign/.test(s)?'assign':/gdb/.test(s)?'gdb':/handout|lecture|book|note/.test(s)?'handout':d};
const dlu=u=>u.replace(/\/file\/d\/([^/]+)\/view.*/,'https://drive.google.com/uc?export=download&id=$1');
let CAT=null,CUPD='',CK='',CL=60,CSKIP=[];
async function loadCat(){if(CAT)return CAT;const map=new Map(),add=e=>{const m=CODE.exec(e.c||'');e.c=m?(m[1]+m[2]+m[3]).toUpperCase():'';const key=e.raw?'raw|'+e.l[0].u:[e.c,e.k,norm(e.t)].join('|'),c=map.get(key);
  if(c){e.l.forEach(l=>{if(!c.l.some(x=>x.u===l.u))c.l.push(l)});if(e.d&&(!c.d||e.d>c.d))c.d=e.d;if((e.t||'').length>c.t.length)c.t=e.t}else map.set(key,e)};
 try{const r=await fetch('/api/catalog');if(r.ok){const d=await r.json();CUPD=d.updated||'';CSKIP=d.skipped||[];d.items.forEach(add)}}catch{}
 for(let i=0;i<20&&!files.length;i++){if(i==3)try{loadLib()}catch{}await sleep(300)}
 const today=new Date().toISOString().slice(0,10);
 files.filter(f=>/\.(pdf|docx?|pptx?|xlsx?|zip|txt|png|jpe?g)$/i.test(f)).forEach(f=>{const n=f.split('/').pop();add({c:f,t:n.replace(/\.[a-z0-9]+$/i,''),k:kindOf(f,'handout'),l:[{s:'Chishti Library',u:raw(f)}],d:today})});
 CAT=[...map.values()].sort((a,b)=>(a.c||'~').localeCompare(b.c||'~')||a.k.localeCompare(b.k));const s1=$('#st1');if(s1)s1.textContent=CAT.length;return CAT}
RR.cat=async()=>{const h=$('#x-cat');h.innerHTML=`<h2>All Materials</h2><p class="mut">Handouts, past papers and current papers from our library, partner websites and public Drive folders, merged into one list. A file found in several places is shown once with every download source.</p>
<div class="row"><input id="cq" type="text" placeholder="Search by course code or title, e.g. CS101" style="flex:1"><select id="cs"><option value="">All sources</option></select></div>
<div id="cch" style="margin:8px 0"></div><div id="csum"><p class="mut">Loading catalog…</p></div><div id="cls"></div>`;
 await loadCat();const src=[...new Set(CAT.flatMap(e=>e.l.map(l=>l.s)))].sort();$('#cs').innerHTML='<option value="">All sources</option>'+src.map(s=>`<option>${E(s)}</option>`).join('');
 $('#cch').innerHTML=[['','All'],['H','Handouts'],['P','All papers'],['M','Midterm'],['F','Final term'],['C','Current papers'],['Q','Quiz/Assign/GDB'],['O','Other']].map(c=>`<button class="v5c${c[0]==CK?' on':''}" data-k="${c[0]}">${c[1]}</button>`).join(' ');
 $$('#cch .v5c').forEach(b=>b.onclick=()=>{CK=b.dataset.k;$$('#cch .v5c').forEach(x=>x.classList.toggle('on',x==b));CL=60;drawCat()});
 let t;$('#cq').oninput=()=>{clearTimeout(t);t=setTimeout(()=>{CL=60;drawCat();trk('cat-search',$('#cq').value)},300)};$('#cs').onchange=()=>{CL=60;drawCat()};drawCat()};
function drawCat(){const q=$('#cq').value.trim().toLowerCase(),s=$('#cs').value,g=KG[CK];
 const a=CAT.filter(e=>(!g||g.includes(e.k))&&(!s||e.l.some(l=>l.s==s))&&(!q||q.split(/\s+/).every(w=>(e.c+' '+e.t).toLowerCase().includes(w))));
 const by={};a.forEach(e=>by[e.k]=(by[e.k]||0)+1);const srcs=new Set(a.flatMap(e=>e.l.map(l=>l.s))).size;
 $('#csum').innerHTML=`<div class="v5n"><div><b>${a.length}</b>${q||g||s?'matching files':'unique files'}</div><div><b>${CAT.length}</b>total in catalog</div><div><b>${srcs}</b>sources</div></div><p class="mut">${Object.entries(by).map(([k,n])=>n+' '+KL[k]).join(' · ')||'No matches'}${CUPD?' · Catalog refreshed '+new Date(CUPD).toLocaleString():''}</p>`;
 $('#cls').innerHTML=a.slice(0,CL).map(e=>`<div class="cx" style="margin:8px 0"><b>${E(e.c||'Unsorted')}</b> ${E(e.t)}<span class="bd">${KL[e.k]}</span>${e.d?`<small class="mut"> updated ${E(e.d)}</small>`:''}<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px">${e.l.map(l=>`<a class="b sm" data-trk="${E(e.c+' '+e.t)}" href="${E(dlu(l.u))}" target="_blank" rel="noopener">⬇ ${E(l.s)}</a>`).join('')}</div></div>`).join('')+(a.length>CL?`<button class="b gr" onclick="v5.more()">Show more (${a.length-CL} left)</button>`:'');}
v5.openCat=k=>{CK=k;go('cat')};v5.more=()=>{CL+=60;drawCat()};document.addEventListener('click',e=>{const a=e.target.closest('[data-trk]');if(a)trk('cat-dl',a.dataset.trk)});
// ---------- VU groups ----------
RR.vg=()=>{const g=[...(cfg.vgroups||[])];try{(cfg.groups||[]).forEach(x=>{const u=x.u||x.url||x.link;if(u)g.push({n:x.n||x.name||x.c||'Study group',u,c:'Course study groups'})})}catch{}
 const h=$('#x-vg'),cats=[...new Set(g.map(x=>x.c||'General'))];
 h.innerHTML=`<h2>VU Groups</h2><p class="mut">WhatsApp, Telegram and other VU study groups maintained by the administrator.</p><input id="gq" type="text" placeholder="Search groups" style="width:100%"><div id="gl"></div>`;
 const draw=()=>{const q=$('#gq').value.toLowerCase();$('#gl').innerHTML=cats.map(c=>{const l=g.filter(x=>(x.c||'General')==c&&(!q||(x.n+c).toLowerCase().includes(q)));return l.length?`<h3>${E(c)} <span class="bd">${l.length}</span></h3><div class="sg">${l.map(x=>`<a class="lk" href="${E(x.u)}" target="_blank" rel="noopener"><span>${E(x.n)}</span><b>Join ↗</b></a>`).join('')}</div>`:''}).join('')||'<p class="mut">No groups yet.</p>'};
 $('#gq').oninput=draw;draw();trk('tab','vg')};
// ---------- home: all sections visible ----------
function explorer(){const nav=$('#nav');if(!nav||!$('#t-home')||$('#v5ex'))return;const G=[];
 const main=$$('#nav>button[data-t]').map(b=>[b.dataset.t,b.textContent]);G.push(['Main',main]);
 $$('#nav>button[data-g]').forEach(b=>{const n=b.dataset.g;window.subToggle(n);G.push([n,$$('#subnav button').map(x=>[x.dataset.t,x.textContent])]);$('#subnav').classList.remove('open')});
 const ic={home:'🏠',apply:'📝',prog:'🎓',camp:'🏫',lib:'📚',cat:'🗂️',vg:'👥',test:'🧪',plan:'📅',dl:'⏰',crs:'📘',code:'💻',tools:'🧮',pp:'📄',chat:'🤖',upd:'📢',lms:'🔐',fee:'💳',tix:'🎫',reg:'🧾',shop:'🛒',faq:'❓',me:'👤',links:'🔗',rev:'⭐',contact:'☎️'};
 const box=document.createElement('div');box.id='v5ex';box.innerHTML=`<h2>Everything in one place</h2><div class="v5x">${G.map(g=>`<div><h4>${E(g[0]=='Main'?'Main pages':g[0])}</h4><div class="ch">${g[1].map(x=>`<button onclick="go('${x[0]}')">${ic[x[0]]||'•'} ${E(x[1])}</button>`).join('')}</div></div>`).join('')}</div>`;
 const tl=$('#t-home .tiles');(tl?tl.parentNode:$('#t-home')).insertBefore(box,tl||null);}
// ---------- live settings (ticker, groups, theme) ----------
async function loadLive(){if(typeof adm!=='undefined'&&adm)return;try{const S=window.SUPA,r=await fetch(S.url+'/rest/v1/portal_settings?key=eq.live&select=value',{headers:{apikey:S.key,Authorization:'Bearer '+S.key}}),v=(await r.json())[0]?.value;if(!v)return;
 ['ann','vgroups','theme','tickSpeed','tickOn'].forEach(k=>{if(v[k]!==undefined)cfg[k]=v[k]});try{drawHome()}catch{}tick();applyTheme()}catch{}}
function tick(){const t=$('#tickr');if(!t)return;t.parentNode.style.display=cfg.tickOn===false?'none':'';t.style.animationDuration=(cfg.tickSpeed||30)+'s'}
const dh=window.drawHome;if(typeof dh=='function'){window.drawHome=function(){dh.apply(this,arguments);tick()}}
let pt;const pub=()=>{clearTimeout(pt);pt=setTimeout(async()=>{const m=$('#v5st'),sb=sbc();if(!sb)return;try{const{error}=await sb.from('portal_settings').upsert({key:'live',value:{ann:cfg.ann,vgroups:cfg.vgroups||[],theme:cfg.theme,tickSpeed:cfg.tickSpeed,tickOn:cfg.tickOn,at:Date.now()}});if(m)m.textContent=error?'Not published: '+error.message+' (run sql/registrations.sql once)':'Published live ✓ everyone sees it within a minute'}catch(e){if(m)m.textContent='Not published: '+e.message}},400)};
// ---------- admin ----------
const da=window.drawAdmin;
window.drawAdmin=function(){da.apply(this,arguments);if(typeof adm=='undefined'||!adm||!$('#adm'))return;cfg.vgroups=cfg.vgroups||[];cfg.ann=cfg.ann||[];cfg.theme=cfg.theme||{auto:true,every:10,idx:0};
 const ti=cfg.ann.map((a,i)=>`<div class="pg"><span>${E(a.t||a)}</span><button class="b sm gr" onclick="v5.delAnn(${i})">Delete</button></div>`).join('')||'<p class="mut">No messages.</p>';
 const gi=cfg.vgroups.map((g,i)=>`<div class="pg"><span>${E(g.c||'General')} – ${E(g.n)}</span><button class="b sm gr" onclick="v5.delG(${i})">Delete</button></div>`).join('')||'<p class="mut">No groups yet.</p>';
 $('#adm').insertAdjacentHTML('beforeend',`<div class="card" id="v5live"><h3>Live controls <small class="mut">(changes publish instantly)</small></h3><p id="v5st" class="mut"></p>
<h4>Scrolling ticker</h4><div class="row"><input id="v5a" type="text" placeholder="New message for the moving bar" style="flex:1"><button class="b sm" onclick="v5.addAnn()">Add &amp; run</button></div>${ti}
<div class="row"><label><input type="checkbox" id="v5on" ${cfg.tickOn===false?'':'checked'} onchange="v5.tick()"> Show ticker</label> <label>Speed (seconds per pass) <input type="range" id="v5sp" min="10" max="80" value="${cfg.tickSpeed||30}" onchange="v5.tick()"></label></div>
<h4>VU Groups</h4><div class="row"><input id="v5gn" type="text" placeholder="Group name"><input id="v5gu" type="text" placeholder="Link (https://chat.whatsapp.com/…)"><input id="v5gc" type="text" placeholder="Category (e.g. CS, MGT)"><button class="b sm" onclick="v5.addG()">Add group</button></div>${gi}
<h4>Colours</h4><label><input type="checkbox" id="v5au" ${cfg.theme.auto===false?'':'checked'} onchange="v5.theme()"> Smooth automatic colour change</label> <label>every <input type="number" id="v5ev" min="5" max="120" value="${cfg.theme.every||10}" style="width:70px" onchange="v5.theme()"> s</label>
<div>${PAL.map((p,i)=>`<span class="v5sw" style="--a:${p[2]};--b:${p[3]}" onclick="v5.pal(${i})" title="Palette ${i+1}"></span>`).join('')}</div>
<div class="row"><label>Main <input type="color" id="v5c1" value="${(cfg.theme.c||PAL[0])[2]}"></label><label>Second <input type="color" id="v5c2" value="${(cfg.theme.c||PAL[0])[3]}"></label><label>Accent <input type="color" id="v5c3" value="${(cfg.theme.c||PAL[0])[1]}"></label><button class="b sm" onclick="v5.custom()">Use these colours</button></div></div>
<div class="card" id="v5vis"><h3>Visitors</h3><div class="row"><select id="v5d" onchange="v5.vis()"><option value="1">Last 24 hours</option><option value="7" selected>Last 7 days</option><option value="30">Last 30 days</option></select><button class="b sm" onclick="v5.vis()">Refresh</button></div><div id="v5vb"><p class="mut">Loading…</p></div></div>`);v5.vis()};
const sv=()=>{SV('cfgL',cfg);pub()};
v5.addAnn=()=>{const v=$('#v5a').value.trim();if(!v)return;cfg.ann.unshift(v);sv();applyTicker();drawAdmin()};v5.delAnn=i=>{cfg.ann.splice(i,1);sv();applyTicker();drawAdmin()};
function applyTicker(){try{drawHome()}catch{}}
v5.tick=()=>{cfg.tickOn=$('#v5on').checked;cfg.tickSpeed=+$('#v5sp').value;sv();tick()};
v5.addG=()=>{const n=$('#v5gn').value.trim(),u=$('#v5gu').value.trim();if(!n||!/^https?:\/\//.test(u))return alert('Enter a name and a full link starting with https://');cfg.vgroups.push({n,u,c:$('#v5gc').value.trim()||'General'});sv();drawAdmin()};v5.delG=i=>{cfg.vgroups.splice(i,1);sv();drawAdmin()};
v5.theme=()=>{cfg.theme.auto=$('#v5au').checked;cfg.theme.every=+$('#v5ev').value||10;sv();applyTheme()};v5.pal=i=>{cfg.theme={auto:false,c:PAL[i]};$('#v5au').checked=false;sv();applyTheme()};
v5.custom=()=>{const a=$('#v5c1').value,b=$('#v5c2').value,h=$('#v5c3').value;cfg.theme={auto:false,c:[a,h,a,b]};$('#v5au').checked=false;sv();applyTheme()};
v5.vis=async()=>{const el=$('#v5vb'),sb=sbc();if(!el||!sb)return;const days=+$('#v5d').value;try{const{data,error}=await sb.from('events').select('visitor_id,type,detail,created_at').gte('created_at',new Date(Date.now()-days*864e5).toISOString()).limit(10000);if(error)throw error;
 const v=data.filter(x=>x.type=='visit'),u=new Set(data.map(x=>x.visitor_id)),top=t=>{const m={};data.filter(x=>x.type==t&&x.detail).forEach(x=>m[x.detail]=(m[x.detail]||0)+1);return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,6).map(x=>`<li>${E(x[0])} <b>${x[1]}</b></li>`).join('')||'<li class="mut">–</li>'};
 el.innerHTML=`<div class="v5n"><div><b>${v.length}</b>visits</div><div><b>${u.size}</b>unique visitors</div><div><b>${data.filter(x=>x.type=='tab').length}</b>pages opened</div><div><b>${data.filter(x=>x.type=='cat-dl').length}</b>downloads</div></div><h4>Top pages</h4><ul>${top('tab')}</ul><h4>Top material searches</h4><ul>${top('cat-search')}</ul><h4>Most downloaded</h4><ul>${top('cat-dl')}</ul>`}catch(e){el.innerHTML='<p class="mut">Could not load visitors: '+E(e.message||e)+'</p>'}};
// ---------- exam pattern builder (inside Test Center) ----------
const tc=$('#t-test .card');
if(tc)tc.insertAdjacentHTML('beforeend',`<hr><h3>Exam pattern builder</h3><p class="mut">Enter a course code. Past and current papers are collected, repeated questions are found, and a practice test is made with answers taken from the handout.</p>
<div class="row"><input id="eb" type="text" placeholder="Course code, e.g. CS101"><select id="ebn"><option>10</option><option>15</option><option>20</option></select><button class="b" onclick="v5.build()">Build test</button></div>
<p class="mut">Papers on Drive or other sites cannot be read automatically. You can also add PDF files from your phone: <input id="ebf" type="file" accept="application/pdf" multiple></p><div id="ebo"></div>`);
const tok=s=>new Set(s.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(w=>w.length>3));
const jac=(a,b)=>{let i=0;a.forEach(x=>b.has(x)&&i++);return i/(a.size+b.size-i||1)};
async function pdfText(buf,max){await lz('pdf');pdfjsLib.GlobalWorkerOptions.workerSrc=LZ.pdf.replace('pdf.min.js','pdf.worker.min.js');const d=await pdfjsLib.getDocument({data:buf}).promise;let t='';for(let i=1;i<=d.numPages&&t.length<max;i++){t+=(await(await d.getPage(i)).getTextContent()).items.map(x=>x.str).join(' ')+'\n'}return t.slice(0,max)}
const grab=async u=>{const c=new AbortController(),t=setTimeout(()=>c.abort(),15000);try{const r=await fetch(u,{signal:c.signal});if(!r.ok)return null;return await r.arrayBuffer()}catch{return null}finally{clearTimeout(t)}};
v5.build=async()=>{const o=$('#ebo'),m=CODE.exec($('#eb').value);if(!m)return o.innerHTML='<p class="mut">Enter a valid course code like CS101.</p>';const code=(m[1]+m[2]+m[3]).toUpperCase(),N=+$('#ebn').value;o.innerHTML='<p class="mut">Collecting files…</p>';trk('test-build',code);
 await loadCat();const mine=CAT.filter(e=>e.c==code),P=mine.filter(e=>['midterm','final','current'].includes(e.k)),H=mine.filter(e=>['handout','highlighted'].includes(e.k));
 const pick=a=>a.map(e=>e.l.find(l=>/\.pdf$|raw\.githubusercontent|\/uploads\//i.test(l.u))).filter(Boolean),papers=[],hand=[];
 for(const l of pick(P).slice(0,8)){const b=await grab(l.u);if(b)try{papers.push(await pdfText(b,20000))}catch{}}
 for(const l of pick(H).slice(0,1)){const b=await grab(l.u);if(b)try{hand.push(await pdfText(b,150000))}catch{}}
 for(const f of $('#ebf').files){try{const t=await pdfText(await f.arrayBuffer(),150000);(/hand|lecture|book/i.test(f.name)?hand:papers).push(t)}catch{}}
 const links=`<p class="mut">${code}: ${P.length} paper(s) and ${H.length} handout(s) in the catalog. <a href="#" onclick="go('cat');setTimeout(()=>{$('#cq').value='${code}';$('#cq').oninput()},300);return false">Open all ${code} files</a></p>`;
 if(!papers.length)return o.innerHTML=links+'<p>No readable paper text could be loaded automatically. Add the paper PDFs with the file picker above and tap Build test again.</p>';
 const qs=[];papers.forEach((t,pi)=>t.split(/(?:^|\s)(?:Q\.?\s*\d{1,2}[.):]?|\d{1,2}\s*[.)])\s+|\?\s+/).map(x=>x.replace(/\s+/g,' ').trim()).filter(x=>x.length>25&&x.length<320).forEach(x=>qs.push({t:x,k:tok(x),p:pi})));
 const cl=[];qs.forEach(q=>{const c=cl.find(c=>jac(c.k,q.k)>=.5);c?(c.p.add(q.p),c.n++):cl.push({t:q.t,k:q.k,p:new Set([q.p]),n:1})});
 cl.sort((a,b)=>b.p.size-a.p.size||b.n-a.n);const top=cl.slice(0,N),H0=hand.join('\n'),W=[];for(let i=0;i<H0.length;i+=500)W.push(H0.slice(i,i+700));
 top.forEach(q=>{let b='',s=0;W.forEach(w=>{const sc=jac(q.k,tok(w));if(sc>s){s=sc;b=w}});q.ctx=b});
 o.innerHTML=links+`<h4>Repeated questions (${papers.length} papers read)</h4><ol>${top.map(q=>`<li>${E(q.t)} <span class="bd">in ${q.p.size} paper${q.p.size>1?'s':''}</span></li>`).join('')}</ol><p class="mut">Writing the practice test…</p>`;
 const L=(typeof LANGS!='undefined'&&LANGS[lang])?LANGS[lang][1]:'simple English';
 const pr=`You are an exam setter for Virtual University course ${code}. Using ONLY the handout text given for each question, convert each question into one MCQ with 4 options, the correct option, and a one-line explanation. If no handout text is given, say "no handout text found" instead of guessing. Write in ${L}.\n`+top.map((q,i)=>`Q${i+1}: ${q.t.slice(0,200)}\nHANDOUT: ${(q.ctx||'none').slice(0,520)}`).join('\n');
 try{const r=await ask(pr),t=typeof r=='string'?r:(r&&(r.reply||r.text))||'';o.lastElementChild.outerHTML=`<h4>Practice test scheme</h4><div style="white-space:pre-wrap">${E(t)}</div>`}catch(e){o.lastElementChild.outerHTML='<p class="mut">The AI service is busy. Please tap Build test again in a minute.</p>'}};
// ---------- library shortcut + init ----------
const lb=$('#t-lib .card');if(lb)lb.insertAdjacentHTML('afterbegin','<button class="b hi" onclick="go(\'cat\')">🗂️ Search all sources (merged, with totals)</button>');
const tl=$('#t-home .tiles');if(tl)tl.insertAdjacentHTML('afterbegin',`<button class="tile" style="--c:#0f766e" onclick="go('cat')"><b>All Materials</b><span>Every handout &amp; paper, merged</span></button><button class="tile" style="--c:#9d174d" onclick="go('vg')"><b>VU Groups</b><span>Join study groups</span></button>`);

const BT=[['🧠','AI Assistant',"go('chat')",'#2563eb,#3b82f6'],['📝','Auto Quiz Generator',"go('test')",'#7c3aed,#a855f7'],['📖','Past & Current Papers',"v5.openCat('P')",'#6366f1,#818cf8'],['⬇️','Download Handouts & Files',"v5.openCat('H')",'#1d4ed8,#2563eb'],['👥','VU Groups',"go('vg')",'#be185d,#ec4899'],['📅','Study Planner',"go('plan')",'#0f766e,#14b8a6'],['🧮','GPA & Study Tools',"go('tools')",'#ea580c,#fb923c'],['💬','WhatsApp Channel',"window.open(CFG.channel,'_blank')",'#16a34a,#22c55e']];
const hr=$('#t-home .hero');if(hr&&!$('#v6b'))hr.insertAdjacentHTML('afterend','<div id="v6b">'+BT.map(b=>`<button class="v6btn" style="--g:${b[3]}" onclick="${b[2]}"><span>${b[0]}</span>${b[1]}</button>`).join('')+'</div>');
applyTheme();explorer();loadLive();setTimeout(loadLive,2500);setInterval(loadLive,60000);try{(window.requestIdleCallback||setTimeout)(()=>loadCat())}catch{}
})();
