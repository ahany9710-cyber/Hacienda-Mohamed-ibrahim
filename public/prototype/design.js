// Fade-in on scroll
(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fade-in').forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.fade-in').forEach(function (el) { io.observe(el); });
})();

// Lazy background images keep the hero image first in the network queue.
(function () {
  var els = [].slice.call(document.querySelectorAll('[data-bg]'));
  if (!els.length) return;

  function load(el) {
    var src = el.getAttribute('data-bg');
    if (!src) return;
    el.style.backgroundImage = "url('" + src + "')";
    el.removeAttribute('data-bg');
  }

  if (!('IntersectionObserver' in window)) {
    els.forEach(load);
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      load(entry.target);
      io.unobserve(entry.target);
    });
  }, { rootMargin: '700px 0px' });

  els.forEach(function (el) { io.observe(el); });
})();

// ============================================================
// INSTALLMENT CALCULATOR
// ============================================================
(function () {
  var priceInput = document.getElementById('calc-price');
  var priceOut   = document.getElementById('calc-price-out');
  var downOut    = document.getElementById('calc-down');
  var secondOut  = document.getElementById('calc-second');
  var monthlyOut = document.getElementById('calc-monthly');
  var typeSeg    = document.getElementById('calc-type');
  var cta        = document.getElementById('calc-cta');
  if (!priceInput) return;

  var years = 10;

  // Arabic numerals helper
  function ar(n) { return String(n).replace(/\d/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'[+d]; }); }

  // Format big EGP amount
  function fmtMillion(m) {
    if (m >= 1) {
      var rounded = Math.round(m * 10) / 10;
      return ar(rounded.toString().replace(/\.0$/, '')) + ' مليون';
    }
    return ar(Math.round(m * 1000)) + ' ألف';
  }

  function update() {
    var priceM = +priceInput.value;            // in millions EGP
    var totalEGP = priceM * 1_000_000;
    var downPct = 0.05;
    var secondPct = 0.05;
    var downEGP = totalEGP * downPct;
    var secondEGP = totalEGP * secondPct;
    var remainEGP = totalEGP - downEGP - secondEGP;
    var months = years * 12;
    var monthlyEGP = remainEGP / months;

    priceOut.textContent  = fmtMillion(priceM);
    downOut.textContent   = fmtMillion(downEGP / 1_000_000);
    secondOut.textContent = fmtMillion(secondEGP / 1_000_000);
    monthlyOut.textContent = fmtMillion(monthlyEGP / 1_000_000);

    // Pre-fill WhatsApp with the calculator state
    var msg = 'محتاج تفاصيل أكتر عن قسط وحدة بـ ' + priceM + ' مليون جنيه — ' + years + ' سنين تقسيط · هاسيندا راس الحكمة';
    if (typeof window.hhWaUrl === 'function') { cta.href = window.hhWaUrl('default', msg); } else { cta.href = 'https://wa.me/201159452508?text=' + encodeURIComponent(msg); }
  }

  priceInput.addEventListener('input', update);

  if (typeSeg) {
    typeSeg.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      [].forEach.call(typeSeg.querySelectorAll('button'), function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      years = +btn.dataset.years;
      update();
    });
  }
  update();
})();

// ============================================================
// FLOATING WA TOOLTIP (auto-show on entry, hide after delay)
// ============================================================
(function () {
  var label = document.getElementById('wa-label');
  if (!label) return;

  function schedule(fn, timeout) {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(fn, { timeout: timeout });
      return;
    }
    setTimeout(fn, timeout);
  }

  schedule(function () {
    setTimeout(function () { label.classList.add('show'); }, 2500);
    setTimeout(function () { label.classList.remove('show'); }, 8500);
    // Re-show occasionally, after the page has settled.
    setInterval(function () {
      label.classList.add('show');
      setTimeout(function () { label.classList.remove('show'); }, 5000);
    }, 45000);
  }, 3500);
})();
