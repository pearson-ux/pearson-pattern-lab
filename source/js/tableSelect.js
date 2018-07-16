"use strict";
(function() {
  // TODO This code really needs to be refactored way too much duplication
  const selectableTable = document.querySelectorAll("table.selectable");
  selectableTable.forEach(table => {
    const tableRow = table.querySelectorAll("tbody tr"),
      checkAll = table.querySelector("thead th:first-child"),
      checkAllInput = checkAll.querySelector("input"),
      allCheckInput = table.querySelectorAll("input");

    tableRow.forEach(row => {
      row.addEventListener("click", event => {
        const checkbox = event.currentTarget.querySelector("input");
        let allInputChecked = true;

        event.currentTarget.classList.toggle("selected");
        checkbox.checked = !checkbox.checked;

        tableRow.forEach(rowItem => {
          allInputChecked &= rowItem.classList.value === "selected";
        });
        checkAllInput.checked = allInputChecked;
      });

      row.addEventListener("keydown", function(event) {
        if (event.keyCode === 32) {
          row.click();
        }
      });
    });

    checkAll.addEventListener("click", event => {
      checkAllInput.checked = !checkAllInput.checked;

      if (checkAllInput.checked) {
        allCheckInput.forEach(check => {
          check.checked = true;
        });
        tableRow.forEach(row => {
          row.classList.add("selected");
        });
      } else {
        allCheckInput.forEach(check => {
          check.checked = false;
        });
        tableRow.forEach(row => {
          row.classList.remove("selected");
        });
      }
    });

    checkAll.addEventListener("keydown", function(event) {
      if (event.keyCode === 32) {
        checkAll.click();
      }
      event.stopImmediatePropagation();
    });
  });
})();
