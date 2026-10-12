/* v9: front-page photos, admin stats (names + file totals), Coding Lab levels + step-by-step runner */
(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const LG=(k,d)=>{try{const v=localStorage.getItem('cpa_'+k);return v==null?d:JSON.parse(v)}catch{return d}};
const LS=(k,v)=>{try{localStorage.setItem('cpa_'+k,JSON.stringify(v))}catch{}try{window.V7&&V7.S&&V7.S(k,v)}catch{}};
const lab=()=>{try{const v=window.V7&&V7.G?V7.G('v9lab',null):null;if(v)return v}catch{}return LG('v9lab',{done:[],streak:0,last:'',dd:''})};
const saveLab=v=>{try{if(window.V7&&V7.S)V7.S('v9lab',v);else LS('v9lab',v)}catch{LS('v9lab',v)}};

/* ---------- 1. hero photo slideshow ---------- */
const PH=['photo-1522202176988-66273c2fd55f','photo-1501504905252-473c47e087f8','photo-1517694712202-14dd9538aa97','photo-1456513080510-7bf3a84b82f8'].map(i=>`https://images.unsplash.com/${i}?auto=format&fit=crop&w=1400&q=70`);
let slideT;
function hero(){const h=$('.d8hero');if(!h||h.querySelector('.v9sl'))return;h.classList.add('v9h');
 const d=document.createElement('div');d.className='v9sl';d.innerHTML=PH.map((u,i)=>`<img src="${u}" alt="" loading="${i?'lazy':'eager'}" class="${i?'':'on'}" onerror="this.remove()">`).join('');h.insertBefore(d,h.firstChild);
 clearInterval(slideT);slideT=setInterval(()=>{const im=$$('.v9sl img');if(im.length<2)return;const i=im.findIndex(x=>x.classList.contains('on'));im[i<0?0:i].classList.remove('on');im[(i+1)%im.length].classList.add('on')},4500)}
const mo=new MutationObserver(()=>{hero();if($('#dash')&&!$('#v9stats'))adminStats()});mo.observe(document.body,{childList:true,subtree:true});hero();

/* ---------- 2. admin: viewers with names + file totals ---------- */
let busy=0;
async function adminStats(){if(busy)return;busy=1;const host=$('#dash');if(!host){busy=0;return}
 const div=document.createElement('div');div.id='v9stats';div.className='v9st';div.innerHTML='<p class="mut">Loading viewers and file totals…</p>';host.appendChild(div);
 try{
  let sb=window.V7&&V7.sb;if(!sb&&window.supabase)sb=window.supabase.createClient(SUPA.url,SUPA.key,{auth:{storageKey:'cpa-admin-auth'}});
  const rows=[];let f=0;for(;;){const{data,error}=await sb.from('events').select('visitor_id,type,detail,device,created_at').order('created_at',{ascending:false}).range(f,f+999);if(error)throw new Error(error.message+' — Supabase mein sql/events.sql chalayein.');rows.push(...data);if(data.length<1000||rows.length>20000)break;f+=1000}
  const vis={};rows.forEach(r=>{const v=vis[r.visitor_id]||(vis[r.visitor_id]={id:r.visitor_id,n:0,last:r.created_at,name:'',email:'',dl:0});v.n++;if(r.created_at>v.last)v.last=r.created_at;if(r.type=='identify'&&!v.email){const[a,b]=String(r.detail||'').split('|');v.name=a;v.email=b}if(r.type=='download')v.dl++});
  const V=Object.values(vis).sort((a,b)=>b.last.localeCompare(a.last)),named=V.filter(v=>v.email);
  const n7=new Set(rows.filter(r=>new Date(r.created_at)>Date.now()-7*864e5).map(r=>r.visitor_id)).size;
  /* files */
  let drive=0,srcs={},skipped=0;try{const r=await fetch('/api/catalog');if(r.ok){const d=await r.json();(d.items||[]).forEach(e=>(e.l||[]).forEach(l=>{srcs[l.s||'Drive']=(srcs[l.s||'Drive']||0)+1}));drive=(d.items||[]).length;skipped=(d.skipped||[]).length}}catch{}
  let site=0;try{site=(typeof files!=='undefined'&&files.length)||0}catch{}
  div.innerHTML=`<h3>👁️ Viewers & files</h3><div class="d8cd" style="display:flex;gap:18px;flex-wrap:wrap"><div><b style="font-size:26px">${V.length}</b><br>total viewers</div><div><b style="font-size:26px">${n7}</b><br>last 7 days</div><div><b style="font-size:26px">${named.length}</b><br>logged-in students</div><div><b style="font-size:26px">${rows.filter(r=>r.type=='download').length}</b><br>downloads</div></div>
  <h4>📁 Total files</h4><p><b>${site}</b> website/GitHub library · <b>${drive}</b> Google Drive + partner catalog · <b>${site+drive}</b> combined${skipped?` · ${skipped} skipped`:''}</p>${Object.entries(srcs).map(([k,c])=>`<div class="pg"><span>${esc(k)}</span><b>${c}</b></div>`).join('')}
  <h4>Who viewed (latest 60)</h4>${V.slice(0,60).map(v=>`<div class="pg"><span>${v.email?`<b>${esc(v.name||'Student')}</b> · ${esc(v.email)}`:'Guest '+esc(String(v.id).slice(0,8))} · ${new Date(v.last).toLocaleString()} · ${v.n} events${v.dl?' · '+v.dl+' downloads':''}</span></div>`).join('')||'<p class="mut">Abhi koi data nahi</p>'}`;
 }catch(e){div.innerHTML='<h3>👁️ Viewers & files</h3><p class="mut">'+esc(e.message||e)+'</p>'}
 busy=0}
/* identify student for admin list */
setInterval(()=>{try{const u=window.V7&&V7.user;if(u&&!sessionStorage.getItem('v9id')){sessionStorage.setItem('v9id','1');TRK('identify',(V7.G('name','')||u.user_metadata?.name||'')+'|'+(u.email||u.phone||''))}}catch{}},4000);

/* ---------- 3. Coding Lab: levels ---------- */
const L=[
{lv:0,id:'a',t:'Computer aur program kya hai',ex:'Computer sirf hukm (instructions) maanta hai. Program = hukmon ki list jo computer ek ke baad ek chalata hai.',real:'Jaise ammi ki recipe: jo likha hai wohi hota hai, is se zyada nahi.',code:'print("Salam! Main computer hoon")\nprint("Main sirf wohi karta hoon jo likha ho")',task:'Teesri line add karein jo aapka naam print kare.',ck:/./,hint:'print("Mera naam Ali hai") jaisi nayi line likhein.',sol:'print("Salam! Main computer hoon")\nprint("Main sirf wohi karta hoon jo likha ho")\nprint("Mera naam Ali hai")',ln:3,
 mcq:[['Program kya hota hai?',['Hukmon ki list','Ek gaana','Ek tasveer'],0],['Computer kya karta hai?',['Khud sochta hai','Likhe hue hukm chalata hai','Sirf so jata hai'],1],['print() kya karta hai?',['Screen par likhta hai','File delete karta hai','Net band karta hai'],0]]},
{lv:0,id:'b',t:'Algorithm: chai ki recipe',ex:'Algorithm = kaam karne ke qadam, sahi tarteeb mein. Chai bananay ki recipe bhi algorithm hai.',real:'Chai: pani ubalo → patti dalo → doodh dalo → chan lo. Tarteeb badli to chai kharab!',code:'print("1. Pani ubalo")\nprint("2. Patti dalo")\nprint("3. Doodh dalo")\nprint("4. Chaan kar piyo")',task:'Qadam 3 aur 4 ke beech "Cheeni dalo" ka qadam add karein.',ck:/[Cc]heeni/,hint:'Qadam 3 ke baad ek aur print() line likhein.',sol:'print("1. Pani ubalo")\nprint("2. Patti dalo")\nprint("3. Doodh dalo")\nprint("3.5 Cheeni dalo")\nprint("4. Chaan kar piyo")',
 mcq:[['Algorithm kya hai?',['Qadam ba qadam tareeqa','Ek game','Ek virus'],0],['Qadam ki tarteeb badal jaye to?',['Kuch farq nahi','Nateeja kharab ho sakta hai','Computer band'],1],['Chai recipe kis ki misaal hai?',['Algorithm','Printer','Mouse'],0]]},
{lv:1,id:'c',t:'Variables (dabbay)',ex:'Variable ek naam wala dabba hai jis mein value rakhte hain. = ka matlab "dabbay mein rakho".',real:'Jaise bottle par "Pani" likha ho aur andar pani ho.',code:'naam = "Ali"\numar = 18\nprint(naam)\nprint(umar)\numar = umar + 1\nprint(umar)',task:'naam ki value apne naam se badlein.',ck:/./,hint:'Pehli line mein "Ali" ki jagah apna naam likhein.',sol:'naam = "Ahmed"\numar = 18\nprint(naam)\nprint(umar)\numar = umar + 1\nprint(umar)',
 mcq:[['Variable kya hai?',['Naam wala dabba','Ek button','Ek error'],0],['x = 5 ka matlab?',['x mein 5 rakho','x barabar nahi','x delete'],0],['umar = umar + 1 ke baad 18 kya banega?',['17','19','18'],1]]},
{lv:1,id:'d',t:'Input / Output (print aur f-string)',ex:'print() screen par dikhata hai. f"..." ke andar {variable} likh kar value text mein mila sakte hain. (Yahan input() nahi chalta, isliye value variable mein rakhte hain.)',real:'Jaise form: naam khana bhar diya, phir slip par "Welcome Ali" chhap gaya.',code:'naam = "Sara"\nprint(f"Welcome {naam}!")\nprint("Aap ka naam", naam, "hai")',task:'naam badal kar dekhein ke dono lines badal jati hain.',ck:/Welcome/,hint:'Sirf pehli line ki value badlein.',sol:'naam = "Hina"\nprint(f"Welcome {naam}!")\nprint("Aap ka naam", naam, "hai")',
 mcq:[['f"Hi {x}" mein {x} kya karta hai?',['x ki value daalta hai','Kuch nahi','Error deta hai'],0],['Output kis se dikhate hain?',['print()','save()','color()'],0],['input ka matlab?',['Data lena','Data mitana','Screen band'],0]]},
{lv:2,id:'e',t:'if / else (faisla)',ex:'if ka matlab "agar". Condition sahi ho to ek kaam, warna else wala kaam.',real:'Agar baarish ho to chhatri lo, warna nahi.',code:'marks = 65\nif marks >= 50:\n    print("Pass")\nelse:\n    print("Fail")',task:'marks = 40 kar ke dekhein kya print hota hai.',ck:/./,hint:'Pehli line mein 65 ki jagah 40 likhein.',sol:'marks = 40\nif marks >= 50:\n    print("Pass")\nelse:\n    print("Fail")',
 mcq:[['if ka matlab?',['Agar','Warna','Dohrao'],0],['marks=40, marks>=50 ka nateeja?',['True','False','Error'],1],['else kab chalta hai?',['Jab if galat ho','Hamesha','Kabhi nahi'],0]]},
{lv:2,id:'f',t:'Loops (dohrana)',ex:'for loop ek kaam ko baar baar karta hai. range(5) = 0 se 4 tak.',real:'Jaise 5 baar taali bajana: har baar wohi kaam.',code:'for i in range(5):\n    print("Taali", i)\ntotal = 0\nfor n in [1, 2, 3]:\n    total = total + n\nprint("Total", total)',task:'range(5) ko range(3) kar ke dekhein.',ck:/Taali/,hint:'Pehli line mein 5 ki jagah 3 likhein.',sol:'for i in range(3):\n    print("Taali", i)\ntotal = 0\nfor n in [1, 2, 3]:\n    total = total + n\nprint("Total", total)',
 mcq:[['Loop kya karta hai?',['Kaam dohrata hai','Program rokta hai','Kuch nahi'],0],['range(3) kitni baar chalega?',['2','3','4'],1],['loop ke andar ki lines kaise likhte hain?',['Andar space (indent) ke saath','Bina space','Capital mein'],0]]},
{lv:3,id:'g',t:'Functions',ex:'Function kaam ka packet hai: ek baar likho, baar baar use karo. def se banate hain.',real:'Jaise chai wala: "ek chai" bolo to poori recipe khud kar deta hai.',code:'def salam(naam):\n    print("Salam", naam)\n\nsalam("Ali")\nsalam("Sara")',task:'salam("Ahmed") ki teesri call add karein.',ck:/Ahmed/,hint:'Aakhir mein salam("Ahmed") likhein.',sol:'def salam(naam):\n    print("Salam", naam)\n\nsalam("Ali")\nsalam("Sara")\nsalam("Ahmed")',
 mcq:[['Function kis se banta hai?',['def','if','for'],0],['Function ka faida?',['Code dobara use hota hai','Code slow hota hai','Kuch nahi'],0],['salam("Ali") kya hai?',['Function call','Variable','Comment'],0]]},
{lv:3,id:'h',t:'Lists',ex:'List kai values ek saath rakhti hai. Position 0 se shuru hoti hai.',real:'Jaise bazaar ki list: doodh, anday, roti.',code:'phal = ["aam", "kela", "seb"]\nprint(phal[0])\nphal.append("angoor")\nprint(len(phal))\nprint(phal)',task:'list mein "santra" add karein.',ck:/santra/,hint:'phal.append("santra") likhein aur print(phal) rakhein.',sol:'phal = ["aam", "kela", "seb"]\nphal.append("santra")\nprint(phal)',
 mcq:[['List ka pehla item kis position par?',['0','1','-1'],0],['append kya karta hai?',['Aakhir mein add','Delete','Sort'],0],['len(list) kya batata hai?',['Kitne items','Pehla item','Naam'],0]]},
{lv:4,id:'i',t:'Project: Calculator',ex:'Variables aur functions mila kar choti calculator.',real:'Dukaan ka hisaab: do cheezon ka total.',code:'def jama(a, b):\n    return a + b\n\ndef zarb(a, b):\n    return a * b\n\nprint("5 + 3 =", jama(5, 3))\nprint("5 x 3 =", zarb(5, 3))',task:'minus (ghata) ka function bana kar print karein.',ck:/./,hint:'def ghata(a, b): return a - b',sol:'def jama(a, b):\n    return a + b\n\ndef ghata(a, b):\n    return a - b\n\nprint(jama(5, 3))\nprint(ghata(5, 3))',
 mcq:[['return kya karta hai?',['Nateeja wapas deta hai','Program band','Print'],0],['5 * 3 ?',['8','15','2'],1],['Function mein a, b kya hain?',['Parameters','Errors','Colors'],0]]},
{lv:4,id:'j',t:'Project: Quiz game',ex:'Score variable aur if se choti quiz.',real:'Sahi jawab par 1 number, ghalat par 0.',code:'score = 0\njawab = "Islamabad"\nif jawab == "Islamabad":\n    score = score + 1\n    print("Sahi!")\nelse:\n    print("Ghalat")\nprint("Score:", score)',task:'jawab = "Lahore" kar ke dekhein.',ck:/Score/,hint:'Teesri line mein jawab badlein.',sol:'score = 0\njawab = "Lahore"\nif jawab == "Islamabad":\n    score = score + 1\n    print("Sahi!")\nelse:\n    print("Ghalat")\nprint("Score:", score)',
 mcq:[['== ka matlab?',['Barabar hai ya nahi','Value rakho','Delete'],0],['Ghalat jawab par score?',['Barhta hai','Wohi rehta hai','Error'],1],['score kya hai?',['Variable','Function','Loop'],0]]},
{lv:4,id:'k',t:'Project: GPA calculator',ex:'Marks ko GPA points mein badal kar average nikalna.',real:'Semester ka result: har course ke points ka ausat.',code:'points = [4.0, 3.5, 3.0, 3.67]\ntotal = 0\nfor p in points:\n    total = total + p\ngpa = total / len(points)\nprint("GPA:", round(gpa, 2))',task:'points list mein 2.67 add karein.',ck:/GPA/,hint:'List ke aakhir mein , 2.67 likhein.',sol:'points = [4.0, 3.5, 3.0, 3.67, 2.67]\ntotal = 0\nfor p in points:\n    total = total + p\ngpa = total / len(points)\nprint("GPA:", round(gpa, 2))',
 mcq:[['Average kaise nikalte hain?',['Total / count','Total + count','Total - count'],0],['round(x, 2) kya karta hai?',['2 decimal tak gol','Delete','Square'],0],['len(points) kya hai?',['Items ki tadaad','Pehla item','Total'],0]]}];
const LVN=['Level 0: Computer & Algorithm','Level 1: Variables & I/O','Level 2: if/else & Loops','Level 3: Functions & Lists','Level 4: Projects'];
const DAILY=[['3 ki table print karein (3 se 30 tak)',/30/],['1 se 10 tak ka total print karein (55)',/55/],['"Hello VU" 3 baar print karein',/(Hello VU\s*){3}/],['List [4,8,15] ka total print karein (27)',/27/],['5*4*3*2*1 ka nateeja print karein (120)',/120/],['Apna naam f-string mein print karein',/./],['range(1,6) ke squares print karein (25 tak)',/25/]];
let cur=0,lastOut='';
const isDone=id=>lab().done.includes(id);
const unlocked=i=>i==0||isDone(L[i-1].id);
function drawLab(){const host=$('#v9lab');if(!host)return;const S=lab(),pct=Math.round(S.done.length/L.length*100),lvOpen=n=>L.findIndex(x=>x.lv==n)<=-1?false:unlocked(L.findIndex(x=>x.lv==n)),dayI=Math.floor(Date.now()/864e5)%DAILY.length;
 const x=L[cur];
 host.innerHTML=`<h3>🎓 Python seekhein: step by step</h3><p class="mut">Har level pura hone par hi agla khulta hai. Har sabaq: samajh → misaal → Run → task → 3 MCQ.</p>
 <div class="v9pb"><i style="width:${pct}%"></i></div><p><b>${S.done.length}/${L.length}</b> sabaq (${pct}%) · 🔥 Streak: <b>${S.streak||0}</b> din</p>
 <div class="v9bdg">${S.done.length>=1?'<span>🥉 Pehla Qadam</span>':''}${L.filter(l=>l.lv==0).every(l=>isDone(l.id))?'<span>🥈 Level 0 Pura</span>':''}${L.filter(l=>l.lv<=2).every(l=>isDone(l.id))?'<span>🥇 Level 2 Pura</span>':''}${S.done.length==L.length?'<span>🏆 Python Champion</span>':''}${(S.streak||0)>=3?'<span>🔥 3 din streak</span>':''}</div>
 <div class="v9ls">${L.map((l,i)=>{const ok=unlocked(i);return`<button class="${i==cur?'on':''} ${ok?'':'lk'}" data-i="${i}">${isDone(l.id)?'✅':ok?'▶️':'🔒'} ${esc(LVN[l.lv].split(':')[0])} · ${esc(l.t)}</button>`}).join('')}</div>
 <div class="v9box"><b>1) Samajh:</b> ${esc(x.ex)}</div><div class="v9box r"><b>2) Asal zindagi ki misaal:</b> ${esc(x.real)}</div>
 <div class="row"><button class="b" id="v9load">📥 Code editor mein load karein</button><button class="b hi" id="v9step">▶ Line-by-line Run</button><button class="b gr" id="v9ai">🧒 Aise samjhao jaise pehli baar sun raha hoon</button></div>
 <div class="v9box t"><b>3) Task:</b> ${esc(x.task)}</div>
 <div class="row"><button class="b" id="v9chk">✔ Task check</button><button class="b gr" id="v9hint">💡 Hint</button><button class="b gr" id="v9sol">🔑 Solution</button></div><p id="v9msg" class="mut"></p>
 <div class="v9trace" id="v9tr" style="display:none"><h4>Abhi kya ho raha hai</h4><p id="v9ex" class="v9box"></p><div class="v9vars" id="v9vars"></div></div>
 <h4>4) 3 MCQ</h4>${x.mcq.map((m,qi)=>`<div class="v9mcq" data-q="${qi}"><b>${qi+1}. ${esc(m[0])}</b>${m[1].map((o,oi)=>`<button data-o="${oi}">${esc(o)}</button>`).join('')}</div>`).join('')}
 <p id="v9fin" class="mut"></p><hr><h4>⚡ Roz ka challenge</h4><p>${esc(DAILY[dayI][0])}</p><div class="row"><button class="b hi" id="v9dl">Challenge load</button><button class="b" id="v9dc">Check</button></div><p id="v9dm" class="mut"></p>`;
 wire(host)}
function say(t,ok){const m=$('#v9msg');if(m){m.textContent=t;m.style.color=ok?'#059669':''}}
async function execPy(code){await lz('py');py=py||await loadPyodide();let out='',err='';py.setStdout({batched:s=>out+=s+'\n'});py.setStderr({batched:s=>out+=s+'\n'});try{await py.runPythonAsync(code)}catch(e){err=String(e.message||e).split('\n').slice(-3).join('\n')}return{out,err}}
function wire(h){
 h.querySelectorAll('.v9ls button').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(!unlocked(i)){say('Pehle pichla sabaq pura karein 🔒');return}cur=i;drawLab()});
 const x=L[cur];
 $('#v9load').onclick=async()=>{if($('#lg').value!='python'){$('#lg').value='python';try{setLang()}catch{}}try{await initEd()}catch{}for(let i=0;i<40&&!ed;i++)await new Promise(r=>setTimeout(r,250));if(ed){ed.setValue(x.code);say('Code editor mein load ho gaya. Upar editor dekhein.',1);$('#ed').scrollIntoView({behavior:'smooth',block:'center'})}else say('Editor load nahi hua, dobara try karein')};
 $('#v9step').onclick=()=>stepRun(x);
 $('#v9ai').onclick=()=>{try{show($('#tutor'),`Aise samjhao jaise main pehli baar sun raha hoon (bohat aasan Urdu/Roman Urdu, choti misaal, koi mushkil lafz nahi). Topic: ${x.t}. ${x.ex}`)}catch(e){say(e.message)}};
 $('#v9hint').onclick=()=>say('💡 '+x.hint);
 $('#v9sol').onclick=()=>{say('🔑 Pehle hint try karein. Solution editor mein load kar diya.');if(ed)ed.setValue(x.sol);else{const o=$('#v9load');o&&o.click()}};
 $('#v9chk').onclick=async()=>{if(!ed){say('Pehle "Code editor mein load" dabayein');return}say('Check ho raha hai…');const r=await execPy(ed.getValue());if(r.err){say('Error: '+r.err+'  — "Fix my error" bhi dabayein');return}const code=ed.getValue(),changed=code.trim()!=x.code.trim(),lines=code.trim().split('\n').length;if(changed&&x.ck.test(r.out+code)&&lines>=(x.ln||1)){say('🎉 Shabash! Task theek hai. Ab 3 MCQ hal karein.',1);MCQ.task[x.id]=1;fin()}else say('Abhi task poora nahi hua. Hint dabayein.')};
 const MQ=MCQ.q[x.id]||(MCQ.q[x.id]={});h.querySelectorAll('.v9mcq').forEach(box=>{const qi=+box.dataset.q;box.querySelectorAll('button').forEach(b=>{if(MQ[qi]!=null&&+b.dataset.o==x.mcq[qi][2])b.classList.add('ok');b.onclick=()=>{const ok=+b.dataset.o==x.mcq[qi][2];b.classList.add(ok?'ok':'no');if(ok){MQ[qi]=1;fin()}}})});
 $('#v9dl').onclick=async()=>{if($('#lg').value!='python'){$('#lg').value='python';try{setLang()}catch{}}await initEd();for(let i=0;i<40&&!ed;i++)await new Promise(r=>setTimeout(r,250));if(ed){ed.setValue('# '+DAILY[Math.floor(Date.now()/864e5)%DAILY.length][0]+'\n');$('#ed').scrollIntoView({behavior:'smooth',block:'center'})}};
 $('#v9dc').onclick=async()=>{if(!ed)return;const d=DAILY[Math.floor(Date.now()/864e5)%DAILY.length],r=await execPy(ed.getValue()),m=$('#v9dm');if(r.err){m.textContent='Error: '+r.err;return}if(d[1].test(r.out)&&ed.getValue().split('\n').filter(l=>l.trim()&&!l.trim().startsWith('#')).length){const S=lab(),t=new Date().toISOString().slice(0,10);if(S.dd!=t){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.last==y?(S.streak||0)+1:1;S.last=t;S.dd=t;saveLab(S)}m.textContent='🎉 Aaj ka challenge pura! Streak: '+lab().streak;m.style.color='#059669';setTimeout(drawLab,1200)}else{m.textContent='Output abhi match nahi hua. Dobara try karein.'}}}
