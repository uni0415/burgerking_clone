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
const my_modal = document.querySelector("#my_modal");
const modal_close_btn = document.querySelector(".modal-close-btn");
const address_nickname = document.querySelector(".input-nickname");
const address = document.querySelector(".address-text");
const detail_address = document.querySelector(".input-detail");
const delivery_list = document.querySelector(".delivery-list");
const delivery_delete = document.querySelector(".delivery-delete");
const delivery_address = document.querySelector(".delivery-list>ul>li");
const nodata = document.querySelector(".nodata");
let result = document.getElementById('result');


inputLength();
inputWidth();
loadOrderAddress();

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



Element.prototype.setStyle = function (styles) {
    for (var k in styles) this.style[k] = styles[k];
    return this;
};



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
    my_modal.classList.add("on");
}

modal_close_btn.onclick = () => {
    my_modal.classList.remove("on");
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




modal_registration_btn.onclick = () => {
    $.ajax({
        type: "post",
        dataType: "text",
        data: {
            "user_id": user_info.id,
            "address_nickname": address_nickname.value,
            "address": address.textContent,
            "detail_address": detail_address.value
        },
        url: "/api/v1/delivery/order-address",
        success: function () {
            my_modal.classList.remove("on");
            pop_wrap.classList.remove("on");
            loadOrderAddress();
        }
    })
}

function lastOrderAddress() {
    $.ajax({
        type: "post",
        dataType: "json",
        data: { "user_id": user_info.id },
        url: "/api/v1/delivery/last-address-info",
        success: function (data) {
            console.log(data);
            const address_tag = makeAddressTag(data);
            delivery_list.innerHTML = '';
            delivery_list.appendChild(address_tag);
        }
    })
}

function loadOrderAddress() {
    $.ajax({
        type: "post",
        dataType: "json",
        data: { "user_id": user_info.id },
        url: "/api/v1/delivery/address-info",
        success: function (data) {
            console.log(data);
            if (data.length > 0) {
                nodata.style = "display:none";
            }
            console.log(123);
            delivery_list.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                const address_tag = makeAddressTag(data[i]);
                delivery_list.appendChild(address_tag);
                const changeNicknameBtn = address_tag.querySelector(".btn-nickname");
                changeNicknameBtn.onclick = () => {
                    modal('my_modal');
                }
            }
        }
    })

}

function makeAddressTag(data) {
    console.log(data);
    const li = document.createElement("li");

    li.innerHTML = `
        <div class="option-content">
            <label class="option-checked">
                <input type="radio" name="check">
                <span>
                    기본배달지
                </span>
            </label>
            <div class="nickname">
                <p class="title">
                    <strong class="title-name">${data.address_nickname}</strong>
                </p>

                <button type="button" class="btn-nickname">
                    <span>별칭변경</span>
                </button>
            </div>
            <p class="delivery-address">
                <span class="delivery-address-area">${data.address}</span>
                <span class="detail-delivery-addresss">${data.detail_address}</span>
            </p>
        </div>
        <button type="button" class="delivery-delete">
            <span>Delete</span>
        </button>
    `
    return li;
}
