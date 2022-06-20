const passwordInput = document.querySelectorAll(".password-input");
const password_unshown = document.querySelectorAll(".password-unshown");
const password_shown = document.querySelectorAll(".password-shown");
const name_input_box = document.querySelector(".name-input-box");
const tel_input_box = document.querySelector(".tel-input-box");



const username_detail_box = document.querySelector(".username-detail-box");

const username_input = document.querySelector(".username-input");

const password_input = document.querySelectorAll(".password-input");

const join_click_box = document.querySelector(".join-click-box");

const signup_button = document.querySelector(".signup-button");

const Toast = Swal.mixin({
	toast: true,
	position: 'center',
	showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
})



let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
signup_button.onclick = () => {
	if(!username_input.value || !regEmail.test(username_input.value) === true){
		Toast.fire({
			icon: 'error',
			title: '이메일을 다시 확인해주세요'
		})
	}
}

let regPassword = /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{10,20}$/;
signup_button.onclick = () => {
	if(regPassword.test(password_input[0].value) === true){
		if(password_input[0].value!=password_input[1].value){
			Toast.fire({
				icon: 'error',
				title: '비밀번호를 다시 확인해주세요'
			})
		}
	}else {
		Toast.fire({
			icon:'error',
			title:'조건에 맞는 비밀번호를 입력해주세요'
		})
	}
}






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
    

