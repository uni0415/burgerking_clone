let menu_id = sessionStorage.getItem("menu_id");
let side_menu_id = sessionStorage.getItem("side_menu_id");
let drink_menu_id = sessionStorage.getItem("drink_menu_id");
let size = sessionStorage.getItem("size");
console.log(menu_id, size, side_menu_id, drink_menu_id);

const cart_list_box = document.querySelector(".cart-list-box");

const menu_title = document.querySelector(".menu-title>strong>span");
const menu_price = document.querySelector(".price");
const menu_image = document.querySelector(".menu-img-box>img");
const side_menu_list = document.querySelectorAll(".side-menu-list>span");
const side_menu_price = document.querySelectorAll(".side-menu-list .add-price");
const add_price = document.querySelectorAll(".add-price");
const total_sum = document.querySelector(".total-price");
const calc_total_sum = document.querySelector(".calc-total-price");

const menu_count_tag = document.querySelector(".num-set > input");
const reduce_menu_count_button = document.querySelector(".num-set > .btn-minus");
const add_menu_count_button = document.querySelector(".num-set > .btn-plus");

const additional = document.querySelectorAll(".additional");
const add_menu_to_card_button = document.querySelector(".menu-add-button");

let total_price = 0;
let calc_total_price = 0;
let menu_count = 1;

let cart_list_json;


getCartListFromSession();
// session cart_list = null 
// cart_list != null -> JSON.parse(); -> 반복 돌면서 tag -> append -> event

function getCartListFromSession() {
	const string_json = sessionStorage.getItem("cart_list");
	/*if(string_json == null) location.replace("/delivery/menu/1");*/
	
/*	cart_list_json = JSON.parse(string_json);
	cart_list_json[0]['ingredient_list'] = new Array();
	cart_list_json[0]['ingredient_list'].push(1);
	cart_list_json[0]['ingredient_list'].push(2);
	cart_list_json[0]['ingredient_list'].push(3);
	cart_list_json[0]['ingredient_list'].push(4);*/
	
	cart_list_json = new Array();
	const data = {};
	data['menu_id_list'] = new Array();
	data['menu_id_list'].push(40);
	data['menu_id_list'].push(145);
	data['menu_id_list'].push(170);
	data['ingredient_list'] = new Array();
	data['ingredient_list'].push(1);
	data['ingredient_list'].push(2);
	data['ingredient_list'].push(3);
	cart_list_json.push(data);
	console.log(JSON.stringify(data));
	
	/*$.ajax({
		type: "get",
		url: "/api/v1/delivery/menu/details",
		data: data,
		dataType: "json",
		success: function (menu_data_list) {
			console.log(menu_data_list);
			
			for(let i = 0; i < menu_data_list.length; i++) {
				const cart_menu_tag = makeCartMenuTag(menu_data_list[i]);
				cart_list_box.appendChild(cart_menu_tag);
				
				
			}
		},
		error: function (xhr, stauts) {
			console.log(xhr);
			console.log(status);
		}
	});*/
}

function makeCartMenuTag(menu_data) {
	const li = document.createElement("li");
	li.innerHTML = `
		<div class="menu-content-box">
            <div id="menu-title" class="menu-title-wrap">
                <label for="menu-title" class="menu-name">
                    <input type="checkbox" name="menu" title="선택" class="menu-checkbox">
                    <span class="menu-title">
                        <strong>
                            <span></span>
                        </strong>
                    </span>
                    <span class="price-box">
                        <strong>
                            <span class="price"></span>
                            <span>원</span>
                        </strong>
                    </span>
                </label>
                <div class="menu-img-box">
                    <img src="" alt="">
                </div>
            </div>
            <div class="set-menu-detail">
                <ul>
                    <li class="additional">
                        <span>재료추가</span>
                        <div class="additional-box">
                            <ul class="additional-list">
                                <li>없음</li>
                            </ul>
                            <button type="button"
                                class="additional-list-button"><span>변경</span></button>
                        </div>
                    </li>
                    <li class="additional">
                        <span>사이드</span>
                        <div class="additional-box">
                            <div class="side-menu-list">
                                <span>프렌치프라이L</span>
                                <strong>
                                    +
                                    <span class="add-price">0</span>
                                    <span>원</span>
                                </strong>
                            </div>
                            <button type="button"
                                class="additional-list-button"><span>변경</span></button>
                        </div>
                    </li>
                    <li class="additional">
                        <span>음료</span>
                        <div class="additional-box">
                            <div class="side-menu-list">
                                <span>콜라 L</span>
                                <strong>
                                    +
                                    <span class="add-price">0</span>
                                    <span>원</span>
                                </strong>
                            </div>
                            <button type="button"
                                class="additional-list-button"><span>변경</span></button>
                        </div>
                    </li>
                    <li class="additional">
                        <span>음료1</span>
                        <div class="additional-box">
                            <div class="side-menu-list">
                                <span></span>
                                <strong>
                                    +
                                    <span class="add-price">0</span>
                                    <span>원</span>
                                </strong>
                            </div>
                            <button type="button"
                                class="additional-list-button"><span>변경</span></button>
                        </div>
                    </li>
                    <li class="additional">
                        <span>음료2</span>
                        <div class="additional-box">
                            <div class="side-menu-list">
                                <span></span>
                                <strong>
                                    +
                                    <span class="add-price">0</span>
                                    <span>원</span>
                                </strong>
                            </div>
                            <button type="button"
                                class="additional-list-button"><span>변경</span></button>
                        </div>
                    </li>

                </ul>
            </div>
            <div class="quantity">
                <strong>수량</strong>
                <div class="num-set">
                    <button type="button" class="btn-minus"></button>
                    <input type="number" readonly="readonly">
                    <button type="button" class="btn-plus"></button>
                </div>
            </div>

            <div>

            </div>
            <button type="button" class="delete-button"></button>
        </div>
        <div class="sum-wrap">
            <div>
                <span>합계금액</span>
                <div>
                    <strong>
                        <span class="total-price">7,800원</span>
                        <span>원</span>
                    </strong>
                </div>
            </div>
        </div>
	`;
	return li;
}

