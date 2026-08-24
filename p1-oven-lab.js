(() => {
  'use strict';
  const pizzas={
    margherita:{id:'pizza-margherita',name:'Margherita',kicker:'Tomato · Fior di latte · Basil',description:'San Marzano, fior di latte, basil and extra-virgin olive oil.',price:'€12.50',media:()=>window.PizzeriaMedia?.pizzas?.margherita},
    diavola:{id:'pizza-diavola',name:'Diavola',kicker:'Spicy salami · Tomato · Mozzarella',description:'San Marzano, fior di latte, spianata piccante, oregano and chilli.',price:'€14.50',media:()=>window.PizzeriaMedia?.pizzas?.diavola},
    mortadella:{id:'pizza-mortadella',name:'Mortadella & Pistachio',kicker:'Mortadella · Pistachio · Stracciatella',description:'Fior di latte, mortadella, stracciatella, pistachio and lemon zest.',price:'€16.00',media:()=>window.PizzeriaMedia?.pizzas?.mortadella}
  };
  const STATES=['IDLE','PIZZA_SELECTED','PREPARING','APPROACH','PEEL_ENTER','CONTACT','MICRO_ADJUST','LOAD','EXTRACT','PRESENT','FOREGROUND_REVEAL','PRODUCT_READY'];
  let selected='margherita',running=false,timers=[];
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const peel=$('#peel'),peelPizza=$('#peel-pizza'),product=$('#foreground-product'),stage=$('.oven-stage'),premiumOven=$('#premium-oven');
  const setState=state=>{if(!STATES.includes(state))return;$('#status-label').textContent=state;$('#telemetry-state').textContent=state;document.body.dataset.ovenState=state};
  const schedule=(fn,ms)=>timers.push(setTimeout(fn,ms));
  const clearTimers=()=>{timers.forEach(clearTimeout);timers=[]};
  const pose=(transform,duration='.35s',ease='cubic-bezier(.22,.72,.28,1)')=>{peel.style.transition=`transform ${duration} ${ease},opacity .22s ease,filter .18s ease`;requestAnimationFrame(()=>{peel.style.transform=transform})};

  function initPremiumOven(){
    const uri=window.PremiumOvenMasterDataUri;
    const active=Boolean(uri&&uri.startsWith('data:image'));
    if(active){
      premiumOven.style.backgroundImage=`url(${uri})`;
      document.body.classList.add('has-premium-oven');
      $('#asset-label').textContent='OVEN MASTER';
      $('#telemetry-oven').textContent='premium-embedded';
    }else{
      document.body.classList.remove('has-premium-oven');
      $('#asset-label').textContent='OVEN FALLBACK';
      $('#telemetry-oven').textContent='fallback-css';
    }
  }

  function syncSelection(){
    const p=pizzas[selected],src=p.media();
    $$('.pizza-btn').forEach(b=>b.classList.toggle('active',b.dataset.pizza===selected));
    $('#telemetry-pizza').textContent=p.id;
    $('#telemetry-media').textContent=src?'registry:'+selected:'placeholder-missing';
    setState('PIZZA_SELECTED');
  }

  function reset(){
    clearTimers();running=false;
    stage.classList.remove('is-preparing','is-occluding','is-contacting','is-delivering','is-product-ready');
    peel.style.transition='none';peel.style.opacity='0';peel.style.filter='none';
    peel.style.transform='translate(60%,18%) rotate(-1.5deg) scale(.96)';
    peelPizza.style.transition='none';peelPizza.style.opacity='0';peelPizza.style.transform='scale(.94)';peelPizza.removeAttribute('src');
    product.style.transition='none';product.style.opacity='0';product.style.visibility='hidden';product.classList.remove('is-visible');
    setState('IDLE');
  }

  function prepareProduct(p,src){
    $('#foreground-image').src=src;$('#foreground-image').alt=p.name;
    $('#foreground-kicker').textContent=p.kicker;$('#foreground-name').textContent=p.name;
    $('#foreground-desc').textContent=p.description;$('#foreground-price').textContent=p.price;
  }

  function revealProduct(){
    product.style.visibility='visible';
    requestAnimationFrame(()=>{product.classList.add('is-visible');product.style.transition='opacity .42s ease';product.style.opacity='1'});
  }

  function play(){
    if(running)return;
    const p=pizzas[selected],src=p.media();if(!src)return;
    reset();running=true;prepareProduct(p,src);stage.classList.add('is-preparing');setState('PREPARING');

    schedule(()=>{
      setState('APPROACH');peel.style.opacity='1';
      pose('translate(28%,3%) rotate(-1deg) scale(.88)','.38s');
    },220);

    schedule(()=>{
      setState('PEEL_ENTER');
      pose('translate(2%,-14%) rotate(-.4deg) scale(.74)','.48s','cubic-bezier(.32,.04,.28,1)');
    },600);

    schedule(()=>{
      setState('CONTACT');stage.classList.add('is-contacting','is-occluding');
      peel.style.filter='brightness(.64) saturate(.82)';
      pose('translate(-12%,-20%) rotate(0deg) scale(.68)','.22s','cubic-bezier(.2,.72,.3,1)');
    },1080);

    schedule(()=>{
      setState('MICRO_ADJUST');
      pose('translate(-14%,-19%) rotate(.7deg) scale(.68)','.16s','cubic-bezier(.3,.1,.5,1)');
    },1300);

    schedule(()=>{
      setState('LOAD');
      peelPizza.src=src;peelPizza.alt=p.name;
      peelPizza.style.transition='opacity .14s ease,transform .24s cubic-bezier(.18,.78,.24,1)';
      peelPizza.style.opacity='1';peelPizza.style.transform='scale(.98)';
    },1450);

    schedule(()=>{
      stage.classList.remove('is-occluding');
      peel.style.filter='brightness(.82)';
      setState('EXTRACT');
      pose('translate(-5%,-15%) rotate(.15deg) scale(.72)','.28s','cubic-bezier(.12,.7,.22,1)');
    },1630);

    schedule(()=>{
      stage.classList.remove('is-contacting');peel.style.filter='none';
      pose('translate(17%,-2%) rotate(-.3deg) scale(.84)','.42s','cubic-bezier(.16,.72,.2,1)');
    },1910);

    schedule(()=>{
      pose('translate(36%,11%) rotate(-.8deg) scale(1.0)','.42s','cubic-bezier(.18,.72,.2,1)');
      peelPizza.style.transform='scale(1.03)';
    },2330);

    schedule(()=>{
      setState('PRESENT');stage.classList.add('is-delivering');
      pose('translate(42%,17%) rotate(-1deg) scale(1.04)','.18s','cubic-bezier(.2,.72,.28,1)');
    },2750);

    schedule(()=>{
      setState('FOREGROUND_REVEAL');
      revealProduct();
    },3100);

    schedule(()=>{
      peel.style.transition='transform .46s cubic-bezier(.25,.05,.5,1),opacity .38s ease';
      peel.style.transform='translate(42%,34%) rotate(-1.4deg) scale(1.02)';
      peel.style.opacity='0';
    },3260);

    schedule(()=>{
      setState('PRODUCT_READY');stage.classList.remove('is-preparing','is-delivering');stage.classList.add('is-product-ready');running=false;
    },3720);
  }

  $$('.pizza-btn').forEach(btn=>btn.addEventListener('click',()=>{if(running)return;selected=btn.dataset.pizza;syncSelection()}));
  $('#play').addEventListener('click',play);$('#reset').addEventListener('click',reset);
  $('#choose-another').addEventListener('click',()=>{product.classList.remove('is-visible');product.style.opacity='0';setTimeout(()=>{product.style.visibility='hidden';reset();syncSelection()},420)});
  initPremiumOven();
  syncSelection();
})();