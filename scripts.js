import Notes from "./classes/Notes.js";

// console.log("notesssssssss", Notes.getAllNotes());

Notes.delete({
  id: 2,
  title: "تستی",
  content: "جهت تست",
});

// const sidebar = document.querySelector(".sidebar");
// const app = document.querySelector("#app");

// sidebar.addEventListener("click", (event) => {
//   const target = event.target;

//   if (target.matches(".sidebar__note")) {
//     console.log(target);
//   }
// });
// collapseBtn.addEventListener("click", (event) => {
//   sidebar.classList.toggle("sidebar--minimal");
//   event.target.classList.toggle("collapsed");
// });

// document.addEventListener("DOMContentLoaded", () => {
//   document.body.addEventListener("click", (event) => {
//     const target = event.target;
//     if (target.matches("[data-link]")) {
//       event.preventDefault();
//       const menuItems = document.querySelectorAll(".menu-item");
//       menuItems.forEach((menuItem) => menuItem.classList.remove("active"));
//       navigate(event.target.dataset.link);
//       target.parentNode.classList.add("active");
//     }
//     if (
//       target.matches(".menu-item__title") ||
//       target.matches(".menu-item__icon")
//     ) {
//       event.preventDefault();
//       target.parentNode.click();
//     }
//   });
//   const currentMenu = document.querySelector(
//     `a[data-link='${window.location.pathname}']`
//   );
//   if (currentMenu) currentMenu.parentNode.classList.add("active");
//   router();
// });

// window.addEventListener("popstate", router);

// function router() {
//   const routes = [
//     { path: "/", view: Dashboard },
//     { path: "/users", view: Users },
//     { path: "/events", view: Events },
//     { path: "/reports", view: Reports },
//     { path: "/setting", view: Setting },
//   ];

//   const mappedRoutes = routes.map((route) => {
//     return {
//       route,
//       isMatch: window.location.pathname === route.path,
//     };
//   });

//   let match = mappedRoutes.find((route) => route.isMatch);
//   if (!match)
//     match = {
//       route: { path: "/404", view: NotFound },
//       isMatch: true,
//     };

//   app.innerHTML = match.route.view();
// }

// function navigate(route) {
//   history.pushState({}, "", route);
//   router();
// }
