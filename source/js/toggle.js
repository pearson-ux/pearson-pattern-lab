"use strict";
(function() {
  const toggle = document.querySelectorAll(".toggle");

  function toggleAriaChecked(checked, target) {
    if (checked === "false") target.setAttribute("aria-checked", "true");
    else target.setAttribute("aria-checked", "false");
  }

  function toggleValue(checked, target) {
    target.value = checked;
  }

  toggle.forEach(item => {
    const button = item.querySelector("button");

    button.addEventListener("click", event => {
      const target = event.currentTarget,
        isChecked = target.getAttribute("aria-checked");

      toggleValue(isChecked, target);
      toggleAriaChecked(isChecked, target);
    });
  });
})();
