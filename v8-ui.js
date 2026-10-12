/* v8-ui: dashboard shell (desktop sidebar + mobile drawer/bottom nav), new Home, reliable catalog loader,
   Handout Library, Past Papers, LMS Handling (public page + admin editor). Loaded last. */
(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const G=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},S=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const R8=window.R8={};
const me=()=>G('cpa_me',{});
const toast=m=>{try{toast0(m)}catch{try{V7.toast(m)}catch{}}};const toast0=window.toast;
try{Object.defineProperty(window,'files',{get:()=>files,configurable:true})}catch{}  // v7 code reads window.files; it is a script-level let, so expose it
document.body.classList.add('v8');

/* ================= catalog (handouts, past papers, Drive) ================= */
const KL={handout:'Handout',highlighted:'Highlighted',midterm:'Midterm',final:'Final term',current:'Current paper',quiz:'Quiz',assign:'Assignment',gdb:'GDB',other:'Other'};
const PAPER=['midterm','final','current'];
const CODE=/\b([A-Za-z]{2,4})[\s-]?(\d{3})([A-Za-z]?)\b/;
const C8={items:[],state:'idle',err:'',upd:'',skipped:[],keyUsed:null,p:null,from:''};
const norm=s=>String(s||'').toLowerCase().replace(/\.[a-z0-9]{2,4}$/,'').replace(/[^a-z0-9]+/g,' ').trim();
const kindOf=(s,d='other')=>{s=String(s).toLowerCase();return /highlight/.test(s)?'highlighted':/current/.test(s)?'current':/mid/.test(s)?'midterm':/final/.test(s)?'final':/quiz/.test(s)?'quiz':/assign/.test(s)?'assign':/gdb/.test(s)?'gdb':/handout|lecture|book|note/.test(s)?'handout':d};
const dlu=u=>String(u).replace(/\/file\/d\/([^/]+)\/view.*/,'https://drive.google.com/uc?export=download&id=$1');
function ingest(list){
  const map=new Map(),add=e=>{const m=CODE.exec(e.c||'');e.c=m?(m[1]+m[2]+m[3]).toUpperCase():'';const key=e.raw?'raw|'+e.l[0].u:[e.c,e.k,norm(e.t)].join('|'),c=map.get(key);
    if(c){e.l.forEach(l=>{if(!c.l.some(x=>x.u===l.u))c.l.push(l)});if(e.d&&(!c.d||e.d>c.d))c.d=e.d;if((e.t||'').length>c.t.length)c.t=e.t}else map.set(key,e)};
  (list||[]).forEach(add);
  try{(files||[]).filter(f=>/\.(pdf|docx?|pptx?|xlsx?|zip|txt|png|jpe?g)$/i.test(f)&&!/portal-config|catalog\.json|updates\.json|datesheet\.json/.test(f)).forEach(f=>{const n=f.split('/').pop();add({c:f,t:n.replace(/\.[a-z0-9]+$/i,''),k:kindOf(f,'handout'),l:[{s:'Chishti Library',u:raw(f)}],d:''})})}catch{}
  C8.items=[...map.values()].sort((a,b)=>(a.c||'~').localeCompare(b.c||'~')||a.k.localeCompare(b.k));
  C8.base=list;
  const s1=$('#st1');if(s1)s1.textContent=C8.items.length;
  try{V7.log.files=Date.now()}catch{}
}
function stats(){const it=C8.items;return{n:it.length,courses:new Set(it.map(x=>x.c).filter(Boolean)).size,papers:it.filter(x=>PAPER.includes(x.k)).length,hand:it.filter(x=>x.k=='handout'||x.k=='highlighted').length,src:new Set(it.flatMap(x=>x.l.map(l=>l.s))).size}}
function refreshViews(){const t=window.__cur8;try{if(t=='dash')drawDash();if(t=='hl'||t=='pp8')R8[t](true)}catch(e){console.error(e)}}
function loadC8(force){
  if(C8.p&&!force)return C8.p;
  C8.state='loading';C8.err='';
  const cached=G('v8_cat',null);if(cached&&cached.items&&!C8.items.length){C8.upd=cached.updated||'';C8.keyUsed=cached.keyUsed;C8.skipped=cached.skipped||[];ingest(cached.items);C8.from='saved copy';refreshViews()}
  C8.p=(async()=>{
    let d=null;const errs=[],urls=['/api/catalog'];try{urls.push(`https://raw.githubusercontent.com/${CFG.repo}/HEAD/catalog.json`)}catch{}
    for(const u of urls){for(let a=0;a<2&&!d;a++){try{const ctl=new AbortController(),t=setTimeout(()=>ctl.abort(),80000);const r=await fetch(u,{signal:ctl.signal});clearTimeout(t);if(!r.ok)throw new Error('HTTP '+r.status);const j=await r.json();if(!j||!Array.isArray(j.items))throw new Error('unexpected reply');d=j;C8.from=u.startsWith('/')?'live catalog':'GitHub catalog'}catch(e){errs.push((u.startsWith('/')?'/api/catalog':'catalog.json')+': '+(e.name=='AbortError'?'timed out':e.message));d=null;if(a==0)await sleep(2500)}}if(d)break}
    if(d){C8.upd=d.updated||'';C8.keyUsed=d.keyUsed;C8.skipped=d.skipped||[];C8.ms=d.ms;ingest(d.items);C8.state='ok';C8.err='';
      try{if(JSON.stringify(d).length<3.5e6)S('v8_cat',{items:d.items,updated:d.updated,keyUsed:d.keyUsed,skipped:d.skipped})}catch{}}
    else{C8.state=C8.items.length?'ok':'err';C8.err=errs.join(' | ');if(!C8.items.length)ingest([])}
    refreshViews();
    // GitHub data-repo file list arrives separately; merge it in when it shows up
    let n=0,last=-1;const iv=setInterval(()=>{n++;try{if(files.length!==last){last=files.length;ingest(C8.base||[]);refreshViews()}}catch{}if(n>12)clearInterval(iv)},3000);
    return C8.items;
  })();
  return C8.p;
}
const fmtT=t=>{try{return new Date(t).toLocaleString([], {day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}catch{return ''}};
function statusHTML(){
  const st=stats();
  if(C8.state=='loading'&&!C8.items.length)return`<div class="ld8"><span class="sp"></span>Collecting handouts and past papers from Google Drive and partner websites… the first load can take up to a minute. Please wait, this page fills in by itself.</div>`;
  if(C8.state=='err')return`<div class="err8"><b>Could not load the file index.</b><br>${E(C8.err)}<br><button class="d8b p" style="margin-top:10px" onclick="R8.reload()">Try again</button><details style="margin-top:8px"><summary>How to fix</summary>Open <b>your-site/api/catalog</b> in a browser. If it shows an error, check Vercel &gt; Settings &gt; Environment Variables &gt; <b>DRIVE_API_KEY</b> and redeploy. In Google Cloud, enable <b>Google Drive API</b> and set the key's application restriction to <b>None</b> (server calls have no website referrer).</details></div>`;
  const warn=C8.keyUsed===false?`<div class="err8" style="margin:8px 0">Drive key is missing, so Drive folders are not expanded. Add <b>DRIVE_API_KEY</b> in Vercel &gt; Settings &gt; Environment Variables, then Redeploy.</div>`:'';
  const drv=(C8.skipped||[]).filter(x=>/^Drive/i.test(x));
  const dw=drv.length?`<div class="err8" style="margin:8px 0">Google Drive replied: ${E(drv[0])}. Check that the Drive API is enabled for the key and the key has no website restriction.</div>`:'';
  return`<div class="st8"><div><b>${st.n}</b>files</div><div><b>${st.courses}</b>courses</div><div><b>${st.hand}</b>handouts</div><div><b>${st.papers}</b>past papers</div><div><b>${st.src}</b>sources</div></div>${warn}${dw}<p style="color:var(--mut8);font-size:12.5px;margin:6px 0">${C8.upd?'Index updated '+E(fmtT(C8.upd))+' · ':''}${E(C8.from||'')}${C8.state=='loading'?' · refreshing…':''} <a href="#" onclick="R8.reload();return false" style="color:var(--p8);font-weight:700">Refresh</a></p>${(C8.skipped||[]).length?`<details style="font-size:12.5px;color:var(--mut8)"><summary>${C8.skipped.length} source note(s)</summary>${C8.skipped.map(E).join('<br>')}</details>`:''}`;
}
R8.reload=()=>{C8.p=null;C8.state='loading';refreshViews();loadC8(true)};

/* mark-as-read + resume */
const readSet=()=>new Set(G('v8_read',[]));
document.addEventListener('click',e=>{const a=e.target.closest('a[data-ck]');if(!a)return;const k=a.dataset.ck,s=readSet();s.add(k);S('v8_read',[...s].slice(-3000));S('v8_last',{t:a.dataset.t,u:a.href,c:a.dataset.c,k:a.dataset.kd});setTimeout(()=>{try{drawDash()}catch{}},200)},true);
const keyOf=e=>e.c+'|'+e.k+'|'+norm(e.t);
const rowHTML=e=>{const rd=readSet().has(keyOf(e));return`<div class="fl8"><div class="m"><b>${E(e.t||'Untitled')}</b><small><span class="bd8">${E(e.c||'—')}</span><span class="bd8">${E(KL[e.k]||e.k)}</span>${e.d?E(e.d)+' · ':''}${rd?'✓ opened':''}</small></div><div class="ls">${e.l.slice(0,3).map(l=>`<a href="${E(l.u)}" target="_blank" rel="noopener" data-ck="${E(keyOf(e))}" data-t="${E(e.t)}" data-c="${E(e.c)}" data-kd="${E(e.k)}">${E(l.s)} ↗</a>`).join('')}${e.l[0]&&/drive\.google\.com\/file/.test(e.l[0].u)?`<a href="${E(dlu(e.l[0].u))}" target="_blank" rel="noopener" data-ck="${E(keyOf(e))}" data-t="${E(e.t)}" data-c="${E(e.c)}" data-kd="${E(e.k)}">⬇</a>`:''}</div></div>`};

/* ---- library pages ---- */
const LIB={hl:{title:'Handout Library',sub:'Every handout, highlighted handout, quiz and assignment found in our Drive folders and partner websites. Search by course code (CS101) or title.',kinds:null,not:PAPER,chips:[['','All'],['handout','Handouts'],['highlighted','Highlighted'],['quiz','Quizzes'],['assign','Assignments'],['gdb','GDB'],['other','Other']]},
 pp8:{title:'Past Papers',sub:'Midterm, final term and current papers collected from our Drive folders and partner websites.',kinds:PAPER,chips:[['','All papers'],['midterm','Midterm'],['final','Final term'],['current','Current papers']]}};
const LS8={hl:{q:'',k:'',s:'',n:50},pp8:{q:'',k:'',s:'',n:50}};
function libRender(mode,keep){
  const el=$('#x-'+mode);if(!el)return;const L=LIB[mode],st=LS8[mode];
  if(!keep||!$('#lq-'+mode)){
    el.innerHTML=`<div class="hl8"><h2 style="margin:0 0 6px;font-size:26px">${L.title}</h2><p style="color:var(--mut8);margin:0 0 8px">${L.sub}</p><div id="ls-${mode}"></div>
    <div class="row8"><input id="lq-${mode}" type="search" placeholder="Search course code or title, e.g. CS101 lecture 5" style="flex:1 1 240px" value="${E(st.q)}"><select id="lsr-${mode}"><option value="">All sources</option></select></div>
    <div class="chips8" id="lc-${mode}">${L.chips.map(c=>`<button data-k="${c[0]}" class="${c[0]==st.k?'on':''}">${c[1]}</button>`).join('')}</div><div id="lr-${mode}"></div></div>`;
    $('#lq-'+mode).oninput=e=>{st.q=e.target.value;st.n=50;libList(mode)};$('#lsr-'+mode).onchange=e=>{st.s=e.target.value;st.n=50;libList(mode)};
    $$('#lc-'+mode+' button').forEach(b=>b.onclick=()=>{st.k=b.dataset.k;st.n=50;$$('#lc-'+mode+' button').forEach(x=>x.classList.toggle('on',x==b));libList(mode)});
  }
  $('#ls-'+mode).innerHTML=statusHTML();
  const sel=$('#lsr-'+mode),srcs=[...new Set(C8.items.flatMap(x=>x.l.map(l=>l.s)))].sort();sel.innerHTML='<option value="">All sources</option>'+srcs.map(s=>`<option ${s==st.s?'selected':''}>${E(s)}</option>`).join('');
  libList(mode);
}
function libList(mode){
  const L=LIB[mode],st=LS8[mode],q=st.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const a=C8.items.filter(e=>(L.kinds?L.kinds.includes(e.k):!L.not.includes(e.k))&&(!st.k||e.k==st.k)&&(!st.s||e.l.some(l=>l.s==st.s))&&q.every(w=>((e.c||'')+' '+(e.t||'')+' '+(KL[e.k]||'')).toLowerCase().includes(w)));
  const box=$('#lr-'+mode);if(!box)return;
  if(!a.length){box.innerHTML=C8.state=='loading'&&!C8.items.length?'':`<p class="d8emp">${C8.items.length?'No files match. Try a shorter search such as the course code only.':'No files yet.'}</p>`;return}
  box.innerHTML=`<p style="color:var(--mut8);font-size:13px">${a.length} file(s)</p>`+a.slice(0,st.n).map(rowHTML).join('')+(a.length>st.n?`<p><button class="d8b w" id="lm-${mode}">Show more (${a.length-st.n} left)</button></p>`:'');
  const m=$('#lm-'+mode);if(m)m.onclick=()=>{st.n+=100;libList(mode)};
}
Object.keys(LIB).forEach(m=>{R8[m]=keep=>{libRender(m,keep===true);if(keep!==true)loadC8()}});

/* ================= LMS handling (people recommended by admin) ================= */
let LMSP=G('v8_lms',null);
const lmsList=()=>{const a=(LMSP&&LMSP.length?LMSP:(typeof cfg!=='undefined'&&cfg.lms8)||[]).slice();return a.sort((x,y)=>(y.top?1:0)-(x.top?1:0)||(+x.rk||999)-(+y.rk||999)||(+y.rt||0)-(+x.rt||0))};
async function loadLms(){try{const S0=window.SUPA,r=await fetch(S0.url+'/rest/v1/portal_settings?key=eq.lms&select=value',{headers:{apikey:S0.key,Authorization:'Bearer '+S0.key}}),v=(await r.json())[0]?.value;if(v&&Array.isArray(v.people)){LMSP=v.people;S('v8_lms',LMSP);if(window.__cur8=='lmsp')R8.lmsp();if(window.__cur8=='dash')drawDash()}}catch{}}
const initial=n=>(String(n||'?').trim()[0]||'?').toUpperCase();
const waLink=n=>{const d=String(n||'').replace(/\D/g,'');return d?'https://wa.me/'+(d.startsWith('0')?'92'+d.slice(1):d):''};
const stars=r=>'★'.repeat(Math.round(+r||0))+'☆'.repeat(5-Math.round(+r||0));
const personCard=(p,i)=>`<div class="${p.top?'top8':''}">${p.top?`<span class="rk">⭐ TOP${p.rk?' #'+E(p.rk):''}</span>`:p.rk?`<span class="rk" style="background:var(--p8)">#${E(p.rk)}</span>`:''}<div class="h"><div class="av">${p.ph8?`<img src="${E(p.ph8)}" alt="" onerror="this.remove()">`:E(initial(p.n))}</div><div><b>${E(p.n)}</b><div class="st">${stars(p.rt)}</div></div></div>${p.note?`<p><b>LMS handling:</b> ${E(p.note)}</p>`:''}${p.rv?`<p>“${E(p.rv)}”</p>`:''}${p.num?`<p>📞 ${E(p.num)}</p>`:''}<div class="acts">${waLink(p.num)?`<a class="d8b p" style="padding:9px 14px" target="_blank" rel="noopener" href="${E(waLink(p.num))}">WhatsApp</a>`:''}${p.ch?`<a class="d8b w" style="padding:9px 14px" target="_blank" rel="noopener" href="${E(p.ch)}">Channel</a>`:''}</div></div>`;
R8.lmsp=()=>{const el=$('#x-lmsp');if(!el)return;const a=lmsList(),f=($('#lmq')||{}).value||'';
  el.innerHTML=`<div class="hl8"><h2 style="margin:0 0 6px;font-size:26px">LMS Handling</h2><p style="color:var(--mut8);margin:0 0 10px">People recommended by the admin for LMS handling (assignments, quizzes, GDB, attendance help). Check their channel, reviews and number first. Never share your LMS password; this portal is not responsible for third-party dealings.</p><div class="row8"><input id="lmq" type="search" placeholder="Search by name…" value="${E(f)}" style="flex:1 1 220px"></div><div class="lp8" id="lml"></div></div>`;
  const draw=()=>{const q=($('#lmq').value||'').toLowerCase(),b=lmsList().filter(p=>!q||(p.n+' '+(p.note||'')).toLowerCase().includes(q));$('#lml').innerHTML=b.map(personCard).join('')||'<p class="d8emp">No LMS handlers added yet. The admin can add them from Admin Panel &gt; LMS Handling.</p>'};$('#lmq').oninput=draw;draw()};
/* admin editor */
let pubT;
function lmsSave(msg){S('v8_lms',cfg.lms8);LMSP=cfg.lms8;try{SV('cfgL',cfg)}catch{}clearTimeout(pubT);pubT=setTimeout(async()=>{const m=$('#v8lst'),sb=window.__sb;if(!sb){if(m)m.textContent='Saved on this device. Not signed in to Supabase, so not published live.';return}
  try{const{error}=await sb.from('portal_settings').upsert({key:'lms',value:{people:cfg.lms8,at:Date.now()}});if(m)m.textContent=error?'Not published live: '+error.message+' (sign in to Supabase admin and run sql/registrations.sql once). Saved on this device; you can also use Download portal-config.json.':'Published live for everyone ✓'}catch(e){if(m)m.textContent='Not published: '+e.message}},400);if(msg)toast(msg)}
R8.lmsAdd=()=>{const g=i=>($('#v8f-'+i).value||'').trim(),n=g('n');if(!n)return alert('Enter a name');cfg.lms8=cfg.lms8||[];
  const o={id:Math.random().toString(36).slice(2,9),n,num:g('num'),ch:g('ch'),rv:g('rv'),note:g('note'),rt:+g('rt')||5,rk:g('rk'),ph8:g('ph'),top:$('#v8f-top').checked};
  const f=$('#v8f-file').files[0];const done=()=>{cfg.lms8.push(o);lmsSave('Added');drawAdmin()};
  if(f){const im=new Image(),u=URL.createObjectURL(f);im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=160;const x=c.getContext('2d'),s=Math.min(im.width,im.height);x.drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,160,160);o.ph8=c.toDataURL('image/jpeg',.8);done()};im.onerror=done;im.src=u}else done()};
