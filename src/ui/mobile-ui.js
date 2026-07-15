/**
 * Mobile User Interface Component
 * Provides responsive, accessible UI for Tai-One Media magazine on mobile devices
 * Enhanced with an in-app welcome page, login and registration forms, and basic SPA navigation.
 */

class MobileUI {
  constructor(config = {}) {
    this.container = config.container || document.body;
    this.theme = config.theme || 'light';
    this.breakpoint = config.breakpoint || 768;
    this.initialized = false;
    this.userKey = 'taiOneUser';
  }

  /**
   * Initialize the mobile UI
   */
  init() {
    if (this.initialized) return;

    this.injectStyles();
    this.createHeader();
    this.createNavigation();
    this.createMainContent();
    this.createFooter();
    this.attachEventListeners();
    this.applyTheme(this.theme);
    this.attachAppLink();
    this.handleRouting();

    this.initialized = true;
    console.log('Mobile UI initialized');
  }

  /**
   * Inject minimal styles to ensure visibility and accessibility
   */
  injectStyles() {
    if (document.getElementById('mobile-ui-styles')) return;
    const style = document.createElement('style');
    style.id = 'mobile-ui-styles';
    style.textContent = `
      :root { --bg: #ffffff; --fg: #111827; --brand: #0ea5a4; }
      [data-theme='dark'] { --bg: #0b1220; --fg: #e6f0ff; --brand: #34d399; }
      .mobile-header, .mobile-footer { background: var(--bg); color: var(--fg); padding: 12px; }
      .header-top { display:flex; align-items:center; justify-content:space-between; }
      .logo-img { height:36px; width:auto; }
      .menu-toggle { background:transparent; border:none; padding:8px; }
      .mobile-nav { display:none; background:var(--bg); }
      .mobile-nav.active { display:block; }
      .mobile-main { padding:16px; background:var(--bg); color:var(--fg); min-height:60vh; }
      .article-grid { display:grid; grid-template-columns:1fr; gap:12px; }
      .article-card { border-radius:8px; padding:12px; background:rgba(0,0,0,0.03); }
      .app-link { display:inline-flex; align-items:center; gap:8px; padding:8px 12px; background:var(--brand); color:#fff; border-radius:6px; text-decoration:none; }
      .auth-form { display:flex; flex-direction:column; gap:8px; max-width:420px; }
      .auth-form label { font-size:14px; }
      .auth-form input { padding:10px; border-radius:6px; border:1px solid #cbd5e1; }
      .btn { background:var(--brand); color:#fff; border:none; padding:10px 12px; border-radius:6px; cursor:pointer; }
      .visually-hidden { position:absolute !important; height:1px; width:1px; overflow:hidden; clip:rect(1px,1px,1px,1px); white-space:nowrap; }
      @media(min-width:768px){ .article-grid{ grid-template-columns:repeat(2,1fr); } }
    `;
    document.head.appendChild(style);
  }

  /**
   * Create header section
   */
  createHeader() {
    const header = document.createElement('header');
    header.className = 'mobile-header';
    header.innerHTML = `
      <div class="header-top">
        <div class="logo">
          <img src="/logo.png" alt="Tai-One Media" class="logo-img">
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <a href="#app" id="openAppLink" class="app-link" aria-label="Open Tai-One Media App">Open App</a>
          <button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="mobileNav">
            <span class="hamburger" aria-hidden="true">☰</span>
          </button>
        </div>
      </div>
      <div class="header-search">
        <label for="mobileSearch" class="visually-hidden">Search articles</label>
        <input id="mobileSearch" type="text" placeholder="Search articles..." class="search-input" aria-label="Search articles">
        <button class="search-btn" aria-label="Search">🔍</button>
      </div>
    `;
    this.container.insertBefore(header, this.container.firstChild);
  }

  /**
   * Create navigation menu
   */
  createNavigation() {
    const nav = document.createElement('nav');
    nav.className = 'mobile-nav';
    nav.id = 'mobileNav';
    nav.setAttribute('aria-label', 'Main navigation');
    nav.innerHTML = `
      <ul class="nav-list">
        <li><a href="#home" class="nav-link">Home</a></li>
        <li><a href="#articles" class="nav-link">Articles</a></li>
        <li><a href="#categories" class="nav-link">Categories</a></li>
        <li><a href="#about" class="nav-link">About</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
      </ul>
    `;
    // Insert after header, before main if possible
    const firstMain = this.container.querySelector('main') || this.container.children[1] || null;
    this.container.insertBefore(nav, firstMain);
  }