/*reduce_menu_count_button.onclick = reduceMenuCount;
add_menu_count_button.onclick = addMenuCount;*/

/*add_menu_to_card_button.onclick = () => {
	const cart_list = sessionStorage.getItem("cart_list") != null ? JSON.parse(sessionStorage.getItem("cart_list")) : new Array();
	const menu = {
		"menu_id": sessionStorage.getItem("menu_id"),
		"side_menu_id": sessionStorage.getItem("side_menu_id"),
		"drink_menu_id": sessionStorage.getItem("drink_menu_id")
	};
	cart_list.push(menu);
	sessionStorage.setItem("cart_list", JSON.stringify(cart_list));
	if (sessionStorage.getItem("cart_menu_name") == null) sessionStorage.setItem("cart_menu_name", document.querySelector(".menu-title span").innerText);
	location.replace("/delivery/menu/1");
}

additionalList();
function additionalList() {
	if (menu_id < 4) {
		additional[3].classList.add("on");
		additional[4].classList.add("on");
	} else if (size == 0) {
		additional[0].classList.add("on");
	} else if (menu_id > 3) {
		additional[0].classList.add("on");
		additional[1].classList.add("on");
		additional[2].classList.add("on");
	}
}

setOrderList();
function setOrderList() {
	for (let i = 0; i < cart_list.length; i++) {
		$.ajax({
			type: "post",
			dataType: "json",
			data: {
				"menu_id": menu_id,
				"side_menu_id": side_menu_id,
				"drink_menu_id": drink_menu_id
			},
			url: `/api/v1/delivery/cart/${menu_id}`,
			success: function(data) {
				console.log(data);
				setMenuList(data[0]);
				setSideMenuList(data);
				setSideDrinkList(data);
				menu_count_tag.value = menu_count;
				calcTotalPrice();
			}
		})


	}

}



function setMenuList(data) {
	let price = data.price;
	menu_title.innerText = data.name;
	menu_price.innerText = price.toLocaleString('ko-KR')
	menu_image.src = data.menu_images;
	total_price += price;
}

function addMenuCount() {
	menu_count_tag.value = ++menu_count;
	calcTotalPrice();
}

function reduceMenuCount() {
	if (menu_count == 1) return;
	menu_count_tag.value = --menu_count;
	calcTotalPrice();
}

function setSideMenuList(data) {
	if (data.length == 1) {
		return;
	} else if (data.length == 2) {
		return;
	} else if (data.length == 3) {
		let side_add = size == 1 ? data[1].set_add_price : data[1].large_add_price;
		side_menu_list[0].innerText = data[1].name;
		add_price[0].innerText = side_add;
		total_price += Number(side_add);
	}
}

function setSideDrinkList(data) {
	if (data.length == 1) {
		return;
	} else if (data.length == 2) {
		console.log(data);
		let drink_add = size == 1 ? data[1].set_add_price : data[1].large_add_price;
		side_menu_list[2].innerText = data[1].name;
		add_price[2].innerText = drink_add;
		side_menu_list[3].innerText = data[1].name;
		add_price[3].innerText = drink_add;
		total_price += Number(drink_add);
	} else if (data.length == 3) {
		let drink_add = size == 1 ? data[2].set_add_price : data[2].large_add_price;
		side_menu_list[1].innerText = data[2].name;
		add_price[1].innerText = drink_add;
		total_price += Number(drink_add);
	}
}

function calcTotalPrice() {
	total_sum.innerText = Number(total_price * menu_count).toLocaleString('ko-KR');
	calcLastPrice();
}

function calcLastPrice() {
	total_sum.innerText = total_price.toLocaleString('ko-KR');
	if (total_price * menu_count > 17000) {
		calc_total_price = total_price * menu_count - 5000;
		calc_total_sum.innerText = calc_total_price.toLocaleString('ko-KR');
	} else {
		calc_total_price = total_price * menu_count;
		calc_total_sum.innerText = calc_total_price.toLocaleString('ko-KR');
	}
}

*/