"use strict";
(function() {
  const tabGroups = document.querySelectorAll(".tabbed-navigation");
  tabGroups.forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll(".tabs > li");
    tabs.forEach(tab => {
      tab.addEventListener("click", event => {
        const listItem = event.currentTarget,
          aria = listItem.querySelector("a");

        tabs.forEach(tab => {
          const aria = tab.querySelectorAll("a");
          aria.forEach(selected => {
            selected.setAttribute("aria-selected", false);
          });

          tab.classList.remove("active");
        });

        listItem.classList.add("active");
        aria.setAttribute("aria-selected", true);
      });
    });
  });
})();