const MCQ={task:{},q:{}};
function fin(){const x=L[cur],q=MCQ.q[x.id]||{},n=Object.keys(q).length;const f=$('#v9fin');if(n==3&&MCQ.task[x.id]){const S=lab();if(!S.done.includes(x.id)){S.done.push(x.id);const t=new Date().toISOString().slice(0,10);if(S.dd!=t){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.last==y?(S.streak||0)+1:1;S.last=t;S.dd=t}saveLab(S)}if(f){f.textContent='✅ Sabaq mukammal! Agla sabaq khul gaya.';f.style.color='#059669'}setTimeout(()=>{if(cur<L.length-1)cur++;drawLab()},1400)}else if(f)f.textContent=`Task: ${MCQ.task[x.id]?'✔':'baqi'} · MCQ: ${n}/3 sahi`}
/* line-by-line tracer */
const EXPL=l=>{l=l.trim();if(/^print\(/.test(l))return'Screen par likh raha hai.';if(/^def /.test(l))return'Naya function (kaam ka packet) bana raha hai.';if(/^for /.test(l))return'Loop: agli value le kar dobara chal raha hai.';if(/^if |^elif /.test(l))return'Condition check ho rahi hai: sahi hui to neeche wali lines chalengi.';if(/^else/.test(l))return'Pehli condition galat thi, isliye else chal raha hai.';if(/^return /.test(l))return'Function nateeja wapas de raha hai.';if(/\.append\(/.test(l))return'List ke aakhir mein item add ho raha hai.';if(/^[A-Za-z_]\w*\s*[-+*/]?=/.test(l))return'Variable dabbay mein value rakh raha hai.';return'Ye line chal rahi hai.'};
const TRACE=`
import sys
def __run(src):
    _t=[]
    g={'__name__':'__main__'}
    def tr(fr,ev,arg):
        if fr.f_code.co_filename=='<lab>':
            if ev=='line' and len(_t)<400:
                _t.append((fr.f_lineno,{k:repr(v)[:40] for k,v in fr.f_locals.items() if not k.startswith('__') and not callable(v)}))
            return tr
        return None
    sys.settrace(tr)
    try:
        exec(compile(src,'<lab>','exec'),g)
    finally:
        sys.settrace(None)
    return _t
`;
let stepTimer,decos=[];
async function stepRun(x){if(!ed){await initEd();for(let i=0;i<40&&!ed;i++)await new Promise(r=>setTimeout(r,250))}if(!ed){say('Editor load nahi hua');return}if($('#lg').value!='python'){say('Line-by-line sirf Python mein hai.');return}
 const code=ed.getValue(),host=$('#v9tr');host.style.display='block';$('#v9ex').textContent='Python load ho raha hai…';
 try{await lz('py');py=py||await loadPyodide();py.runPython(TRACE);let out='';py.setStdout({batched:s=>out+=s+'\n'});py.setStderr({batched:s=>out+=s+'\n'});
  py.globals.set('__src',code);const tr=py.runPython('__run(__src)').toJs({create_pyproxies:false});
  $('#co').textContent=out||'(no output)';let i=0,prev={};clearInterval(stepTimer);const lines=code.split('\n');
  const go=()=>{if(i>=tr.length){clearInterval(stepTimer);ed.deltaDecorations(decos,[]);decos=[];$('#v9ex').textContent='✅ Program khatam.';return}
   const [ln,vars]=tr[i],vs=vars instanceof Map?Object.fromEntries(vars):vars;decos=ed.deltaDecorations(decos,[{range:new monaco.Range(ln,1,ln,1),options:{isWholeLine:true,className:'v9hl'}}]);ed.revealLineInCenter(ln);
   $('#v9ex').innerHTML=`<b>Line ${ln}:</b> <code>${esc((lines[ln-1]||'').trim())}</code><br>${esc(EXPL(lines[ln-1]||''))}`;
   $('#v9vars').innerHTML=Object.entries(vs).map(([k,v])=>`<div class="v9var ${prev[k]!=null&&prev[k]!=v?'ch':''}"><small>${esc(k)}</small><b>${esc(v)}</b></div>`).join('')||'<span class="mut">Abhi koi variable nahi</span>';prev=vs;i++};
  go();stepTimer=setInterval(go,900)}catch(e){$('#v9ex').textContent='Error: '+String(e.message||e).split('\n').slice(-3).join(' ')+' — pehle code theek karein ("Fix my error").'}}
/* mount lab */
function mountLab(){const c=$('#t-code');if(!c||$('#v9lab'))return;const card=document.createElement('div');card.className='card';card.id='v9lab';const cards=c.querySelectorAll(':scope>.card');const ref=cards[0];ref.parentNode.insertBefore(card,ref.nextSibling);drawLab()}
mountLab();const mo2=new MutationObserver(()=>{if(!$('#v9lab'))mountLab()});mo2.observe(document.body,{childList:true,subtree:true});
})();
