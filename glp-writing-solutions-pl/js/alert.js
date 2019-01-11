"use strict";

(function() {
  const alerts = document.querySelectorAll(".alert-box");
  alerts.forEach(alert => {
    const button = alert.querySelector("button");
    button.addEventListener("click", event => {
      event.currentTarget.parentNode.parentNode.style.opacity = 0;
    });
  });
})();
