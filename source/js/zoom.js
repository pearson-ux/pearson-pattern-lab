"use strict";

(function() {
  const zoom = document.querySelectorAll(".zoom");
  zoom.forEach(controller => {
    const maxValue = parseInt(
        controller.querySelector("input").getAttribute("max")
      ),
      input = controller.querySelector("input"),
      increaseValue = controller.querySelector(".controls button:first-child"),
      decreaseValue = controller.querySelector(".controls button:last-child");

    input.value = input.value + "%";

    input.addEventListener("blur", () => {
      let inputRound = Math.round(input.value.slice(0, -1) / 25) * 25;
      if (parseInt(inputRound) > maxValue) return (inputRound = maxValue + "%");

      if (inputRound === "") {
        return (inputRound = "100%");
      }

      input.value = inputRound + "%";
    });

    increaseValue.addEventListener("click", () => {
      let rawInputValue = parseInt(input.value.slice(0, -1));
      if (rawInputValue < maxValue) input.value = rawInputValue + 25 + "%";
    });

    decreaseValue.addEventListener("click", () => {
      let rawInputValue = parseInt(input.value.slice(0, -1));
      if (rawInputValue !== 0) input.value = rawInputValue - 25 + "%";
      console.log("click minus", input.value);
    });
  });
})();
