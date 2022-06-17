const btn_use = document.querySelector(".btn-use");
const use_contents = document.querySelector(".use-contents");
const input_items = document.querySelectorAll(".info-list input");
const btn_delete = document.querySelector(".btn-delete");

const btn_view = document.querySelectorAll(".btn-view");
const password_input = document.querySelectorAll(".password-input");


btn_use.onclick = () => {
    use_contents.classList.toggle("open");
}

for (let i = 0; i < input_items.length; i++) {

    input_items[i].onkeyup = (e) => {
        if (e.keyCode == 8) {
            if (input_items[i].value == 0) {
                btn_delete[i].classList.remove("active");
            }
        }
    }
    btn_view[i].onclick = () => {
        btn_view[i].classList.toggle("on");
        if (btn_view[i].classList.contains("on")) {
            password_input[i].type = 'text';
        } else {
            password_input[i].type = 'password';
        }
    }
}

input_items[0].onkeydown = () => {
    if (input_items[0].value.length > 0) {
        btn_delete.classList.add("active");
    }
}
btn_delete.onclick = () => {
    input_items[0].value = null;
    btn_delete.classList.remove("active");

}




