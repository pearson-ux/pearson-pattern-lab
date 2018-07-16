"use strict";

(function() {
  const drawerButtons = document.querySelectorAll("button[data-drawer-id]"),
    drawers = document.querySelectorAll(".drawer"),
    actionButton = document.querySelector(".drawer-actions button");

  drawerButtons.forEach(button => {
    button.addEventListener("click", event => {
      const drawerId = event.currentTarget.getAttribute("data-drawer-id"),
        drawerToOpen = document.querySelector(
          ".drawer[data-drawer-open=" + drawerId + "]"
        );
      drawerToOpen.classList.toggle("open");
      drawerToOpen.setAttribute("aria-hidden", "false");
    });
  });

  drawers.forEach(drawer => {
    const button = drawer.querySelector(".title > button"),
      title = drawer.querySelector(".title .pe-title"),
      backBtnContainer = drawer.querySelector(".title > div"),
      backBtn = backBtnContainer.querySelector("button"),
      archiveContent = drawer.querySelector(".archive"),
      notificationContent = drawer.querySelector(".notifications");

    button.addEventListener("click", event => {
      event.currentTarget.parentNode.parentNode.classList.toggle("open");
    });

    actionButton.addEventListener("click", () => {
      title.classList.add("hidden");
      title.setAttribute("aria-hidden", "true");
      backBtnContainer.classList.remove("hidden");
      backBtnContainer.setAttribute("aria-hidden", "false");
      notificationContent.classList.add("hidden");
      notificationContent.setAttribute("aria-hidden", "true");
      archiveContent.classList.remove("hidden");
      archiveContent.setAttribute("aria-hidden", "false");
    });

    backBtn.addEventListener("click", () => {
      title.classList.remove("hidden");
      title.setAttribute("aria-hidden", "false");
      backBtnContainer.classList.add("hidden");
      backBtnContainer.setAttribute("aria-hidden", "true");
      notificationContent.classList.remove("hidden");
      notificationContent.setAttribute("aria-hidden", "false");
      archiveContent.classList.add("hidden");
      archiveContent.setAttribute("aria-hidden", "true");
    });
  });
})();
