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

const choose_birth = document.querySelector("input[name=choose-birth]");
const select_year = document.querySelector("#select-yyyy");
const select_month = document.querySelector("#select-mm");
const select_date = document.querySelector("#select-dd");

const email = document.querySelector(".email");
const member_info_name = document.querySelector(".member-info-name");
const phone = document.querySelector(".phone");
const gender = document.querySelectorAll("input[name=gender]");
const btn02 = document.querySelector(".btn02");


const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
})

const Toast2 = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '확인',
})


// const Toast3 = Swal.mixin({
//     toast: true,
//     position: 'center',
//     showConfirmButton: true,
//     showConfirmButton: false,
//     timer: 1500,
//     timerProgressBar: true,
// })

let stop_flag = false;
loadUserInfo();

function loadUserInfo() {
    $.ajax({
        type: "post",
        dataType: "text",
        url: "/api/v1/delivery/user",
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            setUserInfo(data);
            setUserBirth(data);
            setGender(data);
        }
    })
}


function setUserInfo(data) {
    email.innerText = data.email;
    member_info_name.innerText = data.name;
    phone.innerText = data.phone;
}

function setUserBirth(data) {
    $(select_year).val(data.birth_year).prop("selected", true);
    $(select_month).val(data.birth_month).prop("selected", true);
    $(select_date).val(data.birth_date).prop("selected", true);
}

function setGender(data) {
    for (let i = 0; i < gender.length; i++) {
        if (gender[i].value == data.gender) {
            gender[i].checked = true;
        }
    }
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
    } else if (phone.textContent == phone_input_item.value) {
        Toast.fire({
            icon: 'error',
            title: '기존 번호와 동일한 번호로는 변경할 수 없습니다.'
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
                                Toast2.fire({
                                    icon: 'success',
                                    title: '휴대폰 변경이 정상적으로 완료되었습니다.'
                                }).then(result => {
                                    if (result.isConfirmed) {
                                        location.reload();
                                    }
                                });
                                stop_flag = true;
                                $.ajax({
                                    type: "post",
                                    dataType: "text",
                                    data: {
                                        "email": email.textContent,
                                        "phone": phone_input_item.value
                                    },
                                    url: "/api/v1/auth/updatePhone",
                                    success: function (data) {
                                        data = JSON.parse(data);
                                        reload();
                                    }
                                })
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

btn02.onclick = () => {

    const checked_gender = document.querySelector("input[name=gender]:checked");
    $.ajax({
        type: "post",
        dataType: "text",
        data: {
            "birth_year": select_year.value,
            "birth_month": select_month.value,
            "birth_date": select_date.value
        },
        url: "/api/v1/auth/updateBirth",
        success: function (data) {
            location.replace("/delivery/myking");
        }
    })
    $.ajax({
        type: "post",
        dataType: "text",
        data: {
            "gender": checked_gender.value
        },
        url: "/api/v1/auth/updateGender",
        success: function (data) {

        }
    })
}


function reload() {
    location.reload();
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
chooseBirth();
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

function chooseBirth() {
    const birth_list = document.querySelectorAll("select");
    const birth_year = document.querySelector("select[name=birth_year]");
    for (let i = 0; i < birth_list.length; i++) {
        birth_list[i].onchange = () => {
            choose_birth.checked = false;
        }
        if (choose_birth.checked == true) {
        }
    }
}

