const nav_open = document.querySelector(".nav-open");
const nav_menu = document.querySelector(".nav-menu");
const submenu = document.querySelectorAll(".submenu");
const menulist = submenu[0].querySelectorAll("li");

nav_menu.onmouseenter = () => {
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
    }, 300);
}

for (let i = 1; i < menulist.length + 1; i++) {
    menulist[i].onclick = () => {
        console.log("/menu/" + i);
        location.href = "/menu/" + i;
    }
}