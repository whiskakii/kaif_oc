// app.js
// KAIF – Menu logic (optimized, semantic, responsive)
// Απαιτεί jQuery

(function ($) {
  "use strict";

  // -----------------------------
  // Constants
  // -----------------------------

  const IMAGE_SOURCES = [
    "https://raw.githubusercontent.com/whiskakii/kaif_oc/refs/heads/main/images/back.jpg",
    "https://raw.githubusercontent.com/whiskakii/kaif_oc/refs/heads/main/images/hbgr.png",
    "https://raw.githubusercontent.com/whiskakii/kaif_oc/55210e34a66a1be953f4b2be1a96d0b53ffd19ef/images/kaif_vec.svg"
  ];

  const SCROLL_TOP_THRESHOLD = 200;
  const GOOGLE_REVIEW_MIN_SCROLL = 150;
  const GOOGLE_REVIEW_MIN_DISTANCE_FROM_BOTTOM = 200;
  const ACTIVE_SECTION_OFFSET_TOP = 120;
  const SCROLL_TO_TOP_DURATION = 400;

  const GOOGLE_REVIEW_URL =
    "https://search.google.com/local/writereview?placeid=ChIJNx0QS2J7VxMRBgbs8Gz5zQI";

  // -----------------------------
  // Helpers
  // -----------------------------

  function getElement(selector) {
    const $el = $(selector);
    return $el.length ? $el : null;
  }

  function preloadImages(sources, onComplete) {
    if (!Array.isArray(sources) || !sources.length) {
      if (typeof onComplete === "function") onComplete();
      return;
    }

    let loadedCount = 0;
    const total = sources.length;

    sources.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loadedCount += 1;
        if (loadedCount === total && typeof onComplete === "function") {
          onComplete();
        }
      };
      img.src = src;
    });
  }

  // -----------------------------
  // Menu construction
  // -----------------------------

  function buildMenu(menuConfig) {
    const $categoryList = getElement("#menu-category-list");
    const $menuSections = getElement("#menu-sections");

    if (!$categoryList || !$menuSections || !menuConfig) return;

    Object.entries(menuConfig).forEach(([categoryKey, categoryData]) => {
      const categoryLabel = categoryData.category || "";
      const items = Array.isArray(categoryData.items) ? categoryData.items : [];

      // Category button
      const $categoryButton = $("<button>", {
        type: "button",
        "data-category-target": categoryKey,
        class: "menu-category-button"
      }).text(categoryLabel);

      $categoryButton.on("click", () => {
        const $targetSection = $("#" + categoryKey);
        if ($targetSection.length) {
          $targetSection[0].scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });

      $categoryList.append($categoryButton);

      // Category section
      const $section = $("<section>", {
        id: categoryKey,
        class: "menu-section"
      });

      const $heading = $("<h2>", {
        class: "menu-section__title"
      }).text(categoryLabel);

      $section.append($heading);

      // Items
      items.forEach((item) => {
        const title = item.title || "";
        const price = item.price || "";
        const desc = item.desc || "";

        const $item = $("<article>", {
          class: "menu-item"
        });

        const $itemHeader = $("<div>", {
          class: "menu-item__header"
        });

        $("<span>", {
          class: "menu-item__name"
        })
          .text(title)
          .appendTo($itemHeader);

        $("<span>", {
          class: "menu-item__price"
        })
          .text(`${price}€`)
          .appendTo($itemHeader);

        const $itemDescription = $("<p>", {
          class: "menu-item__description"
        }).html(desc);

        $item.append($itemHeader, $itemDescription);
        $section.append($item);
      });

      $menuSections.append($section);
    });
  }

  // -----------------------------
  // UI behaviour
  // -----------------------------

  function setupBackToTopButton() {
    let $button = $("#back-to-top-button");

    if (!$button || !$button.length) {
      $button = $("<button>", {
        id: "back-to-top-button",
        type: "button",
        class: "back-to-top-button",
        "aria-label": "Μετάβαση στην αρχή της σελίδας"
      }).text("↑");

      $("body").append($button);
    }

    $button.on("click", (event) => {
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: 0
        },
        SCROLL_TO_TOP_DURATION
      );
    });

    return $button;
  }

  function syncActiveCategoryWithScroll() {
    const $categoryList = $(".menu-category-list");
    if (!$categoryList.length) return;

    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const docHeight = $(document).height();
    const distanceFromBottom = docHeight - (scrollTop + windowHeight);

    // Google review banner visibility
    const $reviewBanner = $("#google-review-banner");
    if ($reviewBanner.length) {
      if (
        scrollTop > GOOGLE_REVIEW_MIN_SCROLL &&
        distanceFromBottom > GOOGLE_REVIEW_MIN_DISTANCE_FROM_BOTTOM
      ) {
        $reviewBanner.stop(true, true).fadeIn(300);
      } else {
        $reviewBanner.stop(true, true).fadeOut(300);
      }
    }

    // Active category + horizontal centering
    $(".menu-section").each(function () {
      const $section = $(this);
      const top = $section.offset().top - ACTIVE_SECTION_OFFSET_TOP;
      const bottom = top + $section.outerHeight();
      const inView = scrollTop >= top && scrollTop <= bottom;

      if (!inView) return;

      const sectionId = $section.attr("id");
      if (!sectionId) return;

      const $button = $categoryList.find(
        `button[data-category-target='${sectionId}']`
      );
      if (!$button.length) return;

      $categoryList.find("button").removeClass("menu-category-button--active");
      $button.addClass("menu-category-button--active");

      const containerScrollLeft = $categoryList.scrollLeft();
      const buttonLeft = $button.offset().left + containerScrollLeft;
      const containerLeft = $categoryList.offset().left;
      const relativeLeft = buttonLeft - containerLeft;

      const targetScrollLeft =
        relativeLeft - $categoryList.width() / 2 + $button.outerWidth() / 2;

      $categoryList[0].scrollTo({
        left: targetScrollLeft,
        behavior: "smooth"
      });
    });
  }

  function initNavigationShortcuts() {
    // Κρατάω τα ίδια class names που ήδη χρησιμοποιείς,
    // για να μην σπάσει τίποτα σε άλλα pages.
    $(document).on("click", ".r_menu", () => {
      window.location.href = "menu.html";
    });

    $(document).on("click", ".not_found_home", () => {
      window.location.href = "/";
    });

  $(".site-logo").on("click", ".not_found_home", () => {
      window.location.href = "/";
    });
  }

  function initGoogleReviewBanner() {
    const $banner = $("#google-review-banner");
    if (!$banner.length) return;

    const openReviewPage = () => {
      window.open(GOOGLE_REVIEW_URL, "_blank", "noopener");
    };

    $banner.on("click", openReviewPage);
    $banner.on("keypress", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openReviewPage();
      }
    });
  }

  // -----------------------------
  // Init
  // -----------------------------

  $(document).ready(async () => {
    // Navigation shortcuts
    initNavigationShortcuts();

    // Back-to-top button
    const $backToTopButton = setupBackToTopButton();

    // Scroll behaviour
    $(window).on("scroll", () => {
      const showScrollTop = $(window).scrollTop() > SCROLL_TOP_THRESHOLD;

      if (showScrollTop) {
        $backToTopButton.stop(true, true).fadeIn();
      } else {
        $backToTopButton.stop(true, true).fadeOut();
      }

      syncActiveCategoryWithScroll();
    });

    // Preload images (background/logo)
    preloadImages(IMAGE_SOURCES, () => {
      const $title = $("#menu-title");
      if ($title.length) {
        $title.text("ΤΙΜΟΚΑΤΑΛΟΓΟΣ");
      }
    });

    // Load menu JSON
    try {
      const response = await fetch("./items.json", {
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      buildMenu(data.menu || {});
    } catch (error) {
      console.error("JSON load error:", error);
    }

    // Google rate banner click
    initGoogleReviewBanner();
  });
})(jQuery);
