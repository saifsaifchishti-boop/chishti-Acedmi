/* v7-core: helpers, language, navigation, simple home, search, portal health, accessibility */
(function(){
const BUILD='v7 · 12 Oct 2026';
const V=window.V7={R:{},sync:[],log:{}};
const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const G=(k,d)=>{try{return JSON.parse(localStorage.getItem('v7_'+k))??d}catch{return d}};
const S=(k,v,quiet)=>{try{localStorage.setItem('v7_'+k,JSON.stringify(v))}catch{}if(!quiet&&V.onSave)V.onSave(k)};
Object.assign(V,{q,qa,E,G,S});
V.toast=m=>{let t=q('#v7t');if(!t){t=document.createElement('div');t.id='v7t';t.setAttribute('role','status');document.body.appendChild(t)}t.textContent=m;t.style.display='block';clearTimeout(t._h);t._h=setTimeout(()=>t.style.display='none',2800)};
V.modal=(html)=>{const m=document.createElement('div');m.className='v7modal';m.innerHTML='<div role="dialog" aria-modal="true">'+html+'<p><button class="b gr" data-x>Close</button></p></div>';m.onclick=e=>{if(e.target===m||e.target.dataset.x!==undefined)m.remove()};document.body.appendChild(m);return m};
V.sec=(id,html)=>{const s=document.createElement('section');s.id='t-'+id;s.innerHTML='<div class="v7w">'+html+'</div>';q('main').insertBefore(s,q('#t-admin'));return s};
V.days=d=>Math.ceil((new Date(d+'T00:00:00')-new Date(new Date().toDateString()))/864e5);
V.fmt=d=>new Date(d+'T00:00:00').toLocaleDateString(undefined,{weekday:'short',day:'numeric',month:'short',year:'numeric'});
V.code=s=>(String(s).match(/[A-Za-z]{2,4}\s?-?\d{3}/)||[''])[0].replace(/[\s-]/g,'').toUpperCase();

/* ---------- translations: [English, Urdu, Roman Urdu] ---------- */
const D=[['Home','ہوم','Home'],['Handouts','ہینڈ آؤٹس','Handouts'],['Test Center','ٹیسٹ سینٹر','Test Center'],['Roadmap','روڈ میپ','Roadmap'],['Date Sheet','ڈیٹ شیٹ','Date Sheet'],['Assignments & GDB','اسائنمنٹ اور جی ڈی بی','Assignment aur GDB'],['Progress','پیش رفت','Progress'],['Fee Calculator','فیس کیلکولیٹر','Fee Calculator'],['Peer Q&A','سوال و جواب','Sawal o Jawab'],['Careers','کیریئر','Career'],['Planner','پلانر','Planner'],['Coding Lab','کوڈنگ لیب','Coding Lab'],['AI Assistant','اے آئی اسسٹنٹ','AI Assistant'],['Admissions','داخلہ','Dakhla'],['Programs','پروگرامز','Programs'],['LMS','ایل ایم ایس','LMS'],['Reviews','ریویوز','Reviews'],['Links','لنکس','Links'],['Contact','رابطہ','Rabta'],['Admin','ایڈمن','Admin'],['Dark / Light','ڈارک / لائٹ','Dark / Light'],['Search','تلاش','Talash'],['Create test','ٹیسٹ بنائیں','Test banain'],['Submit test','ٹیسٹ جمع کرائیں','Test jama karain'],['Past scores','پچھلے نمبر','Pichlay numbers'],['Handout library','ہینڈ آؤٹ لائبریری','Handout library'],['Study Planner','اسٹڈی پلانر','Study Planner'],['Write a review','ریویو لکھیں','Review likhain'],['How to apply','داخلہ کیسے لیں','Dakhla kaise lain'],['What we offer','ہم کیا پیش کرتے ہیں','Hum kya dete hain'],['Frequently asked questions','اکثر پوچھے جانے والے سوالات','Aksar poochay janay walay sawal'],['Student reviews','طلبہ کے ریویوز','Talba ke reviews'],['Official channels and links','سرکاری چینلز اور لنکس','Official channels aur links'],['Explanation language','وضاحت کی زبان','Wazahat ki zaban'],['Handouts and papers','ہینڈ آؤٹس اور پیپرز','Handouts aur papers'],['View WhatsApp Channel','واٹس ایپ چینل دیکھیں','WhatsApp Channel dekhain'],['Study tools','اسٹڈی ٹولز','Study tools'],['Support','معاونت','Madad'],['Disclaimer','دستبرداری','Disclaimer'],['Privacy & Terms','پرائیویسی اور شرائط','Privacy aur Terms'],['Important links','اہم لنکس','Ahm links'],['Exam preparation for Virtual University students','ورچوئل یونیورسٹی کے طلبہ کے لیے امتحان کی تیاری','Virtual University ke talba ke liye imtihan ki tayari'],['Programs for every stage of your education','آپ کی تعلیم کے ہر مرحلے کے لیے پروگرامز','Taleem ke har marhale ke liye programs'],
['Where would you like to start?','آپ کہاں سے شروع کرنا چاہیں گے؟','Aap kahan se shuru karna chahain ge?'],["I'm new to VU",'میں VU میں نیا ہوں','Main VU mein naya hoon'],["I'm a current student",'میں موجودہ طالب علم ہوں','Main mojooda student hoon'],['Show all portal sections','پورٹل کے تمام سیکشنز دکھائیں','Tamam sections dikhain'],['Semester Roadmap','سمسٹر روڈ میپ','Semester Roadmap'],['My courses','میرے کورسز','Mere courses'],['Add','شامل کریں','Add karain'],['Save','محفوظ کریں','Save karain'],['Delete','حذف کریں','Delete'],['Copy','کاپی','Copy'],['Print / Save PDF','پرنٹ / پی ڈی ایف','Print / PDF'],['My deadlines','میری ڈیڈ لائنز','Meri deadlines'],['Add deadline','ڈیڈ لائن شامل کریں','Deadline add karain'],['Import date sheet','ڈیٹ شیٹ امپورٹ کریں','Date sheet import karain'],['Student account','سٹوڈنٹ اکاؤنٹ','Student account'],['Sign in','لاگ اِن','Sign in'],['Create account','اکاؤنٹ بنائیں','Account banain'],['Sign out','لاگ آؤٹ','Sign out'],['Progress & streak','پیش رفت اور سلسلہ','Progress aur streak'],['Weak topics','کمزور موضوعات','Kamzor topics'],['Fee & semester calculator','فیس اور سمسٹر کیلکولیٹر','Fee aur semester calculator'],['Ask a question','سوال پوچھیں','Sawal poochain'],['Post question','سوال پوسٹ کریں','Sawal post karain'],['Career & skills','کیریئر اور سکلز','Career aur skills'],['CV builder','سی وی بلڈر','CV builder'],['Portal health','پورٹل کی صحت','Portal health'],['Check links','لنکس چیک کریں','Links check karain'],['Report a problem','مسئلہ رپورٹ کریں','Masla report karain'],['Accessibility','رسائی','Accessibility'],['Search results','تلاش کے نتائج','Talash ke nateejay'],['Coming soon','جلد آ رہا ہے','Jald aa raha hai'],['Language','زبان','Zaban']];
const MAP={ur:1,ru:2};let LNG=G('lng','en');
const nodes=()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>/^(SCRIPT|STYLE|TEXTAREA|OPTION)$/.test(n.parentNode.nodeName)||!n.nodeValue.trim()?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}),a=[];while(w.nextNode())a.push(w.currentNode);return a};
V.T=s=>{const r=D.find(x=>x[0]==s);return r&&MAP[LNG]?r[MAP[LNG]]:s};
let obs;
V.applyLang=()=>{obs&&obs.disconnect();const d=document.documentElement;d.dataset.lang=LNG;d.dir=LNG=='ur'?'rtl':'ltr';
 nodes().forEach(n=>{const raw=n.nodeValue,t=raw.trim(),o=n.__o;const key=o||t;const r=D.find(x=>x[0]==key);
  if(r){if(LNG=='en'){if(o){n.nodeValue=raw.replace(t,o);n.__o=null}}else{n.__o=key;n.nodeValue=raw.replace(t,r[MAP[LNG]])}}});
 qa('[placeholder]').forEach(e=>{if(!e.__p)e.__p=e.placeholder;const r=D.find(x=>x[0]==e.__p);e.placeholder=r&&MAP[LNG]?r[MAP[LNG]]:e.__p});
 try{lang=LNG;qa('.lang').forEach(x=>x.value=LNG)}catch{}
 obs&&obs.observe(document.body,{childList:true,subtree:true})};
