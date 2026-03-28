(function () {
  var doc = document;
  var body = doc.body;

  if (!body || !body.classList.contains("gallery-page")) {
    return;
  }

  var items = Array.prototype.slice.call(doc.querySelectorAll("[data-gallery-item]"));
  var lightbox = doc.querySelector("[data-gallery-lightbox]");
  var lightboxImage = doc.querySelector("[data-gallery-image]");
  var lightboxCaption = doc.querySelector("[data-gallery-caption]");
  var closeButton = doc.querySelector("[data-gallery-close]");
  var prevButton = doc.querySelector("[data-gallery-prev]");
  var nextButton = doc.querySelector("[data-gallery-next]");
  var activeIndex = 0;

  if (!items.length || !lightbox || !lightboxImage || !lightboxCaption || !closeButton || !prevButton || !nextButton) {
    return;
  }

  function getItemData(index) {
    var item = items[index];
    var image = item.querySelector("img");

    return {
      href: item.getAttribute("href") || "",
      caption: item.dataset.caption || image.getAttribute("alt") || "",
      alt: image.getAttribute("alt") || item.dataset.caption || "Galeriebild"
    };
  }

  function render(index) {
    var data = getItemData(index);
    lightboxImage.src = data.href;
    lightboxImage.alt = data.alt;
    lightboxCaption.textContent = data.caption;
  }

  function openLightbox(index) {
    activeIndex = index;
    render(activeIndex);
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    body.classList.add("gallery-lightbox-open");
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    body.classList.remove("gallery-lightbox-open");
    lightboxImage.removeAttribute("src");
    items[activeIndex].focus();
  }

  function showNext() {
    activeIndex = (activeIndex + 1) % items.length;
    render(activeIndex);
  }

  function showPrevious() {
    activeIndex = (activeIndex - 1 + items.length) % items.length;
    render(activeIndex);
  }

  items.forEach(function (item, index) {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      openLightbox(index);
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  prevButton.addEventListener("click", showPrevious);
  nextButton.addEventListener("click", showNext);

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  doc.addEventListener("keydown", function (event) {
    if (lightbox.hidden) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
      return;
    }

    if (event.key === "ArrowRight") {
      showNext();
      return;
    }

    if (event.key === "ArrowLeft") {
      showPrevious();
    }
  });
})();
