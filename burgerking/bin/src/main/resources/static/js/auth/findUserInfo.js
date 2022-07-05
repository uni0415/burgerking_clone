const find_username_button = document.querySelector(".order-button-left");
const find_password_button = document.querySelector(".order-button-right");
const find_username_form = document.querySelector(".find-username-form");
const find_password_form = document.querySelector(".find-password-form");
const input_items = document.querySelectorAll(".userinfo-detail-box input");
const cancellation_button = document.querySelectorAll(".cancellation-button");

find_username_button.onclick = () => {
    find_password_button.classList.remove("on");
    find_username_button.classList.add("on");
    find_username_form.classList.add("on");
    find_password_form.classList.remove("on");
}

find_password_button.onclick = () => {
    find_password_button.classList.add("on");
    find_username_button.classList.remove("on");
    find_username_form.classList.remove("on");
    find_password_form.classList.add("on");
}



for (let i = 0; i < input_items.length; i++) {
    input_items[i].onkeydown = () => {
        if (input_items[i].value.length > 0) {
            cancellation_button[i].classList.add("active");
        }
    }

    input_items[i].onkeyup = (e) => {
        if (e.keyCode == 8) {
            if (input_items[i].value == 0) {
                cancellation_button[i].classList.remove("active");
            }
        }
    }
    cancellation_button[i].onclick = () => {
        input_items[i].value = null;
        cancellation_button[i].classList.remove("active");

    }
}



