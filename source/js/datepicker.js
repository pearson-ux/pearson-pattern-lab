"use strict";
(function() {
  const datepicker = document.querySelectorAll(".datepicker-container");
  datepicker.forEach(picker => {
    const input = picker.querySelector("input");
    let calendar, changeBtns, dayBtns, currentMonth, currentYear;

    let setCalendarFunction = () => {
      calendar = picker.querySelector(".calendar");
      changeBtns = calendar.querySelectorAll(".pe-icon--btn");
      dayBtns = calendar.querySelectorAll(".weeks button");
      currentMonth = calendar.querySelector(".month").innerHTML;
      currentYear = calendar.querySelector(".year").innerHTML;
      dayBtns.forEach(button => {
        button.addEventListener("click", event => {
          dayBtns.forEach(button => {
            button.classList.remove("selected");
          });
          event.currentTarget.classList.add("selected");
          input.value =
            moment()
              .month(currentMonth)
              .format("M") +
            "/" +
            event.currentTarget.innerHTML +
            "/" +
            currentYear;
          calendar.classList.add("hidden");
        });
      });
    };

    setCalendarFunction();
    calendar.classList.add("hidden");

    changeBtns.forEach(button => {
      button.addEventListener("click", event => {
        setCalendarFunction();
      });
    });

    input.placeholder = moment().format("l");
    input.addEventListener("focus", () => {
      calendar.classList.remove("hidden");
    });
  });
})();
