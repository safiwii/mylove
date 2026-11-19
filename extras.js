(()=>{
const HP='M50 90C18 66 6 48 6 32 6 18 17 9 30 9c8 0 16 4 20 11 4-7 12-11 20-11 13 0 24 9 24 23 0 16-12 34-44 58z';
const rnd=(a,b)=>a+Math.random()*(b-a);
const safe=f=>{try{f()}catch(e){console.warn('extras:',e)}};

/* ---------- стили ---------- */
safe(()=>{
const s=document.createElement('style');
s.textContent=`
@supports ((-webkit-background-clip:text) or (background-clip:text)){
.shine{background-image:linear-gradient(105deg,var(--b) 0%,var(--b) 42%,var(--g) 50%,var(--b) 58%,var(--b) 100%);background-size:300% 100%;background-position:100% 0;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;text-shadow:none;animation:glint 6.5s ease-in-out infinite}
}
@keyframes glint{0%{background-position:100% 0}30%,100%{background-position:0 0}}
.lock-title.shine{--b:#ff8fa3;--g:#fff2c4;filter:drop-shadow(0 0 12px rgba(255,143,163,.5))}
.paper-title.shine{--b:#7a1026;--g:#f2c14e;width:-webkit-fit-content;width:fit-content;margin:0 auto;animation-delay:2.4s}
.fin-txt.shine{--b:#f3d5b5;--g:#fffbe6}
.dcake{position:relative;margin:0 auto 4px;cursor:pointer;touch-action:manipulation}
.dcake canvas{position:absolute;pointer-events:none}
.c-flame{position:absolute;width:16px;height:27px;margin-left:-8px;border-radius:50% 50% 50% 50%/62% 62% 38% 38%;background:radial-gradient(ellipse at 50% 72%,#fff8d6 0,#ffd166 38%,#ff9f1c 72%,rgba(255,120,0,0) 100%);box-shadow:0 0 22px 9px rgba(255,170,60,.45);transform-origin:50% 100%;opacity:0;transition:opacity .7s;pointer-events:none}
.c-flame.lit{opacity:1;animation:cflick .17s ease-in-out infinite alternate}
.c-flame.out{opacity:0;transition:opacity .25s}
@keyframes cflick{from{transform:scale(1,1) rotate(-3deg)}to{transform:scale(.92,1.1) rotate(3deg)}}
.typewriter-final{text-shadow:none}
.fin-row{position:relative;display:table;margin:0 auto}
.fin-line{display:block;padding:.1em .15em;-webkit-clip-path:inset(0 100% 0 0);clip-path:inset(0 100% 0 0)}
.fin-txt{display:inline-block;filter:drop-shadow(0 0 10px rgba(255,143,163,.5))}
.fin-spark{position:absolute;top:52%;left:0;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:radial-gradient(circle,#fff 0,#ffe9a8 40%,rgba(255,200,90,0) 72%);box-shadow:0 0 14px 6px rgba(255,205,110,.65);opacity:0;pointer-events:none}
.fin-spark::before,.fin-spark::after{content:"";position:absolute;left:50%;top:50%;width:38px;height:2px;margin:-1px 0 0 -19px;background:linear-gradient(90deg,transparent,#fff,transparent)}
.fin-spark::after{transform:rotate(90deg)}
.shh{position:fixed;width:var(--s);height:var(--s);pointer-events:none;z-index:60;filter:drop-shadow(0 0 4px rgba(255,77,109,.8))}
.shh svg{display:block;width:100%;height:100%}
`;
document.head.appendChild(s);
});

/* ---------- золотой блик на заголовках ---------- */
safe(()=>document.querySelectorAll('.lock-title,.paper-title').forEach(e=>e.classList.add('shine')));

/* ---------- иконка-сердечко (запасной PNG для браузеров без SVG-иконок) ---------- */
safe(()=>{
const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');
x.scale(.64,.64);
const g=x.createLinearGradient(0,0,100,100);g.addColorStop(0,'#ff8fa3');g.addColorStop(1,'#c9184a');
x.fillStyle=g;x.fill(new Path2D(HP));
const l=document.createElement('link');l.rel='icon';l.type='image/png';l.href=c.toDataURL('image/png');
document.head.appendChild(l);
});

/* ---------- сердечки, когда фото стёрто ---------- */
const heartSVG='<svg viewBox="0 0 100 100"><path fill="currentColor" d="'+HP+'"/></svg>';
function heartsFrom(el){
  const r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
  for(let i=0;i<18;i++){
    const s=rnd(10,19),h=document.createElement('i');
    h.className='shh';
    h.style.cssText='--s:'+s+'px;left:'+(cx-s/2)+'px;top:'+(cy-s/2)+'px;color:'+(Math.random()<.35?'#ffb3c1':'#ff4d6d');
    h.innerHTML=heartSVG;document.body.appendChild(h);
    const a=-Math.PI/2+rnd(-1.5,1.5),d=rnd(60,150),dx=Math.cos(a)*d,dy=Math.sin(a)*d,rot=rnd(-40,40);
    const an=h.animate([
      {transform:'translate(0,0) scale(.2) rotate(0deg)',opacity:0},
      {transform:'translate('+dx*.6+'px,'+dy*.6+'px) scale(1) rotate('+rot+'deg)',opacity:1,offset:.25},
      {transform:'translate('+dx+'px,'+(dy+40)+'px) scale(.8) rotate('+rot*1.5+'deg)',opacity:0}
    ],{duration:rnd(1100,1800),delay:rnd(0,200),easing:'ease-out',fill:'both'});
    an.onfinish=()=>h.remove();
  }
  vib([15,30,15]);
}
safe(()=>document.querySelectorAll('.scratch-canvas').forEach(cv=>{
  let done=false;
  new MutationObserver(()=>{
    const gone=cv.style.opacity==='0';
    if(gone&&!done){done=true;safe(()=>heartsFrom(cv.closest('.polaroid-card')))}
    else if(!gone)done=false;
  }).observe(cv,{attributes:true,attributeFilter:['style']});
}));

/* ---------- торт из пылинок ---------- */
const slide=[...document.querySelectorAll('.slide')].pop(),box=slide&&slide.querySelector('.final-box');
const PX=24,PT=120,PB=14,ASM=4.7;
let W,H,S,U,dpr,cv,ctx,wrap,flame,star,soft;
let N=0,tx,ty,dx,fall,delay,dur,sz,ph,spd,skip,groups=[],spk=[],fx=[];
let t0=0,last=0,slow=0,cut=false,lit=false,blown=false,pulse=0,runId=0;

function mkStar(n){
  const c=document.createElement('canvas');c.width=c.height=n;const x=c.getContext('2d'),m=n/2;
  const g=x.createRadialGradient(m,m,0,m,m,m);
  g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.22,'rgba(255,226,150,.6)');g.addColorStop(1,'rgba(255,200,100,0)');
  x.fillStyle=g;x.fillRect(0,0,n,n);
  x.strokeStyle='rgba(255,248,220,.95)';x.lineWidth=1.3;x.beginPath();
  x.moveTo(m,1);x.lineTo(m,n-1);x.moveTo(1,m);x.lineTo(n-1,m);x.stroke();
  return c;
}
function mkSoft(n){
  const c=document.createElement('canvas');c.width=c.height=n;const x=c.getContext('2d'),m=n/2;
  const g=x.createRadialGradient(m,m,0,m,m,m);
  g.addColorStop(0,'rgba(255,224,150,.55)');g.addColorStop(1,'rgba(255,200,100,0)');
  x.fillStyle=g;x.fillRect(0,0,n,n);return c;
}

/* форма торта рисуется на невидимом холсте (в условных 200×220), из неё берутся точки */
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function shape(c,s){
  c.scale(s,s);
  const GOLD='#f6cf7d',GL='#ffe6a6';
  c.strokeStyle=GOLD;c.lineWidth=2.4;
  c.beginPath();c.ellipse(100,204,92,9,0,0,Math.PI*2);c.stroke();          /* тарелка */
  const tier=(x,y,w,h,r,c1,c2,drips)=>{
    const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,c1);g.addColorStop(1,c2);
    c.fillStyle=g;rr(c,x,y,w,h,r);c.fill();                                  /* малиново-бордовое тело */
    c.save();rr(c,x,y,w,h,r);c.clip();c.fillStyle=GL;c.fillRect(x,y,w,12);   /* золотая глазурь с потёками */
    drips.forEach((px,i)=>{c.beginPath();c.arc(px,y+12,i%2?5:6.5,0,7);c.fill()});
    c.restore();
    rr(c,x,y,w,h,r);c.stroke();                                              /* золотой контур */
  };
  tier(20,132,160,66,9,'#e8305f','#a4133c',[32,55,78,101,124,147,168]);
  tier(48,86,104,46,8,'#f23a68','#b8174a',[62,82,102,122,140]);
  c.fillStyle=GL;for(let x=36;x<=164;x+=16){c.beginPath();c.arc(x,176,2.8,0,7);c.fill()}  /* жемчужинки */
  c.fillStyle='#fff1c9';rr(c,96,48,8,40,2);c.fill();                          /* свеча */
}