V.setLang=l=>{LNG=l;S('lng',l,1);V.applyLang();const s=q('#v7lng');if(s)s.value=l;V.toast(l=='ur'?'زبان: اردو':l=='ru'?'Zaban: Roman Urdu':'Language: English')};
let tm;obs=new MutationObserver(()=>{clearTimeout(tm);tm=setTimeout(V.applyLang,250)});

/* ---------- navigation ---------- */
const TABS=[['home','Home'],['lib','Handouts'],['test','Test Center'],['road','Roadmap'],['date','Date Sheet'],['guide','Assignments & GDB'],['prog7','Progress'],['feec','Fee Calculator'],['qa','Peer Q&A'],['career','Careers'],['plan','Planner'],['code','Coding Lab'],['chat','AI Assistant'],['apply','Admissions'],['prog','Programs'],['lms','LMS'],['rev','Reviews'],['links','Links'],['contact','Contact']];
V.nav=()=>{const n=q('#nav');n.setAttribute('aria-label','Main sections');n.innerHTML=TABS.map(t=>`<button data-t="${t[0]}" onclick="go('${t[0]}')">${t[1]}</button>`).join('');const c=q('section.on');if(c)qa('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.t==c.id.slice(2)))};
const _go=window.go;
window.go=function(t){_go(t);const f=V.R[t];if(f)try{f()}catch(e){console.error(t,e)}V.page=t;V.bar();V.a11y();V.applyLang();if(t!='search')try{const o=q('#nav .on');o&&o.scrollIntoView({inline:'center',block:'nearest'})}catch{}};

/* ---------- top bar: search, language, account, accessibility ---------- */
V.top=()=>{const t=q('.top');if(q('#v7s'))return;
 t.insertAdjacentHTML('beforeend',`<form id="v7s" role="search" onsubmit="V7.find(this.q.value);return false"><input name="q" aria-label="Search the portal" placeholder="Search course code, handout, paper…"><button type="submit">Search</button></form>
 <select id="v7lng" aria-label="Language" style="background:#ffffff26;color:#fff;border:0"><option value="en" style="color:#000">English</option><option value="ur" style="color:#000">اردو</option><option value="ru" style="color:#000">Roman Urdu</option></select>
 <button class="b sm hi" onclick="go('acct')" id="v7acc">Sign in</button><button class="b sm gr" onclick="V7.accPanel()" aria-label="Accessibility settings">Accessibility</button>`);
 q('#v7lng').value=LNG;q('#v7lng').onchange=e=>V.setLang(e.target.value);
 const m=q('main');m.setAttribute('role','main');m.id='main';document.body.insertAdjacentHTML('afterbegin','<a class="skip" href="#main">Skip to content</a>');
 q('nav').insertAdjacentHTML('afterend','<div id="v7bar"></div>')};
V.bar=()=>{const b=q('#v7bar');if(!b)return;const t=V.log.files?new Date(V.log.files).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}):'loading…';
 b.innerHTML=`Handout index updated: ${t} · Portal ${BUILD} · <a href="#" onclick="V7.report();return false">Report a problem</a> · <a href="#" onclick="go('health');return false">Portal health</a>`};

