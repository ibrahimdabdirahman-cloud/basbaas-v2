/* ===========================================================
   BasBaas Cuisine — shared behaviour
   =========================================================== */
(function(){
  'use strict';

  /* ---------- header scroll state (hero-overlay pages) ---------- */
  var header = document.querySelector('.site-header');
  function onScroll(){
    if(!header) return;
    if(window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- mobile nav ---------- */
  var mnav = document.querySelector('.mobile-nav');
  document.addEventListener('click', function(e){
    if(e.target.closest('.hamburger')){ mnav && mnav.classList.add('open'); document.body.style.overflow='hidden'; }
    if(e.target.closest('.mobile-nav .close') || e.target.matches('.mobile-nav a')){
      mnav && mnav.classList.remove('open'); document.body.style.overflow='';
    }
  });

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    },{threshold:.12, rootMargin:'0px 0px -8% 0px'});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---------- year ---------- */
  document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });

  /* ===========================================================
     Modals — booking & order (injected once)
     =========================================================== */
  var modalsHTML = ''
  + '<div class="modal-veil" id="bookModal" aria-hidden="true">'
  +   '<div class="modal" role="dialog" aria-modal="true" aria-label="Book a table">'
  +     '<div class="modal-head"><div><span class="label gold">Reservations</span><h3>Book a table</h3></div>'
  +       '<button class="modal-close" data-close aria-label="Close">&times;</button></div>'
  +     '<div class="modal-body" id="bookBody">'
  +       '<div class="field-row"><div class="field"><label>Date</label><input type="date" id="bkDate"></div>'
  +         '<div class="field"><label>Time</label><select id="bkTime">'
  +           '<option>12:00</option><option>12:30</option><option>13:00</option><option>13:30</option><option>17:00</option>'
  +           '<option>17:30</option><option>18:00</option><option selected>18:30</option><option>19:00</option><option>19:30</option><option>20:00</option><option>20:30</option>'
  +         '</select></div></div>'
  +       '<div class="field"><label>Party size</label><div class="party-row" id="bkParty">'
  +         '<button>1</button><button>2</button><button class="sel">3</button><button>4</button><button>5</button><button>6</button><button>7+</button>'
  +       '</div></div>'
  +       '<div class="field-row"><div class="field"><label>Full name</label><input type="text" id="bkName" placeholder="Your name"></div>'
  +         '<div class="field"><label>Phone</label><input type="tel" id="bkPhone" placeholder="07…"></div></div>'
  +       '<button class="btn btn-orange" id="bkSubmit">Confirm reservation</button>'
  +     '</div>'
  +   '</div>'
  + '</div>'
  + '<div class="modal-veil" id="orderModal" aria-hidden="true">'
  +   '<div class="modal" role="dialog" aria-modal="true" aria-label="Order online">'
  +     '<div class="modal-head"><div><span class="label gold">Takeaway &amp; Delivery</span><h3>Order online</h3></div>'
  +       '<button class="modal-close" data-close aria-label="Close">&times;</button></div>'
  +     '<div class="modal-body">'
  +       '<a class="order-opt"><span class="ic">D</span><div><div class="t">Deliveroo</div><div class="s">Delivery across SE18 · 25–40 min</div></div><span class="arr">&rarr;</span></a>'
  +       '<a class="order-opt"><span class="ic">UE</span><div><div class="t">Uber Eats</div><div class="s">Delivery &amp; pickup</div></div><span class="arr">&rarr;</span></a>'
  +       '<a class="order-opt"><span class="ic">JE</span><div><div class="t">Just Eat</div><div class="s">Delivery across SE18</div></div><span class="arr">&rarr;</span></a>'
  +       '<a class="order-opt" href="tel:02031962607"><span class="ic">&#9742;</span><div><div class="t">Call to order — collection</div><div class="s">0203 1962 607 · ready in 20 min</div></div><span class="arr">&rarr;</span></a>'
  +     '</div>'
  +   '</div>'
  + '</div>';
  var holder = document.createElement('div');
  holder.innerHTML = modalsHTML;
  document.body.appendChild(holder);

  var bookModal = document.getElementById('bookModal');
  var orderModal = document.getElementById('orderModal');
  var bookBody = document.getElementById('bookBody');
  var bookBodyHTML = bookBody ? bookBody.innerHTML : '';

  function openModal(m){ m.classList.add('open'); m.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  function closeModal(m){ m.classList.remove('open'); m.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }

  // set min date = today
  function initDate(){
    var d = document.getElementById('bkDate');
    if(d){ var t=new Date(); var s=t.toISOString().split('T')[0]; d.min=s; if(!d.value) d.value=s; }
  }
  initDate();

  document.addEventListener('click', function(e){
    var b = e.target.closest('[data-book]');
    var o = e.target.closest('[data-order]');
    if(b){ e.preventDefault(); openModal(bookModal); }
    if(o){ e.preventDefault(); openModal(orderModal); }

    if(e.target.closest('[data-close]')){ closeModal(bookModal); closeModal(orderModal); }
    if(e.target.classList && e.target.classList.contains('modal-veil')){ closeModal(e.target); }

    // party size
    var pBtn = e.target.closest('#bkParty button');
    if(pBtn){ document.querySelectorAll('#bkParty button').forEach(function(x){x.classList.remove('sel');}); pBtn.classList.add('sel'); }

    // submit booking
    if(e.target.id === 'bkSubmit'){
      var name=(document.getElementById('bkName')||{}).value||'';
      var date=(document.getElementById('bkDate')||{}).value||'';
      var time=(document.getElementById('bkTime')||{}).value||'';
      var party=(document.querySelector('#bkParty button.sel')||{}).textContent||'';
      var nice=date;
      try{ nice=new Date(date).toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'}); }catch(err){}
      bookBody.innerHTML = '<div class="modal-confirm"><div class="tick">&#10003;</div>'
        +'<h3>Table requested</h3>'
        +'<p>Thank you'+(name?', '+escapeHtml(name):'')+'. We\'ve noted a table for <b>'+escapeHtml(party)+'</b> on <b>'+escapeHtml(nice)+'</b> at <b>'+escapeHtml(time)+'</b>.<br>We\'ll text you a confirmation shortly.</p>'
        +'<button class="btn btn-fill" data-close style="margin-top:22px">Done</button></div>';
    }
  });

  // restore booking form after close
  [bookModal].forEach(function(m){
    if(!m) return;
    m.addEventListener('transitionend', function(){
      if(!m.classList.contains('open') && bookBody){ bookBody.innerHTML = bookBodyHTML; initDate(); }
    });
  });

  // esc to close
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape'){ closeModal(bookModal); closeModal(orderModal); if(mnav){mnav.classList.remove('open');document.body.style.overflow='';} }
  });

  function escapeHtml(s){ return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
})();