function setup(){
  W=Math.round(Math.min(270,innerWidth*.72,innerHeight*.34));H=Math.round(W*1.1);
  S=W/200;U=Math.max(.85,W/270);dpr=Math.min(window.devicePixelRatio||1,2);
  const tmp=document.createElement('div');
  tmp.innerHTML='<div class="dcake"><canvas></canvas><i class="c-flame"></i></div><div class="typewriter-final" id="final-handwriting"></div><div class="wish" id="wish"></div>';
  wrap=tmp.firstChild;cv=wrap.firstChild;flame=wrap.lastChild;
  wrap.style.width=W+'px';wrap.style.height=H+'px';
  cv.width=Math.round((W+2*PX)*dpr);cv.height=Math.round((H+PT+PB)*dpr);
  cv.style.cssText='left:'+(-PX)+'px;top:'+(-PT)+'px;width:'+(W+2*PX)+'px;height:'+(H+PT+PB)+'px';
  flame.style.left=(100*S)+'px';flame.style.top=(48*S-27)+'px';
  ctx=cv.getContext('2d');star=mkStar(32);soft=mkSoft(64);
  wrap.addEventListener('click',blow);
  box.textContent='';while(tmp.firstChild)box.appendChild(tmp.firstChild);
}

/* несколько тысяч точек; число подстраивается под телефон */
function build(){
  const o=document.createElement('canvas');o.width=W;o.height=H;
  const c=o.getContext('2d',{willReadFrequently:true});shape(c,S);
  const d=c.getImageData(0,0,W,H).data,body=[],gold=[];
  for(let i=0;i<d.length;i+=4){if(d[i+3]<110)continue;(d[i+1]>105?gold:body).push(i)}
  const cores=navigator.hardwareConcurrency||4,mem=navigator.deviceMemory||4;
  const q=.5+.5*Math.min(1,cores/6,mem/4);
  const n=Math.max(1500,Math.round(Math.min(4200,W*H/16)*q));
  const nG=Math.min(gold.length,Math.round(n*.42)),nB=Math.min(body.length,n-nG);
  N=nG+nB;
  tx=new Float32Array(N);ty=new Float32Array(N);dx=new Float32Array(N);fall=new Float32Array(N);
  delay=new Float32Array(N);dur=new Float32Array(N);sz=new Float32Array(N);ph=new Float32Array(N);
  spd=new Float32Array(N);skip=new Uint8Array(N);
  groups=[];spk=[];fx=[];slow=0;cut=false;
  const map=new Map(),y0=H*.2,y1=H*.97;
  const add=(arr,cnt,base,sp)=>{
    for(let j=0;j<cnt;j++){
      const i=arr[(Math.random()*arr.length)|0],p=i>>2,k=base+j;
      tx[k]=p%W+Math.random();ty[k]=((p/W)|0)+Math.random();
      const r=d[i]>>4,g=d[i+1]>>4,b=d[i+2]>>4,key=r<<8|g<<4|b;
      let G=map.get(key);
      if(!G){G={s:'rgb('+(r*16+8)+','+(g*16+8)+','+(b*16+8)+')',ids:[]};map.set(key,G);groups.push(G)}
      G.ids.push(k);
      delay[k]=Math.max(0,(1-(ty[k]-y0)/(y1-y0))*2.9+rnd(0,.4));   /* нижние оседают первыми */
      dur[k]=rnd(.9,1.4);dx[k]=rnd(-14,14);fall[k]=rnd(50,150);
      sz[k]=rnd(1.4,2.3)*U;ph[k]=rnd(0,6.28);spd[k]=rnd(1.5,4.5);
      if(sp&&Math.random()<.035)spk.push(k);
    }
  };
  add(gold,nG,0,true);add(body,nB,nG,false);
}

