"use strict";
const sidebarMenuAboutUs = document.getElementById("sidebar-menu");
// Open/Close Sidebar
sidebarMenuAboutUs.addEventListener("click", () => {
    const sidebarComp = document.getElementById("sidebar");
    console.log("open");
    const sidebarCloseButtonComp = document.getElementById("sidebar-close");
    sidebarComp.style.transform = "translateX(0)";
    sidebarCloseButtonComp.addEventListener("click", () => {
        console.log("close");
        sidebarComp.style.transform = "translateX(100%)";
    });
});
