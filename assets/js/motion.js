(function () {
  var reduce = document.documentElement.classList.contains("mcf-reduce") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function reveal(el) {
    var name = el.getAttribute("data-anim") || "fadeInUp";
    var delay = el.getAttribute("data-delay") || "0";
    el.classList.add("animate__animated", "animate__" + name);
    el.style.animationDelay = delay + "ms";
  }

  var anims = document.querySelectorAll("[data-anim]");
  if (reduce || !("IntersectionObserver" in window)) {
    anims.forEach(function (el) { el.style.opacity = "1"; });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    anims.forEach(function (el) { io.observe(el); });
  }

  var groups = document.querySelectorAll(".bento-grid, .rm-timeline, .rm-why-grid, .rm-editorial");
  if (reduce || !("IntersectionObserver" in window)) {
    groups.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var gio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        gio.unobserve(entry.target);
      });
    }, { threshold: 0.18 });
    groups.forEach(function (el) { gio.observe(el); });
  }

  if (!reduce) {
    var editorials = document.querySelectorAll(".rm-editorial");
    if (editorials.length) {
      var ticking = false;
      function parallax() {
        ticking = false;
        editorials.forEach(function (box) {
          var img = box.querySelector("img");
          if (!img) return;
          var rect = box.getBoundingClientRect();
          var vh = window.innerHeight || 1;
          var p = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
          p = Math.max(-1, Math.min(1, p));
          img.style.transform = "translate3d(0, " + (p * 28).toFixed(1) + "px, 0) scale(1.12)";
        });
      }
      function onScroll() {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(parallax);
        }
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      parallax();
    }
  }

  var menuBtn = document.querySelector(".rm-menu");
  var sidebar = document.getElementById("rm-sidebar");
  var overlay = document.querySelector(".sidebar-overlay");
  var closeBtn = sidebar && sidebar.querySelector(".rm-close");

  function setSidebar(open) {
    if (!sidebar) return;
    var was = sidebar.classList.contains("active");
    if (was === open) return;
    sidebar.classList.toggle("active", open);
    if (overlay) overlay.classList.toggle("active", open);
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.classList.toggle("is-open", open);
    }
    document.body.style.overflow = open ? "hidden" : "";
    if (open && closeBtn) closeBtn.focus();
    else if (!open && menuBtn) menuBtn.focus();
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      setSidebar(!sidebar.classList.contains("active"));
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", function () { setSidebar(false); });
  if (overlay) overlay.addEventListener("click", function () { setSidebar(false); });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (sidebar && sidebar.classList.contains("active")) setSidebar(false);
    document.querySelectorAll(".dropdown-menu.show").forEach(function (m) {
      m.classList.remove("show");
      var btn = m.parentElement && m.parentElement.querySelector(".dropdown-toggle");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  });

  if (sidebar) {
    sidebar.addEventListener("click", function (e) {
      if (e.target.closest("a")) setSidebar(false);
    });
    var sideDrop = sidebar.querySelector(".sidebar-dropdown-btn");
    var sideMenu = sidebar.querySelector(".sidebar-dropdown-menu");
    if (sideDrop && sideMenu) {
      sideDrop.addEventListener("click", function () {
        var open = sideMenu.classList.toggle("active");
        sideDrop.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  }

  document.querySelectorAll(".navbar .dropdown").forEach(function (drop) {
    var btn = drop.querySelector(".dropdown-toggle");
    var menu = drop.querySelector(".dropdown-menu");
    if (!btn || !menu) return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle("show");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("click", function (e) {
    if (e.target.closest(".dropdown")) return;
    document.querySelectorAll(".dropdown-menu.show").forEach(function (m) {
      m.classList.remove("show");
    });
  });

  document.querySelectorAll(".accordion").forEach(function (root) {
    root.querySelectorAll(".accordion-button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        root.querySelectorAll(".accordion-button").forEach(function (b) {
          b.classList.add("collapsed");
          b.setAttribute("aria-expanded", "false");
          var panel = document.getElementById(b.getAttribute("aria-controls"));
          if (panel) panel.classList.remove("show");
        });
        if (!expanded) {
          btn.classList.remove("collapsed");
          btn.setAttribute("aria-expanded", "true");
          var panel = document.getElementById(btn.getAttribute("aria-controls"));
          if (panel) panel.classList.add("show");
        }
      });
    });
  });

  document.querySelectorAll(".bento-tile").forEach(function (tile) {
    tile.addEventListener("pointermove", function (e) {
      var r = tile.getBoundingClientRect();
      if (!r.width || !r.height) return;
      tile.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
      tile.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
    });
  });
})();
