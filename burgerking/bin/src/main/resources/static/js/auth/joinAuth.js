// const checkAll = document.querySelector(".general-consent input");
// const checkBoxs = document.querySelectorAll(".join-consent input");


const phone_content_box = document.querySelector(".phone-content-box");
const certificate_content_box = document.querySelector(".certificate-content-box");
const certificate_success_content_box = document.querySelector(".certificate-success-content-box");

const name_input_item = document.querySelector(".name-input-item");
const phone_input_item = document.querySelector(".phone-input-item");
const certificate_input_item = document.querySelector(".certificate-input-item");
const certificate_success_input_item = document.querySelector(".certificate-success-input-item");

const send_button_box = document.querySelector(".send-button-box");
const check_button_box = document.querySelector(".check-button-box");
const signup_button_box = document.querySelector(".signup-button-box");

const send_code_button = document.querySelector(".send-code-button");
const code_check_button = document.querySelector(".code-check-button");
const signup_button = document.querySelector(".signup-button");

const agreement_check = document.querySelectorAll(".check");
const allInputCheck = document.querySelector(".all-input-check");


let check_flag = [false, false, false, false];

let stop_flag = false;

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
})

// const agreements = {
//     termsOfService : false,
//     privacyPolicy : false,
//     allowEmail : false,
//     allowSMS : false
// };

certificateCheck();
signup();


let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
send_code_button.onclick = () => {
    if (!(agreement_check[0].checked && agreement_check[1].checked)) {
        Toast.fire({
            icon: 'error',
            title: '약관에 동의해주세요'
        })
    } else if (!name_input_item.value) {
        Toast.fire({
            icon: 'error',
            title: '받는 분의 이름을 입력해주세요'
        })
    } else if (!phone_input_item.value || !regPhone.test(phone_input_item.value) === true) {
        Toast.fire({
            icon: 'error',
            title: '핸드폰 번호를 입력해 주세요'
        })
    } else {
        phone_content_box.classList.remove("on");
        send_button_box.classList.remove("on");
        certificate_content_box.classList.add("on");
        check_button_box.classList.add("on");

        let phoneNumber = phone_input_item.value;
        Toast.fire({
            icon: 'success',
            title: '인증번호 발송 완료!'
        })

        let minutes = 3;
        let fiveMinutes = (60 * minutes) - 1,
            display = document.querySelector(".set-timer");
        startTimer(fiveMinutes, display);

        $.ajax({
            type: "get",
            url: "/api/v1/auth/sendSMS",
            data: {
                "phoneNumber": phoneNumber
            },
            success: function () {
                code_check_button.onclick = () => {
                    if (!certificate_input_item.value) {
                        Toast.fire({
                            icon: 'error',
                            title: '인증번호를 입력해주세요'
                        })
                    }
                    $.ajax({
                        type: "post",
                        dataType: "text",
                        data: {
                            "phoneNumber": phoneNumber,
                            "certNum": certificate_input_item.value
                        },
                        url: "/api/v1/auth/check-certNum",
                        success: function (data) {
                            data = JSON.parse(data);

                            if (data == true) {
                                Toast.fire({
                                    icon: 'success',
                                    title: '휴대폰 인증이 정상적으로 완료되었습니다.'
                                })
                                stop_flag = true;
                                certificate_success_input_item.value = phoneNumber;
                            } else if (data == false) {
                                Toast.fire({
                                    icon: 'error',
                                    title: '인증번호가 올바르지 않습니다!'
                                })
                            }
                        }
                    })

                }
            },
            error: function () {
                console.log("인증번호 전송 실패");
            }
        })
    }
}



function certificateCheck() {
    send_code_button.onclick = () => {
        if (!checkbox[0].checked && !checkbox[1].checked) {
            Toast.fire({
                icon: 'error',
                title: '약관에 동의해주세요'
            })
        } else if (!name_input_item.value) {
            Toast.fire({
                icon: 'error',
                title: '받는 분의 이름을 입력해주세요'
            })
        } else if (!phone_input_item.value || !regPhone.test(phone_input_item.value) === true) {
            Toast.fire({
                icon: 'error',
                title: '핸드폰 번호를 입력해 주세요'
            })
        } else if (stop_flag == false) {
            Toast.fire({
                icon: 'error',
                title: '핸드폰번호 인증을 진행해 주세요'
            })
        }
    }
}
function signup() {
    signup_button.onclick = () => {

        for (let i = 0; i < agreement_check.length; i++) {
            if (agreement_check[i].checked) {
                check_flag[i] = true;
            }
        }
        sessionStorage.setItem("terms", check_flag[0]);
        sessionStorage.setItem("privacy_policy", check_flag[1]);
        sessionStorage.setItem("email_agreement", check_flag[2]);
        sessionStorage.setItem("sms_agreement", check_flag[3]);
        sessionStorage.setItem("name", name_input_item.value);
        sessionStorage.setItem("phone", phone_input_item.value);
        location.replace("/auth/join-info");

    }
}

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    let interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
        if (timer === 0) {
            clearInterval(interval);

            phone_content_box.classList.add("on");
            send_button_box.classList.add("on");
            certificate_content_box.classList.remove("on");
            check_button_box.classList.remove("on");
        } else if (stop_flag) {
            clearInterval(interval);

            certificate_success_content_box.classList.add("on");
            signup_button_box.classList.add("on");
            certificate_content_box.classList.remove("on");
            check_button_box.classList.remove("on");
        }
    }, 1000);
}



allInputCheck.addEventListener('click', function() {
	console.log("체크 클릭");
	
	for(let i = 0; i < agreement_check.length; i++) {
		if(allInputCheck.checked == true) {
			agreement_check[i].checked = true;			
		}else {
			agreement_check[i].checked = false;
		}
	}	
})
	
	

























