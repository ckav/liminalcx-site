/* Animated walk-through for the Google bookings course.
   Each scene plays with a moving cursor. Jumping to a scene replays the earlier ones instantly ("fast" mode),
   so the screen is always in the right state. Respects reduced motion and pauses when off screen. */
(function(){
  var view=document.getElementById('gd-view'), S=document.getElementById('gd');
  if(!view||!S)return;
  var INIT=S.innerHTML, W=760, H=500, scale=1;
  var say=document.getElementById('gd-say'), chips=[].slice.call(document.querySelectorAll('.gd-steps [data-s]'));
  var pp=document.getElementById('gd-pp');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var token=0, fast=false, cur=0, playing=!reduce, visible=false;

  function fit(){scale=view.clientWidth/W;S.style.transform='scale('+scale+')';view.style.height=(H*scale)+'px'}
  fit(); window.addEventListener('resize',fit);

  function $(k){return S.querySelector('[data-k="'+k+'"]')}
  function stop(t){if(t!==token)throw 'stop'}
  function wait(ms,t){stop(t);if(fast)return Promise.resolve();return new Promise(function(res,rej){setTimeout(function(){t===token?res():rej('stop')},ms)})}
  function pos(el,fx,fy){var a=el.getBoundingClientRect(),b=S.getBoundingClientRect();return{x:(a.left-b.left+a.width*(fx==null?.5:fx))/scale,y:(a.top-b.top+a.height*(fy==null?.5:fy))/scale}}
  function move(k,t,fx,fy){var p=pos($(k),fx,fy),c=$('cur');c.style.left=p.x+'px';c.style.top=p.y+'px';return wait(750,t)}
  function click(k,t,fx,fy){return move(k,t,fx,fy).then(function(){
    if(!fast){var c=$('cur'),r=document.createElement('div');r.className='gd-ring';r.style.left=c.style.left;r.style.top=c.style.top;S.appendChild(r);setTimeout(function(){r.remove()},500)}
    return wait(260,t)})}
  function type(k,text,t,ms){var el=$(k);el.classList.add('filled');var ph=el.querySelector('.ph');if(ph)ph.remove();
    if(fast){el.lastChild&&el.lastChild.nodeType===3?el.lastChild.nodeValue+=text:el.appendChild(document.createTextNode(text));return Promise.resolve()}
    var node=document.createTextNode('');el.appendChild(node);var i=0;
    return new Promise(function(res,rej){(function step(){if(t!==token)return rej('stop');if(i>=text.length)return res();node.nodeValue+=text[i++];setTimeout(step,ms||45)})()})}
  function on(k,v){$(k).classList.toggle('on',v!==false)}
  function cls(k,c,v){$(k).classList.toggle(c,v!==false)}
  function set(k,html){$(k).innerHTML=html}

  var scenes=[
    {say:'Open Google Calendar on a computer, then Create → Appointment schedule', run:function(t){
      return wait(500,t).then(function(){return click('create',t)})
      .then(function(){on('menu');return wait(400,t)})
      .then(function(){cls('m-appt','hl');return click('m-appt',t)})
      .then(function(){on('menu',false);cls('S','edit');return wait(900,t)})}},
    {say:'Name it, choose the length and set when you’re free', run:function(t){
      return click('title',t,.3).then(function(){cls('title','focus');set('title','');return type('title','30-minute session',t,60)})
      .then(function(){cls('title','focus',false);return click('dur',t)})
      .then(function(){on('d-drop');return wait(350,t)})
      .then(function(){cls('d-30','hl');return click('d-30',t)})
      .then(function(){on('d-drop',false);set('dur','30 minutes');return click('tue',t)})
      .then(function(){set('tue','<span class="gd-time">10:00</span>– <span class="gd-time">12:00</span>');on('av-tue');return click('thu',t)})
      .then(function(){set('thu','<span class="gd-time">10:00</span>– <span class="gd-time">12:00</span>');on('av-thu');return wait(600,t)})
      .then(function(){return click('next',t)})
      .then(function(){on('p1',false);on('p2');set('title2','30-minute session');set('next','Save');return wait(400,t)})}},
    {say:'Add video, a description and the questions you need answered', run:function(t){
      return click('loc',t).then(function(){on('l-drop');return wait(350,t)})
      .then(function(){cls('l-meet','hl');return click('l-meet',t)})
      .then(function(){on('l-drop',false);set('loc','Google Meet video conferencing');return click('desc',t,.5,.7)})
      .then(function(){return type('desc-t','Bring one problem and leave with a plan. Payment is taken when you book.',t,28)})
      .then(function(){return click('form',t,.3,.3)})
      .then(function(){cls('form','open');return wait(500,t)})
      .then(function(){return click('add',t)})
      .then(function(){$('q2').style.display='flex';return wait(600,t)})}},
    {say:'Switch on payment, set the price and your cancellation policy', run:function(t){
      $('scroll').style.transform='translateY(-360px)';
      return wait(700,t).then(function(){return click('pay',t,.3,.3)})
      .then(function(){cls('pay','open');return wait(500,t)})
      .then(function(){return click('box',t)})
      .then(function(){on('box');return click('price',t)})
      .then(function(){cls('price','focus');return type('price-t','75.00',t,90)})
      .then(function(){cls('price','focus',false);return wait(700,t)})}},
    {say:'Save, then open your booking page and copy its link', run:function(t){
      return click('next',t).then(function(){on('toast');return wait(900,t)})
      .then(function(){return click('open',t)})
      .then(function(){on('toast',false);cls('S','booking');set('url','calendar.app.google/your-booking-page');return wait(900,t)})}},
    {say:'Your client picks a time, answers your questions and pays. Done.', run:function(t){
      return click('slot',t).then(function(){cls('slot','hl');return wait(300,t)})
      .then(function(){on('modal');return wait(500,t)})
      .then(function(){return click('f-name',t)}).then(function(){cls('f-name','focus');return type('f-name-t','Alex Morgan',t,50)})
      .then(function(){cls('f-name','focus',false);return click('f-co',t)}).then(function(){cls('f-co','focus');return type('f-co-t','Northlight Ltd',t,50)})
      .then(function(){cls('f-co','focus',false);return click('f-card',t)}).then(function(){cls('f-card','focus');return type('f-card-t','•••• •••• •••• 1881',t,30)})
      .then(function(){cls('f-card','focus',false);return click('cta',t)})
      .then(function(){on('done');return wait(3200,t)})}}
  ];
  // the stage itself is addressable as 'S'
  var _$=$; $=function(k){return k==='S'?S:_$(k)};

  function mark(i){cur=i;say.innerHTML='<span>Step '+(i+1)+' of '+scenes.length+'</span>'+scenes[i].say;
    chips.forEach(function(c){c.toggleAttribute('aria-current',false);if(+c.dataset.s===i)c.setAttribute('aria-current','step')})}

  function build(i,t){ // instant replay of scenes 0..i-1
    S.innerHTML=INIT;S.className='gd';fast=true;S.classList.add('fast');
    var p=Promise.resolve();
    for(var j=0;j<i;j++)(function(j){p=p.then(function(){return scenes[j].run(t)})})(j);
    return p.then(function(){fast=false;void S.offsetWidth;S.classList.remove('fast')});
  }
  function go(i){
    var t=++token;mark(i);
    build(i,t).then(function(){
      if(!playing||!visible){ // still: show the end of this scene
        fast=true;S.classList.add('fast');
        return scenes[i].run(t).then(function(){fast=false;void S.offsetWidth;S.classList.remove('fast')});
      }
      return scenes[i].run(t).then(function(){if(t===token&&playing&&visible)go((i+1)%scenes.length)});
    }).catch(function(){fast=false});
  }
  // build() resets the stage each time, so the loop always starts clean
  chips.forEach(function(c){c.addEventListener('click',function(){go(+c.dataset.s)})});
  pp.addEventListener('click',function(){playing=!playing;pp.textContent=playing?'Pause':'Play';pp.setAttribute('aria-pressed',String(!playing));go(cur)});
  pp.textContent=playing?'Pause':'Play';

  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){es.forEach(function(e){
      var was=visible;visible=e.isIntersecting;
      if(visible&&!was&&playing)go(cur);
      if(!visible&&was){token++}
    })},{threshold:.35}).observe(view);
  }else{visible=true}
  go(reduce?3:0); // shown still until it scrolls into view; reduced motion starts on the payment step and never moves
})();
