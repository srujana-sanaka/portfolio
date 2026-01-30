(function () {
  'use strict';

  // Current year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('is-active');
      navLinks.classList.toggle('is-open');
      document.body.style.overflow = navLinks.classList.contains('is-open') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('is-active');
        navLinks.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Header background on scroll
  var header = document.querySelector('.header');
  if (header) {
    function onScroll() {
      header.style.background = window.scrollY > 50
        ? 'rgba(15, 15, 18, 0.95)'
        : 'rgba(15, 15, 18, 0.85)';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Optional: subtle fade-in for sections (if prefers reduced motion, skip)
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    var sections = document.querySelectorAll('.section');
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    sections.forEach(function (section) {
      section.style.opacity = '0';
      section.style.transform = 'translateY(16px)';
      section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(section);
    });
  }
})();
