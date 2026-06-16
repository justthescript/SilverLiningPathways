/* =====================================================================
 * Silver Lining Pathways LLC — Wix Studio Custom Element Suite
 * ---------------------------------------------------------------------
 * ONE FILE, THREE TAGS:
 *   <slp-header></slp-header>                  → sticky nav bar (every page)
 *   <slp-page data-page="home"></slp-page>     → page body (set data-page)
 *   <slp-footer></slp-footer>                  → footer (every page)
 *
 * data-page values:
 *   home | about | services | pricing | events | book |
 *   groups | members | inquiry | loyalty | privacy | accessibility
 *
 * DEPLOY (matches the BDDC pattern):
 *   1. Push this file to a public GitHub repo.
 *   2. Serve via GitHub Pages  https://<user>.github.io/<repo>/slp-pages.js
 *      (or jsDelivr; if jsDelivr, pin a commit SHA, not @main, to dodge the
 *       7-day stale-cache bug we hit on BDDC).
 *   3. In Wix Studio: Add → Embed → Custom Element.
 *        Server URL = the .js URL
 *        Tag Name   = slp-header / slp-page / slp-footer
 *      For <slp-page>, add a custom attribute  data-page = <value>.
 *
 * NOTE ON THE WIX-APP PAGES (events / book / groups / members / loyalty /
 * pricing): those run on native Wix apps (Bookings, Events, Members,
 * Loyalty, Pricing Plans) that a static element CANNOT replicate. On those
 * pages, place <slp-page> as an INTRO band ABOVE the native Wix widget —
 * do not delete the Wix widget. The CTA buttons point at the live routes.
 * ===================================================================== */
