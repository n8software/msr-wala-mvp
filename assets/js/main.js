(function () {
  var doc = document;
  doc.documentElement.classList.add("js");
  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  function normalizePath(path) {
    var clean = path.replace(/index\.html$/, "");
    clean = clean.replace(/\/$/, "");
    return clean || "/";
  }

  function applyActiveNav() {
    var current = normalizePath(window.location.pathname);
    var links = doc.querySelectorAll("[data-nav-link]");

    links.forEach(function (link) {
      var rawHref = link.getAttribute("href") || "";
      if (!rawHref || rawHref.startsWith("http") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) {
        return;
      }

      var url = new URL(rawHref, window.location.href);
      var linkPath = normalizePath(url.pathname);

      if (current === linkPath) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function setupMobileNav() {
    var toggle = doc.querySelector("[data-nav-toggle]");
    var nav = doc.querySelector("[data-site-nav]");

    if (!toggle || !nav) {
      return;
    }

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menü öffnen");
      nav.classList.remove("is-open");
      doc.body.classList.remove("menu-open");
    }

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Menü öffnen" : "Menü schließen");
      nav.classList.toggle("is-open", !open);
      doc.body.classList.toggle("menu-open", !open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    doc.addEventListener("click", function (event) {
      if (window.innerWidth > 1200) {
        return;
      }

      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (!isOpen) {
        return;
      }

      var target = event.target;
      if (!nav.contains(target) && !toggle.contains(target)) {
        closeMenu();
      }
    });

    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1200) {
        closeMenu();
      }
    });
  }

  function setupReveal() {
    if (motionQuery.matches || !("IntersectionObserver" in window)) {
      doc.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var viewportHeight = window.innerHeight || doc.documentElement.clientHeight || 0;
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    doc.querySelectorAll(".reveal").forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top <= viewportHeight * 0.92) {
        el.classList.add("is-visible");
        return;
      }

      observer.observe(el);
    });
  }

  function applySocialConfig() {
    var cfg = window.SITE_CONFIG || {};
    var social = cfg.social || {};
    var facebookUrl = social.facebookUrl || "https://facebook.com/";
    var isPlaceholder = Boolean(social.facebookIsPlaceholder);

    doc.querySelectorAll('[data-social="facebook"]').forEach(function (link) {
      link.setAttribute("href", facebookUrl);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");

      if (isPlaceholder) {
        link.setAttribute("title", "Facebook-Link folgt (Platzhalter)");
        link.setAttribute("aria-label", "Facebook-Link folgt (Platzhalter)");
        link.setAttribute("aria-disabled", "true");
        link.dataset.placeholder = "true";
      }
    });
  }

  function setCurrentYear() {
    var year = String(new Date().getFullYear());
    doc.querySelectorAll("#year").forEach(function (el) {
      el.textContent = year;
    });
  }

  function setupPlaceholderForms() {
    doc.querySelectorAll("form").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
      });
    });
  }

  doc.addEventListener("DOMContentLoaded", function () {
    applyActiveNav();
    setupMobileNav();
    setupReveal();
    applySocialConfig();
    setCurrentYear();
    setupPlaceholderForms();
  });
})();