/* ---------- accessibility ---------- */
const A=()=>G('a11y',{fs:1,font:'',hc:0,rm:0,low:0});
V.applyA=()=>{const a=A(),d=document.documentElement;d.style.setProperty('--fs',a.fs);d.dataset.font=a.font||'';a.hc?d.dataset.theme='hc':(d.dataset.theme==='hc'&&(d.dataset.theme=''));a.rm?d.dataset.rm='':delete d.dataset.rm;a.low?d.dataset.lowdata='':delete d.dataset.lowdata};
V.accPanel=()=>{const a=A(),m=V.modal(`<h3>Accessibility</h3><p class="v7row">Text size <button class="b sm gr" data-a="fs-">A−</button><b id="fsv">${Math.round(a.fs*100)}%</b><button class="b sm gr" data-a="fs+">A+</button></p>
 <label class="v7row"><input type="checkbox" data-a="font" ${a.font?'checked':''}> Dyslexia-friendly, high-legibility font</label>
 <label class="v7row"><input type="checkbox" data-a="hc" ${a.hc?'checked':''}> High contrast</label>
 <label class="v7row"><input type="checkbox" data-a="rm" ${a.rm?'checked':''}> Reduce motion</label>
 <label class="v7row"><input type="checkbox" data-a="low" ${a.low?'checked':''}> Low-data mode (no images or animation; heavy tools ask before loading)</label>
 <p class="mut">Screen readers: every control has a label and the page has landmarks and a skip link.</p>`);
 m.addEventListener('click',e=>{const k=e.target.dataset?.a;if(!k||e.target.type=='checkbox')return;const a=A();a.fs=Math.min(1.6,Math.max(.8,+(a.fs+(k=='fs+'?.1:-.1)).toFixed(2)));S('a11y',a,1);V.applyA();m.querySelector('#fsv').textContent=Math.round(a.fs*100)+'%'});
 m.addEventListener('change',e=>{const k=e.target.dataset?.a;if(!k)return;const a=A();a[k]=k=='font'?(e.target.checked?'dys':''):+e.target.checked;S('a11y',a,1);V.applyA()})};
