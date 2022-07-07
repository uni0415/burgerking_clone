const table_title = document.querySelectorAll(".table-title>ul>li");
const table_content = document.querySelectorAll(".table-content");
const search_address = document.querySelector(".search-address");
const btn_search = document.querySelector("#btn-search");
const pop_wrap = document.querySelector(".pop-wrap");
const address = document.querySelector(".address-text");
const input_detail = document.querySelector(".input-detail");
const btn_set = document.querySelector(".btn-set");
const btn_close = document.querySelector(".btn-close");
const btn_delete_address = document.querySelector(".btn-delete-address");
const btn_delete_detail = document.querySelector(".btn-delete-detail");
const checkbox = document.querySelector(".checkbox");
const my_modal = document.querySelector("#my_modal");
const pin_address = document.querySelector(".pin-address");


let result = document.getElementById('result');
let addr = '';

inputWidth();
inputLength();

window.onload = function () {
    search_address.onkeypress = (e) => {
        if (e.keyCode == 13) {
            btn_search.click();
        }
    }
    btn_search.onclick = () => { //주소입력칸을 클릭하면
        addr = search_address.value;
        //카카오 지도 발생
        new daum.Postcode({
            width: 500,
            height: 600,
            oncomplete: function (data) { //선택시 입력값 세팅
                pop_wrap.classList.add("on"); //상세입력 포커싱
                document.querySelector(".address-text").innerText = data.address; // 주소 넣기
                pin_address.innerText = data.address;
            }
        }).open({
            q: addr,
            left: (window.screen.width / 2) - (500 / 2),
            top: (window.screen.height / 2) - (600 / 2)
        });
    };
}

function inputWidth() {
    search_address.onkeyup = (e) => {

        if (e.keyCode == 8) {
            if (search_address.value == 0) {
                btn_delete_address.classList.remove("active");

            }
            result.value = search_address.value.length;
        } else {
            if (search_address.value.length > 0) {
                btn_delete_address.classList.add("active");
            }
            result.value = search_address.value.length;
        }
    }
}

btn_delete_address.onclick = () => {
    search_address.value = null;
    result.value = 0;
    btn_delete_address.classList.remove("active");
}

function inputLength() {
    input_detail.onkeyup = (e) => {

        if (e.keyCode == 8) {
            if (input_detail.value == 0) {
                btn_delete_detail.classList.remove("active");

            }
            result.value = input_detail.value.length;
        } else {
            if (input_detail.value.length > 0) {
                btn_delete_detail.classList.add("active");
            }
            result.value = input_detail.value.length;
        }
    }
}

btn_delete_detail.onclick = () => {
    input_detail.value = null;
    result.value = 0;
    btn_delete_detail.classList.remove("active");
}

btn_close.onclick = () => {
    pop_wrap.classList.remove("on");
}

btn_set.onclick = () => {
    pop_wrap.classList.remove("on");
    document.querySelector(".pin-address").innerText = data.address;
    console.log("test");
}




input_detail.onkeydown = () => {
    if (input_detail.value.length > 0) {
        btn_set.classList.add("on");
        btn_set.disabled = "";
        console.log("test");
    } else if (input_detail.value.length < 2) {
        btn_set.classList.remove("on");
    }
}


for (let i = 0; i < table_title.length; i++) {
    table_title[i].onclick = () => {
        for (let j = 0; j < table_title.length; j++) {
            if (i == j) {
                table_title[j].classList.add("on");
                table_content[j].classList.add("on");
            } else {
                table_title[j].classList.remove("on");
                table_content[j].classList.remove("on");
            }
        }
    }
}

