"use strict";

(function() {
  const tablesWithControls = document.querySelectorAll(".table-with-controls"),
    searchObj = {};

  searchObj.searchByCollection = [];

  searchObj.handleChange = function(option, input) {
    searchObj.searchBy = option;
    input.value = "";
  };

  function isTrue(element) {
    return element === "true";
  }

  tablesWithControls.forEach(table => {
    const searchByValues = table.querySelectorAll("th"),
      tableCellValues = table.querySelectorAll("tr"),
      selectValues = table.querySelectorAll("select option"),
      selectBox = table.querySelector("select"),
      searchValue = table.querySelector(".control input");

    searchValue.addEventListener("keyup", event => {
      searchObj.inputValue = searchValue.value;
      searchObj.isMatch = [];
      tableCellValues.forEach(value => {
        const tdValue = value.querySelectorAll("td");
        tdValue.forEach(td => {
          if (
            td.getAttribute("data-col") !== null &&
            td.getAttribute("data-col") === searchObj.searchBy
          ) {
            if (
              searchObj.inputValue.toLowerCase() === td.innerHTML.toLowerCase()
            ) {
              searchObj.isMatch.push("true");
              td.parentNode.classList.add("match");
              td.parentNode.classList.remove("no-match");
            } else {
              searchObj.isMatch.push("false");
              td.parentNode.classList.add("no-match");
              td.parentNode.classList.remove("match");
            }
          }
        });
        if (searchObj.isMatch.find(isTrue)) {
          value.parentNode.setAttribute("data-match", "true");
        } else {
          value.parentNode.setAttribute("data-match", "false");
        }
      });
    });

    selectBox.addEventListener("change", event => {
      let optionIndex = event.target.options.selectedIndex;
      searchObj.handleChange(
        event.target.options[optionIndex].value,
        searchValue
      );
    });

    selectValues.forEach(option => {
      option.value = option.value.split(" ").join("_");
    });

    // TH Values
    searchByValues.forEach(value => {
      if (value.getAttribute("data-value") !== null) {
        searchObj.searchByCollection.push(value.innerHTML.split(" ").join("_"));
      }
      searchObj.searchBy = searchObj.searchByCollection[0];
    });

    tableCellValues.forEach(value => {
      const tdValue = value.querySelectorAll("td");
      let counter = 0;
      if (tdValue.length > 0) {
        tdValue.forEach(td => {
          if (!td.getAttribute("scope") && counter <= selectValues.length) {
            td.setAttribute("data-col", searchObj.searchByCollection[counter]);
            counter++;
          }
        });
      }
    });
  });
})();
