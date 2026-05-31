/**
 * guide-base.js
 * Auto-builds sidebar TOC, mobile menu, progress bar, back-to-top
 * for simple guide pages that include guide-base.css.
 *
 * Looks for h2/h3 headings inside .page-wrap and constructs the
 * navigation. Each heading without an id gets one auto-assigned.
 */
(function () {
  'use strict';

  function slugify(text) {
    return text
      .trim()
      .toLowerCase()
      .replace(/[^\u0E00-\u0E7Fa-z0-9\s-]/gi, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 60) || 'section';
  }

  function ensureId(el, fallbackIndex) {
    if (!el.id) {
      var base = slugify(el.textContent || ('section-' + fallbackIndex));
      var id = base, i = 2;
      while (document.getElementById(id)) { id = base + '-' + i++; }
      el.id = id;
    }
    return el.id;
  }

  function build() {
    var pageWrap = document.querySelector('.page-wrap');
    if (!pageWrap) return;

    var headings = pageWrap.querySelectorAll('h2, h3');
    if (headings.length === 0) return;

    // Assign ids to all headings
    var items = [];
    headings.forEach(function (h, i) {
      var id = ensureId(h, i);
      items.push({ id: id, text: h.textContent.trim(), tag: h.tagName.toLowerCase() });
    });

    // ---- SIDEBAR ----
    var sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = '<div class="sidebar-title">สารบัญ</div>';
    var sidebarUl = document.createElement('ul');
    sidebarUl.className = 'toc-list';
    items.forEach(function (it) {
      var li = document.createElement('li');
      if (it.tag === 'h3') li.className = 'toc-h3';
      var a = document.createElement('a');
      a.href = '#' + it.id;
      a.textContent = it.text;
      li.appendChild(a);
      sidebarUl.appendChild(li);
    });
    sidebar.appendChild(sidebarUl);
    document.body.appendChild(sidebar);

    // ---- MOBILE MENU ----
    var overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.id = 'mobileMenuOverlay';
    document.body.appendChild(overlay);

    var mm = document.createElement('div');
    mm.className = 'mobile-menu';
    mm.id = 'mobileMenu';
    mm.innerHTML = '<div class="mm-title">สารบัญ</div>';
    var mmUl = document.createElement('ul');
    mmUl.className = 'mm-list';
    items.forEach(function (it) {
      var li = document.createElement('li');
      if (it.tag === 'h3') li.className = 'sub';
      var a = document.createElement('a');
      a.href = '#' + it.id;
      a.textContent = it.text;
      li.appendChild(a);
      mmUl.appendChild(li);
    });
    mm.appendChild(mmUl);
    document.body.appendChild(mm);

    // ---- HAMBURGER BUTTON in top-nav ----
    var topNav = document.querySelector('.top-nav');
    var hamburger = null;
    if (topNav) {
      hamburger = document.createElement('button');
      hamburger.className = 'hamburger-btn';
      hamburger.id = 'hamburgerBtn';
      hamburger.setAttribute('aria-label', 'เปิดเมนู');
      hamburger.innerHTML = '<span></span><span></span><span></span>';
      topNav.appendChild(hamburger);
    }

    // ---- PROGRESS BAR ----
    var progress = document.createElement('div');
    progress.className = 'progress-bar';
    progress.innerHTML = '<div class="fill" id="progressFill"></div>';
    document.body.insertBefore(progress, document.body.firstChild);

    // ---- BACK TO TOP ----
    var btt = document.createElement('button');
    btt.className = 'back-to-top';
    btt.id = 'backToTop';
    btt.type = 'button';
    btt.innerHTML = '↑';
    btt.setAttribute('aria-label', 'กลับขึ้นด้านบน');
    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(btt);

    // ---- INTERACTIONS ----
    function toggleMenu() {
      if (!hamburger) return;
      var open = mm.classList.toggle('open');
      overlay.classList.toggle('open', open);
      hamburger.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
    function closeMenu() {
      if (!hamburger) return;
      mm.classList.remove('open');
      overlay.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    mm.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    // Smooth scroll
    document.querySelectorAll('.toc-list a, .mobile-menu a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Scroll listeners (progress bar, back-to-top, active TOC)
    var fill = document.getElementById('progressFill');
    var sectionEls = items.map(function (it) { return document.getElementById(it.id); }).filter(Boolean);
    var tocLinks = sidebar.querySelectorAll('.toc-list a');

    window.addEventListener('scroll', function () {
      var st = window.scrollY;
      var dh = document.documentElement.scrollHeight - window.innerHeight;
      if (fill) fill.style.width = (dh > 0 ? (st / dh) * 100 : 0) + '%';
      btt.classList.toggle('visible', st > 400);

      var current = '';
      sectionEls.forEach(function (s) {
        var top = s.offsetTop - 100;
        if (st >= top) current = s.id;
      });
      tocLinks.forEach(function (link) {
        var match = link.getAttribute('href') === '#' + current;
        link.style.borderLeftColor = match ? '#3b82f6' : 'transparent';
        link.style.color = match ? '#60a5fa' : '';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
