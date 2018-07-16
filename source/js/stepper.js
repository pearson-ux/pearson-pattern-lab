"use strict";

(function() {
  const stepper = document.querySelectorAll(".stepper");

  stepper.forEach(controller => {
    const maxValue = parseInt(controller.querySelector(".number").innerHTML),
      input = controller.querySelector("input"),
      increaseValue = controller.querySelector(".controls button:first-child"),
      decreaseValue = controller.querySelector(".controls button:last-child");

    input.setAttribute("max", maxValue.toString());

    input.addEventListener("blur", () => {
      if (parseInt(input.value) > maxValue) return (input.value = maxValue);
      else if (input.value === "") return (input.value = 1);
      else return input.value;
    });

    increaseValue.addEventListener("click", () => {
      const inputValueNumber = parseInt(input.value);
      if (inputValueNumber < maxValue) return input.value++;
    });

    decreaseValue.addEventListener("click", () => {
      const inputValueNumber = parseInt(input.value);
      if (inputValueNumber <= maxValue && inputValueNumber !== 0)
        return input.value--;
    });
  });
})();
