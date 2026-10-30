/* Shared mockup behaviour: review toolbar, wireframe toggle, mobile menus, demo forms. */
(function () {
  var KEY = "rean-mockup-mode";
  var root = document.documentElement;

  function storedMode() {
    var fromUrl = new URLSearchParams(location.search).get("mode");
    if (fromUrl === "wf" || fromUrl === "proto") return fromUrl;
    try { return localStorage.getItem(KEY) || "proto"; } catch (e) { return "proto"; }
  }

  function setMode(mode) {
    root.classList.toggle("wf", mode === "wf");
    try { localStorage.setItem(KEY, mode); } catch (e) {}
    var url = new URL(location.href);
    url.searchParams.set("mode", mode);
    history.replaceState(null, "", url);
    document.querySelectorAll(".mk-seg button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.mode === mode));
    });
  }

  var bar = document.createElement("div");
  bar.className = "mk-bar";
  bar.setAttribute("role", "toolbar");
  bar.setAttribute("aria-label", "Mockup controls");
  bar.innerHTML =
    '<a href="../index.html">&larr; All concepts</a>' +
    '<span class="mk-name">' + (document.body.dataset.concept || "") + "</span>" +
    '<div class="mk-seg"><button type="button" data-mode="proto">Prototype</button>' +
    '<button type="button" data-mode="wf">Wireframe</button></div>';
  document.body.appendChild(bar);
  bar.querySelectorAll(".mk-seg button").forEach(function (b) {
    b.addEventListener("click", function () { setMode(b.dataset.mode); });
  });
  setMode(storedMode());

  // Mobile menus: <button data-menu-toggle="navId">
  document.querySelectorAll("[data-menu-toggle]").forEach(function (btn) {
    var nav = document.getElementById(btn.dataset.menuToggle);
    if (!nav) return;
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        btn.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  });

  // Demo forms: nothing is sent anywhere.
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".mk-status");
      if (status) status.textContent = "Prototype only. Signup isn't connected yet.";
    });
  });
})();
