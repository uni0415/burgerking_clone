const passwordInput = document.querySelectorAll(".password-input");
const password_unshown = document.querySelectorAll(".password-unshown");
const password_shown = document.querySelectorAll(".password-shown");
const name_input_box = document.querySelector(".name-input-box");
const tel_input_box = document.querySelector(".tel-input-box");
const select_year = document.querySelector("#select-yyyy");
const select_month = document.querySelector("#select-mm");
const select_date = document.querySelector("#select-dd");
const submit_button = document.querySelector(".submit-button");



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
        year.textContent = `${i}`;
        select_year.append(year);
    }

    for (let i = 1; i < 13; i++) {
        let month = document.createElement("option");
        month.value = `${i}`;
        month.textContent = `${i}`;
        select_month.append(month);
    }

    for (let i = 1; i < 32; i++) {
        let date = document.createElement("option");
        date.value = `${i}`;
        date.textContent = `${i}`;
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

    $.ajax({
        type: "post",
        dataType: "text",
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
        success: function (data) {
            data = JSON.parse(data);
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
                success: function (data) {
                    data = JSON.parse(data);
                }
            })
        }
    })
}
