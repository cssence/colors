/*global console, $ */
(function (console, document, window) {
  "use strict";
  window.$ = document.querySelector.bind(document);
  if ($) {
    $("[role=banner]").insertAdjacentHTML("beforeend", "<span class=\"theme-toggle hidden-print\">Theme: <b>light</b></span>");
    $(".theme-toggle").addEventListener("click", function () {
      var changeTo = $("html").getAttribute("data-theme") === "dark" ? "light" : "dark";
      $(".theme-toggle b").textContent = changeTo;
      $("html").setAttribute("data-theme", changeTo);
      //window.scrollTo(0, $("header").clientHeight);
    });
  }
}(console, document, window));
