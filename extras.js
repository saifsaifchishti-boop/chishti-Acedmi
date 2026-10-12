// Chishti Preparation Academy - analytics, admin dashboard, privacy, updates ticker
(()=>{const S=window.SUPA,uid=()=>{let v=null;try{v=localStorage.getItem('cpa_vid');if(!v){v=crypto.randomUUID();localStorage.setItem('cpa_vid',v)}}catch{}return v||'anon'},vid=uid(),ua=navigator.userAgent,
dev=/Mobi|Android|iPhone/i.test(ua)?'mobile':'desktop',br=/Edg\//.test(ua)?'Edge':/OPR\//.test(ua)?'Opera':/Chrome\//.test(ua)?'Chrome':/Firefox\//.test(ua)?'Firefox':/Safari\//.test(ua)?'Safari':'Other';
let ref='direct';try{if(document.referrer)ref=new URL(document.referrer).hostname||'direct'}catch{}
window.TRK=(type,detail)=>{try{fetch(S.url+'/rest/v1/events',{method:'POST',headers:{apikey:S.key,Authorization:'Bearer '+S.key,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({visitor_id:vid,type,detail:detail==null?null:String(detail).slice(0,300),device:dev,browser:br,referrer:ref,lang:navigator.language}),keepalive:true}).catch(()=>{})}catch{}};
try{if(!sessionStorage.getItem('cpa_s')){sessionStorage.setItem('cpa_s','1');TRK('visit',document.querySelector('nav button.on')?.dataset.t||'home')}}catch{}
const g=window.go;window.go=function(t){g(t);TRK('tab',t);if(t=='lms')TRK('lms_open','')};
document.addEventListener('click',e=>{const a=e.target.closest('#linkl a');if(a)TRK('link_click',a.textContent.trim())});
try{if(typeof run=='function'){const r=run;window.run=function(...a){TRK('code_run',document.querySelector('#lg')?.value);return r.apply(this,a)}}}catch{}
// privacy banner + footer + WhatsApp button
const ft=document.querySelector('footer');if(ft)ft.insertAdjacentHTML('beforeend','<p class="mut" style="margin-top:8px">Privacy: we record visits and activity to improve the portal; reviews and contact forms may include your name and number.</p>');
document.body.insertAdjacentHTML('beforeend',`<a href="https://wa.me/${CFG.wa}" target="_blank" rel="noopener" style="position:fixed;right:14px;bottom:76px;z-index:90;background:#25d366;color:#fff;padding:11px 16px;border-radius:30px;font:600 14px sans-serif;text-decoration:none;box-shadow:0 6px 18px #0003">WhatsApp Support</a>`);
let ok=false;try{ok=localStorage.getItem('cpa_ok')}catch{}
if(!ok){const b=document.createElement('div');b.style.cssText='position:fixed;left:10px;right:10px;bottom:10px;z-index:99;background:#13203b;color:#fff;padding:12px 14px;border-radius:12px;display:flex;gap:12px;align-items:center;font-size:13px;box-shadow:0 8px 24px #0004';b.innerHTML='<span style="flex:1">We record visits and activity to improve the portal; reviews and contact forms may include your name and number.</span><button style="background:#f59e0b;border:0;border-radius:8px;padding:8px 18px;font-weight:700;cursor:pointer">OK</button>';b.querySelector('button').onclick=()=>{try{localStorage.setItem('cpa_ok','1')}catch{}b.remove()};document.body.appendChild(b)}
// admin: Supabase login + dashboard
const sb=window.supabase?window.supabase.createClient(S.url,S.key):null;window.__sb=sb;let sess=null,D={r:'7',q:'',rows:[],v:null};
if(sb)sb.auth.getSession().then(({data})=>{sess=data.session});
const od=window.drawAdmin;
window.drawAdmin=function(){const el=document.querySelector('#adm');
if(!sess){adm=false;el.innerHTML=`<div class="card"><h2>Admin sign-in</h2><div class="row"><input type="email" id="sbe" placeholder="Email" value="${esc(S.email)}"></div><div class="row"><input type="password" id="sbp" placeholder="Password"></div><button class="b" onclick="sbIn()">Sign in</button><p class="mut" id="sbm"></p></div>`;return}
adm=true;od();el.insertAdjacentHTML('beforeend','<div class="card" id="dash"><p class="mut">Loading analytics...</p></div>');loadD()};
let _fl=0,_lk=0;window.sbIn=async()=>{if(!sb)return;if(Date.now()<_lk)return document.querySelector('#sbm').textContent='Too many attempts. Wait '+Math.ceil((_lk-Date.now())/1000)+' seconds.';const{data,error}=await sb.auth.signInWithPassword({email:document.querySelector('#sbe').value.trim(),password:document.querySelector('#sbp').value});if(error){_fl++;if(_fl>=4){_lk=Date.now()+Math.min(300,30*(_fl-3))*1000}return document.querySelector('#sbm').textContent=error.message}_fl=0;sess=data.session;drawAdmin()};
window.sbOut=async()=>{await sb.auth.signOut();sess=null;adm=false;drawAdmin()};
async function loadD(){let all=[],f=0,since=D.r=='all'?null:(D.r=='1'?new Date(new Date().setHours(0,0,0,0)):new Date(Date.now()-D.r*864e5)).toISOString();
for(;;){let q=sb.from('events').select('*').order('created_at',{ascending:false}).range(f,f+999);if(since)q=q.gte('created_at',since);const{data,error}=await q;if(error)return document.querySelector('#dash').innerHTML='<p class="mut">'+esc(error.message)+'</p>';all=all.concat(data);if(data.length<1000)break;f+=1000}
D.rows=all;D.v=null;draw()}
const top=(a,n=6)=>Object.entries(a.reduce((o,x)=>(x&&(o[x]=(o[x]||0)+1),o),{})).sort((a,b)=>b[1]-a[1]).slice(0,n),
bars=l=>l.length?l.map(([k,c])=>`<div class="pg"><span>${esc(k)}</span><b>${c}</b></div>`).join(''):'<p class="mut">No data</p>';
function draw(){const R=D.rows,t0=new Date().setHours(0,0,0,0),uq=a=>new Set(a.map(x=>x.visitor_id)).size,m={};
R.slice().reverse().forEach(x=>{const v=m[x.visitor_id]||(m[x.visitor_id]={id:x.visitor_id,first:x.created_at,n:0,info:''});v.last=x.created_at;v.n++;if(x.type=='review'||x.type=='contact')v.info=x.detail});
const q=D.q.toLowerCase(),V=Object.values(m).filter(v=>!q||(v.id+' '+v.info).toLowerCase().includes(q)).sort((a,b)=>b.last.localeCompare(a.last)),ty=t=>R.filter(x=>x.type==t).map(x=>x.detail),f=s=>new Date(s).toLocaleString();
document.querySelector('#dash').innerHTML=`<h3>Visitor analytics</h3><div class="row"><select onchange="D_.r=this.value;D_.load()">${[['1','Today'],['7','Last 7 days'],['30','Last 30 days'],['all','All time']].map(o=>`<option value="${o[0]}" ${o[0]==D.r?'selected':''}>${o[1]}</option>`).join('')}</select><input type="text" placeholder="Search visitor, name, phone" value="${esc(D.q)}" oninput="D_.q=this.value;D_.draw()" style="flex:1 1 160px"><button class="b sm" onclick="D_.csv()">Export CSV</button><button class="b sm gr" onclick="sbOut()">Sign out</button></div>
<p><b>${uq(R)}</b> unique visitors · <b>${uq(R.filter(x=>new Date(x.created_at)>=t0))}</b> today · <b>${uq(R.filter(x=>new Date(x.created_at)>=Date.now()-7*864e5))}</b> in 7 days · <b>${R.length}</b> events</p>
<h4>Top tabs</h4>${bars(top(ty('tab')))}<h4>Top downloads</h4>${bars(top(ty('download')))}<h4>Devices</h4>${bars(top(R.map(x=>x.device)))}<h4>Referrers</h4>${bars(top(R.map(x=>x.referrer)))}
<h4>Visitors (${V.length})</h4>${V.slice(0,100).map(v=>`<div class="pg" style="cursor:pointer" onclick="D_.tl('${v.id}')"><span>${esc(v.id.slice(0,8))} · ${f(v.first)} → ${f(v.last)} · ${v.n} events${v.info?' · '+esc(v.info):''}</span></div>`).join('')}<div id="tl"></div>`}
window.D_={get r(){return D.r},set r(x){D.r=x},set q(x){D.q=x},load:loadD,draw,
tl(id){document.querySelector('#tl').innerHTML='<h4>Timeline '+esc(id.slice(0,8))+'</h4>'+D.rows.filter(x=>x.visitor_id==id).map(x=>`<div class="pg"><span>${new Date(x.created_at).toLocaleString()} · <b>${esc(x.type)}</b> ${esc(x.detail||'')}</span></div>`).join('')},
csv(){const c=['id','visitor_id','type','detail','device','browser','referrer','lang','created_at'],s=D.rows.map(r=>c.map(k=>'"'+String(r[k]??'').replace(/"/g,'""')+'"').join(',')).join('\n'),a=document.createElement('a');a.href=URL.createObjectURL(new Blob([c.join(',')+'\n'+s],{type:'text/csv'}));a.download='events.csv';a.click()}}})();
