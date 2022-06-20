const passwordInput = document.querySelectorAll(".password-input");
const password_unshown = document.querySelectorAll(".password-unshown");
const password_shown = document.querySelectorAll(".password-shown");
const name_input_box = document.querySelector(".name-input-box");
const tel_input_box = document.querySelector(".tel-input-box");


name_input_box.placeholder = sessionStorage.getItem("name");
tel_input_box.placeholder = sessionStorage.getItem("phone");

for (let i = 0; i < passwordInput.length; i++) {
    passwordVisibleEvent(i);
    passwordInvisibleEvent(i);
}


function passwordVisibleEvent(index) {
    password_unshown[index].onclick = () => {
        passwordInput[index].type = 'text';
        password_unshown[index].classList.remove("on");
        password_shown[index].classList.add("on");
    }
}

function passwordInvisibleEvent(index) {
    password_shown[index].onclick = () => {
        passwordInput[index].type = 'password';
        password_unshown[index].classList.add("on");
        password_shown[index].classList.remove("on");
    }
}