V.a11y=()=>{qa('input,select,textarea').forEach(e=>{if(!e.getAttribute('aria-label')&&!e.id?.startsWith('v7')&&!(e.labels&&e.labels.length))e.setAttribute('aria-label',e.placeholder||e.title||e.name||e.id||'field')});qa('button:not([aria-label])').forEach(b=>{if(!b.textContent.trim())b.setAttribute('aria-label',b.title||'button')});qa('section').forEach(s=>s.setAttribute('aria-hidden',s.classList.contains('on')?'false':'true'))};
const _lz=window.lz;if(_lz)window.lz=function(k){if(A().low&&!V._ok?.[k]){if(!confirm('Low-data mode is on. This tool needs to download a large helper library. Continue?'))return Promise.reject(new Error('Download cancelled (low-data mode).'));(V._ok=V._ok||{})[k]=1}return _lz(k)};

/* ---------- simple home ---------- */
const NEW=[['apply','📝','Admissions','Step-by-step admission guide','#0d5c63'],['prog','🎓','Programs','Every program level at VU','#ee6c4d'],['road','🗺️','Roadmap','Semester-wise course map','#f4b942'],['feec','🧮','Fee Calculator','Estimate fee for your courses','#2f9e6e'],['career','💼','Careers','CV builder and next steps','#6a5acd'],['chat','💬','AI Assistant','Ask anything about VU','#127a75']];
const OLD=[['lib','📚','Handouts','Handouts, papers and quizzes','#0d5c63'],['test','⏱️','Test Center','Timed practice tests with review','#ee6c4d'],['date','📅','Date Sheet','Papers and reminders','#f4b942'],['guide','✍️','Assignments & GDB','Deadlines and solution guides','#2f9e6e'],['prog7','📈','Progress','Weak topics and streak','#6a5acd'],['qa','🙋','Peer Q&A','Ask seniors, vote answers','#127a75']];
V.home=()=>{const h=q('#t-home');if(q('#v7home')||!h)return;const hero=h.querySelector('.hero');
 hero.querySelector('p').textContent='Handouts, timed practice tests, date-sheet reminders and study tools for Virtual University students. Free, fast and built around your semester.';
 const more=document.createElement('div');more.id='v7more';more.hidden=true;[...h.children].forEach(c=>{if(c!==hero&&!c.classList.contains('tick'))more.appendChild(c)});
 const box=document.createElement('div');box.id='v7home';box.innerHTML=`<h2>Where would you like to start?</h2><div class="v7who"><button data-w="new">I'm new to VU</button><button data-w="old">I'm a current student</button></div><div class="v7g" id="v7tiles"></div><p><button class="b gr" id="v7tog">Show all portal sections</button></p>`;
 h.append(box,more);
 const draw=()=>{const w=G('who','old');qa('#v7home .v7who button').forEach(b=>b.classList.toggle('on',b.dataset.w==w));q('#v7tiles').innerHTML=(w=='new'?NEW:OLD).map(t=>`<button class="v7t" style="--c:${t[4]}" onclick="go('${t[0]}')"><i>${t[1]}</i><b>${t[2]}</b><span>${t[3]}</span></button>`).join('');V.applyLang()};
 box.querySelector('.v7who').onclick=e=>{if(e.target.dataset.w){S('who',e.target.dataset.w,1);draw()}};
 q('#v7tog').onclick=()=>{more.hidden=!more.hidden;q('#v7tog').textContent=more.hidden?'Show all portal sections':'Hide extra sections'};draw()};

