(function(){
  'use strict';
  const cfg=window.WISHES_CONFIG||{};
  const status=document.getElementById('status'), list=document.getElementById('wishes'), form=document.getElementById('wishForm'), btn=document.getElementById('submitWish');
  const ready=/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(cfg.url||'') && cfg.anonKey && !cfg.anonKey.startsWith('YOUR_');
  if(!ready){status.textContent='Wishes are being set up. Please check back soon.';list.textContent='Wishes are not available yet.';btn.disabled=true;return;}
  const endpoint=cfg.url.replace(/\/$/,'')+'/rest/v1/wedding_wishes';
  const headers={'apikey':cfg.anonKey,'Authorization':'Bearer '+cfg.anonKey};
  async function request(url,opts={}){
    const response=await fetch(url,{...opts,headers:{...headers,...opts.headers},cache:'no-store'});
    if(!response.ok)throw Error('Request failed');
    return response.status===204?[]:response.json();
  }
  function render(items){
    list.replaceChildren();
    if(!items.length){const p=document.createElement('p');p.textContent='Be the first to leave a wish!';list.append(p);return;}
    for(const item of items){
      const card=document.createElement('article');card.className='wish';
      const name=document.createElement('strong');name.textContent=item.guest_name;
      const time=document.createElement('time');time.dateTime=item.created_at;time.textContent=new Date(item.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
      const msg=document.createElement('p');msg.textContent=item.message;
      card.append(name,time,msg);list.append(card);
    }
  }
  async function load(){
    try{render(await request(endpoint+'?select=guest_name,message,created_at&order=created_at.desc&limit=100'));}
    catch(e){list.textContent='Could not load wishes right now. Please try again later.';}
  }
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    if(document.getElementById('website').value)return;
    const name=document.getElementById('guestName').value.trim(), message=document.getElementById('guestMessage').value.trim();
    if(!name||!message||name.length>60||message.length>500){status.textContent='Please enter your name and a wish (up to 500 characters).';return;}
    btn.disabled=true;status.textContent='Sending your wish...';
    try{
      await request(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify({guest_name:name,message})});
      form.reset();status.textContent='Your wish was sent! ♡';await load();
    }catch(err){status.textContent='Could not send your wish. Please try again later.';}
    finally{btn.disabled=false;}
  });
  load();
})();