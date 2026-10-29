/*
 * Shared header + footer for every page.
 * Each page calls BTRLayout.header() at the top of <body> and BTRLayout.footer() at the bottom;
 * the markup is written in place synchronously, so there is no flash of missing navigation.
 * Edit NAV below to change the menu on every page at once.
 */
(function () {
  var NAV = [
    { key: "home", label: "Home", href: "index.html" },
    {
      key: "about", label: "About Us", href: "our-story.html",
      children: [
        { key: "our-story", label: "Our Story", href: "our-story.html" },
        { key: "our-team", label: "Founders", href: "our-team.html" },
        { key: "current-ris-leadership", label: "Current RIS Leadership", href: "current-ris-leadership.html" },
        { key: "our-partners", label: "Our Partners", href: "our-partners.html" },
        { key: "our-achievements", label: "Our Achievements", href: "our-achievements.html" }
      ]
    },
    { key: "biogas-balloons", label: "Biogas Balloons", href: "biogas-balloons.html" },
    { key: "biochar", label: "Biochar", href: "biochar.html" },
    {
      key: "advocacy", label: "Advocacy", href: "advocacy.html",
      children: [
        { key: "articles", label: "Articles", href: "articles.html" },
        { key: "sustainability-booklets", label: "Sustainability Booklets", href: "sustainability-booklets.html" }
      ]
    }
  ];

  var ICON = {
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h10"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>'
  };

  function current() {
    return document.body.getAttribute("data-page") || "";
  }

  function isActive(item, page) {
    if (item.key === page) return true;
    return !!(item.children && item.children.some(function (c) { return c.key === page; }));
  }

  function aria(item, page) {
    return item.key === page ? ' aria-current="page"' : "";
  }

  function desktopNav(page) {
    var items = NAV.map(function (item, i) {
      var cls = "nav__item" + (isActive(item, page) ? " is-current" : "");
      if (!item.children) {
        return '<li class="' + cls + '"><a class="nav__link" href="' + item.href + '"' + aria(item, page) + ">" + item.label + "</a></li>";
      }
      var id = "dd-" + i;
      var sub = item.children.map(function (c) {
        return '<li><a href="' + c.href + '"' + aria(c, page) + ">" + c.label + ICON.arrow + "</a></li>";
      }).join("");
      return '<li class="' + cls + ' has-dropdown">' +
        '<a class="nav__link" href="' + item.href + '">' + item.label + "</a>" +
        '<button class="nav__toggle" type="button" aria-expanded="false" aria-controls="' + id + '"><span class="visually-hidden">Show ' + item.label + " menu</span>" + ICON.chevron + "</button>" +
        '<ul class="dropdown" id="' + id + '">' + sub + "</ul></li>";
    }).join("");
    items += '<li class="nav__item nav__item--cta"><a class="nav__cta" href="#contact">Contact Us</a></li>';
    return '<nav class="nav" aria-label="Main"><ul class="nav__list">' + items + "</ul></nav>";
  }

  function drawerNav(page) {
    return NAV.map(function (item) {
      var sub = "";
      if (item.children) {
        sub = '<ul class="drawer__sub">' + item.children.map(function (c) {
          return '<li><a href="' + c.href + '"' + aria(c, page) + ">" + c.label + "</a></li>";
        }).join("") + "</ul>";
      }
      return '<li><a class="drawer__main" href="' + item.href + '"' + aria(item, page) + ">" + item.label + "</a>" + sub + "</li>";
    }).join("");
  }

  function brand(extraClass) {
    return '<a class="brand ' + (extraClass || "") + '" href="index.html" aria-label="Between The Roots — home">' +
      '<span class="brand__badge"><img src="assets/images/logo-full.png" alt="Between The Roots logo" width="900" height="900"></span></a>';
  }

  function write(html) {
    var s = document.currentScript;
    if (s) s.insertAdjacentHTML("beforebegin", html);
    else document.body.insertAdjacentHTML("afterbegin", html);
  }

  window.BTRLayout = {
    header: function () {
      var page = current();
      write(
        '<a class="skip-link" href="#main">Skip to content</a>' +
        '<header class="site-header" data-header><div class="container">' +
          brand() + desktopNav(page) +
          '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="drawer" data-menu-open><span class="visually-hidden">Open menu</span>' + ICON.menu + "</button>" +
        "</div></header>" +
        '<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Menu" data-drawer>' +
          '<div class="drawer__top">' + brand() +
            '<button class="drawer__close" type="button" data-menu-close><span class="visually-hidden">Close menu</span>' + ICON.close + "</button></div>" +
          '<nav aria-label="Mobile"><ul class="drawer__list">' + drawerNav(page) + "</ul></nav>" +
          '<a class="btn btn--brown" href="#contact" data-menu-close>Contact Us</a>' +
        "</div>" +
        '<div class="drawer-backdrop" data-menu-close></div>'
      );
    },

    footer: function () {
      var page = current();
      var links = [];
      NAV.forEach(function (item) {
        if (item.children) item.children.forEach(function (c) { links.push(c); });
        else links.push(item);
      });
      // Keep parents' order: Home, About pages, Biogas, Biochar, Advocacy, then Advocacy sub-pages
      var advocacy = NAV[NAV.length - 1];
      links.splice(links.indexOf(advocacy.children[0]), 0, { key: advocacy.key, label: advocacy.label, href: advocacy.href });

      write(
        '<footer class="site-footer" id="contact"><div class="container"><div class="footer__main">' +
          '<div class="footer__brand">' +
            '<a class="footer__logo" href="index.html" aria-label="Between The Roots — home"><img src="assets/images/logo-full.png" alt="Between The Roots logo" width="900" height="900" loading="lazy"></a>' +
            '<p class="footer__motto">ADVOCATE, ACT, ASSIST</p>' +
            '<ul class="footer__nav">' + links.map(function (l) {
              return '<li><a href="' + l.href + '"' + aria(l, page) + ">" + l.label + "</a></li>";
            }).join("") + "</ul>" +
          "</div>" +
          '<div class="contact-card">' +
            "<h2>Contact Us</h2>" +
            '<ul class="contact-list">' +
              '<li><span class="contact-list__icon">' + ICON.pin + "</span>Ruamrudee International School</li>" +
              '<li><span class="contact-list__icon">' + ICON.mail + '</span><a href="mailto:thanakornv25@rism.ac.th">thanakornv25@rism.ac.th</a></li>' +
            "</ul>" +
          "</div>" +
        "</div></div>" +
        '<div class="footer__bottom"><div class="container"><span>Between The Roots</span><span>ASPIRE · ADVOCATE · ASSIST</span></div></div>' +
        "</footer>" +
        '<button class="to-top" type="button" data-to-top><span class="visually-hidden">Back to top</span>' + ICON.up + "</button>" +
        '<div class="lightbox" data-lightbox aria-hidden="true"><button class="lightbox__close" type="button" data-lightbox-close><span class="visually-hidden">Close image</span>' + ICON.close + '</button><img alt=""></div>'
      );
    }
  };

  document.documentElement.classList.add("js");
})();