/* ---------- global search ---------- */
V.find=s=>{s=String(s||'').trim();go('search');const i=q('#v7sq');i.value=s;V.R.search()};
V.fileUrl=p=>`https://raw.githubusercontent.com/${CFG.repo}/${BR}/${p.split('/').map(encodeURIComponent).join('/')}`;
V.R.search=()=>{const s=(q('#v7sq').value||'').trim(),o=q('#v7sr');if(!s){o.innerHTML='<div class="v7em">Type a course code such as CS101 to see handouts, papers, MCQs, groups and deadlines on one page.</div>';return}
 const w=s.toLowerCase().split(/\s+/),has=t=>w.every(x=>String(t).toLowerCase().includes(x)),sec=(t,rows)=>rows.length?`<div class="card"><h3>${t} <span class="v7tag">${rows.length}</span></h3>${rows.join('')}</div>`:'';
 const F=(window.files||[]).filter(has),ty=r=>F.filter(f=>r.test(f)),used=new Set(),pick=r=>ty(r).filter(f=>!used.has(f)).map(f=>(used.add(f),f));
 const fr=a=>a.slice(0,25).map(f=>`<div class="v7row"><a href="${V.fileUrl(f)}" target="_blank" rel="noopener">${E(f)}</a></div>`);
 const papers=pick(/mid|final|paper|past/i),mcq=pick(/mcq|quiz/i),asg=pick(/assign|gdb/i),hand=F.filter(f=>!used.has(f));
 const C=V.catalog().filter(c=>has(c.code+' '+c.title)).slice(0,10).map(c=>`<div class="v7row"><b>${E(c.code)}</b> ${E(c.title)} <span class="v7tag">${c.cr} cr</span> ${c.pre?.length?`<span class="v7tag r">needs ${E(c.pre.join(', '))}</span>`:''}<button class="b sm gr" onclick="V7.addCourse('${c.code}');V7.toast('Added to My courses')">Add</button></div>`);
 const dl=(G('dl',[])).filter(d=>has(d.course+' '+d.title+' '+d.type)).map(d=>`<div class="v7row">${E(d.title)} · ${E(d.course)} · ${V.fmt(d.date)} <button class="b sm gr" onclick="go('date')">Open</button></div>`);
 const L=[...(window.cfg?.links||[]),...(window.VUCORE||[])].filter(l=>has(l.n)).map(l=>`<div class="v7row"><a href="${E(l.u)}" target="_blank" rel="noopener">${E(l.n)}</a></div>`);
 const P=[];Object.entries(window.PROGS||{}).forEach(([lv,a])=>(Array.isArray(a)?a:[]).forEach(n=>{if(has(n+' '+lv))P.push(`<div class="v7row">${E(n)} <span class="v7tag">${E(lv)}</span> <button class="b sm gr" onclick="go('prog')">Programs</button></div>`)}));
 const Q=(V.qaCache||[]).filter(p=>has(p.title+' '+p.body+' '+p.course)).map(p=>`<div class="v7row">${E(p.title)} <button class="b sm gr" onclick="go('qa')">Open Q&A</button></div>`);
 const out=[sec('Courses',C),sec('Handouts',fr(hand)),sec('Past papers',fr(papers)),sec('MCQs and quizzes',fr(mcq)),sec('Assignments and GDB',fr(asg)),sec('My deadlines',dl),sec('Groups and links',L),sec('Programs',P.slice(0,10)),sec('Questions from students',Q)].join('');
 o.innerHTML=out||`<div class="v7em">No results for “${E(s)}”. Try only the course code, for example CS101.</div>`};

/* ---------- portal health ---------- */
V.report=(pg)=>{const m=V.modal(`<h3>Report a problem</h3><p class="mut">Tell us what is wrong (broken link, wrong date, wrong answer). It opens WhatsApp with your message ready.</p><select id="v7rp"><option>${E(pg||V.page||'home')}</option><option>Handouts</option><option>Date sheet</option><option>Fee information</option><option>Test answer</option><option>Other</option></select><textarea id="v7rm" rows="4" style="width:100%" placeholder="Describe the problem"></textarea><p><button class="b hi" id="v7rs">Send on WhatsApp</button></p>`);
 m.querySelector('#v7rs').onclick=()=>{const t=m.querySelector('#v7rm').value.trim();if(!t){V.toast('Please describe the problem first');return}const L=G('reports',[]);L.push({p:m.querySelector('#v7rp').value,t,d:Date.now()});S('reports',L.slice(-30),1);window.open('https://wa.me/'+CFG.wa+'?text='+encodeURIComponent(`Problem report (${m.querySelector('#v7rp').value}):\n${t}\nPage: ${location.href}`),'_blank');m.remove()}};
