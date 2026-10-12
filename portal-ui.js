// Chishti Preparation Academy - UI layer v3: theme, grouped navigation, home, LMS, links, contact, campuses, programs
(()=>{const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s),E=esc,RR=window.RR={};
const OFF={lms:'https://vulms.vu.edu.pk/',site:'https://www.vu.edu.pk/',ocw:'https://ocw.vu.edu.pk/',sup:'https://www.vu.edu.pk/SupportSystem/',ds:'https://datesheet.vu.edu.pk/'};
const MAP=q=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q),TEL=p=>'tel:'+String(p).replace(/[^\d+]/g,''),WAN=m=>'https://wa.me/92'+String(m).replace(/\D/g,'').replace(/^0/,'');
window.OFF=OFF;window.MAPQ=MAP;window.TELH=TEL;window.WAN=WAN;
// ---------- theme ----------
const st=document.createElement('style');st.textContent=`
:root{--bg:#f3f6fb;--ink:#10213f;--ac:#12356b;--hi:#f5b301;--soft:#e8eefa;--ln:#d5ddec;--mut:#586783;--g:#0a7a52}
[data-theme=dark]{--bg:#0b1220;--ink:#e8edf8;--card:#141f36;--ac:#5b8def;--soft:#1a2a4d;--ln:#26365a;--mut:#9aa8c4}
body{font-family:Lexend,system-ui,sans-serif}
.util{background:#0a1a36}.util .u{color:#d6e0f5}.util .u.adm{background:var(--hi);color:#1b1400;border-radius:6px;padding:3px 12px;font-weight:700}
.top{background:linear-gradient(110deg,#0b2550,#12356b 60%,#0f5c7a);border-bottom:4px solid var(--hi);padding:14px 16px;gap:14px}
.top .lg{width:46px;height:46px;border-radius:12px;background:var(--hi);color:#10213f;display:grid;place-items:center;font:800 18px Lexend,sans-serif;flex:none}
.top b{font-size:19px;letter-spacing:.2px}.top small{color:#bcd0f2}
#navwrap{position:sticky;top:0;z-index:20;background:var(--card);border-bottom:1px solid var(--ln);box-shadow:0 2px 8px #0a1a3614}
#navwrap nav{position:static;border:0;padding:0 4px;gap:0}
nav button{border-radius:0!important;background:none!important;color:var(--mut)!important;box-shadow:none!important;font-weight:600;font-size:14px;padding:13px 14px;border-bottom:3px solid transparent;white-space:nowrap}
nav button.on,nav button.gon{color:var(--ac)!important;border-bottom-color:var(--hi);background:var(--soft)!important}
[data-theme=dark] nav button.on,[data-theme=dark] nav button.gon{color:#fff!important}
#subnav{display:none;gap:6px;overflow-x:auto;padding:8px 10px;background:var(--soft);border-top:1px solid var(--ln)}#subnav.open{display:flex}
#subnav button{border:1px solid var(--ln);background:var(--card);color:var(--ink);border-radius:999px;padding:6px 14px;font:600 13px Lexend,sans-serif;cursor:pointer;white-space:nowrap}
#subnav button.on{background:var(--ac);color:#fff;border-color:var(--ac)}
.b{background:var(--ac);border-radius:8px}.b.hi{background:var(--hi);color:#1b1400;font-weight:700}.b.gr{background:var(--soft);color:var(--ink)}
.card{border-radius:14px;box-shadow:0 1px 3px #0a1a3610}
h2{color:var(--ac)}[data-theme=dark] h2{color:#fff}
.hero{background:linear-gradient(125deg,#0b2550,#12356b 55%,#0f6a86);border-radius:18px;padding:30px 20px;position:relative;overflow:hidden}
.hero:after{content:"";position:absolute;right:-60px;top:-60px;width:220px;height:220px;border-radius:50%;background:#f5b30122}
.hero small.ey{display:inline-block;background:#ffffff1f;border:1px solid #ffffff40;border-radius:999px;padding:3px 12px;font-size:12px;margin-bottom:10px;color:#ffe29a}
.tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin:12px 0}
.tile{background:var(--card);border:1px solid var(--ln);border-radius:14px;padding:14px 12px;cursor:pointer;text-align:left;font:inherit;color:var(--ink);border-top:4px solid var(--c,#12356b);transition:.15s}
.tile:hover{transform:translateY(-2px);box-shadow:0 8px 18px #0a1a362a}.tile b{display:block;font-size:14px}.tile span{font-size:12px;color:var(--mut)}
.sg{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px}
.lk{display:flex;justify-content:space-between;gap:8px;align-items:center;border:1px solid var(--ln);border-radius:10px;padding:9px 12px;background:var(--card)}
.lk span{word-break:break-word;font-size:14px}.lk small{display:block;color:var(--mut);font-size:11px}
.cc{border:1px solid var(--ln);border-radius:12px;padding:12px;background:var(--card);margin:8px 0;border-left:5px solid var(--ac)}
.cc.own{border-left-color:var(--hi)}.cc h4{margin:0 0 4px;font-size:15px}.cc p{margin:2px 0;font-size:13px;color:var(--mut)}
.tg{display:inline-block;font-size:11px;font-weight:700;border-radius:999px;padding:2px 9px;background:var(--soft);color:var(--ac);margin-right:4px}.tg.o{background:#fff2c7;color:#6b4a00}
.ca{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.ca a{font-size:12px;border:1px solid var(--ln);border-radius:8px;padding:4px 10px;color:var(--ink);text-decoration:none;background:var(--soft)}
.fl{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}.fl label{font-size:12px;color:var(--mut);display:block;margin-bottom:3px}
.fl input,.fl select,.fl textarea{width:100%}.fl .w{grid-column:1/-1}
.pill{display:inline-block;border-radius:999px;padding:3px 10px;font-size:12px;background:var(--soft);margin:2px}
.bar{height:10px;border-radius:99px;background:var(--soft);overflow:hidden}.bar i{display:block;height:100%;background:linear-gradient(90deg,var(--g),var(--hi))}
table.tb{width:100%;border-collapse:collapse;font-size:14px}table.tb td,table.tb th{border-bottom:1px solid var(--ln);padding:7px 6px;text-align:left}
.notice{background:#fff8e1;border:1px solid #f5d77a;color:#5b4300;border-radius:10px;padding:9px 12px;font-size:13px}[data-theme=dark] .notice{background:#2b2410;color:#f3dc9a;border-color:#5b4a14}
footer{background:#0a1a36}
`;document.head.appendChild(st);
// header logo + admin button
const top=$('.top');if(top&&!$('.top .lg'))top.insertAdjacentHTML('afterbegin','<div class="lg">CPA</div>');
const ab=$('.util button[onclick*="admin"]');if(ab){ab.classList.add('adm');ab.textContent='Admin Panel'}
// ---------- grouped navigation ----------
const G=[['home','Home'],['apply','Admissions'],['prog','Programs'],['camp','Campuses'],['lib','Handouts'],['Study',[['test','Test Center'],['plan','Planner'],['dl','Deadlines'],['crs','Courses'],['code','Coding Lab'],['tools','Study Tools'],['pp','Past Papers'],['chat','AI Assistant']]],['Services',[['upd','VU Updates'],['lms','Official LMS'],['fee','Fee Guide'],['tix','Ticket Help'],['reg','Registration'],['shop','Bookshop'],['faq','FAQ'],['me','My Profile']]],['links','Important Links'],['rev','Reviews'],['contact','Contact']];
try{TABS.length=0;G.forEach(g=>typeof g[1]=='string'?TABS.push(g):g[1].forEach(x=>TABS.push(x)))}catch{}
const nav=$('#nav'),wrap=document.createElement('div');wrap.id='navwrap';nav.parentNode.insertBefore(wrap,nav);wrap.appendChild(nav);wrap.insertAdjacentHTML('beforeend','<div id="subnav"></div>');
nav.innerHTML=G.map(g=>typeof g[1]=='string'?`<button data-t="${g[0]}" onclick="go('${g[0]}')">${g[1]}</button>`:`<button data-g="${g[0]}" onclick="subToggle('${g[0]}')">${g[0]} ▾</button>`).join('');
window.subToggle=n=>{const g=G.find(x=>x[0]==n),s=$('#subnav');if(s.dataset.g==n&&s.classList.contains('open')){s.classList.remove('open');return}
 s.dataset.g=n;s.innerHTML=g[1].map(x=>`<button data-t="${x[0]}" onclick="go('${x[0]}')">${x[1]}</button>`).join('');s.classList.add('open');mark(window.__cur)};
