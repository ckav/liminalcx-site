/* Travel eSIM case study: "One journey, six flows" diagram.
   Each scene lights up part of the journey; earlier parts of the same path stay dark.
   Pauses when scrolled away, has Pause/Play and step buttons, and shows the whole map still if the device is set to reduce motion.
   To change wording: edit `say` below and the node text in about/index.html. Keys match data-k in the page. */
(function(){
  var view=document.getElementById('fl-view'), S=document.getElementById('fl');
  if(!view||!S)return;
  var W=760, H=480;
  var say=document.getElementById('fl-say'), chips=[].slice.call(document.querySelectorAll('#fl-steps [data-s]'));
  var pp=document.getElementById('fl-pp');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cur=0, timer=null, playing=!reduce, visible=false;

  function fit(){var s=view.clientWidth/W;S.style.transform='scale('+s+')';view.style.height=(H*s)+'px'}
  fit(); window.addEventListener('resize',fit);

  // path: 0 = no plan yet, 1 = has a plan. keys light up in order.
  var scenes=[
    {p:0,k:['entry'],say:'Every customer starts in the same place. The service checks whether they already have a plan.'},
    {p:0,k:['l-pre','pre','l-new','new'],say:'No plan yet, and new to eSIMs? First, check their phone supports one, with an option to try it before they fly.'},
    {p:0,k:['l-exp','exp'],say:'Experienced travellers skip ahead: where are they going, and how much data do they need?'},
    {p:0,k:['l-np','l-ep','buy'],say:'Both paths meet at purchase: compare plans and check out.'},
    {p:0,k:['l-po','onb'],say:'Then step-by-step setup, so the eSIM works the moment they land.'},
    {p:1,k:['entry','l-post','post','l-ni','notin','l-in','inst','l-nio'],say:'Already have a plan? If it isn’t installed yet, they get setup help. If it is, help with usage and the network.'},
    {p:1,k:['l-ins','sup','l-of','l-sf','fb'],say:'Support fixes connection problems. Every journey ends by asking for feedback, reviews and recommendations.'}
  ];
  var dur=[3200,4200,3600,3400,3600,5200,5200];

  function $$(k){return S.querySelectorAll('[data-k="'+k+'"]')}
  function setAll(c,v){[].forEach.call(S.querySelectorAll('[data-k]'),function(e){e.classList.toggle(c,v)})}
  function render(i,animate){
    setAll('on',false);setAll('done',false);
    scenes.forEach(function(s,j){if(j<i&&s.p===scenes[i].p)s.k.forEach(function(k){[].forEach.call($$(k),function(e){e.classList.add('done')})})});
    scenes[i].k.forEach(function(k,n){[].forEach.call($$(k),function(e){
      if(animate){setTimeout(function(){if(cur===i)e.classList.add('on')},180*n)}else e.classList.add('on')})});
    cur=i;say.innerHTML='<span>Step '+(i+1)+' of '+scenes.length+'</span>'+scenes[i].say;
    chips.forEach(function(c){c.removeAttribute('aria-current');if(+c.dataset.s===i)c.setAttribute('aria-current','step')});
  }
  function stop(){clearTimeout(timer);timer=null}
  function play(i){stop();render(i,true);if(playing&&visible)timer=setTimeout(function(){play((i+1)%scenes.length)},dur[i])}
  function whole(){setAll('on',false);setAll('done',true);say.innerHTML='Use the steps to walk through each part of the journey.'}

  chips.forEach(function(c){c.addEventListener('click',function(){play(+c.dataset.s)})});
  pp.addEventListener('click',function(){playing=!playing;pp.textContent=playing?'Pause':'Play';pp.setAttribute('aria-pressed',String(!playing));play(cur)});
  pp.textContent=playing?'Pause':'Play';

  if(reduce){whole();return}
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){es.forEach(function(e){
      var was=visible;visible=e.isIntersecting;
      if(visible&&!was&&playing)play(cur);
      if(!visible&&was)stop();
    })},{threshold:.35}).observe(view);
  }else{visible=true;play(0)}
  render(0,false);
})();
