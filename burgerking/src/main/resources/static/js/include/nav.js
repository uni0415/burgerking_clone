const nav_open = document.querySelector(".nav-open");
const nav_menu = document.querySelector(".nav-menu");
const submenu = document.querySelectorAll(".submenu");

nav_menu.onmouseover = () => {
    nav_open.classList.add("active");
    for (let i = 0; i < submenu.length; i++) {
        submenu[i].classList.add("active");
        submenu[i].style = "";
    }
}

nav_menu.onmouseleave = () => {
    nav_open.classList.remove("active");
    for (let i = 0; i < submenu.length; i++) {
        submenu[i].classList.remove("active");
        submenu[i].style = "display: none;";
    }
    setTimeout(() => {
        for (let i = 0; i < submenu.length; i++) {
            submenu[i].style = "";
        }
    }, 500);
}