const menu_category_buttons = document.querySelectorAll(".menu-category-button");
const menu_category_tag = document.querySelectorAll(".menu_category_tag");

for (let i = 0; i < menu_category_buttons.length; i++) {
    menu_category_buttons[i].onclick = () => {
        menu_category_buttons[i].classList.add("on");
        menu_category_text[i].classList.add("on");
    }
}