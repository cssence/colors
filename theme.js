/*global console, $ */
(function (console, document, window) {
  "use strict";
  window.$ = document.querySelector.bind(document);
  if ($) {
    $("header .container").insertAdjacentHTML("afterbegin", "<span class=\"theme-toggle hidden-print\">Theme: <b>" + $("html").getAttribute("data-theme") + "</b></span>");
    $(".theme-toggle").addEventListener("click", function () {
      var changeTo = $("html").getAttribute("data-theme") === "dark" ? "light" : "dark";
      $(".theme-toggle b").textContent = changeTo;
      $("html").setAttribute("data-theme", changeTo);
      //window.scrollTo(0, $("header").clientHeight);
    });
  }
  if (console) {
    console.log(" ▄▄▄▄   ▓█████ ▓█████  ▒█████   ███▄    █ ▓█████\n▓█████▄ ▓█   ▀ ▓█   ▀ ▒██▒  ██▒ ██ ▀█   █ ▓█   ▀\n▒██▒ ▄██▒███   ▒███   ▒██░  ██▒▓██  ▀█ ██▒▒███\n▒██░█▀  ▒▓█  ▄ ▒▓█  ▄ ▒██   ██░▓██▒  ▐▌██▒▒▓█  ▄\n░▓█  ▀█▓░▒████▒░▒████▒░ ████▓▒░▒██░   ▓██░░▒████▒\n░▒▓███▀▒░░ ▒░ ░░░ ▒░ ░░ ▒░▒░▒░ ░ ▒░   ▒ ▒ ░░ ▒░ ░\n▒░▒   ░  ░ ░  ░ ░ ░  ░  ░ ▒ ▒░ ░ ░░   ░ ▒░ ░ ░  ░\n ░    ░    ░      ░   ░ ░ ░ ▒     ░   ░ ░    ░\n ░         ░  ░   ░  ░    ░ ░           ░    ░  ░\n      ░");
  }
}(console, document, window));
