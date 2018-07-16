"use strict";

(function() {
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach(accordion => {
    const buttons = accordion.querySelectorAll(".section-header");
    buttons.forEach(button => {
      button.addEventListener("keyup", event => {
        if (event.keyCode == 32 || event.keyCode == 13) {
          //escape
          event.currentTarget.click();
          event.preventDefault();
        }
      });
      if (button.parentElement.parentElement.childElementCount == 1) {
        var roleButtonEl = button.children[0];
        var upDownIcon = button.parentElement.children[0];
        roleButtonEl.setAttribute("aria-disabled", "true");
        upDownIcon.style.visibility = "hidden";
      }
      button.addEventListener("click", event => {
        const eventSelector = event.currentTarget.parentNode;
        const secContent = eventSelector.parentNode.querySelector(
            ".section-content"
          ),
          secItem = secContent.querySelector(".section-item"),
          openIcon = eventSelector.querySelector(".pe-icon--dropdown-open-18"),
          closeIcon = eventSelector.querySelector(
            ".pe-icon--dropdown-close-18"
          ),
          roleButtonElement = eventSelector.querySelector("[aria-expanded]"),
          mainButton = eventSelector.querySelector(".button");

        if (secItem) {
          if (secContent.style.display === "none") {
            secContent.style.display = "block";
            openIcon.style.display = "none";
            closeIcon.style.display = "block";
            roleButtonElement.setAttribute("aria-expanded", "true");
            secContent.setAttribute("aria-hidden", "false");
            mainButton.style.display = "none";
          } else {
            secContent.style.display = "none";
            openIcon.style.display = "block";
            closeIcon.style.display = "none";
            roleButtonElement.setAttribute("aria-expanded", "false");
            secContent.setAttribute("aria-hidden", "true");
            mainButton.style.display = "block";
          }
        }
      });
    });
  });
})();
