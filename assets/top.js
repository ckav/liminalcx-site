/* "Back to top" button, shared by every page. Appears once you've scrolled down a screen and a half. Styles: .to-top in site.css. */
(function(){
  var b=document.createElement('button');
  b.type='button';b.className='to-top';b.setAttribute('aria-label','Back to top');b.innerHTML='<span aria-hidden="true">↑</span> Top';
  b.addEventListener('click',function(){window.scrollTo({top:0});var h=document.querySelector('a,button');if(h&&h!==b)h.focus({preventScroll:true})});
  document.body.appendChild(b);
  function check(){b.classList.toggle('show',window.scrollY>window.innerHeight*1.5)}
  window.addEventListener('scroll',check,{passive:true});check();
})();
