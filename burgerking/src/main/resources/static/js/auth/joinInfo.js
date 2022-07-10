const passwordInput = document.querySelectorAll(".password-input");
const password_unshown = document.querySelectorAll(".password-unshown");
const password_shown = document.querySelectorAll(".password-shown");
const name_input_box = document.querySelector(".name-input-box");
const tel_input_box = document.querySelector(".tel-input-box");
const select_year = document.querySelector("#select-yyyy");
const select_month = document.querySelector("#select-mm");
const select_date = document.querySelector("#select-dd");
const submit_button = document.querySelector(".submit-button");

const username_detail_box = document.querySelector(".username-detail-box");

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
})




name_input_box.placeholder = sessionStorage.getItem("name");
tel_input_box.placeholder = sessionStorage.getItem("phone");

setBirth();

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

submit_button.onclick = () => {
    const email = document.querySelector(".username-input");
    const gender = document.querySelector("input[name=gender]:checked");
    const birth_year = document.querySelector("select[name=birth_year]");
    const birth_month = document.querySelector("select[name=birth_month]");
    const birth_date = document.querySelector("select[name=birth_date]");
    const password = document.querySelectorAll(".password-input");
    let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    let regPassword = /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{10,20}$/;


    if (!email.value || !regEmail.test(email.value) === true) {
        Toast.fire({
            icon: 'error',
            title: '이메일을 다시 확인해주세요'
        })
    } else if (regPassword.test(password[0].value) === true) {
        if (password[0].value != password[1].value) {
            Toast.fire({
                icon: 'error',
                title: '비밀번호를 다시 확인해주세요'
            })
        }
    } else {
        Toast.fire({
            icon: 'error',
            title: '조건에 맞는 비밀번호를 입력해주세요'
        })

    }
    $.ajax({
        type: "post",
        dataType: "json",
        data: {
            "email": email.value,
            "name": sessionStorage.getItem("name"),
            "phone": sessionStorage.getItem("phone"),
            "gender": gender.value,
            "birth_year": birth_year.value,
            "birth_month": birth_month.value,
            "birth_date": birth_date.value,
            "password": password[0].value
        },
        url: "/api/v1/auth/signup",
        success: function () {
            $.ajax({
                type: "post",
                dataType: "text",
                data: {
                    "terms": sessionStorage.getItem("terms"),
                    "privacy_policy": sessionStorage.getItem("privacy_policy"),
                    "email_agreement": sessionStorage.getItem("email_agreement"),
                    "sms_agreement": sessionStorage.getItem("sms_agreement"),
                },
                url: "/api/v1/auth/agreement",
                success: function () {
                    location.replace("/index");
                }
            })
        },
        error: function (data) {
            console.log(data.responseJSON);
            if (data.responseJSON == false) {
                Toast.fire({
                    icon: 'error',
                    title: '이미 존재하는 아이디입니다.'
                })
            }
        }
    })
}
