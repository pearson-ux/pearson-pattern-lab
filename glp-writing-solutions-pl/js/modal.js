"use strict";

(function() {
  const modalButtons = document.querySelectorAll("button[data-modal-id]"),
    scrollOverlays = document.querySelectorAll(".overlay-scroll"),
    actionButtons = document.querySelectorAll(".modal-actions button"),
    closeButtons = document.querySelectorAll(".modal-close");

  modalButtons.forEach(button => {
    button.addEventListener("click", event => {
      const modalId = event.currentTarget.getAttribute("data-modal-id"),
        modalToOpen = document.querySelector(
          ".modal-body[data-modal-open=" + modalId + "]"
        ),
        overlayToOpen = document.querySelector(
          ".modal-overlay[data-overlay-open=" + modalId + "]"
        );
      overlayToOpen.classList.remove("hidden");
      modalToOpen.classList.remove("hidden");
      modalToOpen.setAttribute("aria-hidden", "false");
      if (overlayToOpen.classList.contains("content-scroll")) {
        const content = modalToOpen.querySelector(".modal-content");
        if (content.scrollHeight > content.clientHeight) {
          content.classList.add("content-border");
          content.nextElementSibling.classList.add("actions-scroll-style");
        }
      }
    });
  });

  actionButtons.forEach(button => {
    closeModal(button);
  });

  closeButtons.forEach(button => {
    closeModal(button);
  });

  scrollOverlays.forEach(overlay => {
    overlay.addEventListener("click", event => {
      const modalId = overlay.getAttribute("data-overlay-open");
      overlay.classList.add("hidden");
      closeModalBody(modalId);
    });
  });

  function closeModal(button) {
    button.addEventListener("click", event => {
      const modalId = button.getAttribute("data-button-close"),
        overlayToClose = document.querySelector(
          ".modal-overlay[data-overlay-open=" + modalId + "]"
        );
      overlayToClose.classList.add("hidden");
      closeModalBody(modalId);
    });
  }

  function closeModalBody(id) {
    const modalToClose = document.querySelector(
      ".modal-body[data-modal-open=" + id + "]"
    );
    modalToClose.classList.add("hidden");
    modalToClose.setAttribute("aria-hidden", "true");
  }
})();
