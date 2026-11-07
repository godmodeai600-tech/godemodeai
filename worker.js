export default {
 async fetch(request){
  const cors = {
   "Access-Control-Allow-Origin":"*",
   "Access-Control-Allow-Methods":"POST,GET,OPTIONS",
   "Access-Control-Allow-Headers":"Content-Type"
  };
  if(request.method==="OPTIONS") return new Response("",{headers:cors});
  try{
   if(request.method==="POST"){
     const {query}=await request.json();
     const res=await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
     const data=await res.json();
     let answer=data.AbstractText||data.RelatedTopics?.[0]?.Text||`Live result for: ${query}`;
     return new Response(JSON.stringify({answer}),{headers:{...cors,"Content-Type":"application/json"}});
   }
   return new Response("GODMODE Worker Online",{headers:cors});
  }catch(e){
   return new Response(JSON.stringify({answer:"Online"}),{headers:cors});
  }
 }
}
