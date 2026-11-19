/* About page: size each animation iframe to its content (same site, so the parent can read it),
   and send old case-study links (#esim, #giffgaff, ...) to the mobile section. */
(function(){
  [].forEach.call(document.querySelectorAll('.anim iframe'),function(f){
    function fit(){try{var d=f.contentDocument;var w=d&&d.querySelector('.wrap');if(w)f.style.height=Math.ceil(w.getBoundingClientRect().height)+8+'px'}catch(e){}}
    f.addEventListener('load',function(){fit();try{new ResizeObserver(fit).observe(f.contentDocument.body)}catch(e){}});
  });
  var old=['esim','sports','ecommerce','giffgaff','digital-network','travel-esim','football-club','merch-orders','this-website'];
  if(old.indexOf(location.hash.slice(1))>=0){var p=document.getElementById('projects');if(p)p.scrollIntoView()}
})();
