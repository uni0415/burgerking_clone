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
const checkbox = document.querySelector(".checkbox");

let stop_flag = false;

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
})

noneUserSignup();


let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
send_code_button.onclick = () => {
    if (!checkbox.checked) {
        Toast.fire({
            icon: 'error',
            title: '개인정보 수집에 동의해주세요'
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



function noneUserSignup() {
    const password_input = document.querySelectorAll(".password-input");
    const none_member_order_button = document.querySelector(".btn-nonmember-order");
    none_member_order_button.onclick = () => {
        if (!checkbox.checked) {
            Toast.fire({
                icon: 'error',
                title: '개인정보 수집에 동의해주세요'
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
        } else if (!password_input[0].value || !password_input[1].value) {
            Toast.fire({
                icon: 'error',
                title: '주문서 비밀번호를 입력하세요'
            })
        } else if (!password_input[0].value && !password_input[1]) {
            Toast.fire({
                icon: 'error',
                title: '비밀번호를 입력해주세요'
            })
        } else if (password_input[0].value != password_input[1].value) {
            Toast.fire({
                icon: 'error',
                title: '두 비밀번호가 다릅니다'
            })
        } else {
            $.ajax({
                type: "post",
                dataType: "text",
                data: ({
                    name: name_input_item.value,
                    phone: phone_input_item.value,
                    order_password: password_input[0].value
                }),
                url: "/api/v1/auth/none-member-signin",
                success: function (data) {
                    data = JSON.parse(data);
                    location.replace("/delivery/menu/1");
                }
            })
        }
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
