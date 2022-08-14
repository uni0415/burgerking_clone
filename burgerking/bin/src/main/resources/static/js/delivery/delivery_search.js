const table_title = document.querySelectorAll(".table-title>ul>li");
const table_content = document.querySelectorAll(".table-content");
const search_address = document.querySelector(".search-address");
const btn_search = document.querySelector("#btn-search");
const pop_wrap = document.querySelector(".pop-wrap");
const input_detail = document.querySelector(".input-detail");
const address_text = document.querySelector(".address-text");
const input_nickname = document.querySelector(".input-nickname");
const btn_set = document.querySelector(".btn-set");
const btn_close = document.querySelector(".btn-close");
const btn_delete_address = document.querySelector(".btn-delete-address");
const btn_delete_detail = document.querySelector(".btn-delete-detail");
const btn_delete_nickname = document.querySelector(".btn-delete-nickname");
const checkbox = document.querySelector(".checkbox");
const my_modal = document.querySelector("#my_modal");
const pin_address = document.querySelector(".pin-address");
const delivery_name = document.querySelector(".nodata-mydelivery>p>strong>span");
const modal_close_btn = document.querySelector(".modal-close-btn");
const modal_registration_btn = document.querySelector(".modal-registration-btn");
const address_nickname = document.querySelector(".input-nickname");
const address = document.querySelector(".address-text");
const detail_address = document.querySelector(".input-detail");
const nodata = document.querySelector(".nodata-mydelivery");
const delivery_list = document.querySelector(".delivery-list");

let result = document.getElementById('result');
let addr = '';
let address_length;
inputWidth();
inputLength();
inputLong();
loadOrderAddress();

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
                sessionStorage.setItem("pin_address", data.address);
                pin_address_text = data.address;
            }
        }).open({
            q: addr,
            left: (window.screen.width / 2) - (500 / 2),
            top: (window.screen.height / 2) - (600 / 2)
        });
    };
}



function popMyModal() {
    my_modal.classList.add("on");
    modal_close_btn.onclick = () => {
        my_modal.classList.remove("on");
    }
    modal_registration_btn.onclick = () => {

        if (address_length > 4) {
            alert("5개까지 가능");
            my_modal.classList.remove("on");
            pop_wrap.classList.remove("on");
        } else {
            $.ajax({
                type: "post",
                dataType: "text",
                data: {
                    "user_id": user_info.id,
                    "address_nickname": input_nickname.value,
                    "address": address_text.textContent,
                    "detail_address": input_detail.value
                },
                url: "/api/v1/delivery/order-address",
                success: function () {
                    my_modal.classList.remove("on");
                    pop_wrap.classList.remove("on");
                    pin_address.innerText = address_text.innerText;
                    location.replace("/delivery/menu/1");
                }
            })
        }
    }
}


function loadOrderAddress() {
    $.ajax({
        type: "post",
        dataType: "json",
        data: { "user_id": user_info.id },
        url: "/api/v1/delivery/address-info",
        success: function (data) {
            console.log(data);
            address_length = data.length;
            console.log(address_length);
            if (data.length > 0) {
                nodata.style = "display:none";
            } else if (data.length == 0 || data == '[]') {
                nodata.style = "display:block";
            }
            delivery_list.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                const address_tag = makeAddressTag(data[i]);
                delivery_list.appendChild(address_tag);
                const delivery_delete = address_tag.querySelector(".delivery-delete");
                deleteAddrssList(data[i].id, delivery_delete);
            }
        }
    })

}

function deleteAddrssList(delivery_list_id, delivery_delete) {
    delivery_delete.onclick = () => {
        console.log("click");
        $.ajax({
            type: "delete",
            dataType: "json",
            data: {
                "id": delivery_list_id,
                "user_id": user_info.id
            },
            url: "/api/v1/delivery/deleteList",
            success: function () {
                console.log("test");

                loadOrderAddress();
            }
        })
    }
}

function inputWidth() {
    search_address.onkeyup = (e) => {

        if (e.keyCode == 8) {
            if (search_address.value == 0) {
                btn_delete_address.classList.remove("active");

            }
        } else {
            if (search_address.value.length > 0) {
                btn_delete_address.classList.add("active");
            }
        }
    }
}

btn_delete_address.onclick = () => {
    search_address.value = null;
    btn_delete_address.classList.remove("active");
}

function inputLength() {
    input_detail.onkeyup = (e) => {

        if (e.keyCode == 8) {
            if (input_detail.value == 0) {
                btn_delete_detail.classList.remove("active");

            }
        } else {
            if (input_detail.value.length > 0) {
                btn_delete_detail.classList.add("active");
            }
        }
    }
}

btn_delete_detail.onclick = () => {
    input_detail.value = null;
    btn_delete_detail.classList.remove("active");
}

//글자전체삭제 및 실시간 글자체크
function inputLong() {
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
    if (checkbox.checked) {
        pop_wrap.classList.remove("on");
        popMyModal();
    } else {
        pop_wrap.classList.remove("on");
        pin_address.innerText = address_text.innerText;
    }
}




input_detail.onkeydown = () => {
    if (input_detail.value.length > 0) {
        btn_set.classList.add("on");
        btn_set.disabled = "";
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
setdeliveryName();

function setdeliveryName() {
    delivery_name.innerText = user_info.name;
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
