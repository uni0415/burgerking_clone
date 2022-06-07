const menu_category_buttons = document.querySelectorAll(".menu-category-button");
const menu_category_tag = document.querySelectorAll(".menu-category-tag");
const menu_category_text = document.querySelectorAll(".menu-category-text");
const product_menu_list = document.querySelector(".product-menu-list");
load();

function load() {
    $.ajax({
        type: "get",
        url: "/menulist",
        dataType: "text",
        success: function (data) {
            appendProductList(data);
        }
    })
}

for (let i = 0; i < menu_category_tag.length; i++) {
    menu_category_tag[i].onclick = () => {
        addOnClassName(i);
    }
}


function addOnClassName(index) {
    for (let i = 0; i < menu_category_buttons.length; i++) {
        if (i == index) {
            menu_category_tag[i].classList.add("on");
            menu_category_buttons[i].classList.add("on");
            menu_category_text[i].classList.add("on");
        } else {
            menu_category_tag[i].classList.remove("on");
            menu_category_buttons[i].classList.remove("on");
            menu_category_text[i].classList.remove("on");
        }
    }
}


function appendProductList(data) {
    const menu_list = ``;
    console.log(data.length);
    for (let i = 0; i < data.length; i++) {

    }
}