function mark(t){const s=$('#subnav');$$('#subnav button').forEach(b=>b.classList.toggle('on',b.dataset.t==t));
 $$('nav button[data-g]').forEach(b=>{const g=G.find(x=>x[0]==b.dataset.g);b.classList.toggle('gon',g[1].some(x=>x[0]==t))});
 const ing=G.find(g=>typeof g[1]!='string'&&g[1].some(x=>x[0]==t));if(!ing)s.classList.remove('open');else if(!s.classList.contains('open')||s.dataset.g!=ing[0]){s.dataset.g=ing[0];s.innerHTML=ing[1].map(x=>`<button data-t="${x[0]}" onclick="go('${x[0]}')">${x[1]}</button>`).join('');s.classList.add('open');$$('#subnav button').forEach(b=>b.classList.toggle('on',b.dataset.t==t))}}
const g0=window.go;window.go=function(t){window.__cur=t;g0(t);mark(t);try{RR[t]&&RR[t]()}catch(e){console.error(t,e)}};
// ---------- home ----------
const TL=[['lib','Handout library','Search & download handouts','#12356b'],['test','Test Center','AI practice MCQs','#f5b301'],['plan','Study Planner','Plan & track exams','#0a7a52'],['code','Coding Lab','Python, JS & HTML','#c2185b'],['tools','Study Tools','GPA, marks & target','#0891b2'],['camp','Campuses','210 campuses, 137 cities','#7c3aed'],['lms','Official LMS','Direct VU login','#ea580c'],['tix','Ticket Help','Right department, fast','#dc2626'],['pp','Past Papers','Practice with old papers','#4f46e5'],['reg','Registration','Join our guidance','#059669'],['shop','Bookshop','Order books','#b45309'],['prog','Programs','All 115+ programs','#0f766e']];
$('#t-home').innerHTML=`<div class="hero"><small class="ey">Independent student-support portal for Virtual University of Pakistan</small><h1>Prepare smarter. Study with confidence.</h1><p>Handouts, AI-made practice tests, a study planner, GPA tools, campus directory and step-by-step help for every VU service, all in one place.</p><button class="b hi" onclick="go('apply')">How to apply</button><a class="b gr" href="${OFF.lms}" target="_blank" rel="noopener">Open official LMS</a><button class="b gr" onclick="go('camp')">Find my campus</button></div>
<div class="tick"><div id="tickr"></div></div>
<div class="stats"><div><b id="st1">–</b>Handouts and papers</div><div><b id="st2">–</b>Programs</div><div><b>210</b>Campuses</div><div><b>137</b>Cities</div></div>
<h2>Quick access</h2><div class="tiles">${TL.map(t=>`<button class="tile" style="--c:${t[3]}" onclick="go('${t[0]}')"><b>${t[1]}</b><span>${t[2]}</span></button>`).join('')}</div>
<div class="card"><h3>Official VU services</h3><div class="sg">${VUCORE.map(l=>`<a class="lk" href="${E(l.u)}" target="_blank" rel="noopener"><span>${E(l.n)}</span><b>↗</b></a>`).join('')}</div><p class="mut" style="margin:8px 0 0"><a href="#" onclick="go('links');return false">See all important links →</a></p></div>
<div class="card"><h3>Our channels</h3><div id="grp"></div></div>
<div class="card"><h3>Student reviews</h3><div id="rvh"></div></div>
<div class="card"><h3>Explanation language</h3><select class="lang"></select> <span class="mut">Explanations and test answers appear in the language you choose.</span></div>
<div class="card"><h3>Good to know</h3><p class="mut">This portal is an independent study-support service and is not the official university website. Always confirm dates, fees and rules on the official VU website or LMS.</p></div>`;
$$('#t-home .lang').forEach(s=>{s.innerHTML=Object.entries(LANGS).map(([k,v])=>`<option value="${k}">${v[0]}</option>`).join('');s.value=lang;s.onchange=()=>{lang=s.value;SV('lang',lang);$$('.lang').forEach(x=>x.value=lang)}});
$('#st2').textContent=Object.values(PROGS).reduce((a,b)=>a+b.length,0);
try{if(cfg&&cfg.links){cfg.lms=OFF.lms;drawHome()}}catch{}
// ---------- LMS (official only) ----------
$('#t-lms').innerHTML=`<div class="card"><a class="b wa" id="wa3" target="_blank" rel="noopener">View WhatsApp Channel</a><h2>Official VU LMS</h2><p>Sign in on the official Virtual University portal with your student ID and password. Your password is typed only on the official site and never passes through this portal.</p>
<a class="b hi" id="lmsopen" href="${OFF.lms}" target="_blank" rel="noopener">Open official LMS</a><a class="b" href="${OFF.ocw}" target="_blank" rel="noopener">Open Courseware</a><a class="b gr" href="${OFF.ds}" target="_blank" rel="noopener">Date Sheet Portal</a><a class="b gr" href="${OFF.sup}" target="_blank" rel="noopener">Student Support System</a></div>
<div class="card"><h3>Before you sign in</h3><ul><li>Keep your student ID (for example BC123456789) and password ready.</li><li>Use the password reset on the official page if you forget it.</li><li>If login still fails, raise a ticket. Open <a href="#" onclick="go('tix');return false">Ticket Help</a> and we will show the right department.</li><li>Never share your password with anyone, including us.</li></ul></div>`;
window.openLMS=()=>{};
// ---------- important links ----------
$('#t-links').innerHTML=`<div class="card"><h2>Important links</h2><p class="mut">Official Virtual University links and trusted learning resources.</p><div class="row"><input type="text" id="lq" placeholder="Search links…" style="flex:1 1 220px"></div></div><div id="linkl"></div>`;
$('#lq').oninput=()=>drawLinks();
window.drawLinks=function(){const q=($('#lq')?.value||'').toLowerCase(),L=(t,a)=>{a=a.filter(l=>(l.n+' '+l.u).toLowerCase().includes(q));return a.length?`<div class="card"><h3>${t}</h3><div class="sg">${a.map(l=>{let h=l.u;try{h=new URL(l.u).hostname}catch{}return `<div class="lk"><span>${E(l.n)}<small>${E(h)}</small></span><a class="b sm" href="${E(l.u)}" target="_blank" rel="noopener">Open</a></div>`}).join('')}</div></div>`:''},
 seen=new Set([...VUCORE,...SOCIAL,...IMPL.flatMap(g=>g.i)].map(x=>x.u)),extra=(cfg.links||[]).filter(l=>!seen.has(l.u));
 $('#linkl').innerHTML=L('Core VU services',VUCORE)+IMPL.map(g=>L(g.t,g.i)).join('')+L('VU on social media',SOCIAL)+L('More links from the administrator',extra)||'<div class="card"><p class="mut">No link matches your search.</p></div>'};
