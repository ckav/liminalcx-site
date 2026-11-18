/* All-digital mobile network case study: prototype mock-up. Illustration only, built for the site.
   Each scene is a list of [wait in ms, action]. Jumping to a scene replays the earlier ones instantly.
   Pauses when scrolled away, has Pause/Play and step buttons, and stays still if the device is set to reduce motion.
   To change wording: edit `say` in the scenes below and the matching data-k elements in about/index.html. */
(function(){
  var view=document.getElementById('mp-view'), S=document.getElementById('mp');
  if(!view||!S)return;
  var INIT=S.innerHTML, W=760, H=440, scale=1;
  var say=document.getElementById('mp-say'), chips=[].slice.call(document.querySelectorAll('.mp-steps [data-s]'));
  var pp=document.getElementById('mp-pp');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var token=0, fast=false, cur=0, playing=!reduce, visible=false, started=false;

  function fit(){scale=view.clientWidth/W;S.style.transform='scale('+scale+')';view.style.height=(H*scale)+'px'}
  fit(); window.addEventListener('resize',fit);

  function $(k){return S.querySelector('[data-k="'+k+'"]')}
  function on(k,v){$(k).classList.toggle('on',v!==false)}
  function cls(k,c,v){$(k).classList.toggle(c,v!==false)}
  function act(k){[].forEach.call(S.querySelectorAll('.mp-card'),function(c){c.classList.toggle('act',c.getAttribute('data-k')===k)})}
  function screen(k){[].forEach.call(S.querySelectorAll('.mp-s'),function(s){s.classList.toggle('on',s.getAttribute('data-k')===k)})}
  function tap(k){cls(k,'hl');if(fast)return;var a=$(k).getBoundingClientRect(),b=S.getBoundingClientRect(),r=document.createElement('div');
    r.className='mp-tap';r.style.left=((a.left-b.left+a.width/2)/scale)+'px';r.style.top=((a.top-b.top+a.height/2)/scale)+'px';S.appendChild(r);setTimeout(function(){r.remove()},520)}
  function text(k,s){$(k).textContent=s}

  var scenes=[
    {say:'It starts with the brief: a mobile network with no call centre. Customers have to be able to do everything themselves.', acts:[
      [300,function(){on('brief');act('brief')}],[400,function(){screen('skel')}],[2600,null]]},
    {say:'Before drawing anything, list what each screen needs to know, so the requirements and the design match.', acts:[
      [300,function(){on('fields');act('fields')}],[500,function(){on('f1')}],[350,function(){on('f2')}],[350,function(){on('f3')}],[350,function(){on('f4')}],[2200,null]]},
    {say:'The account screen, as a quick prototype: data left, plan status and coverage, all without asking anyone.', acts:[
      [300,function(){act('fields');screen('dash')}],[2800,null]]},
    {say:'Adding a family member: the kind of task that usually needs a phone call, done in a few taps.', acts:[
      [400,function(){tap('add')}],[500,function(){cls('add','hl',false);screen('fam')}],[600,function(){text('name','Alex')}],[700,function(){on('share')}],[900,function(){tap('confirm')}],[500,function(){cls('confirm','hl',false);screen('done')}],[2400,null]]},
    {say:'The same journey, checked market by market. The prototypes made the requirements concrete. They weren’t launched products.', acts:[
      [300,function(){on('mk');act('mk');screen('dash');on('mkt')}],
      [400,function(){on('m1');text('mkt','Market A')}],[1000,function(){on('m1',false);on('m2');text('mkt','Market B')}],
      [1000,function(){on('m2',false);on('m3');text('mkt','Market C')}],[1000,function(){on('m3',false);on('m4');text('mkt','Market D')}],[1600,null]]},
    {say:'Then people decide. The prototypes went to stakeholders and vendors for review, and every decision stayed with the team.', acts:[
      [300,function(){on('path');act('path')}],[500,function(){on('p1')}],[500,function(){on('p2')}],[500,function(){on('p3')}],[500,function(){on('p4')}],[3000,null]]}
  ];

  function wait(ms,t){if(t!==token)return Promise.reject('stop');if(fast)return Promise.resolve();
    return new Promise(function(res,rej){setTimeout(function(){t===token?res():rej('stop')},ms)})}
  function run(i,t){var p=Promise.resolve();scenes[i].acts.forEach(function(a){p=p.then(function(){return wait(a[0],t)}).then(function(){if(a[1])a[1]()})});return p}
  function mark(i){cur=i;say.innerHTML='<span>Step '+(i+1)+' of '+scenes.length+'</span>'+scenes[i].say;
    chips.forEach(function(c){c.removeAttribute('aria-current');if(+c.dataset.s===i)c.setAttribute('aria-current','step')})}
  function instant(from,to,t){fast=true;S.classList.add('fast');var p=Promise.resolve();
    for(var j=from;j<to;j++)(function(j){p=p.then(function(){return run(j,t)})})(j);
    return p.then(function(){fast=false;void S.offsetWidth;S.classList.remove('fast')})}
  function go(i){
    var t=++token;mark(i);S.innerHTML=INIT;S.className='mp';
    instant(0,i,t).then(function(){
      if(!playing||!visible)return instant(i,i+1,t);
      return run(i,t).then(function(){if(t===token&&playing&&visible)go((i+1)%scenes.length)});
    }).catch(function(){fast=false});
  }
  chips.forEach(function(c){c.addEventListener('click',function(){go(+c.dataset.s)})});
  pp.addEventListener('click',function(){playing=!playing;pp.textContent=playing?'Pause':'Play';pp.setAttribute('aria-pressed',String(!playing));go(cur)});
  pp.textContent=playing?'Pause':'Play';

  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){es.forEach(function(e){
      var was=visible;visible=e.isIntersecting;
      if(visible&&!was&&playing){go(started?cur:0);started=true}
      if(!visible&&was){token++}
    })},{threshold:.35}).observe(view);
  }else{visible=true}
  go(reduce?5:3); // still until it scrolls into view; reduced motion shows the finished sequence and never moves
})();
