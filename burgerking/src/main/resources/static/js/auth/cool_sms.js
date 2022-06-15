const phone_content_box = document.querySelector(".phone-content-box");
const certificate_content_box = document.querySelector(".certificate-content-box");
const certificate_success_content_box = document.querySelector(".certificate-success-content-box");

const phone_input_item = document.querySelector(".phone-input-item");
const certificate_input_item = document.querySelector(".certificate-input-item");
const certificate_success_input_item = document.querySelector(".certificate-success-input-item");

const send_button_box = document.querySelector(".send-button-box");
const check_button_box = document.querySelector(".check-button-box");
const resend_button_box = document.querySelector(".resend-button-box");

const send_code_button = document.querySelector(".send-code-button");
const code_check_button = document.querySelector(".code-check-button");
const resend_button = document.querySelector(".resend-button");

let stop_flag = false;

const Toast = Swal.mixin({
    toast: true,
    position: 'center-center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

send_code_button.onclick = () => {
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
    console.log(fiveMinutes);
    startTimer(fiveMinutes, display);

    $.ajax({
        type: "get",
        url: "/api/v1/auth/sendSMS",
        data: {
            "phoneNumber": phoneNumber
        },
        success: function (data) {
            code_check_button.onclick = () => {
                if (data.trim() == certificate_input_item.value) {
                    Toast.fire({
                        icon: 'success',
                        title: '휴대폰 인증이 정상적으로 완료되었습니다.'
                    })
					stop_flag = true;
                    certificate_content_box.classList.remove("on");
                    check_button_box.classList.remove("on");
                    certificate_success_input_item.readonly = phoneNumber;
                    certificate_success_content_box.classList.add("on");
                    resend_button.classList.add("on");
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: '인증번호가 올바르지 않습니다!'
                    })
                }


            }
        }
    })
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
        if (timer === 0 || stop_flag) {
            clearInterval(interval);

            phone_content_box.classList.add("on");
            send_button_box.classList.add("on");
            certificate_content_box.classList.remove("on");
            check_button_box.classList.remove("on");
        }
    }, 1000);
}
