"use strict";
(function() {
  const menubuttons = document.querySelectorAll("button[aria-haspopup]"),
    menus = document.querySelectorAll("[role=menu]"),
    menuitems = document.querySelectorAll("[role=menuitemcheckbox]"),
    html = document.getElementsByTagName("html")[0];

  // html.addEventListener("click", event => {
  //   menubuttons.forEach(menubutton => {
  //     const gravity = menubutton.getAttribute('[data-action="dropdown"]');
  //     if (!gravity) {
  //       var isExpanded = menubutton.getAttribute("aria-expanded");
  //       if (isExpanded === "true") {
  //         menubutton.setAttribute("aria-expanded", "false");
  //         menubutton.nextElementSibling
  //         .querySelector("[role=menu]")
  //         .classList.add("hidden");
  //       }
  //     }
  //   });
  // });

  var menuButtonsCount = 1;
  menubuttons.forEach(menubutton => {
   const gravity = menubutton.getAttribute('[data-action="dropdown"]');
   if (!gravity) {

     menubutton.addEventListener("click", event => {
       const target = event.currentTarget,
         menu = target.nextElementSibling.querySelector("[role=menu]"),
         _this = menubutton,
         isExpanded = _this.getAttribute("aria-expanded");
       console.log(menu)
       event.stopPropagation();

       if (isExpanded === "true") {
         _this.setAttribute("aria-expanded", "false");
         menu.classList.add("hidden");
         _this.focus();
       }
       if (isExpanded === "false") {
         _this.setAttribute("aria-expanded", "true");
         menu.classList.remove("hidden");
         menu.focus();
       }
     });

     menubutton.addEventListener("keyup", event => {
       const target = event.currentTarget,
         menu = target.nextElementSibling.querySelector("[role=menu]"),
         _this = menubutton,
         isExpanded = _this.getAttribute("aria-expanded");

       if (event.keyCode == 40) {
         //down arrow
         console.log("down key pressed");
         _this.setAttribute("aria-expanded", "true");
         menu.classList.remove("hidden");
         menu.focus();
         event.stopPropagation();
       }
     });

     menubutton.setAttribute("id", "menubutton" + menuButtonsCount);
     menuButtonsCount += 1;
   }

  });

  var itemCount = 1;
  menuitems.forEach(item => {
    const gravity = item.parentNode.parentNode.parentNode.parentNode.classList.contains('gr-dropdowns');

    if (!gravity) {
      item.addEventListener("click", event => {
        const target = event.currentTarget,
          isChecked = target.getAttribute("aria-checked");
        event.stopPropagation();

        if (isChecked === "true") target.setAttribute("aria-checked", "false");
        else target.setAttribute("aria-checked", "true");

        const menu = target.parentElement;
        menu.setAttribute("aria-activedescendant", target.id);
        restyleMenuItems();

        var activeDescendantID = menu.getAttribute("aria-activedescendant");
        var activeDescendant = document.getElementById(activeDescendantID);
        activeDescendant.style.outline = "2px solid navy";
        activeDescendant.style.backgroundColor = "#E9E9E9";

        menu.focus();
      });
      item.setAttribute("id", "menuitem" + itemCount);
      itemCount += 1;
    }

  });

  function restyleMenuItems() {
    menuitems.forEach(item => {
      const gravity = item.parentNode.parentNode.parentNode.parentNode.classList.contains('gr-dropdowns');
      console.log(gravity)
      if (!gravity) {
        item.style.outline = "none";
        item.style.backgroundColor = "white";

      }
    });
    menus.forEach(menu => {
      var activeDescendantID = menu.getAttribute("aria-activedescendant");
      var activeDescendant = document.getElementById(activeDescendantID);
      if (activeDescendant !== null) {
        activeDescendant.style.outline = "2px solid navy";
        activeDescendant.style.backgroundColor = "#E9E9E9";
      }
    });
  }

  var menuCount = 1;

  menus.forEach(menu => {
  const gravity = menu.parentNode.parentNode.classList.contains('gr-dropdowns');
    if (!gravity) {
      menu.setAttribute("id", "menu" + menuCount);
      menuCount += 1;
      if (menu.parentElement.previousElementSibling !== null) {
        menu.setAttribute(
          "aria-labelledby",
          menu.parentElement.previousElementSibling.id
        );
      }
      menu.setAttribute("aria-activedescendant", menu.firstElementChild.id);
      menuitems.forEach(item => {

      });
      var activeDescendantID = menu.getAttribute("aria-activedescendant");
      var activeDescendant = document.getElementById(activeDescendantID);
      if (activeDescendant !== null) {
        activeDescendant.style.outline = "2px solid navy";
        activeDescendant.style.backgroundColor = "#E9E9E9";
      }


      if (!menu.parentElement.classList.contains("dropdown-menu")) {
        menu.classList.remove("hidden");
        menu.removeAttribute("aria-labelledby");
      }

      menu.addEventListener("keydown", event => {
        const target = event.currentTarget;
        var activeDescendantID = menu.getAttribute("aria-activedescendant");
        var activeDescendant = document.getElementById(activeDescendantID);

        switch (event.which || event.keyCode) {
          case 9: //tab
            if (menu.parentElement.classList.contains("dropdown-menu")) {
              menu.parentElement.previousElementSibling.setAttribute(
                "aria-expanded",
                "false"
              );
              target.classList.toggle("hidden");
            }

            return;
            break;

          case 38: // up
            if (activeDescendant == menu.firstElementChild) {
              menu.setAttribute(
                "aria-activedescendant",
                menu.lastElementChild.id
              );
            } else {
              menu.setAttribute(
                "aria-activedescendant",
                activeDescendant.previousElementSibling.id
              );
            }
            restyleMenuItems();

            activeDescendantID = menu.getAttribute("aria-activedescendant");
            activeDescendant = document.getElementById(activeDescendantID);
            activeDescendant.style.outline = "2px solid navy";
            activeDescendant.style.backgroundColor = "#E9E9E9";

            break;

          case 40: // down
            if (activeDescendant == menu.lastElementChild) {
              menu.setAttribute(
                "aria-activedescendant",
                menu.firstElementChild.id
              );
            } else {
              menu.setAttribute(
                "aria-activedescendant",
                activeDescendant.nextElementSibling.id
              );
            }

            restyleMenuItems();

            activeDescendantID = menu.getAttribute("aria-activedescendant");
            activeDescendant = document.getElementById(activeDescendantID);
            activeDescendant.style.outline = "2px solid navy";
            activeDescendant.style.backgroundColor = "#E9E9E9";

            break;

          case 27: // ESC
            menu.parentElement.previousElementSibling.setAttribute(
              "aria-expanded",
              "false"
            );
            target.classList.toggle("hidden");
            menu.parentElement.previousElementSibling.focus();
            break;

          case 13:
          case 32: // enter space
            restyleMenuItems();

            activeDescendantID = menu.getAttribute("aria-activedescendant");
            activeDescendant = document.getElementById(activeDescendantID);
            activeDescendant.style.outline = "2px solid navy";
            activeDescendant.style.backgroundColor = "#E9E9E9";
            activeDescendant.click();
            break;
          case 36: // home
            target.setAttribute(
              "aria-activedescendant",
              target.firstElementChild.id
            );
            restyleMenuItems();

            activeDescendantID = menu.getAttribute("aria-activedescendant");
            activeDescendant = document.getElementById(activeDescendantID);
            activeDescendant.style.outline = "2px solid navy";
            activeDescendant.style.backgroundColor = "#E9E9E9";
            break;

          case 35: // end
            target.setAttribute(
              "aria-activedescendant",
              target.lastElementChild.id
            );
            restyleMenuItems();

            activeDescendantID = menu.getAttribute("aria-activedescendant");
            activeDescendant = document.getElementById(activeDescendantID);
            activeDescendant.style.outline = "2px solid navy";
            activeDescendant.style.backgroundColor = "#E9E9E9";
            break;

          default:
            return; // exit this handler for other keys
        }
        event.preventDefault(); // prevent the default action (scroll / move caret)
      });
    }





  });

  menubuttons.forEach(menubutton => {
    if (menubutton.nextElementSibling !== null) {
      var menuID = menubutton.nextElementSibling.firstElementChild.id;
      menubutton.setAttribute("aria-controls", menuID);
    }

  });
})();
