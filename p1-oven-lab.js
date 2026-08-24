(() => {
  'use strict';
  const pizzas={
    margherita:{id:'pizza-margherita',name:'Margherita',kicker:'Tomato · Fior di latte · Basil',description:'San Marzano, fior di latte, basil and extra-virgin olive oil.',price:'€12.50',media:()=>window.PizzeriaMedia?.pizzas?.margherita},
    diavola:{id:'pizza-diavola',name:'Diavola',kicker:'Spicy salami · Tomato · Mozzarella',description:'San Marzano, fior di latte, spianata piccante, oregano and chilli.',price:'€14.50',media:()=>window.PizzeriaMedia?.pizzas?.diavola},
    mortadella:{id:'pizza-mortadella',name:'Mortadella & Pistachio',kicker:'Mortadella · Pistachio · Stracciatella',description:'Fior di latte, mortadella, stracciatella, pistachio and lemon zest.',price:'€16.00',media:()=>window.PizzeriaMedia?.pizzas?.mortadella}
  };
  const STATES=['IDLE','PIZZA_SELECTED','PREPARING','PEEL_ENTER','OCCLUSION','PIZZA_RESOLVED','PEEL_EXIT','DELIVERY','FOREGROUND_REVEAL','PRODUCT_READY'];
  let selected='margherita',running=false,timers=[];
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const peel=$('#peel'),peelPizza=$('#peel-pizza'),product=$('#foreground-product'),stage=$('.oven-stage');
  const setState=state=>{if(!STATES.includes(state))return;$('#status-label').textContent=state;$('#telemetry-state').textContent=state;document.body.dataset.ovenState=state};
  const schedule=(fn,ms)=>timers.push(setTimeout(fn,ms));
  const clearTimers=()=>{timers.forEach(clearTimeout);timers=[]};
  const setPeelPose=(transform,transition)=>{peel.style.transition=transition||'none';requestAnimationFrame(()=>{peel.style.transform=transform})};
  function syncSelection(){const p=pizzas[selected],src=p.media();$$('.pizza-btn').forEach(b=>b.classList.toggle('active',b.dataset.pizza===selected));$('#telemetry-pizza').textContent=p.id;$('#telemetry-media').textContent=src?'registry:'+selected:'placeholder-missing';setState('PIZZA_SELECTED')}
  function reset(){clearTimers();running=false;stage.classList.remove('is-preparing','is-occluding','is-delivering','is-product-ready');peel.classList.remove('is-delivery');peel.style.transition='none';peel.style.opacity='0';peel.style.filter='none';peel.style.transform='translate(58%,34%) rotate(-9deg) scale(1.18)';peelPizza.style.transition='none';peelPizza.style.opacity='0';peelPizza.style.transform='scale(.82)';peelPizza.removeAttribute('src');product.style.transition='none';product.style.opacity='0';product.style.visibility='hidden';product.classList.remove('is-visible');setState('IDLE')}
  function prepareProduct(p,src){$('#foreground-image').src=src;$('#foreground-image').alt=p.name;$('#foreground-kicker').textContent=p.kicker;$('#foreground-name').textContent=p.name;$('#foreground-desc').textContent=p.description;$('#foreground-price').textContent=p.price}
  function revealProduct(){product.style.visibility='visible';requestAnimationFrame(()=>{product.classList.add('is-visible');product.style.transition='opacity .55s cubic-bezier(.2,.8,.2,1)';product.style.opacity='1'})}
  function play(){
    if(running)return;
    const p=pizzas[selected],src=p.media();if(!src)return;
    reset();running=true;prepareProduct(p,src);stage.classList.add('is-preparing');setState('PREPARING');

    schedule(()=>{
      setState('PEEL_ENTER');
      peel.style.opacity='1';
      setPeelPose('translate(14%,-18%) rotate(-5deg) scale(.86)','transform .42s cubic-bezier(.22,.72,.28,1),opacity .2s ease');
    },250);

    schedule(()=>{
      setPeelPose('translate(-13%,-78%) rotate(-1.5deg) scale(.58)','transform .58s cubic-bezier(.35,.02,.28,1)');
    },670);

    schedule(()=>{
      setState('OCCLUSION');stage.classList.add('is-occluding');
      setPeelPose('translate(-18%,-91%) rotate(-.5deg) scale(.54)','transform .22s cubic-bezier(.25,.8,.35,1)');
      peel.style.filter='brightness(.56) blur(1px)';
    },1230);

    schedule(()=>{
      setState('PIZZA_RESOLVED');peelPizza.src=src;peelPizza.alt=p.name;peelPizza.style.transition='opacity .16s ease,transform .36s cubic-bezier(.16,.84,.32,1)';peelPizza.style.opacity='1';peelPizza.style.transform='scale(.9)';
    },1460);

    schedule(()=>{
      setState('PEEL_EXIT');stage.classList.remove('is-occluding');peel.style.filter='none';
      setPeelPose('translate(-10%,-40%) rotate(-2deg) scale(.7)','transform .38s cubic-bezier(.18,.72,.22,1)');
    },1660);

    schedule(()=>{
      setPeelPose('translate(-2%,5%) rotate(-3deg) scale(.98)','transform .48s cubic-bezier(.14,.72,.18,1)');
      peelPizza.style.transform='scale(1)';
    },2040);

    schedule(()=>{
      setState('DELIVERY');stage.classList.add('is-delivering');peel.classList.add('is-delivery');
      setPeelPose('translate(-3%,22%) rotate(-3.5deg) scale(1.12)','transform .36s cubic-bezier(.18,.7,.2,1)');
      peelPizza.style.transform='translateY(-5%) scale(1.08)';
    },2490);

    schedule(()=>{
      setState('FOREGROUND_REVEAL');
      revealProduct();
      peel.style.transition='transform .5s cubic-bezier(.3,.02,.55,1),opacity .36s ease';
      peel.style.transform='translate(-2%,58%) rotate(-4deg) scale(1.08)';
      peel.style.opacity='0';
    },2830);

    schedule(()=>{setState('PRODUCT_READY');stage.classList.remove('is-preparing','is-delivering');stage.classList.add('is-product-ready');running=false},3380);
  }
  $$('.pizza-btn').forEach(btn=>btn.addEventListener('click',()=>{if(running)return;selected=btn.dataset.pizza;syncSelection()}));
  $('#play').addEventListener('click',play);$('#reset').addEventListener('click',reset);$('#choose-another').addEventListener('click',()=>{product.classList.remove('is-visible');product.style.opacity='0';setTimeout(()=>{product.style.visibility='hidden';reset();syncSelection()},420)});syncSelection();
})();