// ---------- contact ----------
$('#t-contact').innerHTML=`<div class="card"><h2>Contact</h2><p>Reach the portal administrator for study material and guidance, or the university for official matters.</p>
<div class="grid"><div class="card" style="--c:#16a34a"><h3>Portal support (WhatsApp)</h3><p>Study material, access requests, portal help.</p><br><a class="b wa" id="wa" target="_blank" rel="noopener">Chat on WhatsApp</a></div>
<div class="card" style="--c:#12356b"><h3>Official channel</h3><p>Announcements and new study material.</p><br><a class="b" id="ch" target="_blank" rel="noopener">View WhatsApp Channel</a></div></div></div>
<div class="card"><h3>Virtual University head office</h3><div class="cc own"><h4>Head Office, Islamabad</h4><p>Sir Syed Memorial Society Building, 19-Ataturk Avenue, G-5/1, Islamabad</p><p>UAN: +92 (51) 111 880 880 · Admissions queries: 1288 · Helpline: +92 304 1110880 · info@vu.edu.pk</p>
<div class="ca"><a href="tel:+9251111880880">Call UAN</a><a href="tel:1288">Call 1288</a><a href="mailto:info@vu.edu.pk">Email</a><a target="_blank" rel="noopener" href="${MAP('Virtual University of Pakistan Sir Syed Memorial Society Building 19-Ataturk Avenue G-5/1 Islamabad')}">Map</a><a target="_blank" rel="noopener" href="https://www.vu.edu.pk/contact">Contact page</a><a target="_blank" rel="noopener" href="${OFF.sup}">Support System</a></div></div>
<div class="ca">${SOCIAL.map(s=>`<a target="_blank" rel="noopener" href="${E(s.u)}">${E(s.n)}</a>`).join('')}</div></div>
<div class="card"><h3>Send us a message</h3><div class="fl"><div><label>Full name</label><input type="text" id="cn" placeholder="Your full name"></div><div><label>Topic</label><select id="ct"><option>Study material request</option><option>Technical issue</option><option>Admission guidance</option><option>Ticket / department guidance</option><option>Bookshop order</option><option>Feedback</option><option>Other</option></select></div><div class="w"><label>Message</label><textarea id="cmsg" rows="4" placeholder="How can we help?"></textarea></div></div><button class="b" onclick="contactSend()" style="margin-top:10px">Send via WhatsApp</button><p class="mut">Need a campus contact? Use <a href="#" onclick="go('camp');return false">Campuses</a>.</p></div>`;
// ---------- campuses ----------
const CS={t:'all',r:'',q:'',n:40};
RR.camp=()=>{const own=CAMPUSES.filter(c=>c.t=='own').length,pr=CAMPUSES.length-own,regs=[...new Set(CAMPUSES.map(c=>c.r))].sort();
 $('#x-camp').innerHTML=`<h2>Find Your Campus</h2><p class="mut">Directory of all ${CAMPUSES.length} Virtual University campuses (${own} VU-owned, ${pr} private) copied from the official Virtual Campuses page. Details can change, so confirm with the campus before visiting.</p>
 <div class="row"><select id="cst"><option value="all">All campuses (${CAMPUSES.length})</option><option value="own">VU own campuses (${own})</option><option value="private">Private campuses (${pr})</option></select><select id="csr"><option value="">All provinces / regions</option>${regs.map(r=>`<option>${r}</option>`).join('')}</select><input type="text" id="csq" placeholder="Search city, area, campus code…" style="flex:1 1 200px"></div><p class="mut" id="csc"></p><div id="cl2"></div><div id="csm"></div>
 <div class="notice">Official source: <a target="_blank" rel="noopener" href="https://www.vu.edu.pk/PVCs/Default?Type=All">vu.edu.pk Virtual Campuses</a>. Head office: Islamabad, UAN +92 (51) 111 880 880.</div>`;
 const up=()=>{CS.t=$('#cst').value;CS.r=$('#csr').value;CS.q=$('#csq').value.toLowerCase();CS.n=40;campDraw()};['cst','csr'].forEach(i=>$('#'+i).onchange=up);$('#csq').oninput=up;campDraw()};
