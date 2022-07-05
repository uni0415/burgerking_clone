const btn_add = document.querySelector(".btn-add");
const pop_wrap = document.querySelector(".pop-wrap");
const popbox01 = document.querySelector(".popbox01");
const btn_close = document.querySelector(".btn-close");
const btn_delete_address = document.querySelector(".btn-delete-address");
const btn_delete_nickname = document.querySelector(".btn-delete-nickname");
const input_nickname = document.querySelector(".input-nickname");
const input_detail = document.querySelector(".input-detail");
const body = document.querySelector("body");
const modal_registration_btn = document.querySelector(".modal-registration-btn");
const address_detail = document.querySelector(".address-detail");
const btn_set = document.querySelector(".btn-set");
let result = document.getElementById('result');


inputLength();
inputWidth();


window.onload = function () {

    document.getElementById("address").addEventListener("click", function () { //주소입력칸을 클릭하면
        //카카오 지도 발생
        new daum.Postcode({
            width: 500,
            height: 600,
            oncomplete: function (data) { //선택시 입력값 세팅
                pop_wrap.classList.add("on"); //상세입력 포커싱
                document.querySelector(".address-text").innerText = data.address; // 주소 넣기
            }
        }).open({
            left: (window.screen.width / 2) - (500 / 2),
            top: (window.screen.height / 2) - (600 / 2)
        });
    });
}

function modal(id) {
    var zIndex = 9999;
    var modal = document.getElementById(id);

    var bg = document.createElement('div');
    bg.setStyle({
        position: 'fixed',
        zIndex: zIndex,
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0,0,0,0.4)'
    });
    body.style = "overflow-y:hidden";
    document.body.append(bg);

    modal.querySelector('.modal-close-btn').addEventListener('click', function () {
        bg.remove();
        modal.style.display = 'none';
    });

    modal.setStyle({
        position: 'fixed',
        display: 'block',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        zIndex: zIndex + 1,// 시꺼먼 레이어 보다 한칸 위에 보이기
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        msTransform: 'translate(-50%, -50%)',
        webkitTransform: 'translate(-50%, -50%)'
    });
}

Element.prototype.setStyle = function (styles) {
    for (var k in styles) this.style[k] = styles[k];
    return this;
};

document.getElementById('popup_open_btn').addEventListener('click', function () {
    // 모달창 띄우기
    modal('my_modal');
});

document.getElementById('btn-set').addEventListener('click', function () {
    // 모달창 띄우기
    modal('my_modal');
});

function inputWidth() {
    input_detail.onkeyup = (e) => {

        if (e.keyCode == 8) {
            if (input_detail.value == 0) {
                btn_delete_address.classList.remove("active");

            }
            result.value = input_detail.value.length;
        } else {
            if (input_detail.value.length > 0) {
                btn_delete_address.classList.add("active");
            }
            result.value = input_detail.value.length;
        }
    }
}

btn_delete_address.onclick = () => {
    input_detail.value = null;
    result.value = 0;
    btn_delete_address.classList.remove("active");
}


function inputLength() {
    input_nickname.onkeyup = (e) => {

        if (e.keyCode == 8) {
            if (input_nickname.value == 0) {
                btn_delete_nickname.classList.remove("active");

            }
            result.value = input_nickname.value.length;
        } else {
            if (input_nickname.value.length > 0) {
                btn_delete_nickname.classList.add("active");
            }
            result.value = input_nickname.value.length;
        }
    }
}

btn_delete_nickname.onclick = () => {
    input_nickname.value = null;
    result.value = 0;
    btn_delete_nickname.classList.remove("active");
}

btn_close.onclick = () => {
    pop_wrap.classList.remove("on");
}

btn_set.onclick = () => {
    pop_wrap.classList.remove("on");
}

input_detail.onkeydown = () => {
    if (input_detail.value.length > 0) {
        btn_set.classList.add("on");
        btn_set.disabled = "";
    } else if (input_detail.value.length < 2) {
        btn_set.classList.remove("on");
    }
}

