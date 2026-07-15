/**
 * Mobile User Interface Component
 * Provides responsive UI for Tai-One Media magazine on mobile devices
 */

class MobileUI {
  constructor(config = {}) {
    this.container = config.container || document.body;
    this.theme = config.theme || 'light';
    this.breakpoint = config.breakpoint || 768;
    this.initialized = false;
  }

  /**
   * Initialize the mobile UI
   */
  init() {
    if (this.initialized) return;
    
    this.createHeader();
    this.createNavigation();
    this.createMainContent();
    this.createFooter();
    this.attachEventListeners();
    this.applyTheme(this.theme);
    this.initialized = true;
    
    console.log('Mobile UI initialized');
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
        <button class="menu-toggle" id="menuToggle">
          <span class="hamburger"></span>
        </button>
      </div>
      <div class="header-search">
        <input type="text" placeholder="Search articles..." class="search-input">
        <button class="search-btn">🔍</button>
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
    nav.innerHTML = `
      <ul class="nav-list">
        <li><a href="/" class="nav-link">Home</a></li>
        <li><a href="/articles" class="nav-link">Articles</a></li>
        <li><a href="/categories" class="nav-link">Categories</a></li>
        <li><a href="/about" class="nav-link">About</a></li>
        <li><a href="/contact" class="nav-link">Contact</a></li>
      </ul>
    `;
    this.container.insertBefore(nav, this.container.querySelector('main') || this.container.children[1]);
  }

  /**
   * Create main content area
   */
  createMainContent() {
    const main = document.createElement('main');
    main.className = 'mobile-main';
    main.id = 'mainContent';
    main.innerHTML = `
      <section class="featured-articles">
        <h2>Featured</h2>
        <div class="article-grid" id="articleGrid"></div>
      </section>
    `;
    if (!this.container.querySelector('main')) {
      this.container.appendChild(main);
    }
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
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/social">Social</a>
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
      menuToggle.addEventListener('click', () => this.toggleMenu(mobileNav));
    }

    window.addEventListener('resize', () => this.handleResize());
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
  renderArticles(articles) {
    const grid = document.getElementById('articleGrid');
    if (!grid) return;

    grid.innerHTML = articles.map(article => `
      <article class="article-card">
        <img src="${article.image}" alt="${article.title}" class="article-image">
        <h3>${article.title}</h3>
        <p>${article.excerpt}</p>
        <a href="${article.url}" class="read-more">Read More →</a>
      </article>
    `).join('');
  }

  /**
   * Destroy and cleanup the UI
   */
  destroy() {
    document.querySelectorAll('.mobile-header, .mobile-nav, .mobile-footer').forEach(el => el.remove());
    this.initialized = false;
  }
}

export default MobileUI;
