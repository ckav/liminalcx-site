/* Google Analytics (GA4) with a cookie banner, shared by every page.
   - Nothing loads until the visitor clicks Accept (UK cookie rules). Their choice is remembered in this browser.
   - Only runs on liminalcx.com, so the preview site doesn't add test visits to the figures.
   - To switch it on or change the property, set GA_ID below (it starts with "G-").
   - "Cookie settings" in the footer reopens the banner. Styles: .cookie-* in site.css. */
(function(){
  var GA_ID = '';               // e.g. 'G-ABC123XYZ' (from Google Analytics: Admin → Data streams)
  var LIVE = /(^|\.)liminalcx\.com$/.test(location.hostname);
  var KEY = 'lcx-analytics';    // 'yes' or 'no'
  if (!GA_ID) return;

  function get(){ try { return localStorage.getItem(KEY) } catch(e){ return null } }
  function set(v){ try { localStorage.setItem(KEY, v) } catch(e){} }

  var loaded = false;
  function load(){
    if (loaded || !LIVE) return; loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments) };
    gtag('js', new Date());
    gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }
  function clearCookies(){
    document.cookie.split(';').forEach(function(c){
      var n = c.split('=')[0].trim();
      if (/^_ga/.test(n)) ['', '.liminalcx.com', 'liminalcx.com'].forEach(function(d){
        document.cookie = n + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  var bar;
  function banner(){
    if (bar) { bar.hidden = false; return }
    bar = document.createElement('div');
    bar.className = 'cookie-bar'; bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', 'Cookies');
    bar.innerHTML = '<p>Can I use Google Analytics cookies to see which pages are useful? No adverts, and I can’t see who you are.</p>' +
      '<div class="cookie-btns"><button type="button" class="btn btn-lime" data-v="yes">Accept</button>' +
      '<button type="button" class="btn btn-line" data-v="no">No thanks</button></div>';
    bar.addEventListener('click', function(e){
      var v = e.target.getAttribute && e.target.getAttribute('data-v'); if (!v) return;
      set(v); bar.hidden = true;
      if (v === 'yes') load(); else { clearCookies(); if (loaded) location.reload() }
    });
    document.body.appendChild(bar);
  }

  // "Cookie settings" link in the footer
  var foot = document.querySelector('.site-foot .row span:last-child');
  if (foot) {
    var a = document.createElement('a'); a.href = '#'; a.textContent = 'Cookie settings';
    a.addEventListener('click', function(e){ e.preventDefault(); banner() });
    foot.appendChild(document.createTextNode(' · ')); foot.appendChild(a);
  }

  var c = get();
  if (c === 'yes') load(); else if (c !== 'no') banner();
})();
