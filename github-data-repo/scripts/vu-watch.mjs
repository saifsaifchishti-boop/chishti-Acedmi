// Checks official VU pages and records new links/headlines in updates.json
import fs from 'fs';
const SRC=['https://www.vu.edu.pk/'];let old=[];try{old=JSON.parse(fs.readFileSync('updates.json','utf8'))}catch{}
const seen=new Set(old.map(x=>x.u+'|'+x.t)),add=[];
for(const s of SRC){try{const h=await(await fetch(s,{headers:{'user-agent':'Mozilla/5.0'}})).text();
for(const m of h.matchAll(/<a[^>]+href="([^"#]+)"[^>]*>([^<]{12,140})<\/a>/gi)){const t=m[2].replace(/\s+/g,' ').trim(),u=new URL(m[1],s).href;
if(!/admission|date ?sheet|result|schedule|notice|fee|announce|exam|quiz|gdb|assignment|semester|last date/i.test(t))continue;
if(!seen.has(u+'|'+t)){seen.add(u+'|'+t);add.push({t,u,d:new Date().toISOString()})}}}catch(e){console.log('skip',s,e.message)}}
if(add.length){fs.writeFileSync('updates.json',JSON.stringify([...add,...old].slice(0,60),null,1));console.log('new:',add.length)}
