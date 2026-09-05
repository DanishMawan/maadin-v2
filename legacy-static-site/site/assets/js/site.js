/* =========================================================================
   Maadin.AI — shared behaviour.  Motion values are PRD §8.
   Content never depends on an animation firing.
   ========================================================================= */
(function () {
  'use strict';
  var d = document;
  d.documentElement.classList.remove('no-js');
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  // Transitions are paused in a hidden document; a class toggle would leave
  // every reveal frozen at its start value. Render the end state instead.
  if (d.hidden) d.documentElement.classList.add('no-anim');
  d.addEventListener('visibilitychange', function () {
    if (!d.hidden) setTimeout(function () {
      d.documentElement.classList.remove('no-anim');
    }, 60);
  });

  /* --- Mobile nav ------------------------------------------------------- */
  var nav = d.querySelector('[data-nav]');
  if (nav) {
    var toggle = nav.querySelector('[data-nav-toggle]');
    var panel = nav.querySelector('[data-nav-links]');
    var setOpen = function (o) {
      nav.setAttribute('data-open', String(o));
      toggle.setAttribute('aria-expanded', String(o));
      d.body.style.overflow = o ? 'hidden' : '';
    };
    toggle.addEventListener('click', function () {
      setOpen(nav.getAttribute('data-open') !== 'true');
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.getAttribute('data-open') === 'true') { setOpen(false); toggle.focus(); }
    });
    panel.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || nav.getAttribute('data-open') !== 'true') return;
      var f = panel.querySelectorAll('a[href]'); if (!f.length) return;
      if (e.shiftKey && d.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && d.activeElement === f[f.length - 1]) { e.preventDefault(); toggle.focus(); }
    });
    matchMedia('(min-width: 810px)').addEventListener('change', function (m) { if (m.matches) setOpen(false); });
  }

  /* --- Stroke measurement -------------------------------------------------
     ROOT CAUSE FIX. Every drawn path had a hardcoded dasharray. Where that
     number was shorter than the real path, dashoffset could never reach 0 and
     the stroke stayed permanently part-drawn. Measure each path instead, and
     verify afterwards that nothing is left incomplete.                      */
  function measureStrokes(scope) {
    var paths = (scope || d).querySelectorAll('.fig .draw');
    for (var i = 0; i < paths.length; i++) {
      var el = paths[i];
      if (el.dataset.len) continue;
      var len;
      try { len = el.getTotalLength(); } catch (e) { len = 0; }
      if (!len || !isFinite(len)) {                 // non-path geometry
        var bb; try { bb = el.getBBox(); } catch (e2) { bb = null; }
        len = bb ? (bb.width + bb.height) * 2 : 0;
      }
      len = Math.ceil(len) + 2;                     // never round down
      el.dataset.len = String(len);
      el.style.strokeDasharray = len + ' ' + len;
      el.style.setProperty('--len', len + 'px');
      // NOTE: do NOT set strokeDashoffset inline. An inline value outranks the
      // `.in .fig .draw { stroke-dashoffset: 0 }` rule, which is what left every
      // stroke permanently part-drawn. CSS owns the offset.
    }
  }
  measureStrokes(d);
  // Re-measure when the box changes: a resized figure has different geometry.
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(function (entries) {
      entries.forEach(function (en) {
        en.target.querySelectorAll('.fig .draw').forEach(function (el) {
          if (el.closest('.in')) return;            // already animating/drawn
          delete el.dataset.len;
        });
        measureStrokes(en.target);
      });
    });
    d.querySelectorAll('.dia').forEach(function (n) { ro.observe(n); });
  }

  /* --- Reveal: opacity .001->1, translateY 20->0, 500ms, 100ms stagger --- */
  var STAGGER = 100, CAP = 6;
  var items = [].slice.call(d.querySelectorAll('[data-rv]'));
  // Late guarantee only — the CSS class drives the animation. This runs well
  // after the transition window and snaps shut anything that did not finish.
  var settleStrokes = function (el) {
    if (!el.querySelectorAll) return;
    setTimeout(function () {
      el.querySelectorAll('.fig .draw').forEach(function (p) {
        if ((parseFloat(getComputedStyle(p).strokeDashoffset) || 0) > 0.5) {
          p.style.strokeDashoffset = '0px';
        }
      });
    }, 2200);
  };
  var showAll = function () {
    items.forEach(function (el) { el.classList.add('in'); settleStrokes(el); countUp(el); });
  };

  if (reduced.matches || !('IntersectionObserver' in window) || d.hidden) {
    showAll();
  } else {
    d.querySelectorAll('[data-rv-group]').forEach(function (g) {
      [].slice.call(g.querySelectorAll('[data-rv]')).forEach(function (el, i) {
        el.style.setProperty('--d', Math.min(i, CAP - 1) * STAGGER + 'ms');
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
        settleStrokes(en.target);
        countUp(en.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });
    items.forEach(function (el) { io.observe(el); });

    setTimeout(function () {           // backstop — never leave content hidden
      items.forEach(function (el) {
        if (el.classList.contains('in')) return;
        if (el.getBoundingClientRect().top < innerHeight * 1.25) {
          el.classList.add('in'); io.unobserve(el); settleStrokes(el); countUp(el);
        }
      });
    }, 1400);

    // Final guarantee: nothing may sit part-drawn. Anything still offset after
    // the animation window is snapped to complete.
    setTimeout(function () {
      d.querySelectorAll('.fig .draw').forEach(function (p) {
        if (parseFloat(p.style.strokeDashoffset) > 0.5 && p.closest('.in')) {
          p.style.strokeDashoffset = '0px';
        }
      });
    }, 4000);
    d.addEventListener('visibilitychange', function () {
      if (d.hidden) return;
      setTimeout(function () {
        items.forEach(function (el) {
          if (!el.classList.contains('in') && el.getBoundingClientRect().top < innerHeight) {
            el.classList.add('in'); io.unobserve(el); settleStrokes(el); countUp(el);
          }
        });
      }, 100);
    });
  }

  /* --- Count-up. PRD §3.5: the FINAL value lives in the markup, so with no
     JS, a hidden tab, or reduced motion the correct number renders. -------- */
  function countUp(scope) {
    if (reduced.matches) return;
    var nodes = (scope.matches && scope.matches('[data-count]'))
      ? [scope] : [].slice.call(scope.querySelectorAll('[data-count]'));
    nodes.forEach(function (el) {
      if (el.dataset.counted) return;
      el.dataset.counted = '1';
      var finalText = el.textContent;
      var m = finalText.match(/-?[\d.,]+/);
      if (!m) return;
      var target = parseFloat(m[0].replace(/,/g, ''));
      if (!isFinite(target) || target === 0) return;

      // PRD §3.5: a screenshot or a dropped frame must never show a number
      // that is not true. Small values are left static — counting 2 -> 3 buys
      // nothing and risks rendering "2". Larger ones start at 70% of target,
      // so every intermediate frame is already in the right neighbourhood.
      if (Math.abs(target) < 10) return;
      var from = Math.round(target * 0.7);

      var dec = (m[0].split('.')[1] || '').length;
      var pre = finalText.slice(0, m.index), post = finalText.slice(m.index + m[0].length);
      var t0 = null, DUR = 800;
      requestAnimationFrame(function step(t) {
        if (t0 === null) t0 = t;
        var p = Math.min((t - t0) / DUR, 1);
        var v = (from + (target - from) * (1 - Math.pow(1 - p, 3))).toFixed(dec);
        el.textContent = pre + (dec ? v : Math.round(v).toLocaleString()) + post;
        if (p < 1) requestAnimationFrame(step); else el.textContent = finalText;
      });
    });
  }

  /* --- Expandable rows --------------------------------------------------- */
  d.querySelectorAll('[data-row-btn]').forEach(function (btn) {
    var p = d.getElementById(btn.getAttribute('aria-controls'));
    if (!p) return;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if (reduced.matches) { p.style.height = open ? '0px' : 'auto'; return; }
      if (open) { p.style.height = p.scrollHeight + 'px'; void p.offsetHeight; p.style.height = '0px'; }
      else {
        p.style.height = p.scrollHeight + 'px';
        var done = false;
        var release = function () { if (done) return; done = true; p.style.height = 'auto';
          p.removeEventListener('transitionend', onEnd); };
        var onEnd = function (e) { if (e.propertyName === 'height') release(); };
        p.addEventListener('transitionend', onEnd);
        setTimeout(release, 400);
      }
    });
  });

  /* --- §6b.5 sticky sub-nav: marks the section currently in view ---------- */
  var sub = d.querySelector('[data-subnav]');
  if (sub && 'IntersectionObserver' in window) {
    var links = [].slice.call(sub.querySelectorAll('a'));
    var targets = links.map(function (a) { return d.getElementById(a.getAttribute('href').slice(1)); })
                       .filter(Boolean);
    if (targets.length) {
      links[0].setAttribute('data-active', 'true');
      var sio = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) {
            a.setAttribute('data-active', String(a.getAttribute('href') === '#' + e.target.id));
          });
        });
      }, { rootMargin: '-25% 0px -65% 0px' });
      targets.forEach(function (t) { sio.observe(t); });
    }
  }

  /* --- Contact intent segmenter ------------------------------------------ */
  var seg = d.querySelector('[data-seg]');
  if (seg) {
    var topic = d.getElementById('topic');
    var note = d.querySelector('[data-seg-note]');
    var NOTES = {
      invest: 'Investor enquiries reach Arshad directly. Materials are shared under NDA.',
      build: 'Partnership and operator enquiries — expect a reply within two business days.',
      advisory: 'Advisory enquiries are answered personally. Two concurrent client slots.'
    };
    seg.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        seg.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        if (topic) topic.value = b.dataset.value;
        if (note) note.textContent = NOTES[b.dataset.key] || '';
      });
    });
  }

  /* --- Footer live clock (PRD §6b footer pattern) ------------------------- */
  var clock = d.querySelector('[data-clock]');
  if (clock) {
    var tick = function () {
      var n = new Date();
      var p = function (v) { return String(v).padStart(2, '0'); };
      clock.textContent = p(n.getUTCHours()) + ':' + p(n.getUTCMinutes()) + ':' + p(n.getUTCSeconds()) + ' UTC';
    };
    tick();
    if (!reduced.matches) setInterval(tick, 1000);
  }
})();
