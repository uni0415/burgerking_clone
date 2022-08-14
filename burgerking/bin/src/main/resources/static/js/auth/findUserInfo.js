const find_username_tag = document.querySelector(".order-button-left");
const find_password_tag = document.querySelector(".order-button-right");
const find_username_form = document.querySelector(".find-username-form");
const find_password_form = document.querySelector(".find-password-form");
const input_items = document.querySelectorAll(".userinfo-detail-box input");
const cancellation_button = document.querySelectorAll(".cancellation-button");
const find_username_button = document.querySelector(".find-username-button");
const username_input = document.querySelector(".username-input");
const password_input = document.querySelector(".password-input");

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
})

find_username_tag.onclick = () => {
    find_password_tag.classList.remove("on");
    find_username_tag.classList.add("on");
    find_username_form.classList.add("on");
    find_password_form.classList.remove("on");
}

find_password_tag.onclick = () => {
    find_password_tag.classList.add("on");
    find_username_tag.classList.remove("on");
    find_username_form.classList.remove("on");
    find_password_form.classList.add("on");
}

find_username_button.onclick = () => {
	$.ajax({
		type:"post",
		dataType:"text",
		data:{
			"user_name":username_input.value,
			"phone":password_input.value
		},
		url:"/api/v1/auth/findUserId",
		success:function(data) {
			console.log(data);
			if(!data) {
				Toast.fire({
					icon:'error',
					title:'입력하신 정보로 회원정보를 확인 할 수 없습니다. 다시 입력해 주세요.'
				})
				
			}else {
				
			}
		}
	})
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


