// AI fallback: servers parallel (3-3 ke batch) mein try hote hain, pehla jawab jeetta hai
const J=d=>d.reply,P=d=>d.result,Q=d=>d.data?.response;
const A=[
{n:'JerryCoder GPT',u:'https://jerrycoder.oggyapi.workers.dev/ai/gpt',x:J},
{n:'JerryCoder GPT4',u:'https://jerrycoder.oggyapi.workers.dev/ai/gpt4',x:d=>d.reply?.message},
{n:'JerryCoder Gemini',u:'https://jerrycoder.oggyapi.workers.dev/ai/gemini',x:J},
{n:'PrinceTech AI',u:'https://api.princetechn.com/api/ai/ai',x:P},
{n:'PrinceTech Chat',u:'https://api.princetechn.com/api/ai/chat',x:P},
{n:'PrinceTech Mistral',u:'https://api.princetechn.com/api/ai/mistral',x:P},
{n:'PrinceTech DeepSeek',u:'https://api.princetechn.com/api/ai/deepseek-v3',x:P},
{n:'Mistral Qasim',u:'https://mistral.gtech-apiz.workers.dev/',x:Q},
{n:'Llama Qasim',u:'https://llama.gtech-apiz.workers.dev/',x:d=>d.data?.response||d.data?.choices?.[0]?.message?.content},
{n:'Mistral StackToy',u:'https://mistral.stacktoy.workers.dev/',x:Q}];
const PARAMS=['q','prompt','text','message','query','content'],good={};
async function hit(a,p,q){const c=new AbortController(),t=setTimeout(()=>c.abort(),8000);
try{const r=await fetch(a.u+(a.u.includes('?')?'&':'?')+p+'='+encodeURIComponent(q),{signal:c.signal});
const x=a.x(await r.json());return typeof x==='string'&&x.trim().length>1?x.trim():null}catch{return null}finally{clearTimeout(t)}}
module.exports=async(req,res)=>{
if(req.method!=='POST')return res.status(405).json({error:'POST only'});
let q=String(req.body?.prompt||'');if(!q)return res.status(400).json({error:'Empty prompt'});
while(encodeURIComponent(q).length>7000)q=q.slice(0,(q.length*0.85)|0);
const tryApi=a=>Promise.any((good[a.n]?[good[a.n]]:PARAMS).map(async p=>{const x=await hit(a,p,q);if(!x)throw 0;good[a.n]=p;return{reply:x,via:a.n}}));
for(let i=0;i<A.length;i+=3){try{return res.json(await Promise.any(A.slice(i,i+3).map(tryApi)))}catch{}}
res.status(502).json({error:'All AI servers are busy. Please try again in a minute.'})};
