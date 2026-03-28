(function () {
  var doc = document;
  var body = doc.body;

  if (!body || !body.classList.contains("home-page")) {
    return;
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function splitHeroHeadline() {
    var heading = doc.querySelector("[data-hero-headline]");
    if (!heading) {
      return;
    }

    var text = (heading.textContent || "").trim();
    if (!text) {
      return;
    }

    heading.setAttribute("aria-label", text);
    heading.textContent = "";

    var words = text.split(/\s+/);
    var fragment = doc.createDocumentFragment();

    words.forEach(function (word, index) {
      var span = doc.createElement("span");
      span.className = "word";
      span.textContent = word;
      span.setAttribute("aria-hidden", "true");
      span.style.animationDelay = String(220 + index * 70) + "ms";
      fragment.appendChild(span);

      if (index < words.length - 1) {
        fragment.appendChild(doc.createTextNode(" "));
      }
    });

    heading.appendChild(fragment);
  }

  function startHeroSequence() {
    if (reduceMotion) {
      body.classList.add("home-hero-ready");
      return;
    }

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        body.classList.add("home-hero-ready");
      });
    });
  }

  function animateValue(el) {
    if (el.dataset.countAnimated === "true") {
      return;
    }

    var target = Number(el.dataset.countTarget || "0");
    var start = Number(el.dataset.countStart || "0");
    var duration = Number(el.dataset.countDuration || "1000");
    var suffix = el.dataset.countSuffix || "";

    if (!Number.isFinite(target)) {
      return;
    }

    el.dataset.countAnimated = "true";

    if (reduceMotion) {
      el.textContent = String(Math.round(target)) + suffix;
      return;
    }

    var startedAt = null;

    function step(time) {
      if (!startedAt) {
        startedAt = time;
      }

      var progress = Math.min((time - startedAt) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(start + (target - start) * eased);

      el.textContent = String(current) + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  function setupMetricValues() {
    var values = Array.prototype.slice.call(doc.querySelectorAll(".metric-value[data-count-target]"));

    if (!values.length) {
      return;
    }

    if (reduceMotion || !("IntersectionObserver" in window)) {
      values.forEach(animateValue);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateValue(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    values.forEach(function (value) {
      observer.observe(value);
    });
  }

  doc.addEventListener("DOMContentLoaded", function () {
    splitHeroHeadline();
    startHeroSequence();
    setupMetricValues();
  });
})();