R8.lmsDel=i=>{if(!confirm('Delete this person?'))return;cfg.lms8.splice(i,1);lmsSave('Deleted');drawAdmin()};
R8.lmsTop=i=>{cfg.lms8[i].top=!cfg.lms8[i].top;lmsSave();drawAdmin()};
R8.lmsRk=(i,v)=>{cfg.lms8[i].rk=String(v).trim();lmsSave()};
R8.lmsRt=(i,v)=>{cfg.lms8[i].rt=Math.min(5,Math.max(1,+v||5));lmsSave()};
const da8=window.drawAdmin;
window.drawAdmin=function(){da8.apply(this,arguments);if(typeof adm==='undefined'||!adm||!$('#adm'))return;R8.lmsUI()};
R8.lmsUI=function(){cfg.lms8=cfg.lms8||[];if(!cfg.lms8.length&&LMSP&&LMSP.length)cfg.lms8=LMSP.slice();
  $('#adm').insertAdjacentHTML('beforeend',`<div class="card" id="v8lms"><h3>LMS Handling <small class="mut">(who handles LMS well, who is going top)</small></h3><p id="v8lst" class="mut">Changes publish live for everyone when you are signed in to Supabase; they are always saved on this device.</p>
  ${cfg.lms8.map((p,i)=>`<div class="pg" style="flex-wrap:wrap;gap:8px"><span><b>${E(p.n)}</b> ${p.top?'⭐ TOP':''} · ${stars(p.rt)} · ${E(p.num||'no number')}</span><span style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">Rank <input type="number" min="1" value="${E(p.rk||'')}" style="width:64px" onchange="R8.lmsRk(${i},this.value)"> Rating <input type="number" min="1" max="5" value="${p.rt||5}" style="width:56px" onchange="R8.lmsRt(${i},this.value)"><button class="b sm ${p.top?'hi':'gr'}" onclick="R8.lmsTop(${i})">${p.top?'Remove from top':'Mark as top'}</button><button class="b sm gr" onclick="R8.lmsDel(${i})">Delete</button></span></div>`).join('')||'<p class="mut">No one added yet.</p>'}
  <h4>Add a person</h4><div class="row"><input id="v8f-n" type="text" placeholder="Name" style="flex:1 1 160px"><input id="v8f-num" type="tel" placeholder="WhatsApp number (0300…)" style="flex:1 1 160px"></div>
  <div class="row"><input id="v8f-ch" type="url" placeholder="Channel link (https://…)" style="flex:1 1 220px"><input id="v8f-rk" type="number" min="1" placeholder="Rank (1 = best)" style="width:130px"><input id="v8f-rt" type="number" min="1" max="5" value="5" style="width:80px" title="Rating 1-5"></div>
  <div class="row"><input id="v8f-note" type="text" placeholder="What they handle (e.g. quizzes, GDB, assignments, attendance)" style="flex:1 1 100%"></div>
  <div class="row"><textarea id="v8f-rv" rows="2" placeholder="Review / your note about them" style="flex:1 1 100%"></textarea></div>
  <div class="row"><input id="v8f-ph" type="url" placeholder="Photo link (optional)" style="flex:1 1 220px"><label>or upload photo <input id="v8f-file" type="file" accept="image/*"></label><label><input type="checkbox" id="v8f-top"> Mark as top</label><button class="b hi" onclick="R8.lmsAdd()">Add</button></div></div>`)};

/* ================= shell ================= */
const NAV=[['dash','🏠','Home'],['prog7','👤','My Dashboard'],['hl','📄','Handout Library'],['pp8','📑','Past Papers'],['crs','📚','My Subjects'],['test','🧪','Test Center'],['plan','🗓️','Study Planner'],['dl','⏰','Deadlines'],['chat','🤖','AI Assistant'],['code','💻','Coding Lab'],['qa','💬','Q&A Community'],['career','🧭','Career Guidance'],['apply','🎓','Admissions'],['prog','🏫','Programs'],['lms','🖥️','Official LMS'],['lmsp','🤝','LMS Handling'],['links','🔗','Important Links'],['rev','⭐','Reviews'],['contact','🎧','Contact & Support'],['tools','🧮','GPA Calculator'],['admin','🔐','Admin']];
const CAP='<svg viewBox="0 0 48 48"><path d="M24 6 2 17l22 11 22-11z" fill="#2b3a8f"/><path d="M11 24v9c0 3 6 7 13 7s13-4 13-7v-9l-13 6.5z" fill="#4f46e5"/><path d="M44 19v13" stroke="#f5b301" stroke-width="2.5" stroke-linecap="round"/><circle cx="44" cy="34" r="2.6" fill="#f5b301"/></svg>';
const GIRL=`<svg class="art" viewBox="0 0 520 300" preserveAspectRatio="xMaxYMax meet" aria-hidden="true"><defs><linearGradient id="gl" x1="0" x2="1"><stop offset="0" stop-color="#6c7bd9"/><stop offset="1" stop-color="#4a56b8"/></linearGradient></defs>
<ellipse cx="300" cy="170" rx="210" ry="120" fill="#fff" opacity=".35"/><rect x="110" y="262" width="400" height="14" rx="7" fill="#c9a27a"/>
<g transform="translate(36,150)"><rect y="82" width="86" height="14" rx="3" fill="#7c5cff"/><rect x="6" y="66" width="76" height="16" rx="3" fill="#ffb347"/><rect x="2" y="50" width="82" height="16" rx="3" fill="#35c7a0"/></g>
<g transform="translate(400,40)"><rect x="46" y="112" width="40" height="36" rx="8" fill="#e08a6a"/><path d="M66 112c-30-30-34-62-8-92 6 30 16 44 8 92zM66 112c26-24 40-52 22-86-14 28-22 46-22 86zM66 112c-12-34-4-60 14-76-18 24-6 50-14 76z" fill="#3f9d6a"/></g>
<path d="M170 262c4-60 40-96 96-96s96 36 100 96z" fill="#9b8cf4"/><path d="M226 175c14 18 56 18 70 0l14 14c-20 30-78 30-98 0z" fill="#8677e8"/>
<ellipse cx="262" cy="118" rx="42" ry="48" fill="#ffd9c2"/><path d="M214 118c-6-56 30-86 62-76 34 8 46 46 38 84-6-30-22-50-48-50-26 0-40 18-52 42z" fill="#4a2a1d"/><path d="M214 112c-12 40-6 78 14 98-8-40 0-70 6-98zM310 112c8 36 4 70-10 96 22-14 34-52 30-96z" fill="#4a2a1d"/>
<circle cx="247" cy="122" r="4" fill="#3b2a24"/><circle cx="277" cy="122" r="4" fill="#3b2a24"/><path d="M252 140c6 6 14 6 20 0" stroke="#c0586b" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="238" cy="134" r="7" fill="#ffb4a2" opacity=".6"/><circle cx="288" cy="134" r="7" fill="#ffb4a2" opacity=".6"/>
<path d="M300 176c22 18 36 38 30 58" stroke="#ffd9c2" stroke-width="16" stroke-linecap="round" fill="none"/>
<path d="M170 262 190 214h200l16 48z" fill="url(#gl)"/><rect x="164" y="258" width="250" height="10" rx="5" fill="#3f4aa0"/><circle cx="289" cy="232" r="9" fill="#cfd6ff" opacity=".9"/>
<g transform="translate(414,196)"><rect width="46" height="52" rx="8" fill="#fff"/><path d="M46 14h10a8 8 0 0 1 0 20H46" stroke="#fff" stroke-width="5" fill="none"/><text x="23" y="22" font-size="8" text-anchor="middle" fill="#4f46e5" font-weight="700">Good</text><text x="23" y="32" font-size="7" text-anchor="middle" fill="#4f46e5">Students</text><text x="23" y="42" font-size="7" text-anchor="middle" fill="#4f46e5">Brighter</text></g></svg>`;
const PROMO=`<svg viewBox="0 0 100 80"><circle cx="58" cy="30" r="14" fill="#ffd9c2"/><path d="M44 30c0-16 30-20 30 0-6-10-22-10-30 0z" fill="#4a2a1d"/><path d="M34 80c2-22 14-32 26-32s24 10 26 32z" fill="#9b8cf4"/><rect x="26" y="56" width="40" height="22" rx="3" fill="#6c7bd9"/></svg>`;
const sideItem=n=>`<a data-p="${n[0]}" onclick="go('${n[0]}')"><i>${n[1]}</i>${n[2]}</a>`;
function buildShell(){
  if($('.v8app'))return;
  const main=$('main'),foot=$('footer');
  const app=document.createElement('div');app.className='v8app';
  app.innerHTML=`<aside class="v8side" id="v8side"><div class="v8logo" onclick="go('dash')">${CAP}<div><b>Chishti</b><small>Preparation Academy</small></div></div>${NAV.map(sideItem).join('')}<div class="v8promo">Let’s Learn<br>Grow &amp; Succeed<br>Together 💙${PROMO}</div></aside>
  <div class="v8main"><header class="v8bar"><button class="v8burger" id="v8burger" aria-label="Menu">☰</button>
  <form class="v8search" id="v8sf" role="search"><span>🔍</span><input id="v8q" type="search" placeholder="Search courses, handouts, past papers, or anything…" aria-label="Search"></form>
  <div class="v8tools"><button class="v8ib th" id="v8sun" title="Light mode">☀️</button><button class="v8ib th" id="v8moon" title="Dark mode">🌙</button><div class="v8lang"><button data-l="ur">Ur</button><button data-l="en">EN</button></div><button class="v8ib" id="v8bell" title="Notifications">🔔<em id="v8bc" style="display:none"></em></button>
  <button class="v8user" id="v8user"><span class="v8av" id="v8av"></span><div><b id="v8un">Student</b><small id="v8up"></small></div></button></div></header><div class="v8wrap" id="v8wrap"></div></div>
  <div class="v8scrim" id="v8scrim"></div>
  <div class="v8bn" id="v8bn" role="navigation" aria-label="Quick navigation"><a data-p="dash" onclick="go('dash')"><i>🏠</i>Home</a><a data-p="hl" onclick="go('hl')"><i>📄</i>Handouts</a><a data-p="test" onclick="go('test')"><i>🧪</i>Tests</a><a data-p="plan" onclick="go('plan')"><i>🗓️</i>Planner</a><a id="v8more"><i>☰</i>More</a></div>`;
  document.body.insertBefore(app,document.body.firstChild);
  const wrap=$('#v8wrap');wrap.appendChild(main);if(foot)wrap.appendChild(foot);
  // section hosts for new pages
  [['dash',''],['hl','<div class="card" id="x-hl"></div>'],['pp8','<div class="card" id="x-pp8"></div>'],['lmsp','<div class="card" id="x-lmsp"></div>']].forEach(([k,h])=>{if($('#t-'+k))return;const s=document.createElement('section');s.id='t-'+k;s.innerHTML=h;main.insertBefore(s,main.firstChild)});
  $('#t-dash').innerHTML='<div id="v8d"></div>';
  // old floating whatsapp replaced by a small round one
  $$('a[href^="https://wa.me/"]').forEach(a=>{if(/position:fixed/.test(a.getAttribute('style')||''))a.style.display='none'});
  const wa=document.createElement('a');wa.id='v8wa';wa.target='_blank';wa.rel='noopener';wa.title='WhatsApp Support';wa.textContent='💬';try{wa.href='https://wa.me/'+CFG.wa}catch{}document.body.appendChild(wa);
  // wiring
  const bd=document.body;$('#v8burger').onclick=()=>bd.classList.toggle('v8open');$('#v8scrim').onclick=()=>bd.classList.remove('v8open');$('#v8more').onclick=()=>bd.classList.add('v8open');
  $('#v8sf').onsubmit=e=>{e.preventDefault();const v=$('#v8q').value.trim();if(!v)return;LS8.hl.q=v;LS8.hl.k='';LS8.hl.s='';go('hl')};
  $('#v8sun').onclick=()=>{document.documentElement.dataset.theme='';SV('theme','')};$('#v8moon').onclick=()=>{document.documentElement.dataset.theme='dark';SV('theme','dark')};
  $$('.v8lang button').forEach(b=>b.onclick=()=>{try{V7.setLang(b.dataset.l)}catch{}langMark()});
  $('#v8bell').onclick=bell;$('#v8user').onclick=userMenu;userChip();langMark();bellCount();
}
function langMark(){let l='en';try{l=V7.G('lng','en')}catch{}$$('.v8lang button').forEach(b=>b.classList.toggle('on',b.dataset.l==l||(l=='ru'&&b.dataset.l=='ur')))}
const pdl=()=>{try{return(G('cpa_dl',[])).filter(x=>!x.x).sort((a,b)=>a.d.localeCompare(b.d))}catch{return[]}};
function bellCount(){const n=(cfgAnn().length)+pdl().filter(x=>new Date(x.d)-Date.now()<3*864e5).length,b=$('#v8bc');if(b){b.textContent=Math.min(9,n);b.style.display=n?'':'none'}}
const cfgAnn=()=>{try{return(cfg.ann||[]).map(a=>a.t||a)}catch{return[]}};
function bell(){const a=cfgAnn().slice(0,8),d=pdl().slice(0,5);const h=`<h3>Notifications</h3>${a.map(t=>`<p>📢 ${E(t)}</p>`).join('')||'<p class="mut">No announcements.</p>'}${d.length?'<h4>Coming up</h4>'+d.map(x=>`<p>⏰ ${E(x.c||'')} ${E(x.ty)}: ${E(x.t)} <small class="mut">${E(new Date(x.d).toLocaleString())}</small></p>`).join(''):''}<p><button class="b" onclick="go('upd');document.querySelector('.v7modal')?.remove()">VU official updates</button></p>`;try{V7.modal(h)}catch{alert(a.join('\n'))}}
function userChip(){const p=me(),u=(window.V7&&V7.user)||{},nm=(window.V7&&V7.G('name',''))||p.n||(u.email||'').split('@')[0]||'Guest',dp=G('v8_dp','');$('#v8un').textContent=nm;$('#v8up').textContent=p.g||(u.email?'Student':'Tap to sign in');$('#v8av').innerHTML=dp?`<img src="${E(dp)}" alt="">`:E(initial(nm))}
function userMenu(){const m=V7.modal(`<h3>My account</h3><p class="v7row"><button class="b" data-go="me">Edit profile</button><button class="b gr" data-go="acct">Sign in / account</button><button class="b gr" data-go="admin">Admin panel</button></p><p><label>Profile photo <input type="file" id="v8dpf" accept="image/*"></label></p>`);
  m.addEventListener('click',e=>{const g=e.target.dataset?.go;if(g){m.remove();go(g)}});
  m.querySelector('#v8dpf').onchange=e=>{const f=e.target.files[0];if(!f)return;const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),s=Math.min(im.width,im.height);x.drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,128,128);S('v8_dp',c.toDataURL('image/jpeg',.82));userChip();m.remove()};im.src=URL.createObjectURL(f)}}

/* ================= dashboard ================= */
const TOOLS=[['tools','🧮','GPA Calculator','#dcfce7'],['career','🧭','Career Guidance','#e0e7ff'],['links','🔗','Important Links','#d1fae5'],['pp8','📑','Past Papers','#ffedd5'],['test','🃏','AI Flashcards','#f3e8ff','New'],['qa','💬','Discussion Forum','#dbeafe']];
const QUICK=[['hl','📄','Handout Library','Search all files','#dbeafe'],['test','🧪','Test Center','AI Practice Tests','#d1fae5'],['plan','🗓️','Study Planner','Plan Your Semester','#ede9fe'],['dl','⏰','Deadlines','Never Miss a Date','#ffedd5'],['chat','🤖','AI Assistant','Your Study Buddy','#fce7f3'],['code','💻','Coding Lab','Practice & Learn','#d1fae5']];
const SC=[['#3b82f6','#dbeafe','</>'],['#f59e0b','#fef3c7','∑'],['#ef4444','#fee2e2','📖'],['#10b981','#d1fae5','⚙']];
function dayLeft(d){return Math.ceil((new Date(d)-Date.now())/864e5)}
function drawDash(){
  const el=$('#v8d');if(!el)return;
  const p=me(),cs=(p.courses||'').split(/[,\s]+/).filter(Boolean).slice(0,3),st=stats(),rd=readSet(),dl=pdl(),last=G('v8_last',null);
  const subj=cs.length?cs.map((c,i)=>{const it=C8.items.filter(e=>e.c==c),h=it.filter(e=>e.k=='handout'||e.k=='highlighted'),o=h.filter(e=>rd.has(keyOf(e))).length,pc=h.length?Math.round(o/h.length*100):0,col=SC[i%4];return`<div onclick="go('crs');setTimeout(()=>RR.crs&&RR.crs('${c}'),50)" style="cursor:pointer"><div class="h"><i style="background:${col[1]};color:${col[0]}">${col[2]}</i><div style="min-width:0"><b>${E(c)}</b><small>${it.length} files</small></div></div><div class="pr8"><i style="width:${pc}%;background:${col[0]}"></i></div><small>${pc}% opened · ${h.length} Handouts · ${it.filter(e=>PAPER.includes(e.k)).length} Papers</small></div>`}).join(''):`<p class="d8emp" style="grid-column:1/-1">Add your course codes (e.g. CS101, MTH101) in your profile to see them here with progress. <a style="color:var(--p8);font-weight:700;cursor:pointer" onclick="go('me')">Add courses →</a></p>`;
  const dls=dl.slice(0,3).map(x=>{const n=dayLeft(x.d),dd=new Date(x.d),c=n<=3?['#fee2e2','#dc2626']:n<=7?['#dbeafe','#2563eb']:['#d1fae5','#059669'];return`<div class="d8dl"><div class="dt" style="background:${c[0]};color:${c[1]}"><b>${dd.getDate()}</b>${dd.toLocaleString('en',{month:'short'})}</div><div class="m"><b>${E((x.c?x.c+' - ':'')+x.t)}</b><small>${E(x.ty)}</small></div><span class="chp8" style="background:${c[0]};color:${c[1]}">${n<0?'Late':n==0?'Today':n+' Days Left'}</span></div>`}).join('')||'<p class="d8emp">No deadlines yet. <a style="color:var(--p8);font-weight:700;cursor:pointer" onclick="go(\'dl\')">Add your first →</a></p>';
  const ex=ty=>{const x=dl.filter(y=>y.ty==ty&&dayLeft(y.d)>=0)[0];return x?`<b>${dayLeft(x.d)}</b> Days Left<small>${E(x.c||ty)}</small>`:`<b>–</b><small>Add a ${ty} date in Deadlines</small>`};
  const recent=C8.items.filter(e=>e.k=='handout'||e.k=='highlighted'||PAPER.includes(e.k)).slice().sort((a,b)=>(b.d||'').localeCompare(a.d||'')).slice(0,3);
  const lh=recent.map(e=>`<div class="d8hl"><div class="pd">PDF</div><div class="m"><b>${E(e.t)}</b><small>${E(e.c||'')} · ${E(KL[e.k])}</small></div><a class="dl" href="${E(dlu(e.l[0].u))}" target="_blank" rel="noopener" data-ck="${E(keyOf(e))}" data-t="${E(e.t)}" data-c="${E(e.c)}" data-kd="${E(e.k)}">⬇</a></div>`).join('')||`<p class="d8emp">${C8.state=='err'?'Could not load files. <a style="color:var(--p8);font-weight:700;cursor:pointer" onclick="R8.reload()">Retry</a>':'<span class="sp" style="display:inline-block;width:12px;height:12px;border:3px solid var(--ln8);border-top-color:var(--p8);border-radius:50%;animation:sp8 .8s linear infinite"></span> Loading latest handouts…'}</p>`;
  const lm=lmsList().slice(0,3);
  el.innerHTML=`<div class="d8hero"><div><small>Welcome to Chishti Preparation Academy</small><h1>Your Smarter Way to Study<br>at <span>Virtual University</span></h1><p>Find handouts, practice tests, plan your semester and learn with AI-powered tools — all in one place.</p><button class="d8b p" onclick="go('hl')">Explore Handouts →</button><button class="d8b w" onclick="go('test')">▶ Start Practice Test</button></div><span class="tag">Same Students<br>Bigger<br>Dreams ♡</span>${GIRL}</div>
  <div id="v8tick"></div>
  <div class="d8q">${QUICK.map(q=>`<a onclick="go('${q[0]}')"><span class="ar">→</span><div class="ic" style="background:${q[4]}">${q[1]}</div><b>${q[2]}</b><small>${q[0]=='hl'&&st.n?st.n.toLocaleString()+' Resources':q[3]}</small></a>`).join('')}</div>
  <div class="d8g"><div>
   <div class="d8c"><h3>My Subjects <a onclick="go('crs')">View All →</a></h3><div class="d8subj">${subj}</div></div>
   <div class="d8c"><h3>Continue Your Preparation</h3>${last?`<div class="d8cont"><div class="fi">📘</div><div><b>${E(last.t)}</b><small style="color:var(--mut8)">${E(last.c||'')} · last opened</small></div><a class="d8b w" href="${E(last.u)}" target="_blank" rel="noopener">Continue →</a></div>`:`<div class="d8cont"><div class="fi">📘</div><div><b>Nothing opened yet</b><small style="color:var(--mut8)">Open any handout and it will appear here so you can pick up where you left off.</small></div><a class="d8b w" onclick="go('hl')">Browse →</a></div>`}</div>
   <div class="d8c"><h3>Popular Tools <a onclick="go('tools')">View All →</a></h3><div class="d8tools">${TOOLS.map(t=>`<a onclick="go('${t[0]}')"><i style="background:${t[3]}">${t[1]}</i>${t[2]}${t[4]?`<em>${t[4]}</em>`:''}</a>`).join('')}</div></div>
  </div><div>
   <div class="d8c"><h3>Upcoming Deadlines <a onclick="go('dl')">View All →</a></h3>${dls}</div>
   <div class="d8c"><h3>Exam Countdown <a onclick="go('dl')">View All →</a></h3><div class="d8cd"><div><small style="margin:0 0 4px">Midterm Exams</small>${ex('Midterm')}</div><div><small style="margin:0 0 4px">Final Term Exams</small>${ex('Final term')}</div></div></div>
   <div class="d8c"><h3>Latest Handouts <a onclick="go('hl')">View All →</a></h3>${lh}</div>
   ${lm.length?`<div class="d8c"><h3>Top LMS Handlers <a onclick="go('lmsp')">View All →</a></h3>${lm.map(x=>`<div class="d8hl"><div class="v8av" style="width:38px;height:38px">${x.ph8?`<img src="${E(x.ph8)}" alt="">`:E(initial(x.n))}</div><div class="m"><b>${E(x.n)} ${x.top?'⭐':''}</b><small>${stars(x.rt)} ${E(x.note||'')}</small></div><a class="dl" href="${E(waLink(x.num)||'#')}" target="_blank" rel="noopener">💬</a></div>`).join('')}</div>`:''}
  </div></div>`;
  const tk=window.__tick8||(window.__tick8=$('.tick'));if(tk&&$('#v8tick')){$('#v8tick').appendChild(tk);tk.style.margin='0 0 14px'}
  userChip();bellCount();
}

/* ================= navigation wrapper ================= */
function markSide(t){$$('.v8side a,.v8bn a').forEach(a=>a.classList.toggle('on',a.dataset.p==t))}
const g0=window.go;
window.go=function(t){if(t==='home')t='dash';window.__cur8=t;document.body.classList.remove('v8open');g0(t);try{if(R8[t])R8[t]();if(t=='dash'){drawDash();loadC8();loadLms()}}catch(e){console.error(t,e)}markSide(t);try{S('tab',t)}catch{}};
try{SV('tab','dash')}catch{}

/* ================= start ================= */
buildShell();
loadC8();loadLms();
setTimeout(()=>{const t=G('tab','dash');go(t=='home'||!$('#t-'+t)?'dash':t)},0);
setInterval(()=>{if(window.__cur8=='dash'&&!document.hidden){drawDash()}},60000);
})();