function frame(now){
  requestAnimationFrame(frame);
  if(!N||document.hidden||!slide.classList.contains('active')){last=now;return}
  const dts=Math.min(.05,(now-last)/1000||.016);last=now;
  const t=(now-t0)/1000;
  /* если телефон тормозит — один раз убираем треть точек */
  if(t>0&&t<4.5&&dts>.036&&!cut&&++slow>14){cut=true;for(let i=0;i<N;i++)if(Math.random()<.35)skip[i]=1}
  ctx.setTransform(dpr,0,0,dpr,PX*dpr,PT*dpr);
  ctx.clearRect(-PX,-PT,W+2*PX,H+PT+PB);
  ctx.globalCompositeOperation='lighter';   /* где пылинок много — свет складывается */
  const pm=1+pulse*.5;
  for(const G of groups){
    ctx.fillStyle=G.s;const ids=G.ids;
    for(let j=0;j<ids.length;j++){
      const i=ids[j];if(skip[i])continue;
      const k=(t-delay[i])/dur[i];if(k<=0)continue;
      const s=sz[i];let x,y,a,h=s;
      if(k<1){const e=1-(1-k)*(1-k)*(1-k);x=tx[i]+dx[i]*(1-e);y=ty[i]-fall[i]*(1-e);a=Math.min(1,k*5)*.85;h=s+(1-e)*fall[i]*.15}
      else{x=tx[i];y=ty[i];a=(.62+.34*Math.sin(t*spd[i]+ph[i]))*pm}
      ctx.globalAlpha=a>1?1:a;
      ctx.fillRect(x-s/2,y+s/2-h,s,h);
    }
  }
  for(const i of spk){   /* вспыхивающие искорки */
    if(skip[i]||t<delay[i]+dur[i])continue;
    const a=Math.pow(Math.max(0,Math.sin(t*spd[i]*.7+ph[i])),6);if(a<.04)continue;
    ctx.globalAlpha=a;const r=(6+a*8)*U;ctx.drawImage(star,tx[i]-r,ty[i]-r,r*2,r*2);
  }
  for(let j=fx.length-1;j>=0;j--){   /* дымок и звёздочки после задувания */
    const f=fx[j];f.age+=dts;if(f.age<0)continue;
    const u=f.age/f.life;if(u>=1){fx.splice(j,1);continue}
    f.x+=f.vx*dts;f.y+=f.vy*dts;
    if(f.star){f.vy+=80*dts;ctx.globalAlpha=(1-u)*(.65+.35*Math.sin(f.age*28+f.ph));const r=(7+6*(1-u))*U*f.s;ctx.drawImage(star,f.x-r,f.y-r,r*2,r*2)}
    else{f.vx+=Math.sin(f.age*3+f.ph)*14*dts;ctx.globalAlpha=.34*(1-u)*Math.min(1,u*8);const r=(8+u*28)*U;ctx.drawImage(soft,f.x-r,f.y-r,r*2,r*2)}
  }
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
  if(pulse>0)pulse=pulse<.02?0:pulse*.94;
  if(!lit&&t>ASM){lit=true;flame.classList.add('lit');revealText(runId)}   /* торт собран → огонёк и надпись */
}

