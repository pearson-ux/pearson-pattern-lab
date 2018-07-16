"use strict";
(function() {
  // single pagination
  const paginators = document.querySelectorAll(".pagination.basic");
  paginators.forEach(paginator => {
    const listItems = paginator.querySelectorAll(".items li");
    listItems.forEach(item => {
      item.addEventListener("click", event => {
        listItems.forEach(item => {
          item.classList.remove("current");
          item.setAttribute("aria-current", "false");
        });
        event.currentTarget.classList.add("current");
        event.currentTarget.setAttribute("aria-current", "true");
      });
    });
  });

  // group pagination
  const groupPaginators = document.querySelectorAll(".pagination.group");
  groupPaginators.forEach(groupPaginator => {
    const prevBtn = groupPaginator.querySelector(".control.left button"),
      nextBtn = groupPaginator.querySelector(".control.right button");

    let startingNumberStr = groupPaginator.querySelector(".first").innerHTML,
      endingNumberStr = groupPaginator.querySelector(".last").innerHTML,
      totalStr = groupPaginator.querySelector(".total").innerHTML,
      startingNumber = parseInt(startingNumberStr),
      endingNumber = parseInt(endingNumberStr),
      total = parseInt(totalStr);

    function changeValues() {
      let newEndingNumber = startingNumber + 4;
      if (newEndingNumber <= total) {
        groupPaginator.querySelector(
          ".first"
        ).innerHTML = startingNumber.toString();
        groupPaginator.querySelector(
          ".last"
        ).innerHTML = newEndingNumber.toString();
      } else {
        return false;
      }
      if (newEndingNumber >= total) {
        nextBtn.disabled = true;
      } else {
        nextBtn.disabled = false;
      }
    }

    prevBtn.addEventListener("click", () => {
      startingNumber = startingNumber - 5;
      changeValues();
      if (startingNumber < 2) prevBtn.disabled = true;
    });

    nextBtn.addEventListener("click", () => {
      startingNumber = startingNumber + 5;
      changeValues();
      if (startingNumber > 1) prevBtn.disabled = false;
    });
  });

  // page pagination
  const pagePaginators = document.querySelectorAll(".pagination.page");
  pagePaginators.forEach(pagePaginator => {
    const prevBtn = pagePaginator.querySelector(".control.left button"),
      nextBtn = pagePaginator.querySelector(".control.right button");

    let startingNumberStr = pagePaginator.querySelector(".first").innerHTML,
      totalStr = pagePaginator.querySelector(".total").innerHTML,
      startingNumber = parseInt(startingNumberStr),
      total = parseInt(totalStr);

    prevBtn.addEventListener("click", () => {
      if (startingNumber > 1) {
        startingNumber--;
        pagePaginator.querySelector(".first").innerHTML = startingNumber;
      }
      if (startingNumber === 1) prevBtn.disabled = true;

      if (startingNumber !== total) {
        nextBtn.disabled = false;
      }
    });

    nextBtn.addEventListener("click", () => {
      if (startingNumber < total) {
        startingNumber++;
        pagePaginator.querySelector(".first").innerHTML = startingNumber;
      }
      if (startingNumber > 1) {
        prevBtn.disabled = false;
      }

      if (startingNumber === total) {
        nextBtn.disabled = true;
      }
    });
  });
})();
