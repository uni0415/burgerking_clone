const btn_change = document.querySelector(".btn-change");
const btn_cancel = document.querySelector(".btn-cancel");

const send_num = document.querySelector(".send-num");
const input_num = document.querySelector(".input-num");
const phone_input_item = document.querySelector(".phone-input-item");
const btn_send = document.querySelector(".btn-send");
const btn_auth = document.querySelector(".btn-auth");
const btn_resetting = document.querySelector(".btn-resetting");
const certificate_input_item = document.querySelector(".certificate-input-item");
const certificate_success_input_item = document.querySelector(".certificate-success-input-item");

const select_year = document.querySelector("#select-yyyy");
const select_month = document.querySelector("#select-mm");
const select_date = document.querySelector("#select-dd");

const email = document.querySelector(".email");

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
})

let stop_flag = false;

$.ajax({
    type: "post",
    dataType: "text",
    url: "/api/v1/delivery/user-auth",
    success: function (data) {
        data = JSON.parse(data);
        console.log(data);
        setUserInfo(data);
    }
})

function setUserInfo(data) {
    email.innerText = data.email;

}

btn_change.onclick = () => {
    btn_change.classList.toggle("active");
    btn_cancel.classList.toggle("active");
    send_num.classList.toggle("on");
}

btn_cancel.onclick = () => {
    btn_change.classList.toggle("active");
    btn_cancel.classList.toggle("active");
    send_num.classList.toggle("on");
}

phone_input_item.onkeydown = () => {
    if (phone_input_item.value.length > 0) {
        btn_send.classList.add("on");
        btn_send.disabled = "";
    } else if (phone_input_item.value.length < 2) {
        btn_send.classList.remove("on");
    }
}

certificate_input_item.onkeydown = () => {
    if (certificate_input_item.value.length > 0) {
        btn_auth.disabled = '';
        btn_auth.style = 'background:#2e2e2e;'
    } else if (certificate_input_item.value.length < 2) {
        btn_auth.disabled = 'disabled';
        btn_auth.style = 'background:""';
    }
}

let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
btn_send.onclick = () => {
    if (!phone_input_item.value || !regPhone.test(phone_input_item.value) === true) {
        Toast.fire({
            icon: 'error',
            title: '핸드폰 번호를 입력해 주세요'
        })
    } else {
        send_num.classList.remove("on");
        input_num.classList.add("on");

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
                btn_auth.onclick = () => {
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
            btn_auth.classList.add("on");
            btn_resetting.classList.add("on");
        } else if (stop_flag == true) {
            clearInterval(interval);
            input_num.classList.remove("on");
            btn_cancel.classList.remove("active");
            btn_change.classList.remove("active");


        }
    }, 1000);
}


setBirth();

function setBirth() {
    for (let i = 2022; i > 1900; i--) {
        let year = document.createElement("option");
        year.value = `${i}`;
        year.textContent = `${i + '년'}`;
        select_year.append(year);
    }

    for (let i = 1; i < 13; i++) {
        let month = document.createElement("option");
        month.value = `${i}`;
        month.textContent = `${i + '월'}`;
        select_month.append(month);
    }

    for (let i = 1; i < 32; i++) {
        let date = document.createElement("option");
        date.value = `${i}`;
        date.textContent = `${i + '일'}`;
        select_date.append(date);
    }


}