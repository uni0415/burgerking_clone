let menu_id = sessionStorage.getItem("menu_id");
let side_menu_id = sessionStorage.getItem("side_menu_id");
let drink_menu_id = sessionStorage.getItem("drink_menu_id");
let size = sessionStorage.getItem("size");

const cart_list_box = document.querySelector(".cart-list-box");
const calc_total_price_tag = document.querySelector(".calc-total-price");
const total_menu_price_tag = document.querySelector(".total-menu-price");
const menu_amount = document.querySelector(".menu-count");
const title = document.querySelector(".title span");
const order_active_wrap = document.querySelector(".order-active-wrap");
const order_view_button = document.querySelector(".order-view-button");
const order_view = document.querySelector(".order-view");
const view_close = document.querySelector(".view-close");
const phone = document.querySelector(".phone-box input");
const address = document.querySelector(".address");
const detail_address = document.querySelector(".detail-address");
let full_address = address.textContent + detail_address.textContent;
console.log(full_address);
const cancel_button = document.querySelector(".cancel-button");
const payment_button = document.querySelector(".payment-button");

let cart_list_json;

getCartListFromSession();

order_view_button.onclick = () => {
	order_active_wrap.classList.toggle("open");
	order_view.classList.toggle("on");
	view_close.classList.toggle("on");
}

phone.value = user_info.phone;
title.innerText = menu_name;


function getCartListFromSession() {
	const cart_list = JSON.parse(sessionStorage.getItem("cart_list"));

	/*if(string_json == null) location.replace("/delivery/menu/1");*/

	/*	cart_list_json = JSON.parse(string_json);
		cart_list_json[0]['ingredient_list'] = new Array();
		cart_list_json[0]['ingredient_list'].push(1);
		cart_list_json[0]['ingredient_list'].push(2);
		cart_list_json[0]['ingredient_list'].push(3);
		cart_list_json[0]['ingredient_list'].push(4);*/

	/*cart_list_json = new Array();
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
	console.log(JSON.stringify(data));*/

	cart_list_json = new Array();
	for (let i = 0; i < cart_list.length; i++) {
		if (!cart_list_json.includes(cart_list[i].menu_id)) cart_list_json.push(cart_list[i].menu_id);
		if (!cart_list_json.includes(cart_list[i].side_menu_id)) cart_list_json.push(cart_list[i].side_menu_id);
		if (!cart_list_json.includes(cart_list[i].drink_menu_id)) cart_list_json.push(cart_list[i].drink_menu_id);
	}
	console.log("cart_list_json: ")
	console.log(cart_list_json);
	$.ajax({
		type: "post",
		url: "/api/v1/delivery/menu/details",
		data: {
			"menu_id_list": cart_list_json
		},
		dataType: "json",
		success: functionmenu_data_list) {
			menu_data_list = devideMenuData(cart_list, menu_data_list);
			for (let i = 0; i < menu_data_list.length; i++) {
				sessionStorage.setItem("cart_menu_name", menu_data_list[0].menu.name);

				const cart_menu_tag = makeCartMenuTag(menu_data_list[i], i);
				cart_list_box.appendChild(cart_menu_tag);

				const total_price_tag = cart_menu_tag.querySelector(".total-price");

				const menu_count_tag = cart_menu_tag.querySelector(".num-set > input");
				const reduce_menu_count_button = cart_menu_tag.querySelector(".num-set > .btn-minus");
				const add_menu_count_button = cart_menu_tag.querySelector(".num-set > .btn-plus");
				additionalList(menu_data_list[i], cart_menu_tag);

				const ingredient_add_price = cart_menu_tag.querySelector(".ingredient-add-price");

				const ingredient_change_button = cart_menu_tag.querySelector("#ingredient-change-button");
				const side_change_button = cart_menu_tag.querySelector("#side-change-button");
				const drink_change_button = cart_menu_tag.querySelector("#drink-change-button");

				popSideMenuModal(side_change_button, menu_data_list[i].menu, cart_menu_tag, i, total_price_tag);
				popDrinkMenuModal(drink_change_button, menu_data_list[i].menu, cart_menu_tag, i, total_price_tag);
				reduce_menu_count_button.onclick = () => reduceMenuCount(menu_count_tag, total_price_tag, i)
				add_menu_count_button.onclick = () => addMenuCount(menu_count_tag, total_price_tag, i)

				calcTotalPrice(total_price_tag, i);
			}
		},
		error: functionxhr,  status) {
			console.log(xhr);
			console.log(status);
		}
	});
}




