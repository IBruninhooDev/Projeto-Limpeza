  /**
 * Clean House — script.js
 * Menu mobile, scroll suave, animações ao rolar, estado da navbar
 */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------------
   * Menu hambúrguer
   * --------------------------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");
  var navLinks = document.querySelectorAll(".nav-link");

  function closeMenu() {
    if (toggle) {
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
    if (menu) menu.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function openMenu() {
    if (toggle) {
      toggle.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }
    if (menu) menu.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.contains("is-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 768px)").matches) {
          closeMenu();
        }
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  /* ---------------------------------------------------------------------------
   * Scroll suave para âncoras internas (reforço além do CSS)
   * --------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = this.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        var header = document.querySelector(".site-header");
        var offset = header ? header.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: "smooth" });
        closeMenu();
      }
    });
  });

  /* ---------------------------------------------------------------------------
   * Navbar — sombra ao rolar
   * --------------------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------------------------------------------------------------------------
   * Animação fade-in (Intersection Observer)
   * --------------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -48px 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
