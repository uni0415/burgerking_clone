const order_button = document.querySelector(".order-button-left");
const order_history_button = document.querySelector(".order-button-right");
const non_members_order_list = document.querySelector(".non-members-order-list");
const non_members_order_history = document.querySelector(".non-members-order-history");
const passwordType = document.querySelectorAll("input[type = 'password']");
const passwordVisible = document.querySelectorAll(".password-visible");
const passwordInvisible = document.querySelectorAll(".password-invisible");

order_history_button.onclick = () => {
    order_history_button.classList.add("on");
    order_button.classList.remove("on");
    non_members_order_history.classList.add("on");
    non_members_order_list.classList.remove("on");
}

order_button.onclick = () => {
    non_members_order_history.classList.remove("on");
    non_members_order_list.classList.add("on");
    order_history_button.classList.remove("on");
    order_button.classList.add("on");
}

for (let i = 0; i < passwordType.length; i++) {
    passwordVisibleEvent(i);
    passwordInvisibleEvent(i);
}

function passwordVisibleEvent(index) {
    passwordVisible[index].onclick = () => {
        passwordType[index].type = 'text';
        passwordVisible[index].classList.remove("on");
        passwordInvisible[index].classList.add("on");
    }
}

function passwordInvisibleEvent(index) {
    passwordInvisible[index].onclick = () => {
        passwordType[index].type = 'password';
        passwordVisible[index].classList.add("on");
        passwordInvisible[index].classList.remove("on");
    }
}