  /**
   * Create main content area
   */
  createMainContent() {
    let main = this.container.querySelector('main');
    if (!main) {
      main = document.createElement('main');
      main.className = 'mobile-main';
      main.id = 'mainContent';
      this.container.appendChild(main);
    }

    // initial app shell
    main.innerHTML = `
      <div id="appShell" role="application">
        <section id="pageContent"></section>
      </div>
    `;
  }

  /**
   * Create footer section
   */
  createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'mobile-footer';
    footer.innerHTML = `
      <div class="footer-content">
        <p>&copy; 2026 Tai-One Media. All rights reserved.</p>
        <div class="footer-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#social">Social</a>
        </div>
      </div>
    `;
    this.container.appendChild(footer);
  }

  /**
   * Attach event listeners to UI elements
   */
  attachEventListeners() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        this.toggleMenu(mobileNav);
      });
    }

    window.addEventListener('resize', () => this.handleResize());

    // search action (very lightweight)
    const searchBtn = this.container.querySelector('.search-btn');
    const searchInput = this.container.querySelector('#mobileSearch');
    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', () => {
        const q = searchInput.value.trim();
        this.showNotification(q ? `Searching for "${q}"...` : 'Please enter a search term.');
      });
    }

    // Hash-based navigation for SPA pages
    window.addEventListener('hashchange', () => this.handleRouting());
  }

  /**
   * Toggle mobile menu visibility
   */
  toggleMenu(nav) {
    if (!nav) return;
    nav.classList.toggle('active');
  }

  /**
   * Apply theme styling
   */
  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }

  /**
   * Handle window resize
   */
  handleResize() {
    const width = window.innerWidth;
    if (width >= this.breakpoint) {
      console.log('Switching to desktop view');
    } else {
      console.log('Mobile view active');
    }
  }

  /**
   * Render articles to the grid
   */
  renderArticles(articles = []) {
    const page = document.getElementById('pageContent');
    if (!page) return;

    const content = document.createElement('section');
    content.className = 'featured-articles';
    content.innerHTML = `
      <h2>Featured</h2>
      <div class="article-grid" id="articleGrid"></div>
    `;

    page.innerHTML = '';
    page.appendChild(content);

    const grid = page.querySelector('#articleGrid');
    grid.innerHTML = articles.map(article => `
      <article class="article-card">
        <img src="${article.image || '/placeholder.png'}" alt="${article.title}" class="article-image" style="width:100%;height:auto;border-radius:6px;">
        <h3>${article.title}</h3>
        <p>${article.excerpt || ''}</p>
        <a href="${article.url || '#'}" class="read-more">Read More →</a>
      </article>
    `).join('');
  }

  /**
   * Create and attach app launcher link behavior
   */
  attachAppLink() {
    const openLink = document.getElementById('openAppLink');
    if (!openLink) return;
    openLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#welcome';
      this.handleRouting();
      // move focus to main content for accessibility
      const main = document.getElementById('mainContent');
      if (main) main.focus();
    });
  }

  /**
   * Show in-app notification (aria-live)
   */
  showNotification(message) {
    let region = document.getElementById('mobileUiLive');
    if (!region) {
      region = document.createElement('div');
      region.id = 'mobileUiLive';
      region.setAttribute('aria-live', 'polite');
      region.className = 'visually-hidden';
      document.body.appendChild(region);
    }
    region.textContent = message;
    console.log('Notification:', message);
  }

  /**
   * Simple client-side authentication (demo-only): register and login stored in localStorage
   */
  registerUser({ name, email, password }) {
    const user = { name, email, password };
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.showNotification('Registration successful');
    return user;
  }

  loginUser({ email, password }) {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) return null;
    const user = JSON.parse(raw);
    if (user.email === email && user.password === password) {
      this.showNotification('Login successful');
      return user;
    }
    this.showNotification('Invalid email or password');
    return null;
  }

  /**
   * Render the welcome page
   */
  renderWelcome() {
    const page = document.getElementById('pageContent');
    if (!page) return;
    const raw = localStorage.getItem(this.userKey);
    const user = raw ? JSON.parse(raw) : null;

    page.innerHTML = `
      <section aria-labelledby="welcomeTitle">
        <h1 id="welcomeTitle">Welcome to Tai-One Media</h1>
        <p>Explore curated articles, categories, and the latest news. Please sign in to personalize your experience.</p>
        <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;">
          ${user ? `<div>Signed in as <strong>${this.escapeHtml(user.name)}</strong></div>` : ''}
          <a href="#articles" class="btn">Browse Articles</a>
          ${user ? '' : '<button id="showLoginBtn" class="btn" aria-haspopup="dialog">Sign In / Register</button>'}
        </div>
      </section>
    `;

    const loginBtn = document.getElementById('showLoginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => this.showAuthDialog());
    }
  }

  /**
   * Escape HTML for safe insertion
   */
  escapeHtml(str = '') {
    return String(str).replace(/[&<>"]+/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[s]));
  }

  /**
   * Render articles listing page (basic)
   */
  renderArticlesList() {
    // demo content
    const articles = [
      { image: '/placeholder.png', title: 'Issue 1: Digital Trends', excerpt: 'A quick overview of 2026 digital trends', url: '/articles/1' },
      { image: '/placeholder.png', title: 'Deep Dive: Media Strategy', excerpt: 'How to reach your audience', url: '/articles/2' }
    ];
    this.renderArticles(articles);
  }

  /**
   * Show a combined auth dialog with login and registration forms
   */
  showAuthDialog() {
    const page = document.getElementById('pageContent');
    if (!page) return;

    page.innerHTML = `
      <section aria-labelledby="authTitle">
        <h2 id="authTitle">Sign In or Register</h2>
        <div style="display:flex;gap:16px;flex-direction:column;">
          <form id="loginForm" class="auth-form" aria-label="Login form">
            <label for="loginEmail">Email</label>
            <input id="loginEmail" type="email" required autocomplete="email">
            <label for="loginPassword">Password</label>
            <input id="loginPassword" type="password" required autocomplete="current-password">
            <button type="button" id="loginSubmit" class="btn">Sign In</button>
          </form>

          <hr aria-hidden="true">

          <form id="registerForm" class="auth-form" aria-label="Registration form">
            <label for="regName">Name</label>
            <input id="regName" type="text" required autocomplete="name">
            <label for="regEmail">Email</label>
            <input id="regEmail" type="email" required autocomplete="email">
            <label for="regPassword">Password</label>
            <input id="regPassword" type="password" required autocomplete="new-password">
            <button type="button" id="registerSubmit" class="btn">Create Account</button>
          </form>
        </div>
      </section>
    `;

    // attach handlers
    const loginSubmit = document.getElementById('loginSubmit');
    const registerSubmit = document.getElementById('registerSubmit');

    if (loginSubmit) {
      loginSubmit.addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const user = this.loginUser({ email, password });
        if (user) this.showAfterAuth(user);
      });
    }

    if (registerSubmit) {
      registerSubmit.addEventListener('click', () => {
        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        if (!name || !email || !password) {
          this.showNotification('Please fill out all registration fields');
          return;
        }
        const user = this.registerUser({ name, email, password });
        if (user) this.showAfterAuth(user);
      });
    }
  }

  /**
   * After successful auth: navigate to welcome and show user
   */
  showAfterAuth(user) {
    this.showNotification(`Welcome, ${user.name}`);
    window.location.hash = '#welcome';
    this.handleRouting();
  }

  /**
   * Handle simple routing based on hash
   */
  handleRouting() {
    const hash = (window.location.hash || '#welcome').replace('#', '');
    switch (hash) {
      case 'welcome':
        this.renderWelcome();
        break;
      case 'articles':
        this.renderArticlesList();
        break;
      case 'home':
        this.renderWelcome();
        break;
      case 'login':
        this.showAuthDialog();
        break;
      default:
        // unknown routes - show welcome
        this.renderWelcome();
        break;
    }
  }

  /**
   * Destroy and cleanup the UI
   */
  destroy() {
    document.querySelectorAll('.mobile-header, .mobile-nav, .mobile-footer').forEach(el => el.remove());
    const main = document.getElementById('mainContent');
    if (main) main.remove();
    this.initialized = false;
  }
}

export default MobileUI;
