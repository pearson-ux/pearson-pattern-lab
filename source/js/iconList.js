"use strict";
(function() {
  const flipContainers = document.querySelectorAll(".flip-container");
  flipContainers.forEach(flipContainer => {
    flipContainer.addEventListener("click", event => {
      flipContainer.classList.toggle("flip");
    });
  });
})();
