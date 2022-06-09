const btn_use = document.querySelector(".btn-use");
const active_content_box = document.querySelector(".active-content-box");
const content_position_box = document.querySelector(".content-position-box");

const input_items = document.querySelectorAll(".info-list input");
const btn_delete = document.querySelectorAll(".btn-delete");

const btn_view = document.querySelectorAll(".btn-view");


btn_use.onclick = () => {
    active_content_box.classList.toggle("open");
    content_position_box.classList.toggle("open");
}

for (let i = 0; i < input_items.length; i++) {
    input_items[i].onkeydown = () => {
        if (input_items[i].value.length > 0) {
            btn_delete[i].classList.add("active");
        }
    }

    input_items[i].onkeyup = (e) => {
        if (e.keyCode == 8) {
            if (input_items[i].value == 0) {
                btn_delete[i].classList.remove("active");
            }
        }
    }
    btn_delete[i].onclick = () => {
        input_items[i].value = null;
        btn_delete[i].classList.remove("active");

    }

    btn_view[i].onclick = () => {
        btn_view[i].classList.toggle("on");
    }
}


