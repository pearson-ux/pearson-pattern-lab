"use strict";
(function() {
  const sortableTable = document.querySelectorAll("table.sortable");

  sortableTable.forEach(table => {
    const sortBtns = table.querySelectorAll("th.sort button");

    function sortTable(n) {
      let rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
      switching = true;
      dir = "asc";
      while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < rows.length - 1; i++) {
          shouldSwitch = false;
          if (n == 0) {
            x = rows[i].querySelector("th");
            y = rows[i + 1].querySelector("th");
          } else {
            x = rows[i].getElementsByTagName("TD")[n - 1];
            y = rows[i + 1].getElementsByTagName("TD")[n - 1];
          }
          if (dir === "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          } else if (dir === "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount++;
        } else {
          if (switchcount === 0 && dir === "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }

    sortBtns.forEach((btn, index) => {
      btn.addEventListener("click", event => {
        let ariaSort = btn.parentElement.getAttribute("aria-sort"),
          icons = btn.querySelectorAll(".sortable-icon"),
          n = index;

        icons.forEach(icon => {
          icon.style.display = "none";
        });

        if (ariaSort === "ascending") {
          btn.parentElement.setAttribute("aria-sort", "descending");
          btn.setAttribute("title", "Sorted Down");
          icons[0].style.display = "inline";
        } else {
          btn.parentElement.setAttribute("aria-sort", "ascending");
          btn.setAttribute("title", "Sorted Up");
          icons[1].style.display = "inline";
        }

        //set other columns to unsorted
        sortBtns.forEach((button, number) => {
          if (number != n) {
            button.parentElement.setAttribute("aria-sort", "none");
            button.setAttribute("title", "Unsorted");
            let sortIcons = button.querySelectorAll(".sortable-icon");
            sortIcons[0].style.display = sortIcons[1].style.display = "none";
            sortIcons[2].style.display = "inline";
          }
        });

        sortTable(index);
      });

      btn.addEventListener("keyup", function(event) {
        if (event.keyCode === 32) {
          btn.click();
        }
      });
    });
  });
})();
