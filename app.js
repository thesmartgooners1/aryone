const API='https://socnetv.com/api/live';
const DEFAULT_FALLBACK='https://www.thesmartgooners.online/dancevideo.mp4';
const settings=JSON.parse(localStorage.getItem('aryoneSettings')||localStorage.getItem('y2Settings')||'{}');
const FALLBACK_VIDEO=settings.fallbackUrl||DEFAULT_FALLBACK;
const AUTO_REFRESH=settings.autoRefresh!==false;
const REFRESH_INTERVAL=Math.max(15,Number(settings.refreshInterval)||30)*1000;
const AUTOPLAY=settings.autoplay!==false;
if(settings.accent)document.documentElement.style.setProperty('--blue',settings.accent);
const state={matches:[],filter:'all',activeMatchId:null,activeUrl:null};
const list=document.querySelector('#matches'),updated=document.querySelector('#updated'),count=document.querySelector('#count'),toast=document.querySelector('#toast'),refresh=document.querySelector('#refresh'),modal=document.querySelector('#playerModal'),video=document.querySelector('#videoPlayer'),playerTitle=document.querySelector('#playerTitle'),streamStatus=document.querySelector('#streamStatus'),videoLoading=document.querySelector('#videoLoading');
let hls=null;
const safe=value=>String(value??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const logo=(url,name)=>url?`<img class="logo" src="${safe(url)}" alt="" loading="lazy" onerror="this.outerHTML='<span class=logo-fallback>⚽</span>'">`:`<span class="logo-fallback">${safe(name?.[0]||'⚽')}</span>`;

function findStream(streams){
  for(const item of streams||[]){
    if(typeof item==='string'&&/^https?:\/\//i.test(item))return item;
    if(item&&typeof item==='object')for(const key of['url','link','stream','stream_url','m3u8','file','src']){
      if(typeof item[key]==='string'&&/^https?:\/\//i.test(item[key]))return item[key];
    }
  }
  return'';
}

function parse(data){return(Array.isArray(data)?data:[]).map(match=>{const live=Boolean(Number(match.isLive));return{id:String(match.id),league:match.league_name||'Football',home:match.home_name||'Home',away:match.away_name||'Away',homeLogo:match.home_image||'',awayLogo:match.away_image||'',homeScore:match.home_score??'–',awayScore:match.away_score??'–',live,time:live?'LIVE':new Date(match.date_time).toLocaleString([], {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}),stream:findStream(match.livelink)}})}
function visible(){return state.filter==='live'?state.matches.filter(m=>m.live):state.filter==='upcoming'?state.matches.filter(m=>!m.live):state.matches}
function render(){const games=visible();count.textContent=games.length;if(!games.length){list.innerHTML='<div class="empty"><b>ပွဲစဉ်မရှိသေးပါ</b>အခြား filter ကိုရွေးပါ သို့မဟုတ် Refresh နှိပ်ပါ။</div>';return}list.innerHTML=games.map(m=>`<article class="match" data-match-id="${safe(m.id)}"><div class="league"><span class="trophy">🏆</span><span>${safe(m.league)}</span><button class="bell" data-id="${safe(m.id)}">♧</button><span class="match-time ${m.live?'live':''}">${safe(m.time)}</span></div><div class="team">${logo(m.homeLogo,m.home)}<span>${safe(m.home)}</span><b class="score">${safe(m.homeScore)}</b></div><div class="team">${logo(m.awayLogo,m.away)}<span>${safe(m.away)}</span><b class="score">${safe(m.awayScore)}</b></div></article>`).join('')}
function say(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}

function playSource(url,isFallback=false){
  if(!url||state.activeUrl===url)return;
  state.activeUrl=url;videoLoading.classList.remove('hide');
  if(hls){hls.destroy();hls=null}video.pause();video.removeAttribute('src');video.load();
  video.autoplay=AUTOPLAY;
  if(url.toLowerCase().includes('.m3u8')){
    if(window.Hls&&Hls.isSupported()){
      hls=new Hls({enableWorker:true,lowLatencyMode:true});hls.loadSource(url);hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,()=>{if(AUTOPLAY)video.play().catch(()=>{})});
      hls.on(Hls.Events.ERROR,(_,data)=>{if(data.fatal&&url!==FALLBACK_VIDEO){state.activeUrl=null;playSource(FALLBACK_VIDEO,true)}});
    }else if(video.canPlayType('application/vnd.apple.mpegurl')){video.src=url;if(AUTOPLAY)video.play().catch(()=>{})}
    else{state.activeUrl=null;playSource(FALLBACK_VIDEO,true);return}
  }else{video.src=url;if(AUTOPLAY)video.play().catch(()=>{})}
  streamStatus.textContent=isFallback?'Live URL မရှိသေးပါ—fallback video ပြနေပါသည်။ URL ရလာလျှင် အလိုအလျောက်ပြောင်းပါမည်။':'API live stream ကို ချိတ်ဆက်ထားပါသည်။';
}

function openPlayer(match){state.activeMatchId=match.id;state.activeUrl=null;playerTitle.textContent=`${match.home} vs ${match.away}`;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';playSource(match.stream||FALLBACK_VIDEO,!match.stream)}
function closePlayer(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';state.activeMatchId=null;state.activeUrl=null;if(hls){hls.destroy();hls=null}video.pause();video.removeAttribute('src');video.load()}

async function load(manual=false){
  refresh.disabled=true;if(manual)updated.textContent='Update လုပ်နေပါသည်…';
  try{const response=await fetch(`${API}?_=${Date.now()}`,{cache:'no-store'});if(!response.ok)throw Error('API error');state.matches=parse(await response.json());render();updated.textContent=`နောက်ဆုံး update • ${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`;if(state.activeMatchId){const match=state.matches.find(item=>item.id===state.activeMatchId);if(match){const next=match.stream||FALLBACK_VIDEO;if(next!==state.activeUrl)playSource(next,!match.stream)}}if(manual)say('Live scores update လုပ်ပြီးပါပြီ')}
  catch(error){list.innerHTML='<div class="empty"><b>Live data ယာယီမရနိုင်ပါ</b>Internet connection စစ်ပြီး Refresh ပြန်နှိပ်ပါ။</div>';updated.textContent='Connection error';count.textContent='0'}finally{refresh.disabled=false}
}

video.addEventListener('playing',()=>videoLoading.classList.add('hide'));video.addEventListener('waiting',()=>videoLoading.classList.remove('hide'));
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelector('.tab.active').classList.remove('active');b.classList.add('active');state.filter=b.dataset.filter;render()});
document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>{document.querySelector('.nav.active').classList.remove('active');b.classList.add('active');say(b.textContent.trim())});
list.onclick=e=>{const bell=e.target.closest('.bell');if(bell){bell.classList.toggle('on');bell.textContent=bell.classList.contains('on')?'🔔':'♧';say(bell.classList.contains('on')?'ပွဲသတိပေးမှု ဖွင့်ထားပါပြီ':'ပွဲသတိပေးမှု ပိတ်ထားပါပြီ');return}const card=e.target.closest('.match');if(card){const match=state.matches.find(item=>item.id===card.dataset.matchId);if(match)openPlayer(match)}};
document.querySelector('#closePlayer').onclick=closePlayer;modal.onclick=e=>{if(e.target===modal)closePlayer()};document.addEventListener('keydown',e=>{if(e.key==='Escape')closePlayer()});refresh.onclick=()=>load(true);
load();if(AUTO_REFRESH)setInterval(load,REFRESH_INTERVAL);
