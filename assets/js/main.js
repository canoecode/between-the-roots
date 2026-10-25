/* Between The Roots — page interactions */
(function () {
  var doc = document;

  /* ---------- Sticky header ---------- */
  var header = doc.querySelector("[data-header]");
  var toTop = doc.querySelector("[data-to-top]");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 40);
    if (toTop) toTop.classList.toggle("is-visible", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---------- Desktop dropdowns (hover is CSS; this adds click / keyboard) ---------- */
  doc.querySelectorAll(".nav__toggle").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var item = btn.closest(".nav__item");
      var open = !item.classList.contains("is-open");
      closeDropdowns();
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });
  function closeDropdowns() {
    doc.querySelectorAll(".nav__item.is-open").forEach(function (item) {
      item.classList.remove("is-open");
      var b = item.querySelector(".nav__toggle");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }
  doc.addEventListener("click", function (e) {
    if (!e.target.closest(".has-dropdown")) closeDropdowns();
  });

  /* ---------- Mobile drawer ---------- */
  var drawer = doc.querySelector("[data-drawer]");
  var backdrop = doc.querySelector(".drawer-backdrop");
  var openBtn = doc.querySelector("[data-menu-open]");
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle("is-open", open);
    if (backdrop) backdrop.classList.toggle("is-open", open);
    doc.body.classList.toggle("no-scroll", open);
    if (openBtn) openBtn.setAttribute("aria-expanded", String(open));
    if (open) {
      var first = drawer.querySelector(".drawer__close");
      if (first) first.focus();
    } else if (openBtn && drawer.contains(doc.activeElement)) {
      openBtn.focus();
    }
  }
  if (openBtn) openBtn.addEventListener("click", function () { setDrawer(true); });
  doc.querySelectorAll("[data-menu-close]").forEach(function (el) {
    el.addEventListener("click", function () { setDrawer(false); });
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1120 && drawer && drawer.classList.contains("is-open")) setDrawer(false);
  });

  /* ---------- Lightbox for zoomable images ---------- */
  var lightbox = doc.querySelector("[data-lightbox]");
  var lbImg = lightbox && lightbox.querySelector("img");
  var lastTrigger = null;
  function openLightbox(src, alt, trigger) {
    if (!lightbox) return;
    lastTrigger = trigger;
    lbImg.src = src;
    lbImg.alt = alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    doc.body.classList.add("no-scroll");
    lightbox.querySelector("[data-lightbox-close]").focus();
  }
  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    doc.body.classList.remove("no-scroll");
    if (lastTrigger) lastTrigger.focus();
  }
  doc.querySelectorAll("[data-zoom]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var img = btn.querySelector("img");
      openLightbox(btn.getAttribute("data-zoom") || img.currentSrc || img.src, img.alt, btn);
    });
  });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.closest("[data-lightbox-close]")) closeLightbox();
    });
  }

  doc.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    closeLightbox();
    setDrawer(false);
    closeDropdowns();
  });

  /* ---------- Click-to-play YouTube (loads the player only when asked) ---------- */
  doc.querySelectorAll("[data-youtube]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-youtube");
      var iframe = doc.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      iframe.title = btn.getAttribute("aria-label") || "YouTube video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      btn.replaceWith(iframe);
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = doc.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
