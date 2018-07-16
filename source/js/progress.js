"use strict";

(function() {
  const progressBars = document.querySelectorAll(".progress");
  progressBars.forEach(bar => {
    const progress = bar.getAttribute("data-progress");
    console.log(progress);
    bar.style.width = progress + "%";
  });
})();