/* надпись проявляется золотым блеском с бегущей искоркой */
function revealText(id){
  const el=$('final-handwriting');el.textContent='';
  const rows=[['Happy birthday to U.',2200],['My T.',1100]].map((r,n)=>{
    const row=document.createElement('div');row.className='fin-row';
    row.innerHTML='<div class="fin-line"><span class="fin-txt shine"></span></div><i class="fin-spark"></i>';
    const t=row.querySelector('.fin-txt');t.textContent=r[0];t.style.animationDelay=(3+n*1.1)+'s';
    el.appendChild(row);return [row,r[1]];
  });
  const run=n=>{
    if(id!==runId)return;
    if(n>=rows.length){burstHearts();$('wish').classList.add('show');return}
    const row=rows[n][0],ms=rows[n][1],ln=row.firstChild,sp=row.lastChild,t1=performance.now();
    vib(15);
    (function step(now){
      if(id!==runId)return;
      const k=Math.min(1,(now-t1)/ms),e=1-Math.pow(1-k,2.2),cp='inset(0 '+(100-e*100)+'% 0 0)';
      ln.style.clipPath=cp;ln.style.webkitClipPath=cp;
      sp.style.left=(e*100)+'%';sp.style.opacity=k<1?1:0;
      if(k<1)requestAnimationFrame(step);
      else{ln.style.clipPath='none';ln.style.webkitClipPath='none';setTimeout(()=>run(n+1),250)}
    })(t1);
  };
  run(0);
}

/* задуть свечу: огонёк гаснет, поднимается дымок, разлетаются звёздочки */
function blow(){
  if(!lit||blown)return;blown=true;
  flame.classList.remove('lit');flame.classList.add('out');
  vib([30,40,80]);pulse=1;
  const ox=100*S,oy=48*S-10;
  for(let i=0;i<30;i++)fx.push({x:ox+rnd(-3,3),y:oy-rnd(0,10),vx:rnd(-7,7),vy:-rnd(26,58),life:rnd(1.8,2.8),age:-rnd(0,.8),ph:rnd(0,6.28)});
  for(let i=0;i<30;i++){const a=rnd(0,6.28),v=rnd(70,200);fx.push({star:1,s:rnd(.7,1.4),x:ox,y:oy,vx:Math.cos(a)*v,vy:Math.sin(a)*v-40,life:rnd(1,1.9),age:-rnd(0,.15),ph:rnd(0,6.28)})}
  burstHearts();spawnPetals(40);
  const w=$('wish');w.textContent='Пусть всё сбудется ❤';w.classList.add('show');
}

safe(()=>{
  if(!box)return;
  setup();
  window.blowCandle=blow;
  window.startFinal=function(){
    if(finalTyped)return;finalTyped=true;
    runId++;lit=blown=false;pulse=0;flame.className='c-flame';
    const w=$('wish');w.textContent='Загадай желание и задуй свечу ✨';w.classList.remove('show');
    $('final-handwriting').textContent='';
    build();t0=performance.now()+300;spawnPetals(30);
  };
  requestAnimationFrame(frame);
});
})();
