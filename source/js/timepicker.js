"use strict";
(function() {
  const timepicker = document.querySelectorAll(".timepicker-container");
  timepicker.forEach(picker => {
    const menu = picker.querySelector(".menu"),
      input = picker.querySelector("input"),
      listItem = picker.querySelectorAll(".menu li");
    menu.classList.add("hidden");

    input.addEventListener("focus", () => {
      menu.classList.remove("hidden");
    });

    listItem.forEach(item => {
      item.addEventListener("click", event => {
        listItem.forEach(item => {
          item.setAttribute("aria-checked", "false");
        });
        input.value = event.currentTarget
          .querySelector("a")
          .textContent.replace(/\s/g, "");
        menu.classList.add("hidden");
        item.setAttribute("aria-checked", "true");
      });
    });

    input.addEventListener("keyup", () => {
      menu.classList.add("hidden");
    });
  });
})();