function campDraw(){const f=CAMPUSES.filter(c=>(CS.t=='all'||c.t==CS.t)&&(!CS.r||c.r==CS.r)&&(!CS.q||(c.n+' '+c.a+' '+c.city+' '+c.c+' '+c.r).toLowerCase().includes(CS.q)));
 $('#csc').textContent=f.length+' campuses found';$('#cl2').innerHTML=f.slice(0,CS.n).map(c=>{const ph=c.p?c.p.split(/,\s*/).filter(x=>/\d{5}/.test(x)):[];
 return `<div class="cc ${c.t=='own'?'own':''}"><h4>${E(c.n.replace(/^Virtual University\s*/i,'VU '))}</h4><span class="tg ${c.t=='own'?'o':''}">${c.t=='own'?'VU Own':'Private'}</span><span class="tg">${E(c.c)}</span><span class="tg">${E(c.r)}</span><p>${E(c.a)}</p>${c.p?`<p>Phone: ${E(c.p)}</p>`:''}${c.m?`<p>Mobile: ${E(c.m)}</p>`:''}
 <div class="ca">${ph[0]?`<a href="${TEL(ph[0])}">Call</a>`:''}${c.m?`<a href="${TEL(c.m.split(/,\s*/)[0])}">Call mobile</a><a target="_blank" rel="noopener" href="${WAN(c.m.split(/,\s*/)[0])}">WhatsApp</a>`:''}${c.e?`<a href="mailto:${E(c.e)}">Email</a>`:''}<a target="_blank" rel="noopener" href="${MAP('Virtual University '+c.city+' '+c.a)}">Map</a></div></div>`}).join('')||'<p class="mut">No campus found.</p>';
 $('#csm').innerHTML=f.length>CS.n?`<button class="b gr" onclick="CSmore()">Show more (${f.length-CS.n} remaining)</button>`:''}
