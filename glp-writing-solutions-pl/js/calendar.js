"use strict";
(function() {
  const calendars = document.querySelectorAll(".calendar"),
    buttons = [];
  calendars.forEach((calendar, index) => {
    buttons[index] = calendar.querySelectorAll(".pe-icon--btn");
  });

  let startDate,
    displayDate = [],
    i,
    firstDay,
    endDay,
    monthRange,
    weeks,
    calendar,
    firstWeekDay,
    lastWeekDay,
    weekRange,
    year,
    month,
    GetCalendar = {},
    dayList = [],
    renderDays = [];

  GetCalendar = {
    build: (year, month) => {
      startDate = moment([year, month]);
      firstDay = moment(startDate).startOf("month");
      endDay = moment(startDate).endOf("month");
      monthRange = moment.range(firstDay, endDay);
      weeks = [];
      monthRange.by("days", function(moment) {
        let ref;
        if (((ref = moment.week()), [].indexOf.call(weeks, ref) < 0)) {
          return weeks.push(moment.week());
        }
      });
      calendar = [];
      weeks.forEach(week => {
        if (i > 0 && week < weeks[i - 1]) {
          // We have switched to the next year
          firstWeekDay = moment([year, month])
            .add(1, "year")
            .week(week)
            .day(0);
          lastWeekDay = moment([year, month])
            .add(1, "year")
            .week(week)
            .day(6);
        } else {
          firstWeekDay = moment([year, month])
            .week(week)
            .day(0);
          lastWeekDay = moment([year, month])
            .week(week)
            .day(6);
        }

        weekRange = moment.range(firstWeekDay, lastWeekDay);

        calendar.push(weekRange);
      });

      return calendar;
    },
    setState: (buttonClicked, calendarNumber) => {
      if (buttonClicked === "none") {
        displayDate[calendarNumber] = moment([
          moment().year(),
          moment().month()
        ]);
      } else {
        if (buttonClicked === "next") {
          displayDate[calendarNumber] = moment(displayDate[calendarNumber]).add(
            1,
            "months"
          );
        } else if (buttonClicked === "prev") {
          displayDate[calendarNumber] = moment(
            displayDate[calendarNumber]
          ).subtract(1, "months");
        }
      }
      month = moment(displayDate[calendarNumber]).month();
      year = moment(displayDate[calendarNumber]).year();
    },

    getState: calendarNumber => {
      return {
        month: moment(displayDate[calendarNumber]).month(),
        monthName: moment.months()[moment(displayDate[calendarNumber]).month()],
        year: moment(displayDate[calendarNumber]).year(),
        calendar: GetCalendar.build(
          moment(displayDate[calendarNumber]).year(),
          moment(displayDate[calendarNumber]).month()
        )
      };
    },

    render: () => {
      let weekCount = 0,
        isCurrentMonth,
        isToday,
        beforeToday,
        isSelected,
        dayClasses,
        disabled,
        elements = "",
        formattedMonth,
        isPressed = "false",
        date;

      dayList = [];

      CalendarState.calendar.map(date => {
        weekCount++;
        date.by("days", function(day) {
          dayList.push(day);
        });
      });

      return dayList.map(day => {
        isCurrentMonth = day.month() === CalendarState.month;
        beforeToday = day.format("DD-MM-YYYY") < moment().format("DD-MM-YYYY");
        isToday = day.format("DD-MM-YYYY") === moment().format("DD-MM-YYYY");
        isSelected = day.format("DD-MM-YYYY") === CalendarState.selected;
        dayClasses = "pe-link--btn pe-label neutral-two";
        disabled = "";
        formattedMonth = CalendarState.month + 1;
        date = day.format("dddd, MMMM Do YYYY");

        if (!isCurrentMonth) {
          dayClasses += " muted";
          disabled += " disabled";
        }

        if (isSelected) {
          dayClasses += " selected";
          isPressed = "true";
        } else {
          isPressed = "false";
        }

        if (isToday) {
          dayClasses += " today";
        }

        if (
          (formattedMonth < parseInt(moment().format("MM")) &&
            CalendarState.year <= parseInt(moment().format("YYYY"))) ||
          CalendarState.year < parseInt(moment().format("YYYY")) ||
          (moment().format("MMMM") === CalendarState.monthName &&
            CalendarState.year <= parseInt(moment().format("YYYY")) &&
            beforeToday)
        ) {
          disabled = "disabled";
        }

        return (elements =
          '<button role="button" aria-pressed="' +
          isPressed +
          '" aria-label="' +
          date +
          '" class="' +
          dayClasses +
          '"' +
          disabled +
          ">" +
          day.format("D") +
          "</button>");
      });
    }
  };

  // calendar object that will render all the data
  let CalendarState = {};
  let renderCalendar = (buttonClicked, calendarNumber) => {
    GetCalendar.setState(buttonClicked, calendarNumber);

    CalendarState = {
      year: GetCalendar.getState(calendarNumber).year,
      month: GetCalendar.getState(calendarNumber).month,
      monthName: GetCalendar.getState(calendarNumber).monthName,
      calendar: GetCalendar.getState(calendarNumber).calendar,
      selected: moment().format("DD-MM-YYYY"),
      previousMonth: GetCalendar.getState(calendarNumber - 1).monthName
    };

    renderDays = GetCalendar.render();

    const monthHTML = calendars[calendarNumber].querySelector(".month"),
      yearHTML = calendars[calendarNumber].querySelector(".year"),
      daysHTML = calendars[calendarNumber].querySelector(".days"),
      weekArr = [];

    daysHTML.innerHTML = "";
    monthHTML.innerHTML = CalendarState.monthName;
    yearHTML.innerHTML = CalendarState.year;

    // group the days into items of 7
    for (let i = 0; i < 6; i++) {
      weekArr[i] = [];
    }
    renderDays.forEach((day, index) => {
      weekArr[Math.floor(index / 7)].push(day);
    });

    // wrap each item of 7 with a div and render
    weekArr.forEach(days => {
      daysHTML.innerHTML += '<div class="weeks">' + days.join("") + "</div>";
    });

    // add event handlers to the buttons
    const dayBtns = calendars[calendarNumber].querySelectorAll(".weeks button");
    dayBtns.forEach(button => {
      button.addEventListener("click", event => {
        dayBtns.forEach(button => {
          button.classList.remove("selected");
          button.setAttribute("aria-pressed", "false");
        });
        event.currentTarget.classList.add("selected");
        event.currentTarget.setAttribute("aria-pressed", "true");
      });
    });
    weekArr.length = 0;
  };

  for (let i = 0; i < calendars.length; i++) {
    renderCalendar("none", i);
  }

  let returnMonthNames = (type, number = "") => {
    if (type === "previous") {
      return (
        "Previous Month " +
        moment()
          .month(CalendarState.month - number)
          .format("MMMM")
      );
    } else if (type === "next") {
      return (
        "Next Month " +
        moment()
          .month(CalendarState.month + number)
          .format("MMMM")
      );
    }
  };

  buttons.forEach((button, index) => {
    button[0].setAttribute("aria-label", returnMonthNames("previous", 1));
    button[1].setAttribute("aria-label", returnMonthNames("next", 1));

    button[0].addEventListener("click", event => {
      button[0].setAttribute("aria-label", returnMonthNames("previous", 2));
      button[1].setAttribute("aria-label", returnMonthNames("next"));
      renderCalendar("prev", buttons.indexOf(button));
    });

    button[1].addEventListener("click", event => {
      button[0].setAttribute("aria-label", returnMonthNames("previous"));
      button[1].setAttribute("aria-label", returnMonthNames("next", 2));
      renderCalendar("next", buttons.indexOf(button));
    });
  });
})();
