/**
 * Dark/Light Theme Toggle
 * Shared across all pages — persists preference via localStorage
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'theme-preference';
  const LIGHT = 'light';
  const DARK = 'dark';

  /* ── Light-mode CSS overrides ─────────────────────────────── */
  const lightCSS = `
    [data-theme="light"] {
      --bg-primary: #f8fafc;
      --bg-secondary: #f1f5f9;
      --bg-card: #ffffff;
      --bg-card-hover: #f8fafc;
      --bg-code: #f1f5f9;
      --border-primary: #e2e8f0;
      --border-accent: #3b82f6;
      --text-primary: #1e293b;
      --text-secondary: #475569;
      --text-muted: #94a3b8;
      --accent-blue: #2563eb;
      --accent-blue-light: #3b82f6;
      --accent-cyan: #0891b2;
      --accent-green: #059669;
      --accent-emerald: #059669;
      --accent-yellow: #d97706;
      --accent-orange: #ea580c;
      --accent-red: #dc2626;
      --accent-purple: #7c3aed;
      --accent-pink: #db2777;
      --shadow-lg: 0 8px 30px rgba(0,0,0,0.08);
      --shadow-glow-blue: 0 0 20px rgba(59,130,246,0.08);
      --shadow-glow-red: 0 0 20px rgba(239,68,68,0.08);
      --shadow-glow-green: 0 0 20px rgba(16,185,129,0.08);
    }

    /* Nav & sidebar backgrounds */
    [data-theme="light"] .top-nav {
      background: rgba(248,250,252,0.92) !important;
      border-bottom-color: #e2e8f0 !important;
    }
    [data-theme="light"] .sidebar {
      background: #f1f5f9 !important;
      border-right-color: #e2e8f0 !important;
    }

    /* Scrollbar */
    [data-theme="light"] ::-webkit-scrollbar-track { background: #f8fafc; }
    [data-theme="light"] ::-webkit-scrollbar-thumb { background: #cbd5e1; }
    [data-theme="light"] ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

    /* Hero section — keep gradient but lighten */
    [data-theme="light"] .hero {
      background: linear-gradient(135deg, #eff6ff 0%, #f0f0ff 50%, #f0fdf4 100%) !important;
      border-color: rgba(59,130,246,0.15) !important;
    }
    [data-theme="light"] .hero::before {
      background: radial-gradient(circle at 30% 50%, rgba(59,130,246,0.04) 0%, transparent 60%),
                  radial-gradient(circle at 70% 50%, rgba(139,92,246,0.04) 0%, transparent 60%) !important;
    }

    /* Cards */
    [data-theme="light"] .card,
    [data-theme="light"] .col-card,
    [data-theme="light"] .rule-card,
    [data-theme="light"] .error-item {
      background: #ffffff !important;
      border-color: #e2e8f0 !important;
    }
    [data-theme="light"] .card:hover,
    [data-theme="light"] .col-card:hover {
      border-color: rgba(59,130,246,0.3) !important;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06) !important;
    }

    /* Quote block */
    [data-theme="light"] .quote-block {
      background: #f8fafc !important;
    }

    /* Info boxes — slightly stronger backgrounds for readability */
    [data-theme="light"] .info-box.tip { background: rgba(5,150,105,0.06) !important; border-color: rgba(5,150,105,0.2) !important; }
    [data-theme="light"] .info-box.warning { background: rgba(234,88,12,0.06) !important; border-color: rgba(234,88,12,0.2) !important; }
    [data-theme="light"] .info-box.danger { background: rgba(220,38,38,0.06) !important; border-color: rgba(220,38,38,0.2) !important; }
    [data-theme="light"] .info-box.info { background: rgba(37,99,235,0.06) !important; border-color: rgba(37,99,235,0.2) !important; }
    [data-theme="light"] .info-box.observe { background: rgba(124,58,237,0.06) !important; border-color: rgba(124,58,237,0.2) !important; }

    /* Tables */
    [data-theme="light"] thead { background: rgba(59,130,246,0.06) !important; }
    [data-theme="light"] thead.red-head { background: rgba(220,38,38,0.06) !important; }
    [data-theme="light"] thead.green-head { background: rgba(5,150,105,0.06) !important; }
    [data-theme="light"] thead.blue-head { background: rgba(37,99,235,0.06) !important; }
    [data-theme="light"] thead.warn-head { background: rgba(234,88,12,0.06) !important; }
    [data-theme="light"] th { border-bottom-color: #e2e8f0 !important; }
    [data-theme="light"] td { border-bottom-color: #f1f5f9 !important; }
    [data-theme="light"] tbody tr:hover { background: rgba(59,130,246,0.03) !important; }
    [data-theme="light"] .table-wrapper { border-color: #e2e8f0 !important; }

    /* Diagram / code blocks */
    [data-theme="light"] .diagram-block,
    [data-theme="light"] .formula-block {
      background: #f1f5f9 !important;
      border-color: #e2e8f0 !important;
    }

    /* Checklist box */
    [data-theme="light"] .checklist-box {
      background: #f1f5f9 !important;
      border-color: #e2e8f0 !important;
    }

    /* Mobile menu */
    [data-theme="light"] .mobile-menu {
      background: #f1f5f9 !important;
      border-left-color: #e2e8f0 !important;
    }
    [data-theme="light"] .mobile-menu-overlay.open {
      background: rgba(0,0,0,0.2) !important;
    }

    /* Nav logo */
    [data-theme="light"] .nav-logo {
      background: rgba(37,99,235,0.08) !important;
    }
    [data-theme="light"] .nav-logo:hover {
      background: rgba(37,99,235,0.14) !important;
    }

    /* Guide cards (index page) */
    [data-theme="light"] .guide-card {
      background: #ffffff !important;
      border-color: #e2e8f0 !important;
    }
    [data-theme="light"] .guide-card:hover {
      border-color: rgba(59,130,246,0.3) !important;
      box-shadow: 0 8px 30px rgba(0,0,0,0.06) !important;
    }

    /* Progress bar background */
    [data-theme="light"] .progress-bar { background: transparent; }

    /* Back to top */
    [data-theme="light"] .back-to-top {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
    }

    /* Versus badge */
    [data-theme="light"] .versus .vs-badge {
      background: #f1f5f9 !important;
      border-color: #e2e8f0 !important;
    }

    /* TOC divider */
    [data-theme="light"] .toc-divider,
    [data-theme="light"] .mm-divider {
      background: #e2e8f0 !important;
    }

    /* Step flow line */
    [data-theme="light"] .step-item::after {
      background: #e2e8f0 !important;
    }

    /* Hamburger button */
    [data-theme="light"] .hamburger-btn {
      background: rgba(37,99,235,0.06) !important;
      border-color: rgba(37,99,235,0.15) !important;
    }

    /* Football field */
    [data-theme="light"] .ff-bar-container {
      background: rgba(0,0,0,0.03) !important;
      border-color: rgba(0,0,0,0.06) !important;
    }

    /* Indicator card */
    [data-theme="light"] .indicator-card {
      background: #ffffff !important;
      border-color: #e2e8f0 !important;
    }
    [data-theme="light"] .indicator-card .formula {
      background: #f1f5f9 !important;
      border-color: #e2e8f0 !important;
    }

    /* ── guide-base.css simple pages ─────────────────────── */
    [data-theme="light"] body {
      background: var(--bg-primary) !important;
      color: var(--text-primary) !important;
    }
    [data-theme="light"] h1,
    [data-theme="light"] h2 {
      color: var(--text-primary) !important;
      border-bottom-color: var(--border-primary) !important;
    }
    [data-theme="light"] h3 { color: var(--accent-blue) !important; }
    [data-theme="light"] h4 { color: var(--accent-cyan) !important; }
    [data-theme="light"] p,
    [data-theme="light"] li,
    [data-theme="light"] td { color: var(--text-secondary) !important; }
    [data-theme="light"] strong { color: var(--text-primary) !important; }
    [data-theme="light"] em { color: var(--text-primary) !important; }
    [data-theme="light"] a { color: var(--accent-blue) !important; }
    [data-theme="light"] a:hover { color: var(--accent-cyan) !important; }
    [data-theme="light"] hr { border-top-color: var(--border-primary) !important; }
    [data-theme="light"] code {
      background: #f1f5f9 !important;
      color: #be185d !important;
      border-color: #e2e8f0 !important;
    }
    [data-theme="light"] pre,
    [data-theme="light"] .code-block {
      background: #f8fafc !important;
      border-color: #e2e8f0 !important;
      color: #334155 !important;
    }
    [data-theme="light"] table { color: var(--text-secondary) !important; }
    [data-theme="light"] th { color: var(--accent-blue) !important; }
    [data-theme="light"] blockquote {
      background: #f8fafc !important;
      color: var(--text-secondary) !important;
    }
    [data-theme="light"] .toc {
      background: #ffffff !important;
      border-color: #e2e8f0 !important;
    }
    [data-theme="light"] .back-home {
      background: rgba(37,99,235,0.08) !important;
      color: var(--accent-blue) !important;
      border-color: rgba(37,99,235,0.2) !important;
    }
    [data-theme="light"] .back-home:hover {
      background: rgba(37,99,235,0.14) !important;
    }
    [data-theme="light"] .page-footer {
      color: var(--text-muted) !important;
      border-top-color: var(--border-primary) !important;
    }
    [data-theme="light"] .subtitle { color: var(--text-secondary) !important; }

    /* ── Theme toggle button ─────────────────────────── */
    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1px solid var(--border-primary);
      background: transparent;
      cursor: pointer;
      color: var(--text-secondary);
      font-size: 1.1rem;
      transition: all 0.3s ease;
      flex-shrink: 0;
      margin-left: 0.5rem;
      padding: 0;
      line-height: 1;
    }
    .theme-toggle:hover {
      color: var(--accent-blue);
      border-color: var(--accent-blue);
      background: rgba(59,130,246,0.08);
    }
  `;

  /* ── Inject stylesheet ────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = lightCSS;
  document.head.appendChild(style);

  /* ── Read saved preference or system preference ──── */
  function getPreferred() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === LIGHT || saved === DARK) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK;
  }

  /* ── Apply theme ──────────────────────────────────── */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    // Update all toggle button icons on the page
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.innerHTML = theme === LIGHT ? '🌙' : '☀️';
      btn.setAttribute('aria-label', theme === LIGHT ? 'เปลี่ยนเป็นโหมดมืด' : 'เปลี่ยนเป็นโหมดสว่าง');
      btn.setAttribute('title', theme === LIGHT ? 'Dark Mode' : 'Light Mode');
    });
  }

  /* ── Create toggle button ─────────────────────────── */
  function createToggle() {
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || DARK;
      applyTheme(current === DARK ? LIGHT : DARK);
    });
    return btn;
  }

  /* ── Init ──────────────────────────────────────────── */
  function init() {
    // Insert toggle into top-nav (before hamburger if present, otherwise at end)
    var nav = document.querySelector('.top-nav');
    if (nav) {
      var hamburger = nav.querySelector('.hamburger-btn');
      var toggle = createToggle();
      if (hamburger) {
        nav.insertBefore(toggle, hamburger);
      } else {
        nav.appendChild(toggle);
      }
    }

    // For index page (no .top-nav), add a floating toggle
    if (!nav) {
      var container = document.querySelector('.container') || document.body;
      var floatingToggle = createToggle();
      floatingToggle.style.position = 'fixed';
      floatingToggle.style.top = '1rem';
      floatingToggle.style.right = '1rem';
      floatingToggle.style.zIndex = '9999';
      floatingToggle.style.background = 'var(--bg-card)';
      floatingToggle.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
      document.body.appendChild(floatingToggle);
    }

    applyTheme(getPreferred());
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();