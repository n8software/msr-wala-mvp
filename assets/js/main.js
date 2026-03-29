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

  function setupSubpageHeroSequence() {
    if (doc.body.classList.contains("home-page")) {
      return;
    }

    var sequences = Array.prototype.slice.call(doc.querySelectorAll("[data-hero-sequence]"));
    if (!sequences.length) {
      return;
    }

    sequences.forEach(function (sequence) {
      Array.prototype.slice.call(sequence.children).forEach(function (child, index) {
        child.style.animationDelay = String(70 + index * 90) + "ms";
      });
    });

    if (motionQuery.matches) {
      doc.body.classList.add("subpage-hero-ready");
      return;
    }

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        doc.body.classList.add("subpage-hero-ready");
      });
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

  function setupSectionControllers() {
    var controllers = Array.prototype.slice.call(doc.querySelectorAll("[data-section-nav]"));
    if (!controllers.length) {
      return;
    }

    controllers.forEach(function (controller) {
      var links = Array.prototype.slice.call(controller.querySelectorAll('a[href^="#"]'));
      if (!links.length) {
        return;
      }

      var targets = links
        .map(function (link) {
          var href = link.getAttribute("href") || "";
          var id = href.replace(/^#/, "");
          var el = id ? doc.getElementById(id) : null;
          return { id: id, link: link, el: el };
        })
        .filter(function (entry) {
          return Boolean(entry.id && entry.el);
        });

      if (!targets.length) {
        return;
      }

      function setActive(id) {
        targets.forEach(function (entry) {
          var active = entry.id === id;
          entry.link.classList.toggle("is-active", active);
          if (active) {
            entry.link.setAttribute("aria-current", "true");
          } else {
            entry.link.removeAttribute("aria-current");
          }
        });
      }

      setActive(targets[0].id);

      if (!("IntersectionObserver" in window)) {
        return;
      }

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && entry.target.id) {
              setActive(entry.target.id);
            }
          });
        },
        { rootMargin: "-28% 0px -58% 0px", threshold: 0.1 }
      );

      targets.forEach(function (entry) {
        observer.observe(entry.el);
      });
    });
  }

  doc.addEventListener("DOMContentLoaded", function () {
    applyActiveNav();
    setupMobileNav();
    setupSectionControllers();
    setupSubpageHeroSequence();
    setupReveal();
    applySocialConfig();
    setCurrentYear();
    setupPlaceholderForms();
  });
})();