function additionalList(menu_data, cart_menu_tag) {
	const set_menu_detail = cart_menu_tag.querySelector(".set-menu-detail > ul");
	if (menu_data.menu.id < 4) {
		const ingredient_list_tag = makeIngredientTag(menu_data.menu);
		const drink_menu_tag = makeDrinkMenuTag(menu_data.drink_menu, menu_data.drink_menu.set_size);

		set_menu_detail.appendChild(ingredient_list_tag);
		set_menu_detail.appendChild(drink_menu_tag);


	} else if (menu_data.menu.set_size == 0) {
		const ingredient_list_tag = makeIngredientTag(menu_data.menu);
		set_menu_detail.appendChild(ingredient_list_tag);

	} else if (menu_data.menu.id > 3) {
		const ingredient_list_tag = makeIngredientTag(menu_data.menu);
		const side_menu_tag = makeSideMenuTag(menu_data.side_menu, menu_data.side_menu.set_size);
		const drink_menu_tag = makeDrinkMenuTag(menu_data.drink_menu, menu_data.drink_menu.set_size);

		set_menu_detail.appendChild(ingredient_list_tag);
		set_menu_detail.appendChild(side_menu_tag);
		set_menu_detail.appendChild(drink_menu_tag);

	}
}

function devideMenuData(cart_list, menu_data_list) {
	const list = new Array();
	for (let i = 0; i < cart_list.length; i++) {
		const menu_index = menu_data_list.findIndex(e => e.id == cart_list[i].menu_id);
		const side_index = menu_data_list.findIndex(e => e.id == cart_list[i].side_menu_id);
		const drink_index = menu_data_list.findIndex(e => e.id == cart_list[i].drink_menu_id);
		const data = {
			menu: menu_data_list[menu_index],
			side_menu: menu_data_list[side_index],
			drink_menu: menu_data_list[drink_index],
		};
		list.push(data);
	}
	return list;
}

function makeIngredientTag(menu) {
	const li = document.createElement("li");
	li.className = "additional";
	li.innerHTML = `
	    <span>재료추가</span>
	    <div class="additional-box">
	    	<ul class="additional-list">
	    	
	    	</ul>
	    	<button type="button" id="ingredient-change-button" class="additional-list-button">
                	<span>변경</span>
            </button>
	    </div>
	`;

	const additional_list = li.querySelector(".additional-list");
	if (menu.ingredient_list == null || menu.ingredient_list.length == 0) {
		const blank = document.createElement("li");
		blank.innerText = "없음";
		additional_list.appendChild(blank);
	}
	else {
		for (let i = 0; i < menu.ingredient_list.length; i++) {
			const element = document.createElement("li");
			element.innerHTML = `
				<div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>${menu.ingredient_list[i].name}</span>
                    <strong>
                        +
                        <span class="ingredient-add-price">${menu.ingredient_list[i].price}</span>
                        <span>원</span>
                    </strong>
                </div>
                <button type="button" id="ingredient-change-button" class="additional-list-button">
                	<span>변경</span>
                </button>
			`;
			additional_list.appendChild(element);
		}
	}
	return li;
}

function makeSideMenuTag(side_menu, set_size) {
	const li = document.createElement("li");
	li.className = "additional";
	li.innerHTML = `
	    <span>사이드</span>
	    <div class="additional-box">
	        <div class="side-menu-list">
	            <span class="side-menu-name">${side_menu.name}</span>
	            <strong>
	                +
	                <span class="side-add-price">${set_size == 1 ? side_menu.set_add_price : side_menu.large_add_price}</span>
	                <span>원</span>
	            </strong>
	        </div>
	        <button type="button" id="side-change-button" class="additional-list-button">
	        	<span>변경</span>
	        </button>
	    </div>
	`;
	return li;
}

function makeDrinkMenuTag(drink_menu, set_size) {
	const li = document.createElement("li");
	li.className = "additional";
	li.innerHTML = `
        <span>음료</span>
        <div class="additional-box">
            <div class="side-menu-list">
                <span class="drink-menu-name">${drink_menu.name}</span>
                <strong>
                    +
                    <span class="drink-add-price">${set_size == 1 ? drink_menu.set_add_price : drink_menu.large_add_price}</span>
                    <span>원</span>
                </strong>
            </div>
            <button type="button" id="drink-change-button" class="additional-list-button">
            	<span>변경</span>
            </button>
        </div>
	`;
	return li;
}

