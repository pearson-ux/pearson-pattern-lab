"use strict";

(function() {
  const coachmarks = document.querySelectorAll(".coachmark");
  const cmTriggers = document.querySelectorAll(
    "[data-name='coachmark-trigger'"
  );
  coachmarks.forEach(coachmark => {
    const eventArea = coachmark.querySelector(".content");
    eventArea.addEventListener("click", event => {
      if (
        (event.target && event.target.matches("a.coach-link")) ||
        (event.target && event.target.matches("button")) ||
        event.target.matches("svg") ||
        event.target.matches("use")
      ) {
        event.currentTarget.parentNode.classList.add("hidden");
      }
    });
  });
  cmTriggers.forEach(cmTrigger => {
    cmTrigger.addEventListener("mouseenter", event => {
      coachmarks.forEach(coachmark => {
        if (coachmark == cmTrigger.nextElementSibling) {
          coachmark.classList.remove("hidden");
        } else {
          coachmark.classList.add("hidden");
        }
      });
      //cmTrigger.nextElementSibling.classList.remove('hidden');
    });
  });
})();