window.CSmore=()=>{CS.n+=60;campDraw()};
// ---------- programs ----------
const PS={l:'',q:''};
RR.prog=()=>{if($('#pl3'))return;$('#t-prog').innerHTML=`<div class="hero" style="padding:20px"><h2 style="color:#fff;margin:0 0 6px">Programs at Virtual University</h2><p style="margin:0">Every program level from the official Student Handbook. Choose a level, search, and open an AI guide for overview, eligibility, scheme of study and career scope.</p></div>
 <div class="card"><div class="chips" id="pl3"></div><div class="row"><input type="text" id="ps" placeholder="Search programs…" style="flex:1 1 200px"></div><p class="mut" id="pc"></p><div id="pl2"></div></div>
 <div class="card"><h3>Not sure which program fits you?</h3><p class="mut">Ask the AI assistant, or open the GPA tools to plan your results.</p><button class="b" onclick="go('chat')">Ask AI assistant</button><button class="b gr" onclick="go('tools')">Study tools</button><button class="b gr" onclick="go('camp')">Find a campus</button></div>`;
 $('#pl3').innerHTML=['',...Object.keys(PROGS)].map(l=>`<button class="chip ${l==PS.l?'on':''}" data-l="${E(l)}">${l||'All levels'}</button>`).join('');
 $$('#pl3 .chip').forEach(b=>b.onclick=()=>{PS.l=b.dataset.l;$$('#pl3 .chip').forEach(x=>x.classList.toggle('on',x==b));progDraw()});$('#ps').oninput=()=>{PS.q=$('#ps').value.toLowerCase();progDraw()};progDraw()};
