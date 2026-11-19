/* About page: sector tabs, card carousel and "Full story" panels.
   - Tabs come from each .sector[data-tab] in #projects, into #cs-tabs. With one sector (eSIM and mobile only, Nov 2026)
     there is no #cs-tabs bar and no tabs are built; add the bar back when a second sector returns.
   - In a sector with cards, the full studies (article.cs) stay hidden until a card's "Full story" button opens one.
     Old links to a study (#giffgaff, #digital-network, #travel-esim) open its tab and the study.
   - Removed sectors and studies (see REMOVED) land on the first sector, at the top of the case studies.
   - Without JavaScript every sector and study shows, one after another. */
(function(){
  var sec=document.getElementById('projects'),bar=document.getElementById('cs-tabs');
  if(!sec)return;
  var REMOVED=['sports','ecommerce','football-club','merch-orders','this-website'];
  var panels=[].slice.call(sec.querySelectorAll('.sector[data-tab]'));
  if(!panels.length)return;
  function anchor(){var an=document.getElementById('cs-anchor');window.scrollTo({top:an.getBoundingClientRect().top+window.scrollY-8})}
  function resize(){window.dispatchEvent(new Event('resize'))} // the animations size themselves to their box, which was 0 while hidden
  function setHash(id){if(history.replaceState)history.replaceState(null,'','#'+id)}

  var btns=(bar&&panels.length>1)?panels.map(function(p){
    var b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.textContent=p.dataset.tab;
    b.addEventListener('click',function(){tab(p.id);setHash(p.id);anchor()});bar.appendChild(b);return b}):[];
  function tab(id){panels.forEach(function(p,i){var on=p.id===id;p.hidden=!on;if(btns[i])btns[i].setAttribute('aria-selected',String(on))});resize()}

  // carousels
  panels.forEach(function(p){
    var track=p.querySelector('.sc-track');if(!track)return;
    var cards=[].slice.call(track.querySelectorAll('.sc')),count=p.querySelector('.sc-count'),dots=p.querySelector('.sc-dots');
    var prev=p.querySelector('.sc-prev'),next=p.querySelector('.sc-next');
    var dotBtns=cards.map(function(c,i){var d=document.createElement('button');d.type='button';d.tabIndex=-1;d.addEventListener('click',function(){show(i)});dots.appendChild(d);return d});
    function step(){return cards.length>1?cards[1].offsetLeft-cards[0].offsetLeft:1}
    function idx(){return Math.max(0,Math.min(cards.length-1,Math.round(track.scrollLeft/step())))}
    function show(i){track.scrollTo({left:cards[i].offsetLeft-cards[0].offsetLeft})}
    function mark(){var i=idx();
      // at the far end the last card can't snap to the start, so count it as current
      if(track.scrollLeft+track.clientWidth>=track.scrollWidth-4)i=cards.length-1;
      count.textContent='Card '+(i+1)+' of '+cards.length;
      dotBtns.forEach(function(d,j){d.classList.toggle('on',j===i)});
      prev.disabled=i===0;next.disabled=i===cards.length-1}
    prev.addEventListener('click',function(){show(Math.max(0,idx()-1))});
    next.addEventListener('click',function(){show(Math.min(cards.length-1,idx()+1))});
    track.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();next.click()}if(e.key==='ArrowLeft'){e.preventDefault();prev.click()}});
    var t;track.addEventListener('scroll',function(){clearTimeout(t);t=setTimeout(mark,60)});
    window.addEventListener('resize',mark);mark();
    p._show=function(cardId){var i=cards.findIndex(function(c){return c.id===cardId});if(i>=0){track.style.scrollBehavior='auto';show(i);track.style.scrollBehavior=''}};

    // full stories
    var stories=[].slice.call(p.querySelectorAll('article.cs'));
    stories.forEach(function(a){a.hidden=true;
      var back=document.createElement('button');back.type='button';back.className='sc-back';back.textContent='← Back to the cards';
      back.addEventListener('click',function(){close(a.id)});a.parentNode.insertBefore(back,a);back.hidden=true;a._back=back});
    var sbtns=[].slice.call(p.querySelectorAll('.sc-story'));
    sbtns.forEach(function(b){b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls',b.dataset.story);
      b.addEventListener('click',function(){var open=b.getAttribute('aria-expanded')==='true';if(open)close(b.dataset.story);else story(b.dataset.story,true)})});
    function close(id){var a=document.getElementById(id);a.hidden=true;a._back.hidden=true;
      sbtns.forEach(function(b){b.setAttribute('aria-expanded','false')});setHash(p.id);
      var c=document.getElementById('card-'+id);if(c){p._show(c.id)}
      window.scrollTo({top:track.getBoundingClientRect().top+window.scrollY-90})}
    p._story=function(id,scroll){
      stories.forEach(function(a){var on=a.id===id;a.hidden=!on;a._back.hidden=!on});
      sbtns.forEach(function(b){b.setAttribute('aria-expanded',String(b.dataset.story===id))});
      p._show('card-'+id);resize();
      if(scroll){var a=document.getElementById(id);window.scrollTo({top:a._back.getBoundingClientRect().top+window.scrollY-80})}};
  });
  function story(id,scroll){var a=document.getElementById(id),p=a&&a.closest('.sector');if(!p)return;tab(p.id);if(p._story)p._story(id,scroll);setHash(id)}

  function route(first){
    var h=location.hash.slice(1),el=h&&document.getElementById(h);
    if(REMOVED.indexOf(h)>=0){tab(panels[0].id);setHash(panels[0].id);anchor();return}
    if(!el||!sec.contains(el)){if(first)tab(panels[0].id);return}
    var p=el.closest('.sector');
    if(el.classList.contains('sector')){tab(el.id);anchor()}
    else if(el.matches('article.cs')&&p){if(p._story)story(el.id,true);else{tab(p.id);anchor()}}
    else if(el.classList.contains('sc')&&p){tab(p.id);p._show(el.id);anchor()}
    else if(first)tab(panels[0].id);
  }
  route(true);
  window.addEventListener('hashchange',function(){route(false)});
  document.addEventListener('toggle',resize,true); // an opened details block re-sizes its animation
})();