function makeCartMenuTag(menu_data, index) {
	console.log(menu_data);
	cart_list = JSON.parse(sessionStorage.getItem("cart_list"));
	for (let i = 0; i < cart_list.length; i++) {
		menu_count = cart_list[index].menu_count;
	}
	const li = document.createElement("li");
	li.classList.add("menu-list");
	li.innerHTML = `
		<div class="menu-content-box">
            <div id="menu-title" class="menu-title-wrap">
                <label for="menu-title" class="menu-name">
                    <span class="menu-title">
                        <strong>
                            <span>${menu_data.menu.name}</span>
                        </strong>
                    </span>
                    <span class="price-box">
                        <strong>
                            <span class="price">${menu_data.menu.price.toLocaleString('ko-KR')}</span>
                            <span>원</span>
                        </strong>
                    </span>
                </label>
            </div>
            <div class="set-menu-detail">
                <ul>
                    
                </ul>
            </div>
            </div>
            <div class="quantity">
                <strong>수량</strong>
                <div class="num-set">
                    <button type="button" class="btn-minus"></button>
                    <input type="number" readonly="readonly" value=${menu_count}>
                    <button type="button" class="btn-plus"></button>
                </div>
            </div>
            <div class="sum-wrap">
            <div>
                <span>합계금액</span>
                <div>
                    <strong>
                        <span class="total-price">${menu_data.menu.price.toLocaleString('ko-KR')}</span>
                        <span>원</span>
                    </strong>
                </div>
            </div>
        </div>
	`;
	return li;
}



function addMenuCount(menu_count_tag, total_price_tag, index) {
	menu_count_tag.value = ++menu_count_tag.value;
	cart_list = JSON.parse(sessionStorage.getItem("cart_list"));
	sessionStorage.setItem("menu_count", menu_count_tag.value);
	menu_count = sessionStorage.getItem("menu_count");
	for (let i = 0; i < cart_list.length; i++) {
		cart_list[index].menu_count = menu_count;
		sessionStorage.setItem("cart_list", JSON.stringify(cart_list));
	}
	calcTotalPrice(total_price_tag, index);
}

function reduceMenuCount(menu_count_tag, total_price_tag, index) {
	if (menu_count_tag.value == 1) return;
	menu_count_tag.value = --menu_count_tag.value;
	cart_list = JSON.parse(sessionStorage.getItem("cart_list"));
	sessionStorage.setItem("menu_count", menu_count_tag.value);
	menu_count = sessionStorage.getItem("menu_count");
	for (let i = 0; i < cart_list.length; i++) {
		cart_list[index].menu_count = menu_count;
		sessionStorage.setItem("cart_list", JSON.stringify(cart_list));
	}
	calcTotalPrice(total_price_tag, index);
}



function calcTotalPrice(total_price_tag, index) {
	cart_list = JSON.parse(sessionStorage.getItem("cart_list"));
	let price;
	let menu_count;
	for (let i = 0; i < cart_list.length; i++) {
		let menu_price = Number(cart_list[index].menu_price);
		let side_price = Number(cart_list[index].side_price);
		let drink_price = Number(cart_list[index].drink_price);
		menu_count = Number(cart_list[index].menu_count);
		price = menu_price + side_price + drink_price;
	}


	total_price_tag.innerText = (price * menu_count).toLocaleString('ko-KR');

	calcLastPrice();
}

function calcLastPrice() {
	const prices = cart_list_box.querySelectorAll(".total-price");
	let acc_price = 0;
	prices.forEach(e => {
		let price_text = e.innerText;
		price_text = price_text.replaceAll(",", "");
		acc_price += Number(price_text);
	});
	calc_total_price_tag.innerText = acc_price.toLocaleString('ko-KR');
	total_menu_price_tag.innerText = acc_price.toLocaleString('ko-KR') + "원";
	payment_price = acc_price;
}

cancel_button.onclick = () => {
	history.back();
}

const IMP = window.IMP;
IMP.init("imp31100156")

payment_button.onclick = () => {
	requestPay();
}
let payment_price;
function requestPay() {
	IMP.request_pay({
		pg: "html5_inicis",
		pay_method: "card",
		merchant_uid: `ORD${new Date().getTime()}`,
		name: menu_name,
		amount: payment_price,
		buyer_email: user_info.email,
		buyer_name: user_info.name,
		buyer_tel: phone.value,
		buyer_addr: full_address,
		buyer_postcode: "01181"
	}, function(rsp) {
		if (rsp.success) {
			console.log(rsp);
		} else {
			console.log("결제실패");
		}
	});
}