function progDraw(){const L=Object.entries(PROGS).flatMap(([l,a])=>a.map(n=>[l,n])).filter(([l,n])=>(!PS.l||l==PS.l)&&(l+' '+n).toLowerCase().includes(PS.q));$('#pc').textContent=L.length+' programs';
 $('#pl2').innerHTML=L.map(([l,n],i)=>`<div class="pg" style="display:block"><div class="row"><span style="flex:1 1 220px"><b>${E(n)}</b><br><small class="mut">${E(l)}</small></span><button class="b sm" onclick="pdet2(this,${i})">AI guide</button><button class="b sm gr" onclick="go('apply')">Apply</button></div><div class="out" style="display:none"></div></div>`).join('');window.__pl=L}
window.pdet2=async(b,i)=>{const el=b.closest('.pg').querySelector('.out'),p=window.__pl[i];if(el.style.display=='block'){el.style.display='none';return}el.style.display='block';if(el.dataset.d)return;el.dataset.d=1;
 await show(el,`Write a concise, professional guide for "${p[1]}" (${p[0]}) at Virtual University of Pakistan. Use these headings: Overview, Typical eligibility, Sample scheme of study (semester-wise), Career scope. Mention that exact details must be confirmed on the official VU website. ${L()}`)};
window.drawProg=()=>{if($('#pl3'))progDraw()};
RR.prog();
})();
