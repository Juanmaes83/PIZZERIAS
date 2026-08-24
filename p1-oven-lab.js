(() => {
  'use strict';
  const pizzas={
    margherita:{id:'pizza-margherita',name:'Margherita',kicker:'Tomato · Fior di latte · Basil',description:'San Marzano, fior di latte, basil and extra-virgin olive oil.',price:'€12.50',media:()=>window.PizzeriaMedia?.pizzas?.margherita},
    diavola:{id:'pizza-diavola',name:'Diavola',kicker:'Spicy salami · Tomato · Mozzarella',description:'San Marzano, fior di latte, spianata piccante, oregano and chilli.',price:'€14.50',media:()=>window.PizzeriaMedia?.pizzas?.diavola},
    mortadella:{id:'pizza-mortadella',name:'Mortadella & Pistachio',kicker:'Mortadella · Pistachio · Stracciatella',description:'Fior di latte, mortadella, stracciatella, pistachio and lemon zest.',price:'€16.00',media:()=>window.PizzeriaMedia?.pizzas?.mortadella}
  };
  const STATES=['IDLE','PIZZA_SELECTED','PREPARING','PEEL_ENTER','OCCLUSION','PIZZA_RESOLVED','PEEL_EXIT','FOREGROUND_REVEAL','PRODUCT_READY'];
  let selected='margherita',running=false,timers=[];
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const peel=$('#peel'),peelPizza=$('#peel-pizza'),product=$('#foreground-product');
  const setState=state=>{if(!STATES.includes(state))return;$('#status-label').textContent=state;$('#telemetry-state').textContent=state;document.body.dataset.ovenState=state};
  const schedule=(fn,ms)=>timers.push(setTimeout(fn,ms));
  const clearTimers=()=>{timers.forEach(clearTimeout);timers=[]};
  function syncSelection(){const p=pizzas[selected],src=p.media();$$('.pizza-btn').forEach(b=>b.classList.toggle('active',b.dataset.pizza===selected));$('#telemetry-pizza').textContent=p.id;$('#telemetry-media').textContent=src?'registry:'+selected:'placeholder-missing';setState('PIZZA_SELECTED')}
  function reset(){clearTimers();running=false;peel.style.transition='none';peel.style.opacity='0';peel.style.transform='translate(42%,28%) rotate(-8deg) scale(.72)';peelPizza.style.opacity='0';peelPizza.removeAttribute('src');product.style.opacity='0';product.style.visibility='hidden';setState('IDLE')}
  function revealProduct(p,src){$('#foreground-image').src=src;$('#foreground-image').alt=p.name;$('#foreground-kicker').textContent=p.kicker;$('#foreground-name').textContent=p.name;$('#foreground-desc').textContent=p.description;$('#foreground-price').textContent=p.price;product.style.visibility='visible';requestAnimationFrame(()=>{product.style.transition='opacity .65s ease';product.style.opacity='1'})}
  function play(){if(running)return;const p=pizzas[selected],src=p.media();if(!src)return;reset();running=true;setState('PREPARING');schedule(()=>{setState('PEEL_ENTER');peel.style.transition='transform 1.15s cubic-bezier(.3,.85,.3,1),opacity .25s ease';peel.style.opacity='1';peel.style.transform='translate(-18%,-92%) rotate(-1deg) scale(.56)'},350);schedule(()=>{setState('OCCLUSION');peel.style.filter='brightness(.7) blur(.4px)'},1300);schedule(()=>{setState('PIZZA_RESOLVED');peelPizza.src=src;peelPizza.alt=p.name;peelPizza.style.opacity='1'},1575);schedule(()=>{setState('PEEL_EXIT');peel.style.filter='none';peel.style.transition='transform 1.35s cubic-bezier(.18,.72,.22,1),opacity .4s ease';peel.style.transform='translate(-6%,15%) rotate(-4deg) scale(1.08)'},1850);schedule(()=>{setState('FOREGROUND_REVEAL');revealProduct(p,src)},2850);schedule(()=>{setState('PRODUCT_READY');running=false},3500)}
  $$('.pizza-btn').forEach(btn=>btn.addEventListener('click',()=>{if(running)return;selected=btn.dataset.pizza;syncSelection()}));$('#play').addEventListener('click',play);$('#reset').addEventListener('click',reset);$('#choose-another').addEventListener('click',()=>{product.style.opacity='0';setTimeout(()=>{product.style.visibility='hidden';reset();syncSelection()},400)});syncSelection();
})();