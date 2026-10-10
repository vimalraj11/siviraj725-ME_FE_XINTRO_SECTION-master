(() => {
  "use strict";

  const openMenuButton = document.querySelector(".open-menu");
  const closeMenuButton = document.querySelector(".close-menu");
  const nav = document.querySelector(".nav");
  const overlay = document.querySelector(".overlay");
  const dropdownButtons = [...document.querySelectorAll(".nav-link")];

  function isMobile() {
    return window.matchMedia("(max-width: 700px)").matches;
  }

  function openMobileMenu() {
    nav.classList.add("mobile-open");
    overlay.classList.add("visible");
    openMenuButton.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-is-open");
  }

  function closeMobileMenu() {
    nav.classList.remove("mobile-open");
    overlay.classList.remove("visible");
    openMenuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-is-open");
  }

  openMenuButton.setAttribute("aria-expanded", "false");
  openMenuButton.addEventListener("click", openMobileMenu);
  closeMenuButton.addEventListener("click", closeMobileMenu);
  overlay.addEventListener("click", closeMobileMenu);

  dropdownButtons.forEach(button => {
    if (!button.classList.contains("nav-link") || !button.parentElement.classList.contains("has-dropdown")) {
      return;
    }

    button.addEventListener("click", event => {
      event.preventDefault();

      const wasOpen = button.classList.contains("link-open");

      dropdownButtons.forEach(otherButton => {
        if (otherButton.parentElement.classList.contains("has-dropdown")) {
          otherButton.classList.remove("link-open");
          otherButton.setAttribute("aria-expanded", "false");
        }
      });

      if (!wasOpen) {
        button.classList.add("link-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMobileMenu();

      dropdownButtons.forEach(button => {
        button.classList.remove("link-open");
        button.setAttribute("aria-expanded", "false");
      });
    }
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) {
      closeMobileMenu();
    }
  });
})();
