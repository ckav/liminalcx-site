/* Merchandise case study: order panel animation. Same approach as /free/google-bookings-stripe/demo.js:
   each scene moves a cursor; jumping to a scene replays the earlier ones instantly ("fast" mode).
   Pauses when scrolled away, has Pause/Play and step buttons, and stays still if the device is set to reduce motion. */
(function(){
  var view=document.getElementById('op-view'), S=document.getElementById('op');
  if(!view||!S)return;
  var INIT=S.innerHTML, W=760, H=460, scale=1;
  var say=document.getElementById('op-say'), chips=[].slice.call(document.querySelectorAll('.op-steps [data-s]'));
  var pp=document.getElementById('op-pp');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var token=0, fast=false, cur=0, playing=!reduce, visible=false, started=false;

  function fit(){scale=view.clientWidth/W;S.style.transform='scale('+scale+')';view.style.height=(H*scale)+'px'}
  fit(); window.addEventListener('resize',fit);

  function $(k){return k==='S'?S:S.querySelector('[data-k="'+k+'"]')}
  function stop(t){if(t!==token)throw 'stop'}
  function wait(ms,t){stop(t);if(fast)return Promise.resolve();return new Promise(function(res,rej){setTimeout(function(){t===token?res():rej('stop')},ms)})}
  function pos(el,fx,fy){var a=el.getBoundingClientRect(),b=S.getBoundingClientRect();return{x:(a.left-b.left+a.width*(fx==null?.5:fx))/scale,y:(a.top-b.top+a.height*(fy==null?.5:fy))/scale}}
  function move(k,t,fx,fy){var p=pos($(k),fx,fy),c=$('cur');c.style.left=p.x+'px';c.style.top=p.y+'px';return wait(800,t)}
  function click(k,t,fx,fy){return move(k,t,fx,fy).then(function(){
    if(!fast){var c=$('cur'),r=document.createElement('div');r.className='op-ring';r.style.left=c.style.left;r.style.top=c.style.top;S.appendChild(r);setTimeout(function(){r.remove()},500)}
    return wait(260,t)})}
  function on(k,v){$(k).classList.toggle('on',v!==false)}
  function cls(k,c,v){$(k).classList.toggle(c,v!==false)}
  function set(k,html){$(k).innerHTML=html}
  // types a list of [text, highlighted?] pieces; highlighted pieces are the order details that fill themselves in
  function typeParts(k,parts,t){var el=$(k);el.innerHTML='';
    if(fast){parts.forEach(function(p){if(p[1]){var m=document.createElement('mark');m.textContent=p[0];el.appendChild(m)}else el.appendChild(document.createTextNode(p[0]))});return Promise.resolve()}
    var i=0;return new Promise(function(res,rej){(function next(){
      if(t!==token)return rej('stop'); if(i>=parts.length)return res();
      var p=parts[i++];
      if(p[1]){var m=document.createElement('mark');m.textContent=p[0];el.appendChild(m);setTimeout(next,260);return}
      var n=document.createTextNode('');el.appendChild(n);var j=0;
      (function ch(){if(t!==token)return rej('stop');if(j>=p[0].length)return next();n.nodeValue+=p[0][j++];setTimeout(ch,22)})();
    })()})}
  function light(stores,t){var p=Promise.resolve();stores.forEach(function(s){p=p.then(function(){$(s).classList.add('on');return wait(140,t)})});return p}

  var scenes=[
    {say:'A customer emails “Where is my order?” There’s usually no order number, just their email address.', run:function(t){
      return wait(500,t).then(function(){on('row1');return wait(900,t)})
      .then(function(){on('tag1');return wait(1000,t)})
      .then(function(){return click('row1',t,.3)})
      .then(function(){cls('S','open');return wait(500,t)})}},
    {say:'Open the ticket. The panel has already searched all of that brand’s stores and found the latest order.', run:function(t){
      return wait(300,t).then(function(){return light(['s1','s2','s3','s4','s5','s6','s7'],t)})
      .then(function(){cls('s3','hit');set('find','Latest order found in the <b>US store</b>');on('fields');return wait(2600,t)})}},
    {say:'See the customer’s earlier orders without opening another system.', run:function(t){
      return click('past',t,.4).then(function(){on('pdrop');return wait(2200,t)})
      .then(function(){on('pdrop',false);return wait(300,t)})}},
    {say:'Contact the courier, cancel or refund from the ticket. Admins decide who can cancel and refund.', run:function(t){
      return move('courier',t).then(function(){cls('courier','hl');return wait(700,t)})
      .then(function(){cls('courier','hl',false);return move('cancel',t)})
      .then(function(){cls('cancel','hl');return wait(500,t)})
      .then(function(){cls('cancel','hl',false);return move('refund',t)})
      .then(function(){cls('refund','hl');on('note');return wait(1800,t)})
      .then(function(){cls('refund','hl',false);return wait(200,t)})}},
    {say:'Pick a saved reply. The order details fill themselves in, so there’s nothing to copy and paste.', run:function(t){
      return click('saved',t).then(function(){on('sdrop');return wait(400,t)})
      .then(function(){cls('s-where','hl');return click('s-where',t)})
      .then(function(){on('sdrop',false);return typeParts('rtext',[['Good news: your order '],['#A1234',1],[' shipped on '],['4 Mar',1],['. You can follow it here: '],['Track parcel',1]],t)})
      .then(function(){return click('send',t)})
      .then(function(){on('sent');return wait(3000,t)})}}
  ];

  function mark(i){cur=i;say.innerHTML='<span>Step '+(i+1)+' of '+scenes.length+'</span>'+scenes[i].say;
    chips.forEach(function(c){c.removeAttribute('aria-current');if(+c.dataset.s===i)c.setAttribute('aria-current','step')})}
  function build(i,t){ // instant replay of scenes 0..i-1, from a clean stage
    S.innerHTML=INIT;S.className='op';fast=true;S.classList.add('fast');
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
  go(reduce?4:1); // still until it scrolls into view; reduced motion shows the finished reply and never moves
})();