(function () {
  'use strict';

  /* -------------------------------------------------------------- fonts */
  function injectFonts() {
    if (document.getElementById('slp-fonts')) return;
    var pre1 = document.createElement('link');
    pre1.rel = 'preconnect'; pre1.href = 'https://fonts.googleapis.com';
    var pre2 = document.createElement('link');
    pre2.rel = 'preconnect'; pre2.href = 'https://fonts.gstatic.com'; pre2.crossOrigin = '';
    var link = document.createElement('link');
    link.id = 'slp-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?' +
      'family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&' +
      'family=Nunito+Sans:wght@300;400;600;700&' +
      'family=Sacramento&display=swap';
    document.head.appendChild(pre1);
    document.head.appendChild(pre2);
    document.head.appendChild(link);
  }

  /* ----------------------------------------------------- shared routes */
  var NAV = [
    { label: 'Home',            href: '/' },
    { label: 'About',           href: '/about' },
    { label: 'Services',        href: '/services' },
    { label: 'Plans & Pricing', href: '/pricing-plans/plans-pricing' },
    { label: 'Events',          href: '/event-list' },
    { label: 'Book Online',     href: '/book-online' },
    { label: 'Groups',          href: '/groups' },
    { label: 'Members',         href: '/members' },
    { label: 'Inquiry',         href: '/inquiry-services-page' },
    { label: 'Loyalty',         href: '/loyalty' }
  ];
  var PHONE = '219-361-9900';
  var PHONE_HREF = 'tel:+12193619900';
  var EMAIL = 'info@silverliningpathwaysllc.com';

  /* ----------------------------------------------------- image helpers */
  function wimg(file, w, h, mode) {
    mode = mode || 'fill';
    return 'https://static.wixstatic.com/media/' + file +
      '/v1/' + mode + '/w_' + w + ',h_' + h + ',al_c,q_90,enc_auto/' + file;
  }
  var IMG = {
    heroMist: 'media/11062b_a8d506de49df4efca4c0a3b907d9dc57~mv2.jpg'.replace('media/', ''),
    team:     'e064dc_e9aca33856bb40a5b6af078278091d93~mv2.jpg',
    gallery: [
      'e064dc_7b51998fed00440eb468e48870ac2361~mv2.jpg',
      'e064dc_a075b5e9b3f14f26bfb8dcfefea4a8b3~mv2.jpg',
      'e064dc_1ead699ce1d6410db530efca30a2bd41~mv2.jpg',
      'e064dc_bd8fdb6a08594fa192a42d19ce1ec3e6~mv2.jpg',
      'e064dc_49b4256db9d943afa7fa263ce3649071~mv2.jpg',
      'e064dc_e2e25fce666c4e7884d7a3f81c1685ff~mv2.jpg',
      'e064dc_b80ee9c88dd64b1fb9752991d5a91272~mv2.jpg',
      'e064dc_71f0716e068e44cdbc3cdae356b1adc5~mv2.jpg',
      'e064dc_e4c89b8d62784e15bc09f1bc5d83e494~mv2.jpg',
      'e064dc_9759f94b92904d70b60d8a73d6be2c2b~mv2.jpg',
      'e064dc_9a4ebaabe1ff4a89935d49e52827e9b7~mv2.jpg',
      'e064dc_e28c2f800de040e481ca2c778305e0a6~mv2.jpg',
      'e064dc_2086a4d538444deda477f424f210fc8a~mv2.jpg',
      'e064dc_a5ded509265b463a8e5c4db4abdd7804~mv2.jpg',
      'e064dc_d4560faa52224621a3e5aacf77a5ec91~mv2.jpg',
      'e064dc_b328cea812f44e05947b73cd7fd682c5~mv2.jpg',
      'e064dc_1f57ba2258334b9aa5bb9f5a0fdb7b59~mv2.jpg',
      'e064dc_5867b1184daa48a3b1130d3cc2aa408e~mv2.jpg',
      'e064dc_655d56f5129446148fe1f8b6bedb98ba~mv2.jpg',
      'e064dc_3699e27376a44d219a94a0a6db906ee2~mv2.jpg',
      'e064dc_781a3d69981a4a5dad08a9de4175ab1b~mv2.jpg',
      'e064dc_f5803c6c4fdd409c80a1daceffac7b2b~mv2.jpg',
      'e064dc_94702b0f5ed847b4acca3c136fe734af~mv2.jpg',
      'e064dc_32a0ce0fbe1c45e594cfd3dd909e2e32~mv2.jpg',
      'e064dc_f7a7048ffeb44325add33819969c9a43~mv2.jpg',
      'e064dc_3f44bd402c224c9581ef5a9ffd4658dc~mv2.jpg',
      'e064dc_3edc8fe4e86d47c09c7f37d5136a9e3b~mv2.jpg',
      'e064dc_d274807fded048d5960ac9f16a6f856d~mv2.jpg'
    ]
  };

  /* ------------------------------------------------------ shared theme */
  var THEME = [
    ':host{',
    '  --cream:#fefaf0; --cream-2:#f7efe1; --panel:#fbf4e8;',
    '  --ink:#2e0f13; --ink-2:#5a4042; --taupe:#968582;',
    '  --rose:#eab9b3; --rose-soft:#f6ddd7; --wine:#913f4a; --mauve:#624a4a;',
    '  --line:rgba(46,15,19,.12); --line-2:rgba(46,15,19,.06);',
    '  --shadow:0 24px 60px -34px rgba(46,15,19,.5);',
    '  --shadow-sm:0 10px 30px -18px rgba(46,15,19,.45);',
    '  --radius:18px; --radius-lg:28px;',
    '  --display:"Fraunces",Georgia,"Times New Roman",serif;',
    '  --body:"Nunito Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;',
    '  --script:"Sacramento","Brush Script MT",cursive;',
    '  --maxw:1180px;',
    '  display:block; color:var(--ink); background:var(--cream);',
    '  font-family:var(--body); line-height:1.65; -webkit-font-smoothing:antialiased;',
    '}',
    '*{box-sizing:border-box;}',
    '.wrap{max-width:var(--maxw); margin:0 auto; padding:0 clamp(18px,5vw,44px);}',
    'h1,h2,h3,h4{font-family:var(--display); font-weight:500; color:var(--ink); line-height:1.12; margin:0;}',
    'p{margin:0 0 1.05em;}',
    'a{color:var(--wine); text-decoration:none;}',
    '.eyebrow{font-family:var(--body); font-weight:700; letter-spacing:.22em;',
    '  text-transform:uppercase; font-size:.72rem; color:var(--wine);',
    '  display:inline-flex; align-items:center; gap:.6em; margin:0 0 .9rem;}',
    '.eyebrow::before{content:""; width:26px; height:1px; background:var(--wine); opacity:.6;}',
    '.lead{font-size:clamp(1.05rem,1.6vw,1.22rem); color:var(--ink-2); max-width:62ch;}',
    /* sections */
    '.sec{padding:clamp(56px,8vw,108px) 0;}',
    '#inquiry-form-section{padding:0;}',
    '.sec--panel{background:var(--panel);}',
    '.sec--cream2{background:var(--cream-2);}',
    '.title{font-size:clamp(1.9rem,4.2vw,3rem); letter-spacing:-.01em;}',
    '.kicker{font-style:italic; color:var(--wine);}',
    /* the signature: a "silver lining" light divider */
    '.lining{display:flex; align-items:center; gap:18px; justify-content:center;',
    '  margin:0 auto; max-width:340px; color:var(--rose);}',
    '.lining::before,.lining::after{content:""; height:1px; flex:1;',
    '  background:linear-gradient(90deg,transparent,var(--rose),transparent);}',
    '.lining span{width:9px; height:9px; border-radius:50%;',
    '  background:radial-gradient(circle at 35% 30%,#fff,var(--rose));',
    '  box-shadow:0 0 0 6px rgba(234,185,179,.28);}',
    /* buttons */
    '.btn{display:inline-flex; align-items:center; gap:.55em; font-family:var(--body);',
    '  font-weight:700; font-size:.95rem; letter-spacing:.02em; cursor:pointer;',
    '  padding:.92em 1.7em; border-radius:999px; border:1px solid transparent;',
    '  transition:transform .25s ease, box-shadow .25s ease, background .25s ease, color .25s ease;}',
    '.btn:hover{transform:translateY(-2px);}',
    '.btn--primary{background:var(--mauve); color:var(--cream); box-shadow:var(--shadow-sm);}',
    '.btn--primary:hover{background:var(--wine);}',
    '.btn--ghost{background:transparent; color:var(--ink); border-color:var(--line);}',
    '.btn--ghost:hover{border-color:var(--wine); color:var(--wine);}',
    '.btn--light{background:var(--cream); color:var(--ink);}',
    '.btn--light:hover{background:#fff;}',
    /* cards */
    '.card{background:var(--cream); border:1px solid var(--line-2); border-radius:var(--radius);',
    '  padding:clamp(22px,3vw,34px); box-shadow:var(--shadow-sm);}',
    '.grid{display:grid; gap:clamp(18px,2.6vw,30px);}',
    '.grid-3{grid-template-columns:repeat(3,1fr);}',
    '.grid-2{grid-template-columns:repeat(2,1fr);}',
    /* reveal */
    '.reveal{opacity:0; transform:translateY(22px); transition:opacity .7s ease, transform .7s ease;}',
    '.reveal.in{opacity:1; transform:none;}',
    /* responsive */
    '@media(max-width:900px){ .grid-3{grid-template-columns:1fr;} .grid-2{grid-template-columns:1fr;} }',
    /* small phones */
    '@media(max-width:480px){',
    '  .wrap{padding:0 16px;}',
    '  .eyebrow{font-size:.8rem;}',
    '  .btn{font-size:.92rem; padding:.85em 1.4em;}',
    '}',
    '@media(prefers-reduced-motion:reduce){ .reveal{opacity:1; transform:none; transition:none;} .btn{transition:none;} }'
  ].join('\n');

  /* ----------------------------------------- Wix custom-element resize */
  /* Reports element height to the Wix parent frame so it sizes correctly
     on every screen. Works for both Wix Studio embed iframes and classic. */
  function wireWixResize(host) {
    if (!('ResizeObserver' in window)) return;
    var lastH = 0;
    function report() {
      var h = host.scrollHeight;
      if (h < 10 || h === lastH) return;
      lastH = h;
      /* Wix Studio custom-element iframe messaging */
      if (window.parent !== window) {
        try {
          window.parent.postMessage(JSON.stringify({ intent: 'resize', height: h }), '*');
        } catch (e) {}
      }
      /* Legacy Wix SDK, if loaded */
      if (window.Wix && window.Wix.setHeight) {
        try { window.Wix.setHeight(h); } catch (e) {}
      }
    }
    var ro = new ResizeObserver(report);
    ro.observe(host);
    /* Also watch the shadow root's first child so inner layout changes fire */
    if (host.shadowRoot) {
      var inner = host.shadowRoot.firstElementChild;
      if (inner) ro.observe(inner);
    }
    report();
  }

  /* ------------------------------------------------- reveal-on-scroll */
  function wireReveal(root) {
    var els = root.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e, i) { e.style.transitionDelay = (Math.min(i, 6) * 0.06) + 's'; io.observe(e); });
  }

  /* ================================================================= */
  /* HEADER                                                            */
  /* ================================================================= */
  var SLPHeader = (function () {
    function C() { return Reflect.construct(HTMLElement, [], C); }
    C.prototype = Object.create(HTMLElement.prototype);
    C.prototype.constructor = C;
    C.prototype.connectedCallback = function () {
      injectFonts();
      var sh = this.attachShadow({ mode: 'open' });
      var links = NAV.map(function (n) {
        return '<a class="nl" href="' + n.href + '">' + n.label + '</a>';
      }).join('');
      sh.innerHTML =
        '<style>' + THEME +
        ':host{position:sticky; top:0; z-index:1000;}' +
        '.bar{background:rgba(254,250,240,.86); backdrop-filter:blur(12px);' +
        '  -webkit-backdrop-filter:blur(12px); border-bottom:1px solid var(--line);}' +
        '.row{display:flex; align-items:center; justify-content:space-between;' +
        '  gap:18px; height:74px;}' +
        '.brand{display:flex; align-items:center; gap:12px; text-decoration:none; color:var(--ink);}' +
        '.brand img{width:38px; height:38px; border-radius:50%; object-fit:cover;' +
        '  box-shadow:0 0 0 4px rgba(234,185,179,.35);}' +
        '.brand b{font-family:var(--display); font-weight:500; font-size:1.18rem; line-height:1; letter-spacing:.01em;}' +
        '.brand small{display:block; font-family:var(--script); font-size:1.05rem; color:var(--wine); line-height:.9;}' +
        '.nav{display:flex; align-items:center; gap:clamp(10px,1.4vw,22px);}' +
        '.nl{font-size:.92rem; font-weight:600; color:var(--ink); position:relative; padding:6px 2px; white-space:nowrap;}' +
        '.nl::after{content:""; position:absolute; left:0; right:100%; bottom:0; height:2px;' +
        '  background:var(--wine); transition:right .28s ease;}' +
        '.nl:hover{color:var(--wine);} .nl:hover::after{right:0;}' +
        '.cta{margin-left:6px; white-space:nowrap;}' +
        '.burger{display:none; width:46px; height:46px; border:1px solid var(--line);' +
        '  border-radius:12px; background:transparent; cursor:pointer; align-items:center; justify-content:center;}' +
        '.burger span,.burger span::before,.burger span::after{content:""; display:block;' +
        '  width:20px; height:2px; background:var(--ink); border-radius:2px; transition:.3s;}' +
        '.burger span::before{transform:translateY(-6px);} .burger span::after{transform:translateY(4px);}' +
        '.burger[aria-expanded="true"] span{background:transparent;}' +
        '.burger[aria-expanded="true"] span::before{transform:rotate(45deg);}' +
        '.burger[aria-expanded="true"] span::after{transform:rotate(-45deg) translateY(-2px);}' +
        '.drawer{position:fixed; inset:74px 0 0; background:var(--cream);' +
        '  transform:translateX(100%); transition:transform .35s ease; padding:18px clamp(18px,6vw,40px) 40px;' +
        '  overflow-y:auto; display:flex; flex-direction:column; gap:4px;}' +
        '.drawer.open{transform:none;}' +
        '.drawer a{font-family:var(--display); font-size:1.35rem; color:var(--ink);' +
        '  padding:14px 0; border-bottom:1px solid var(--line-2);}' +
        '.drawer .btn{margin-top:22px; justify-content:center;}' +
        '@media(max-width:1024px){ .nav{display:none;} .burger{display:inline-flex;} }' +
        '</style>' +
        '<div class="bar"><div class="wrap"><div class="row">' +
        '<a class="brand" href="/">' +
        '<img src="' + wimg(IMG.heroMist, 80, 80) + '" alt="Silver Lining Pathways logo — horses in morning mist">' +
        '<span><b>Silver Lining Pathways</b><small>equine &amp; energy work</small></span></a>' +
        '<nav class="nav">' + links +
        '<a class="btn btn--primary cta" href="/book-online">Book Online</a></nav>' +
        '<button class="burger" aria-label="Open menu" aria-expanded="false"><span></span></button>' +
        '</div></div></div>' +
        '<div class="drawer">' + links +
        '<a class="btn btn--primary" href="/book-online">Book Online</a></div>';

      wireWixResize(this);
      var burger = sh.querySelector('.burger');
      var drawer = sh.querySelector('.drawer');
      burger.addEventListener('click', function () {
        var open = drawer.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      });
      sh.querySelectorAll('.drawer a').forEach(function (a) {
        a.addEventListener('click', function () {
          drawer.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    };
    C.prototype.disconnectedCallback = function () { document.body.style.overflow = ''; };
    Object.setPrototypeOf(C, HTMLElement);
    return C;
  })();

  /* ================================================================= */
  /* FOOTER                                                            */
  /* ================================================================= */
  var SLPFooter = (function () {
    function C() { return Reflect.construct(HTMLElement, [], C); }
    C.prototype = Object.create(HTMLElement.prototype);
    C.prototype.constructor = C;
    C.prototype.connectedCallback = function () {
      injectFonts();
      var sh = this.attachShadow({ mode: 'open' });
      var yr = new Date().getFullYear();
      var cols = NAV.map(function (n) { return '<a href="' + n.href + '">' + n.label + '</a>'; }).join('');
      sh.innerHTML =
        '<style>' + THEME +
        ':host{display:block; background:var(--ink); color:#f3e7df;}' +
        'a{color:#f3e7df;} a:hover{color:var(--rose);}' +
        '.top{display:grid; grid-template-columns:1.4fr 1fr 1fr; gap:40px;' +
        '  padding:clamp(48px,7vw,80px) 0 40px;}' +
        '.bname{font-family:var(--display); font-size:1.7rem; color:#fff; margin:0 0 .3rem;}' +
        '.script{font-family:var(--script); color:var(--rose); font-size:1.6rem; line-height:.8;}' +
        '.bdesc{color:#d7c4bd; max-width:34ch; margin-top:14px;}' +
        '.ft h4{color:#fff; font-size:.78rem; letter-spacing:.2em; text-transform:uppercase;' +
        '  font-family:var(--body); font-weight:700; margin:0 0 16px; color:var(--rose);}' +
        '.flinks{display:flex; flex-direction:column; gap:11px; font-size:.96rem;}' +
        '.contact div{margin-bottom:11px; font-size:.96rem;}' +
        '.contact b{display:block; color:var(--rose); font-size:.78rem; letter-spacing:.12em;' +
        '  text-transform:uppercase; font-family:var(--body); margin-bottom:3px;}' +
        '.bottom{border-top:1px solid rgba(255,255,255,.12); padding:22px 0;' +
        '  display:flex; flex-wrap:wrap; gap:10px 26px; align-items:center; justify-content:space-between;' +
        '  font-size:.85rem; color:#c7b2ab;}' +
        '.bottom a{color:#c7b2ab;}' +
        '@media(max-width:820px){ .top{grid-template-columns:1fr; gap:32px;} }' +
        '</style>' +
        '<div class="wrap"><div class="top">' +
        '<div><div class="bname">Silver Lining Pathways<br><span class="script">where healing finds you</span></div>' +
        '<p class="bdesc">Equine-assisted coaching, Reiki, and energy work for grief, trauma, anxiety, and life transitions — serving Indiana, California, and Arizona.</p></div>' +
        '<div class="ft"><h4>Explore</h4><div class="flinks">' + cols + '</div></div>' +
        '<div class="ft contact"><h4>Connect</h4>' +
        '<div><b>Call or text</b><a href="' + PHONE_HREF + '">' + PHONE + '</a></div>' +
        '<div><b>Email</b><a href="mailto:' + EMAIL + '">' + EMAIL + '</a></div>' +
        '<div style="margin-top:18px;"><a class="btn btn--primary" href="/inquiry-services-page">Send an inquiry</a></div>' +
        '</div></div>' +
        '<div class="bottom">' +
        '<span>© ' + yr + ' Silver Lining Pathways LLC. All rights reserved.</span>' +
        '<span><a href="/privacy-policy">Privacy Policy</a> &nbsp;·&nbsp; <a href="/accessibility-statement">Accessibility</a></span>' +
        '<span>Designed by <a href="https://omniscripts.io" target="_blank" rel="noopener">OmniScripts, Inc.</a></span>' +
        '</div></div>';
      wireWixResize(this);
    };
    Object.setPrototypeOf(C, HTMLElement);
    return C;
  })();

  /* ================================================================= */
  /* PAGE                                                              */
  /* ================================================================= */

  /* ---- small builders shared across page templates ---- */
  function hero(opts) {
    // opts: eyebrow, title, lead, img, ctas[], compact
    var ctas = (opts.ctas || []).map(function (c) {
      return '<a class="btn ' + (c.kind || 'btn--primary') + '" href="' + c.href + '">' + c.label + '</a>';
    }).join('');
    return '' +
      '<section class="hero' + (opts.compact ? ' hero--compact' : '') + '">' +
      '<div class="hero-media"><img src="' + wimg(opts.img || IMG.heroMist, 1600, opts.compact ? 620 : 1000) +
      '" alt="' + (opts.alt || 'Horses in morning mist at Silver Lining Pathways') + '" loading="eager"></div>' +
      '<div class="hero-veil"></div>' +
      '<div class="wrap hero-inner reveal">' +
      (opts.eyebrow ? '<span class="eyebrow">' + opts.eyebrow + '</span>' : '') +
      '<h1 class="hero-title">' + opts.title + '</h1>' +
      (opts.lead ? '<p class="lead hero-lead">' + opts.lead + '</p>' : '') +
      (ctas ? '<div class="hero-cta">' + ctas + '</div>' : '') +
      '</div></section>';
  }
  function serviceCard(c) {
    return '<article class="card svc reveal"><div class="svc-ic">' + c.icon + '</div>' +
      '<h3>' + c.title + '</h3><p>' + c.body + '</p>' +
      (c.link ? '<a class="svc-link" href="' + c.link + '">' + (c.linkLabel || 'Learn more') + ' →</a>' : '') +
      '</article>';
  }
  // simple inline line icons (stroke = currentColor)
  var ICON = {
    horse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5l-2 2M5 21c0-5 3-8 7-8 1.5 0 2.5-.5 3.5-2 1-1.5 1-3.5-.5-5L17 5l3 1-1 3-2 1c1 2 1 4 0 6-1 2.5-1 4-1 5"/><path d="M9 13c-2 1-3 3-3 5"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 019 6c4-3 9-3 9-3s0 5-3 9a7 7 0 01-4 2z"/><path d="M5 21c1-6 4-9 8-12"/></svg>',
    circle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M8 12a4 4 0 008 0M8 12a4 4 0 014-4"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M16 6a3 3 0 010 6M21 20c0-2-1-4-3-4.5"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.5-9-9c-1.3-3 1-6 4-5 1.7.5 2.8 2 3 2.5.2-.5 1.3-2 3-2.5 3-1 5.3 2 4 5-2 4.5-9 9-9 9z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19l1-5.8L3.5 9.2l5.9-.9z"/></svg>'
  };

  /* ---- page-specific CSS ---- */
  var PAGE_CSS = [
    /* hero */
    '.hero{position:relative; min-height:clamp(440px,72vh,640px); display:flex; align-items:center;',
    '  color:var(--cream); overflow:hidden;}',
    '.hero--compact{min-height:clamp(300px,46vh,420px);}',
    '.hero-media{position:absolute; inset:0;}',
    '.hero-media img{width:100%; height:100%; object-fit:cover; object-position:50% 30%;}',
    '.hero-veil{position:absolute; inset:0; background:',
    '  radial-gradient(120% 90% at 78% 8%, rgba(254,250,240,.35), transparent 55%),',
    '  linear-gradient(180deg, rgba(46,15,19,.18) 0%, rgba(46,15,19,.5) 60%, rgba(46,15,19,.74) 100%);}',
    '.hero-inner{position:relative; padding:60px 0;}',
    '.hero .eyebrow{color:var(--rose);} .hero .eyebrow::before{background:var(--rose);}',
    '.hero-title{color:#fff; font-size:clamp(2.3rem,6vw,4.4rem); letter-spacing:-.015em; max-width:16ch;',
    '  text-shadow:0 2px 30px rgba(46,15,19,.4);}',
    '.hero-lead{color:#f4e7e0; margin-top:18px; max-width:54ch;}',
    '.hero-cta{display:flex; flex-wrap:wrap; gap:14px; margin-top:30px;}',
    /* generic layout pieces */
    '.split{display:grid; grid-template-columns:1.05fr .95fr; gap:clamp(28px,5vw,68px); align-items:center;}',
    '.split.rev{grid-template-columns:.95fr 1.05fr;}',
    '.figure{position:relative;}',
    '.figure img{width:100%; border-radius:var(--radius-lg); box-shadow:var(--shadow); display:block;}',
    '.figure .glow{position:absolute; inset:auto -18px -18px auto; width:60%; height:60%; z-index:-1;',
    '  background:radial-gradient(circle, var(--rose), transparent 70%); filter:blur(8px); opacity:.7;}',
    '.center{text-align:center;} .center .lead{margin-left:auto; margin-right:auto;}',
    '.mt{margin-top:26px;} .mt-s{margin-top:14px;}',
    /* services */
    '.svc-ic{width:54px; height:54px; border-radius:14px; display:flex; align-items:center; justify-content:center;',
    '  background:var(--rose-soft); color:var(--wine); margin-bottom:16px;}',
    '.svc-ic svg{width:28px; height:28px;}',
    '.svc h3{font-size:1.32rem; margin-bottom:10px;}',
    '.svc-link{font-weight:700; font-size:.92rem;}',
    /* big service blocks */
    '.svcblock{padding:clamp(40px,6vw,70px) 0; border-bottom:1px solid var(--line-2);}',
    '.svcblock:last-child{border-bottom:0;}',
    '.svcblock h2{font-size:clamp(1.7rem,3.4vw,2.4rem); margin-bottom:14px;}',
    '.tag{display:inline-block; font-family:var(--body); font-weight:700; font-size:.72rem;',
    '  letter-spacing:.18em; text-transform:uppercase; color:var(--wine);',
    '  background:var(--rose-soft); padding:6px 12px; border-radius:999px; margin-bottom:14px;}',
    /* steps / list */
    '.steps{counter-reset:s; display:grid; gap:18px; margin-top:10px;}',
    '.step{display:flex; gap:16px; align-items:flex-start;}',
    '.step::before{counter-increment:s; content:counter(s); flex:0 0 auto; width:38px; height:38px;',
    '  border-radius:50%; background:var(--mauve); color:var(--cream); font-family:var(--display);',
    '  display:flex; align-items:center; justify-content:center; font-size:1.05rem;}',
    '.step h4{font-size:1.08rem; margin-bottom:3px;}',
    '.checks{list-style:none; padding:0; margin:14px 0 0; display:grid; gap:11px;}',
    '.checks li{display:flex; gap:12px; align-items:flex-start; color:var(--ink-2);}',
    '.checks li::before{content:""; flex:0 0 auto; width:20px; height:20px; margin-top:2px; border-radius:50%;',
    '  background:var(--rose-soft) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23913f4a\' stroke-width=\'3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'20 6 9 17 4 12\'/%3E%3C/svg%3E") center/12px no-repeat;}',
    /* gallery */
    /* gallery carousel */
    '.carousel{position:relative;}',
    '.car-viewport{overflow:hidden; border-radius:var(--radius);}',
    '.car-track{display:flex; gap:14px; transition:transform .7s cubic-bezier(.4,0,.2,1); will-change:transform;}',
    '.car-slide{flex:0 0 calc((100% - 28px) / 3);}',
    '.car-slide button{display:block; width:100%; margin:0; padding:0; border:0; background:none;',
    '  cursor:zoom-in; border-radius:14px; overflow:hidden; box-shadow:var(--shadow-sm);}',
    '.car-slide img{width:100%; height:clamp(220px,26vw,330px); object-fit:cover; display:block; transition:transform .5s ease;}',
    '.car-slide button:hover img{transform:scale(1.05);}',
    '.car-btn{position:absolute; top:50%; transform:translateY(-50%); z-index:3;',
    '  width:46px; height:46px; border-radius:50%; border:0; cursor:pointer;',
    '  background:rgba(254,250,240,.94); color:var(--ink); box-shadow:var(--shadow-sm);',
    '  display:flex; align-items:center; justify-content:center; transition:background .2s, color .2s;}',
    '.car-btn:hover{background:#fff; color:var(--wine);}',
    '.car-btn svg{width:20px; height:20px;}',
    '.car-prev{left:-12px;} .car-next{right:-12px;}',
    '@media(max-width:899px){ .car-slide{flex-basis:calc((100% - 14px) / 2);} }',
    '@media(max-width:559px){ .car-slide{flex-basis:100%;} .car-prev{left:8px;} .car-next{right:8px;} }',
    '.lightbox{position:fixed; inset:0; background:rgba(46,15,19,.9); display:none;',
    '  align-items:center; justify-content:center; z-index:2000; padding:24px;}',
    '.lightbox.open{display:flex;}',
    '.lightbox img{max-width:92vw; max-height:88vh; border-radius:12px;}',
    '.lightbox .x{position:absolute; top:20px; right:24px; width:46px; height:46px; border-radius:50%;',
    '  border:0; background:rgba(255,255,255,.14); color:#fff; font-size:1.5rem; cursor:pointer;}',
    /* pricing */
    '.plans{display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:stretch;}',
    '.plan{display:flex; flex-direction:column; position:relative;}',
    '.plan.feat{border:1px solid var(--wine); box-shadow:var(--shadow);}',
    '.plan .badge{position:absolute; top:-12px; left:50%; transform:translateX(-50%);',
    '  background:var(--wine); color:var(--cream); font-size:.7rem; letter-spacing:.14em;',
    '  text-transform:uppercase; font-weight:700; padding:5px 14px; border-radius:999px;}',
    '.plan h3{font-size:1.3rem; text-align:center;}',
    '.plan .price{font-family:var(--display); font-size:clamp(2.6rem,6vw,3.6rem); line-height:1; margin:10px 0 2px; text-align:center;}',
    '.plan .price sup{font-size:.32em; vertical-align:.95em; color:var(--taupe); margin-right:.04em; font-family:var(--body); font-weight:700;}',
    '.plan .price--soft{font-size:clamp(1.4rem,3vw,1.7rem); color:var(--wine);}',
    '.plan .per{color:var(--taupe); font-size:.86rem; text-align:center;}',
    '.plan-desc{font-size:.95rem; color:var(--ink-2); margin:16px 0 6px; text-align:center; flex:1;}',
    '.valid{font-size:.82rem; color:var(--taupe); text-align:center; margin:0 0 18px;}',
    '.plan .btn{justify-content:center;}',
    '.plan.custom{background:var(--panel); border:1px dashed var(--wine);}',
    '.includes{margin-top:22px; padding-top:18px; border-top:1px solid var(--line-2); text-align:center;}',
    '.inc-label{display:block; font-family:var(--body); font-weight:700; font-size:.7rem; letter-spacing:.16em; text-transform:uppercase; color:var(--taupe); margin-bottom:10px;}',
    '.inc{font-size:.98rem; color:var(--ink); margin-bottom:4px;}',
    '@media(max-width:900px){ .plans{grid-template-columns:1fr;} .split,.split.rev{grid-template-columns:1fr;} }',
    /* CTA band */
    '.band{background:linear-gradient(135deg,#3a161b,#2e0f13); color:var(--cream); text-align:center;}',
    '.band h2{color:#fff; font-size:clamp(1.8rem,3.6vw,2.6rem); max-width:20ch; margin:0 auto 14px;}',
    '.band p{color:#e8d6cf; max-width:52ch; margin:0 auto 26px;}',
    '.band .hero-cta{justify-content:center;}',
    /* "Why" — darkness into light */
    '.why-open{position:relative; padding:clamp(72px,12vw,150px) 0; color:var(--cream); overflow:hidden; text-align:center;}',
    '.why-open .bg{position:absolute; inset:0;}',
    '.why-open .bg img{width:100%; height:100%; object-fit:cover;}',
    '.why-open .veil{position:absolute; inset:0; background:linear-gradient(180deg,rgba(46,15,19,.84),rgba(46,15,19,.66) 55%,rgba(46,15,19,.92));}',
    '.why-open .inner{position:relative;}',
    '.why-open .eyebrow{color:var(--rose); justify-content:center;}',
    '.why-q{color:#fff; font-weight:400; font-size:clamp(1.5rem,3.7vw,2.6rem); line-height:1.28;',
    '  max-width:760px; margin:0 auto; text-shadow:0 2px 34px rgba(0,0,0,.45);}',
    '.why-body{position:relative; background:var(--panel);}',
    '.why-body::before{content:""; position:absolute; top:-1px; left:50%; transform:translateX(-50%);',
    '  width:min(700px,92%); height:170px; pointer-events:none;',
    '  background:radial-gradient(ellipse at top, rgba(234,185,179,.55), transparent 72%);}',
    '.why-col{position:relative; max-width:720px; margin:0 auto;}',
    '.why-col p{font-size:clamp(1.05rem,1.7vw,1.22rem); color:var(--ink-2); line-height:1.78;}',
    '.why-col p:first-of-type{font-size:clamp(1.12rem,1.95vw,1.32rem); color:var(--ink);}',
    '.why-sign{font-family:var(--script); color:var(--wine); font-size:clamp(2.1rem,4.5vw,3rem);',
    '  line-height:1; margin:6px 0 28px;}',
    /* "Why" — contained version inside Meet Shanda */
    '.why-inline{position:relative; overflow:hidden; text-align:center;',
    '  margin-top:clamp(40px,6vw,76px); padding:clamp(34px,5vw,64px) clamp(24px,5vw,60px);',
    '  background:var(--panel); border:1px solid var(--line-2); border-radius:var(--radius-lg); box-shadow:var(--shadow-sm);}',
    '.why-inline::before{content:""; position:absolute; top:0; left:50%; transform:translateX(-50%);',
    '  width:min(560px,90%); height:150px; pointer-events:none;',
    '  background:radial-gradient(ellipse at top, rgba(234,185,179,.55), transparent 72%);}',
    '.why-inline .eyebrow{justify-content:center; position:relative;}',
    '.why-quote{position:relative; font-family:var(--display); font-weight:400;',
    '  font-size:clamp(1.4rem,3vw,2.05rem); line-height:1.3; color:var(--ink);',
    '  max-width:720px; margin:0 auto 26px;}',
    '.why-inline-body{max-width:660px; margin:0 auto; text-align:left;}',
    '.why-inline-body p{font-size:clamp(1rem,1.5vw,1.12rem); color:var(--ink-2); line-height:1.74;}',
    /* note callout */
    '.callout{background:var(--rose-soft); border-radius:var(--radius); padding:20px 24px;',
    '  border-left:4px solid var(--wine); color:var(--ink-2);}',
    /* prose (legal pages) */
    '.prose{max-width:760px;} .prose h2{font-size:1.5rem; margin:34px 0 12px;}',
    '.prose h3{font-size:1.15rem; margin:24px 0 8px;}',
    '.prose ul{padding-left:1.2em; margin:0 0 1.1em;} .prose li{margin-bottom:.5em; color:var(--ink-2);}',
    '.prose .upd{color:var(--taupe); font-size:.9rem; margin-bottom:28px;}',
    /* inquiry form */
    '.form{max-width:640px;}',
    '.field{margin-bottom:18px; display:block;}',
    '.field label{display:block; font-weight:700; font-size:.9rem; margin-bottom:7px;}',
    '.field input,.field select,.field textarea{width:100%; font-family:var(--body); font-size:1rem;',
    '  padding:13px 15px; border:1px solid var(--line); border-radius:12px; background:#fff; color:var(--ink);}',
    '.field input:focus,.field select:focus,.field textarea:focus{outline:none; border-color:var(--wine);',
    '  box-shadow:0 0 0 3px rgba(145,63,74,.15);}',
    '.field textarea{min-height:140px; resize:vertical;}',
    '.two{display:grid; grid-template-columns:1fr 1fr; gap:18px;}',
    '@media(max-width:600px){ .two{grid-template-columns:1fr;} }',
    '.formnote{font-size:.85rem; color:var(--taupe); margin-top:6px;}',
    '.ok{background:#eef6ef; border-left:4px solid #407c51; padding:16px 20px; border-radius:12px; color:#274d31;}',
    /* ---- mobile overrides ---- */
    '@media(max-width:768px){',
    '  .hero{min-height:clamp(360px,60vh,520px);}',
    '  .hero--compact{min-height:clamp(260px,44vh,380px);}',
    '  .hero-inner{padding:44px 0;}',
    '  .hero-title{font-size:clamp(1.9rem,7vw,3.2rem);}',
    '  .hero-lead{font-size:clamp(1rem,3.4vw,1.15rem); margin-top:12px;}',
    '  .hero-cta{margin-top:20px; gap:10px;}',
    '}',
    '@media(max-width:600px){',
    '  .hero-cta{flex-direction:column; align-items:flex-start;}',
    '  .hero-cta .btn{width:100%; justify-content:center;}',
    '  .band .hero-cta{align-items:center;}',
    '  .figure img{max-height:340px; object-fit:cover; object-position:50% 20%;}',
    '  .car-slide img{height:clamp(180px,52vw,260px);}',
    '  .svcblock{padding:clamp(28px,5vw,50px) 0;}',
    '  .why-open{padding:clamp(56px,10vw,100px) 0;}',
    '  .why-q{font-size:clamp(1.25rem,5vw,1.8rem);}',
    '  .plan .price{font-size:clamp(2.2rem,10vw,3rem);}',
    '}',
    '@media(max-width:480px){',
    '  .hero-title{font-size:clamp(1.75rem,9vw,2.8rem);}',
    '  .title{font-size:clamp(1.6rem,7vw,2.4rem);}',
    '  .lead{font-size:1rem;}',
    '  .svc-ic{width:46px; height:46px;}',
    '  .card{padding:18px 16px;}',
    '  .car-btn{width:38px; height:38px;}',
    '}'
  ].join('\n');

  /* ---- page templates ---- */
  function tplHome() {
    var svc =
      serviceCard({ icon: ICON.horse, title: 'Equine-Assisted Coaching', link: '/services',
        body: 'Horses meet you exactly where you are. In a calm, guided setting, they reflect what words can\u2019t reach — helping you regulate, rebuild trust, and find your footing again.' }) +
      serviceCard({ icon: ICON.leaf, title: 'Reiki & Energy Work', link: '/services',
        body: 'Gentle, hands-light energy healing woven into your sessions to ease grief, soften anxiety, and restore a sense of balance and wholeness.' }) +
      serviceCard({ icon: ICON.users, title: 'Group Workshops', link: '/services',
        body: 'Shared experiences in community — space to connect, learn, and grow alongside others walking their own path toward healing.' });
    var gal = galleryCarousel();
    return '' +
      hero({
        eyebrow: 'Equine-Assisted Coaching · Reiki · Energy Work',
        title: 'Healing happens in the space between words.',
        lead: 'Silver Lining Pathways offers equine-assisted coaching and energy work for those navigating grief, trauma, anxiety, and life\u2019s hardest transitions — in Indiana, California, and Arizona.',
        ctas: [{ label: 'Book a Session', href: '/book-online' }, { label: 'Meet Shanda', href: '/about', kind: 'btn--light' }],
        alt: 'Two horses standing together in soft morning mist'
      }) +
      // philosophy
      '<section class="sec sec--panel"><div class="wrap center reveal">' +
      '<span class="eyebrow">Our Philosophy</span>' +
      '<h2 class="title">A holistic path — <span class="kicker">mind, body, and spirit</span></h2>' +
      '<p class="lead mt-s">We believe transformation is gentle, not forced. By blending equine-assisted coaching with Reiki and energy work, we help you become aware of what\u2019s happening beneath the surface and move toward your goals inside a safe, supportive community.</p>' +
      '<div class="lining mt"><span></span></div></div></section>' +
      // about teaser
      '<section class="sec"><div class="wrap split">' +
      '<div class="figure reveal"><img src="' + wimg(IMG.team, 760, 920) + '" alt="Shanda Hanft, Certified Equine Assisted Coach and Advanced Reiki Practitioner"><div class="glow"></div></div>' +
      '<div class="reveal"><span class="eyebrow">Meet Your Coach</span>' +
      '<h2 class="title">Shanda Hanft</h2>' +
      '<p class="mt-s" style="color:var(--wine); font-weight:700; letter-spacing:.02em;">Certified Equine Assisted Coach · Advanced Reiki Practitioner</p>' +
      '<p>Shanda\u2019s bond with horses began at age three, when the pasture became her safe place. After losing her husband in 2024, she leaned into that lifelong connection and felt called to help others find hope, healing, and peace.</p>' +
      '<p>Today she walks alongside people navigating grief, trauma, depression, abuse, anxiety, and major life transitions — creating space where you can feel safe, understood, and truly seen.</p>' +
      '<a class="btn btn--ghost mt-s" href="/about">Read her story</a></div></div></section>' +
      // services
      '<section class="sec sec--cream2"><div class="wrap">' +
      '<div class="center reveal" style="margin-bottom:42px;"><span class="eyebrow">Our Services</span>' +
      '<h2 class="title">Ways we walk with you</h2></div>' +
      '<div class="grid grid-3">' + svc + '</div></div></section>' +
      // gallery
      '<section class="sec"><div class="wrap">' +
      '<div class="center reveal" style="margin-bottom:36px;"><span class="eyebrow">Gallery of Growth</span>' +
      '<h2 class="title">Moments along the way</h2></div>' +
      gal + '</div></section>' +
      ctaBand('Your silver lining is waiting.', 'Whenever you\u2019re ready, we\u2019re here. Reach out for a conversation, or book your first session today.') +
      lightbox();
  }

  function tplAbout() {
    return '' +
      hero({ compact: true, eyebrow: 'About', title: 'The story behind Silver Lining Pathways',
        lead: 'Born from grief, grounded in horses, offered in service to your healing.',
        alt: 'Horses grazing in misty morning light' }) +
      '<section class="sec"><div class="wrap"><div class="split">' +
      '<div class="figure reveal"><img src="' + wimg(IMG.team, 760, 980) + '" alt="Shanda Hanft with a horse"><div class="glow"></div></div>' +
      '<div class="reveal"><span class="tag">Meet the team</span>' +
      '<h2 class="title">Shanda Hanft</h2>' +
      '<p style="color:var(--wine); font-weight:700;">Certified Equine Assisted Coach · Advanced Reiki Practitioner</p>' +
      '<p>Shanda\u2019s passion for horses began at the age of three, when they first became her safe place and source of healing. As a child, she could often be found sitting in the pasture, sharing her problems, dreams, fears, and aspirations with them. Horses have remained a constant source of comfort, connection, and strength throughout every season of her life.</p>' +
      '<p>After the loss of her husband in 2024, Shanda leaned even more deeply into the healing bond she has always shared with horses. Through her own grief journey, she felt called to pursue equine-assisted coaching as a way to help others find hope, healing, and peace.</p>' +
      '<p>Today, Shanda is passionate about helping individuals navigating trauma, grief, depression, abuse, anxiety, and major life transitions. She believes horses have a unique ability to help people feel safe, understood, and emotionally connected — creating space for authentic healing and personal growth. She travels between Indiana, California, and Arizona to walk alongside her clients on their journey.</p>' +
      '</div></div>' +
      whyInline() +
      '</div></section>' +
      // mission
      '<section class="sec sec--panel"><div class="wrap center reveal">' +
      '<span class="eyebrow">Our Mission</span>' +
      '<h2 class="title">Empowerment through connection</h2>' +
      '<p class="lead mt-s">Our mission is to empower individuals through transformative coaching experiences. We are committed to creating a safe space for personal exploration and growth, using equine-assisted coaching and energy work to inspire meaningful, lasting change.</p>' +
      '<div class="lining mt"><span></span></div></div></section>' +
      // values
      '<section class="sec"><div class="wrap">' +
      '<div class="center reveal" style="margin-bottom:38px;"><span class="eyebrow">What guides us</span><h2 class="title">Held with care</h2></div>' +
      '<div class="grid grid-3">' +
      serviceCard({ icon: ICON.heart, title: 'Safety first', body: 'Every session is built around emotional and physical safety, so you can explore at your own pace and never feel pushed.' }) +
      serviceCard({ icon: ICON.horse, title: 'Honest reflection', body: 'Horses respond to you in the moment, with no agenda — offering honest feedback that talk alone often can\u2019t reach.' }) +
      serviceCard({ icon: ICON.sun, title: 'Whole-person healing', body: 'We tend to mind, body, and spirit together, weaving coaching and energy work into one supportive experience.' }) +
      '</div></div></section>' +
      ctaBand('Let\u2019s find your path forward.', 'Have a question, or wondering if this is right for you? Reach out — there\u2019s no pressure, only a conversation.');
  }

  function tplServices() {
    var block = function (tag, title, paras, link) {
      return '<div class="svcblock reveal"><span class="tag">' + tag + '</span><h2>' + title + '</h2>' +
        paras.map(function (p) { return '<p>' + p + '</p>'; }).join('') +
        (link ? '<a class="btn btn--ghost mt-s" href="' + link + '">' + link.label + '</a>' : '') + '</div>';
    };
    return '' +
      hero({ compact: true, eyebrow: 'Our Services', title: 'Gentle, guided ways to heal',
        lead: 'Each session is tailored to you — meeting you where you are and moving at the pace that feels right.',
        ctas: [{ label: 'Book a Session', href: '/book-online' }] }) +
      '<section class="sec"><div class="wrap" style="max-width:880px;">' +
      block('Signature offering', 'Equine-Assisted Coaching',
        ['Our equine-assisted coaching sessions invite you to connect with horses in a therapeutic setting that fosters self-discovery and emotional healing. Working with an equine-assisted coach helps regulate your nervous system and teaches your brain new ways to respond to life\u2019s events.',
         'Horses are incredibly intuitive to our emotions, body language, and energy. When we interact with them, they respond honestly in the moment — revealing patterns in how we communicate, handle stress, build trust, and set boundaries.',
         'With the guidance of a coach, these interactions help you become more aware of what\u2019s happening beneath the surface, often in ways that talking alone may never uncover. Every session is tailored to your individual needs.']) +
      block('Holistic healing', 'Reiki & Energy Work',
        ['Reiki is offered as part of a holistic approach to healing and personal growth — gentle, hands-light energy work that supports the body\u2019s own capacity to restore balance.',
         'Whether you are navigating grief, recovering from trauma, managing anxiety, or simply seeking greater balance, Reiki can be woven into your coaching session or offered on its own, providing soft support on your journey toward healing and wholeness.']) +
      block('Together', 'Group Workshops',
        ['Our group workshops create a collaborative experience that encourages community building and shared growth. These gatherings offer opportunities for connection, learning, and mutual support among participants.',
         'If you\u2019d like to bring a workshop to your team, retreat, or community group, we\u2019d love to design something meaningful with you.'], { label: 'See upcoming events', href: '/event-list' }) +
      '</div></div></section>' +
      // what to expect
      '<section class="sec sec--panel"><div class="wrap">' +
      '<div class="center reveal" style="margin-bottom:36px;"><span class="eyebrow">What to Expect</span><h2 class="title">Your first session</h2></div>' +
      '<div class="split"><div class="reveal"><div class="steps">' +
      '<div class="step"><div><h4>Reach out</h4><p>Send an inquiry or book online. We\u2019ll talk through what you\u2019re hoping for and answer any questions.</p></div></div>' +
      '<div class="step"><div><h4>Arrive & settle</h4><p>No horse experience is needed. We\u2019ll start slow, getting comfortable in the space and with the horses.</p></div></div>' +
      '<div class="step"><div><h4>Connect & explore</h4><p>Guided, in-the-moment work with the horses surfaces what matters most — gently and without pressure.</p></div></div>' +
      '<div class="step"><div><h4>Integrate</h4><p>We close with reflection, and Reiki may be offered to support the healing process.</p></div></div>' +
      '</div></div>' +
      '<div class="reveal"><div class="card"><h3 style="margin-bottom:8px;">Good to know</h3>' +
      '<ul class="checks">' +
      '<li>No prior experience with horses is required.</li>' +
      '<li>Sessions are available in Indiana, California, and Arizona.</li>' +
      '<li>Wear closed-toe shoes and comfortable clothing for the weather.</li>' +
      '<li>Sessions can be one-on-one or in small groups.</li>' +
      '<li>Reiki can be added to any session or booked on its own.</li>' +
      '</ul></div></div></div></div></section>' +
      ctaBand('Ready to begin?', 'Book a session online, or send an inquiry and we\u2019ll find the right starting point together.');
  }

  /* Default plan data (matches the live Wix Plans page). Any field can be
   * overridden per-plan via attributes on <slp-page data-page="pricing">:
   *   data-p1-price="222"  data-p2-price="777"  data-p1-name="…"  etc.
   *   fields: name | price | per | desc | valid | cta | link | includes | feat | custom
   *   data-p1-includes accepts a comma- or pipe-separated list.
   * Or override everything at once with a JSON array in  data-plans='[…]'.
   */
  function defaultPlans() {
    return [
      { name: 'Monthly Distance Pass', price: '222', per: 'Every month',
        desc: 'Two remote sessions per month for a minimum of 6 months.',
        valid: 'Valid for 6 months', includes: ['Remote Reiki Session'],
        cta: 'Add to Cart', link: '/pricing-plans/plans-pricing', feat: false },
      { name: 'Transformation Bundle', price: '777', per: '5-session package',
        desc: 'Save on your journey with a 5-session package that includes equine-assisted coaching along with Reiki healing. Ideal for those committed to deep personal growth.',
        valid: 'Valid for 12 months', includes: ['Equine Assisted Coaching', 'Energy Work'],
        cta: 'Add to Cart', link: '/pricing-plans/plans-pricing', feat: true },
      { name: 'Custom', price: '', per: 'Tailored to you',
        desc: 'Not sure which option fits, or need something different? Let\u2019s design a plan around your needs, goals, and budget.',
        valid: '', includes: ['Built around you'],
        cta: 'Start a conversation', link: '/inquiry-services-page', feat: false, custom: true }
    ];
  }
  function getPlans(el) {
    var plans = defaultPlans();
    var get = el && el.getAttribute ? function (n) { return el.getAttribute(n); } : function () { return null; };
    var raw = get('data-plans');
    if (raw) {
      try {
        var j = JSON.parse(raw);
        if (Array.isArray(j) && j.length) {
          plans = j.map(function (o, i) {
            var base = plans[i] || {}; for (var k in o) base[k] = o[k]; return base;
          });
        }
      } catch (e) { /* keep defaults on bad JSON */ }
    }
    plans.forEach(function (p, i) {
      var k = 'data-p' + (i + 1) + '-';
      ['name', 'price', 'per', 'desc', 'valid', 'cta', 'link'].forEach(function (f) {
        var v = get(k + f); if (v != null && v !== '') p[f] = v;
      });
      var inc = get(k + 'includes');
      if (inc != null && inc !== '') p.includes = inc.split(/[|,]/).map(function (s) { return s.trim(); }).filter(Boolean);
      var ft = get(k + 'feat'); if (ft != null) p.feat = (ft === 'true' || ft === '1');
      var cu = get(k + 'custom'); if (cu != null) p.custom = (cu === 'true' || cu === '1');
    });
    return plans;
  }
  function planCard(p) {
    var priceBlock = p.price
      ? '<div class="price"><sup>$</sup>' + p.price + '</div><div class="per">' + (p.per || '') + '</div>'
      : '<div class="price price--soft">' + (p.per || 'Let\u2019s talk') + '</div>';
    var inc = (p.includes && p.includes.length)
      ? '<div class="includes"><span class="inc-label">Includes</span>' +
        p.includes.map(function (i) { return '<div class="inc">' + i + '</div>'; }).join('') + '</div>'
      : '';
    return '<article class="card plan ' + (p.feat ? 'feat ' : '') + (p.custom ? 'custom' : '') + ' reveal">' +
      (p.feat ? '<span class="badge">Best value</span>' : '') +
      '<h3>' + p.name + '</h3>' + priceBlock +
      (p.desc ? '<p class="plan-desc">' + p.desc + '</p>' : '') +
      (p.valid ? '<div class="valid">' + p.valid + '</div>' : '') +
      '<a class="btn ' + ((p.feat || p.custom) ? 'btn--primary' : 'btn--ghost') + '" href="' + p.link + '">' + (p.cta || 'Choose this plan') + '</a>' +
      inc + '</article>';
  }
  function tplPricing(el) {
    var cards = getPlans(el).map(planCard).join('');
    return '' +
      hero({ compact: true, eyebrow: 'Plans & Pricing', title: 'Choose your pricing plan',
        lead: 'Remote sessions, a transformation bundle, or something built just for you — find the option that supports your journey best.',
        ctas: [{ label: 'View live plans & checkout', href: '/pricing-plans/plans-pricing' }] }) +
      '<section class="sec"><div class="wrap">' +
      '<div class="plans">' + cards + '</div>' +
      '<div class="callout reveal" style="margin-top:34px;">Secure checkout for the Monthly Distance Pass and Transformation Bundle runs through our booking system — tap <b>Add to Cart</b> on a plan, or <b>View live plans &amp; checkout</b> above. Looking for something different? The <b>Custom</b> option starts a quick conversation so we can build a plan around you.</div>' +
      '</div></section>' +
      ctaBand('Not sure where to start?', 'Tell us a little about what you\u2019re looking for and we\u2019ll recommend the right fit.');
  }

  function tplEvents() {
    return appIntro({
      eyebrow: 'Events', icon: ICON.calendar,
      title: 'Workshops & gatherings',
      lead: 'Join us for group workshops, seasonal gatherings, and community events designed to foster connection and shared growth.',
      cta: { label: 'See all upcoming events', href: '/event-list' },
      body: 'Our events bring people together in a supportive setting — whether it\u2019s a hands-on equine workshop, an energy-healing circle, or a seasonal community gathering. New dates are added regularly, so check back often or join the mailing list to be the first to know.',
    });
  }
  function tplBook() {
    return appIntro({
      eyebrow: 'Book Online', icon: ICON.horse,
      title: 'Reserve your session',
      lead: 'Choose a time that works for you and we\u2019ll take it from there. No horse experience needed.',
      cta: { label: 'Choose a time', href: '/book-online' },
      body: 'Booking takes just a moment. Select the service that fits — equine-assisted coaching, Reiki, or a group session — pick an available time, and you\u2019ll receive a confirmation. If you\u2019re unsure which service is right for you, send an inquiry first and we\u2019ll guide you.',
    });
  }
  function tplGroups() {
    var groups = [
      { n: 'Equine Coaching Connection', d: 'Share reflections and support around equine-assisted work.' },
      { n: 'Energy Healing Circle', d: 'A gentle space for Reiki, energy work, and restoration.' },
      { n: 'Remote Session Community', d: 'Connect from anywhere — for those working with us at a distance.' },
      { n: 'Silver Lining Pathways Group', d: 'Our main community hub for news, encouragement, and connection.' }
    ];
    var cards = groups.map(function (g) {
      return serviceCard({ icon: ICON.users, title: g.n, body: g.d, link: '/groups', linkLabel: 'Join the conversation' });
    }).join('');
    return appIntro({
      eyebrow: 'Community Groups', icon: ICON.users,
      title: 'Find your people',
      lead: 'Our member groups are a place to connect, share, and grow alongside others on the same path.',
      cta: { label: 'Browse all groups', href: '/groups' },
      body: 'Becoming part of a group means you don\u2019t walk your path alone. Post your thoughts, share what\u2019s helping, ask questions, and encourage one another between sessions.',
      extra: '<div class="grid grid-2" style="margin-top:36px;">' + cards + '</div>',
    });
  }
  function tplMembers() {
    return appIntro({
      eyebrow: 'Members', icon: ICON.star,
      title: 'Your member space',
      lead: 'Log in to manage your bookings, join groups, track loyalty rewards, and access member-only resources.',
      cta: { label: 'Log in or sign up', href: '/members' },
      body: 'A free member account keeps everything in one place — upcoming sessions, your group conversations, saved resources, and your loyalty points. Creating one takes less than a minute.',
      extra: '<div class="grid grid-3" style="margin-top:36px;">' +
        serviceCard({ icon: ICON.calendar, title: 'Manage bookings', body: 'View, reschedule, or book new sessions anytime.' }) +
        serviceCard({ icon: ICON.users, title: 'Join groups', body: 'Connect with the community between sessions.' }) +
        serviceCard({ icon: ICON.heart, title: 'Earn rewards', body: 'Track your loyalty points and unlock perks.' }) +
        '</div>',
    });
  }
  function tplLoyalty() {
    return appIntro({
      eyebrow: 'Loyalty', icon: ICON.heart,
      title: 'Rewards for your journey',
      lead: 'Earn points as you book sessions and engage with our community — then redeem them for perks along the way.',
      cta: { label: 'View my rewards', href: '/my-rewards' },
      body: 'Our loyalty program is our way of saying thank you. Earn points for the things you already do, watch them add up, and redeem them toward future sessions and special offers.',
      extra: '<div class="grid grid-3" style="margin-top:36px;">' +
        serviceCard({ icon: ICON.star, title: 'Earn', body: 'Collect points each time you book and take part.' }) +
        serviceCard({ icon: ICON.sun, title: 'Track', body: 'Watch your balance grow inside your member space.' }) +
        serviceCard({ icon: ICON.heart, title: 'Redeem', body: 'Put points toward sessions and member perks.' }) +
        '</div>',
    });
  }
  function appIntro(o) {
    return hero({ compact: true, eyebrow: o.eyebrow, title: o.title, lead: o.lead, ctas: [o.cta] }) +
      '<section class="sec"><div class="wrap center reveal" style="max-width:760px;">' +
      '<div class="svc-ic" style="margin:0 auto 18px;">' + o.icon + '</div>' +
      '<p class="lead">' + o.body + '</p>' +
      '<div class="lining mt"><span></span></div>' +
      '</div>' + (o.extra ? '<div class="wrap">' + o.extra + '</div>' : '') +
      '</section>';
  }

  function tplInquiry() {
    return '' +
      hero({ compact: true, eyebrow: 'Inquiry', title: 'Start a conversation',
        lead: 'Tell us a little about you and what you\u2019re hoping for. There\u2019s no pressure — just a first step.' }) +
      '<section id="inquiry-form-section"><div class="wrap"></div></section>';
  }

  function whyOpen() {
    return '<section class="why-open"><div class="bg"><img src="' + wimg(IMG.heroMist, 1600, 760) +
      '" alt="Horses emerging from morning mist"></div><div class="veil"></div>' +
      '<div class="wrap inner reveal"><span class="eyebrow">Why I Do This Work</span>' +
      '<h2 class="why-q">Are you ready to break through the chains of darkness and gather up all of the scattered pieces of your life that have been swept under the rug by others around you?</h2>' +
      '</div></section>';
  }
  function whyBody(withCta) {
    return '<section class="sec why-body"><div class="wrap"><div class="why-col reveal">' +
      '<p>I know what it\u2019s like to live in the black smoke and fog of the darkness. Strength isn\u2019t about surviving \u2014 true strength is about being willing to allow your foundation to crumble. To be able to sit in the mess, feeling fractured.</p>' +
      '<p>We find ourselves asking, \u201cWhat\u2019s the reason? How do I find my way out of the pain?\u201d I\u2019m here to sit with you, to create a safe space. I can help you become empowered to find your own voice through the darkness.</p>' +
      '<p>Together we will build a new foundation, so you can choose to be a thriving soul \u2014 one where you can once again be filled with curiosity, wonder, and hope. You\u2019ll be able to once again see the possibilities of stepping into your authenticity and the self-expression of who you truly are.</p>' +
      '<div class="why-sign">\u2014 Shanda</div>' +
      (withCta ? '<div class="hero-cta"><a class="btn btn--primary" href="/book-online">Book a Session</a>' +
        '<a class="btn btn--ghost" href="/inquiry-services-page">Start a Conversation</a></div>' : '') +
      '</div></div></section>';
  }
  function tplWhy() {
    return whyOpen() + whyBody(true);
  }
  function whyInline() {
    return '<div class="why-inline reveal">' +
      '<span class="eyebrow">In Shanda\u2019s words</span>' +
      '<blockquote class="why-quote">Are you ready to break through the chains of darkness and gather up all of the scattered pieces of your life that have been swept under the rug by others around you?</blockquote>' +
      '<div class="why-inline-body">' +
      '<p>I know what it\u2019s like to live in the black smoke and fog of the darkness. Strength isn\u2019t about surviving \u2014 true strength is about being willing to allow your foundation to crumble. To be able to sit in the mess, feeling fractured.</p>' +
      '<p>We find ourselves asking, \u201cWhat\u2019s the reason? How do I find my way out of the pain?\u201d I\u2019m here to sit with you, to create a safe space. I can help you become empowered to find your own voice through the darkness.</p>' +
      '<p>Together we will build a new foundation, so you can choose to be a thriving soul \u2014 one where you can once again be filled with curiosity, wonder, and hope. You\u2019ll be able to once again see the possibilities of stepping into your authenticity and the self-expression of who you truly are.</p>' +
      '</div><div class="why-sign">\u2014 Shanda</div></div>';
  }

  function tplPrivacy() {
    var d = new Date(); var upd = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return heroLegal('Privacy Policy', 'How we handle your information') +
      '<section class="sec"><div class="wrap prose reveal">' +
      '<p class="upd">Last updated: ' + upd + '</p>' +
      '<p>Silver Lining Pathways LLC (\u201cwe,\u201d \u201cus,\u201d or \u201cour\u201d) respects your privacy. This policy explains what information we collect through our website and services, how we use it, and the choices you have.</p>' +
      '<h2>Information we collect</h2>' +
      '<p>We collect information you provide directly — such as your name, email address, phone number, and any details you share when you book a session, send an inquiry, create a member account, or join a group. We also collect limited technical data automatically (such as browser type and pages visited) to help our site function and improve.</p>' +
      '<h2>How we use your information</h2>' +
      '<ul><li>To schedule, provide, and follow up on coaching, Reiki, and workshop sessions.</li>' +
      '<li>To respond to inquiries and communicate with you about your sessions or account.</li>' +
      '<li>To manage memberships, groups, events, and loyalty rewards.</li>' +
      '<li>To improve our website and the services we offer.</li></ul>' +
      '<h2>Sharing your information</h2>' +
      '<p>We do not sell your personal information. We share it only with service providers that help us operate (for example, our website, booking, and payment platforms) and only as needed to deliver our services, or when required by law.</p>' +
      '<h2>Confidentiality</h2>' +
      '<p>What you share in coaching and energy-work sessions is treated with care and kept confidential, except where disclosure is required by law or necessary to protect someone\u2019s safety.</p>' +
      '<h2>Data security</h2>' +
      '<p>We use reasonable safeguards to protect your information. No method of transmission or storage is completely secure, but we work to keep your data protected.</p>' +
      '<h2>Your choices</h2>' +
      '<p>You may request access to, correction of, or deletion of your personal information, and you may opt out of non-essential communications at any time. To make a request, contact us using the details below.</p>' +
      '<h2>Children\u2019s privacy</h2>' +
      '<p>Our services are intended for adults. We do not knowingly collect personal information from children without verifiable parental or guardian consent.</p>' +
      '<h2>Changes to this policy</h2>' +
      '<p>We may update this policy from time to time. The \u201clast updated\u201d date above reflects the most recent changes.</p>' +
      '<h2>Contact us</h2>' +
      '<p>Questions about this policy? Reach us at <a href="mailto:' + EMAIL + '">' + EMAIL + '</a> or <a href="' + PHONE_HREF + '">' + PHONE + '</a>.</p>' +
      '<p style="color:var(--taupe); font-size:.85rem; margin-top:26px;">This policy is provided for general information and is not legal advice. Please consult a qualified attorney to ensure it meets the requirements that apply to your business and location.</p>' +
      '</div></section>';
  }
  function tplAccessibility() {
    var d = new Date(); var upd = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return heroLegal('Accessibility Statement', 'Everyone is welcome here') +
      '<section class="sec"><div class="wrap prose reveal">' +
      '<p class="upd">Last updated: ' + upd + '</p>' +
      '<p>Silver Lining Pathways LLC is committed to making our website and services accessible to as many people as possible, including those who use assistive technologies. We believe healing should be within reach for everyone.</p>' +
      '<h2>Our commitment</h2>' +
      '<p>We strive to align our website with the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. This includes clear structure, readable text, sufficient color contrast, keyboard-navigable menus, descriptive image alternatives, and respect for reduced-motion preferences.</p>' +
      '<h2>Measures we take</h2>' +
      '<ul><li>Semantic headings and landmarks for screen-reader navigation.</li>' +
      '<li>Visible keyboard focus and operable menus without a mouse.</li>' +
      '<li>Text and backgrounds chosen for readable contrast.</li>' +
      '<li>Layouts that adapt to phones, tablets, and desktops.</li>' +
      '<li>Honoring \u201creduce motion\u201d system settings.</li></ul>' +
      '<h2>In-person accessibility</h2>' +
      '<p>Equine and energy-work sessions take place in a variety of settings. If you have specific access needs, please let us know when you book — we\u2019ll do our best to accommodate you and create a comfortable experience.</p>' +
      '<h2>Ongoing effort</h2>' +
      '<p>Accessibility is an ongoing process. We regularly review our site and services and welcome opportunities to improve.</p>' +
      '<h2>Tell us what you need</h2>' +
      '<p>If you encounter a barrier on our website or need information in another format, please contact us at <a href="mailto:' + EMAIL + '">' + EMAIL + '</a> or <a href="' + PHONE_HREF + '">' + PHONE + '</a>. We\u2019ll respond as quickly as we can and work with you to provide what you need.</p>' +
      '</div></section>';
  }
  function heroLegal(title, lead) {
    return '<section class="hero hero--compact"><div class="hero-media"><img src="' + wimg(IMG.heroMist, 1600, 520) +
      '" alt="Soft misty landscape"></div><div class="hero-veil"></div>' +
      '<div class="wrap hero-inner reveal"><span class="eyebrow">Legal</span>' +
      '<h1 class="hero-title" style="font-size:clamp(2rem,5vw,3.2rem);">' + title + '</h1>' +
      '<p class="lead hero-lead">' + lead + '</p></div></section>';
  }

  function ctaBand(title, text) {
    return '<section class="sec band"><div class="wrap reveal">' +
      '<h2>' + title + '</h2><p>' + text + '</p>' +
      '<div class="hero-cta"><a class="btn btn--light" href="/book-online">Book a Session</a>' +
      '<a class="btn btn--ghost" style="color:var(--cream);border-color:rgba(255,255,255,.4);" href="/inquiry-services-page">Send an Inquiry</a></div>' +
      '</div></section>';
  }
  function lightbox() {
    return '<div class="lightbox" id="slpLB"><button class="x" aria-label="Close">×</button><img alt="Enlarged gallery image"></div>';
  }
  function galleryCarousel() {
    var slides = IMG.gallery.map(function (f) {
      return '<div class="car-slide"><button data-full="' + wimg(f, 1400, 1400, 'fit') + '">' +
        '<img src="' + wimg(f, 640, 520) + '" alt="A moment of growth and connection at Silver Lining Pathways" loading="lazy"></button></div>';
    }).join('');
    var aL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
    var aR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
    return '<div class="carousel">' +
      '<button class="car-btn car-prev" aria-label="Previous images">' + aL + '</button>' +
      '<div class="car-viewport"><div class="car-track">' + slides + '</div></div>' +
      '<button class="car-btn car-next" aria-label="Next images">' + aR + '</button>' +
      '</div>';
  }
  function wireCarousel(root) {
    var car = root.querySelector('.carousel');
    if (!car) return null;
    var track = car.querySelector('.car-track');
    var slides = Array.prototype.slice.call(track.children);
    if (!slides.length) return null;
    var idx = 0, timer = null;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function perView() { var w = car.clientWidth; return w >= 900 ? 3 : (w >= 560 ? 2 : 1); }
    function stepPx() {
      if (slides.length < 2) return car.clientWidth;
      return slides[1].getBoundingClientRect().left - slides[0].getBoundingClientRect().left;
    }
    function maxIdx() { return Math.max(0, slides.length - perView()); }
    function go(i) {
      var m = maxIdx();
      idx = i < 0 ? m : (i > m ? 0 : i);
      track.style.transform = 'translateX(' + (-idx * stepPx()) + 'px)';
    }
    function nextSlide() { go(idx >= maxIdx() ? 0 : idx + 1); }
    function prevSlide() { go(idx <= 0 ? maxIdx() : idx - 1); }
    function start() { if (reduce) return; stop(); timer = setInterval(nextSlide, 3800); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    car.querySelector('.car-next').addEventListener('click', function () { nextSlide(); start(); });
    car.querySelector('.car-prev').addEventListener('click', function () { prevSlide(); start(); });
    car.addEventListener('mouseenter', stop);
    car.addEventListener('mouseleave', start);
    car.addEventListener('focusin', stop);
    car.addEventListener('focusout', start);
    if ('ResizeObserver' in window) {
      new ResizeObserver(function () { go(Math.min(idx, maxIdx())); }).observe(car);
    }
    window.addEventListener('resize', function () { go(Math.min(idx, maxIdx())); });
    go(0); start();
    return { pause: stop, resume: start };
  }

  var TEMPLATES = {
    home: tplHome, about: tplAbout, services: tplServices, pricing: tplPricing,
    events: tplEvents, book: tplBook, groups: tplGroups, members: tplMembers,
    inquiry: tplInquiry, loyalty: tplLoyalty, why: tplWhy,
    privacy: tplPrivacy, accessibility: tplAccessibility
  };

  /* ---- SEO: inject JSON-LD structured data once ---- */
  function injectSEO(page) {
    if (document.getElementById('slp-jsonld-' + page)) return;
    var data = null;
    if (page === 'home' || page === 'about') {
      data = {
        '@context': 'https://schema.org', '@type': 'HealthAndBeautyBusiness',
        name: 'Silver Lining Pathways LLC',
        description: 'Equine-assisted coaching, Reiki, and energy work for grief, trauma, anxiety, and life transitions.',
        url: 'https://www.silverliningpathwaysllc.com',
        telephone: '+1-219-361-9900', email: EMAIL,
        areaServed: ['Indiana', 'California', 'Arizona'],
        founder: { '@type': 'Person', name: 'Shanda Hanft',
          jobTitle: 'Certified Equine Assisted Coach, Advanced Reiki Practitioner' },
        image: wimg(IMG.heroMist, 1200, 800)
      };
    } else if (page === 'services') {
      data = {
        '@context': 'https://schema.org', '@type': 'Service',
        serviceType: 'Equine-Assisted Coaching and Reiki Energy Work',
        provider: { '@type': 'Organization', name: 'Silver Lining Pathways LLC' },
        areaServed: ['Indiana', 'California', 'Arizona'],
        description: 'Equine-assisted coaching, Reiki, and group workshops supporting emotional healing and personal growth.'
      };
    }
    if (!data) return;
    var s = document.createElement('script');
    s.type = 'application/ld+json'; s.id = 'slp-jsonld-' + page;
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  var SLPPage = (function () {
    function C() { return Reflect.construct(HTMLElement, [], C); }
    C.prototype = Object.create(HTMLElement.prototype);
    C.prototype.constructor = C;
    C.prototype.connectedCallback = function () {
      injectFonts();
      var page = (this.getAttribute('data-page') || 'home').toLowerCase();
      var tpl = TEMPLATES[page] || TEMPLATES.home;
      var sh = this.attachShadow({ mode: 'open' });
      sh.innerHTML = '<style>' + THEME + '\n' + PAGE_CSS + '</style>' + tpl(this);
      wireReveal(sh);
      wireWixResize(this);
      injectSEO(page);
      var carCtl = wireCarousel(sh);

      // gallery lightbox
      var lb = sh.getElementById('slpLB');
      if (lb) {
        var lbImg = lb.querySelector('img');
        sh.querySelectorAll('.car-slide button').forEach(function (b) {
          b.addEventListener('click', function () {
            lbImg.src = b.getAttribute('data-full'); lb.classList.add('open');
            document.body.style.overflow = 'hidden';
            if (carCtl) carCtl.pause();
          });
        });
        var close = function () {
          lb.classList.remove('open'); document.body.style.overflow = '';
          if (carCtl) carCtl.resume();
        };
        lb.querySelector('.x').addEventListener('click', close);
        lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
      }

    };
    C.prototype.disconnectedCallback = function () { document.body.style.overflow = ''; };
    Object.setPrototypeOf(C, HTMLElement);
    return C;
  })();

  /* --------------------------------------------------- registration */
  if (!customElements.get('slp-header')) customElements.define('slp-header', SLPHeader);
  if (!customElements.get('slp-footer')) customElements.define('slp-footer', SLPFooter);
  if (!customElements.get('slp-page')) customElements.define('slp-page', SLPPage);
})();
