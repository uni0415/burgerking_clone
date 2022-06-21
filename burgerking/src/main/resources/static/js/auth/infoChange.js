const auth_num = document.querySelector(".auth-num");
const btn_change = document.querySelector(".btn-change");

const select_year = document.querySelector("#select-yyyy");
const select_month = document.querySelector("#select-mm");
const select_date = document.querySelector("#select-dd");




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