V.R.health=()=>{const f=t=>t?new Date(t).toLocaleString():'not loaded yet';
 q('#v7hs').innerHTML=`<table class="v7tbl"><tr><th>Item</th><th>Status</th></tr><tr><td>Portal version</td><td>${BUILD}</td></tr><tr><td>Handout index (${(window.files||[]).length} files)</td><td>${f(V.log.files)}</td></tr><tr><td>Admin configuration</td><td>${f(V.log.cfg)}</td></tr><tr><td>Date sheet file</td><td>${f(V.log.ds)}</td></tr><tr><td>Student sync</td><td>${V.user?'Signed in as '+E(V.user.email):'Not signed in'}</td></tr></table>`};
V.check=async()=>{const o=q('#v7lk'),all=[...(window.cfg?.links||[]),...(window.VUCORE||[])];const seen=new Set(),L=all.filter(l=>l.u&&/^https?:/.test(l.u)&&!seen.has(l.u)&&seen.add(l.u));o.innerHTML='';let bad=0;
 for(const l of L){const r=document.createElement('div');r.className='v7row';r.innerHTML=`${E(l.n)} <span class="mut">checking…</span>`;o.appendChild(r);
  try{const c=new AbortController(),t=setTimeout(()=>c.abort(),8000);await fetch(l.u,{mode:'no-cors',signal:c.signal});clearTimeout(t);r.lastChild.outerHTML='<span class="v7tag o">Reachable</span>'}catch{bad++;r.lastChild.outerHTML=`<span class="v7tag r">Not reachable</span> <button class="b sm gr" onclick="V7.report('Link: ${E(l.n).replace(/'/g,'')}')">Report</button>`}}
 o.insertAdjacentHTML('afterbegin',`<p><b>${L.length-bad} of ${L.length}</b> links reachable. (This checks that the site responds from your device; it cannot read page errors.)</p>`)};

/* ---------- empty states ---------- */
V.empty=()=>{[['#flist','Handouts are being added. Check back soon, or ask on the WhatsApp channel.'],['#rvl','Be the first to review the portal.'],['#rvh','Reviews will appear here soon.']].forEach(([s,m])=>{const e=q(s);if(e&&!e.children.length&&!e.textContent.trim()||e&&/^(Loading…|No (reviews|files))/i.test(e.textContent.trim())&&s!='#flist'){e.innerHTML=`<div class="v7em"><b>Coming soon</b><br>${m}</div>`}})};

/* ---------- sections for core pages ---------- */
V.build=()=>{
 V.sec('search',`<div class="card"><h2>Search results</h2><div class="v7row"><input id="v7sq" style="flex:1 1 220px" placeholder="Course code or keyword" onkeydown="if(event.key=='Enter')V7.R.search()"><button class="b hi" onclick="V7.R.search()">Search</button></div></div><div id="v7sr"></div>`);
 V.sec('health',`<div class="card"><h2>Portal health</h2><div id="v7hs"></div><p><button class="b" onclick="V7.R.health()">Refresh status</button> <button class="b hi" onclick="V7.report('health')">Report a problem</button></p></div><div class="card"><h3>Check links</h3><p class="mut">Tests whether each official and community link responds.</p><button class="b" onclick="V7.check()">Check links</button><div id="v7lk"></div></div>`);
 const f=q('footer .v7x');if(!f){const sup=[...qa('footer h4')].find(h=>h.textContent=='Support');sup&&sup.parentNode.insertAdjacentHTML('beforeend','<a class="v7x" onclick="go(\'health\')">Portal health</a><a onclick="go(\'date\')">Date sheet</a><a onclick="V7.accPanel()">Accessibility</a>')}};
V.start=()=>{V.build();V.top();V.nav();V.home();V.applyA();V.bar();V.a11y();V.applyLang();obs.observe(document.body,{childList:true,subtree:true});
 const wait=setInterval(()=>{if(window.files&&window.files.length&&!V.log.files){V.log.files=Date.now();V.bar()}if(window.cfg&&window.cfg.links&&!V.log.cfg){V.log.cfg=Date.now()}V.empty()},1500);setTimeout(()=>clearInterval(wait),60000);
 [600,2000,5000].forEach(t=>setTimeout(()=>{V.nav();V.home()},t));
 try{const t=localStorage.getItem('tab');}catch{}};
V.ready=fn=>{window.__v7q=window.__v7q||[];window.__v7q.push(fn)};
window.addEventListener('load',()=>setTimeout(()=>{try{V.start();(window.__v7q||[]).forEach(f=>f())}catch(e){console.error('v7',e)}},50));
})();
