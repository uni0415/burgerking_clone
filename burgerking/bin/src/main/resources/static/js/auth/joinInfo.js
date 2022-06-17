const passwordTyped = document.querySelectorAll("input[type = 'password']");
const password_unshown = document.querySelectorAll(".password-unshown");
const password_shown = document.querySelectorAll(".password-shown");

for (let i = 0; i < passwordType.length; i++) {
    password_unshownEvent(i);
    password_shownEvent(i);
}

function passwordVisibleEvent(index) {
    password_unshown[index].onclick = () => {
        passwordType[index].type = 'text';
        password_unshown[index].classList.remove("on");
        password_shown[index].classList.add("on");
    }
}

function passwordInvisibleEvent(index) {
    password_shown[index].onclick = () => {
        passwordType[index].type = 'password';
        password_unshown[index].classList.add("on");
        password_shown[index].classList.remove("on");
    }
}