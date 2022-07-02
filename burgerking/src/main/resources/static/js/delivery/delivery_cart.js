let menu_id = sessionStorage.getItem("menu_id");
let side_menu_id = sessionStorage.getItem("side_menu_id");
let drink_menu_id = sessionStorage.getItem("drink_menu_id");
let size = sessionStorage.getItem("size");

const cart_list_box = document.querySelector(".cart-list-box");
const calc_total_price_tag = document.querySelector(".calc-total-price");

const add_menu_to_card_button = document.querySelector(".menu-add-button");



let cart_list_json;

getCartListFromSession();

function getCartListFromSession() {
	const cart_list = JSON.parse(sessionStorage.getItem("cart_list"));
	console.log(cart_list);
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
		success: function(menu_data_list) {
			menu_data_list = devideMenuData(cart_list, menu_data_list);
			for (let i = 0; i < menu_data_list.length; i++) {
				let total_price = 0;
				let calc_total_price = 0;
				let menu_count = 1;

				const cart_menu_tag = makeCartMenuTag(menu_data_list[i], total_price);
				cart_list_box.appendChild(cart_menu_tag);
				const main_menu_price = cart_menu_tag.querySelector(".price");

				const total_price_tag = cart_menu_tag.querySelector(".total-price");

				const menu_count_tag = cart_menu_tag.querySelector(".num-set > input");
				const reduce_menu_count_button = cart_menu_tag.querySelector(".num-set > .btn-minus");
				const add_menu_count_button = cart_menu_tag.querySelector(".num-set > .btn-plus");
				additionalList(menu_data_list[i], cart_menu_tag);

				const ingredient_add_price = cart_menu_tag.querySelector(".ingredient-add-price");
				const side_add_price = cart_menu_tag.querySelector(".side-add-price");
				const drink_add_price = cart_menu_tag.querySelector(".drink-add-price");

				const ingredient_change_button = cart_menu_tag.querySelector("#ingredient-change-button");
				const side_change_button = cart_menu_tag.querySelector("#side-change-button");
				const drink_change_button = cart_menu_tag.querySelector("#drink-change-button");
				
				menu_price = Number(menu_data_list[i].menu.price);
				side_price = Number(side_add_price.textContent);
				drink_price = Number(drink_add_price.textContent);
				total_price = menu_price + side_price + drink_price;
				
				calcTotalPrice(total_price, total_price_tag, calc_total_price, menu_count);
				popSideMenuModal(side_change_button, menu_data_list[i].menu, cart_menu_tag, i);
				popDrinkMenuModal(drink_change_button, menu_data_list[i].menu, cart_menu_tag, i);

				reduce_menu_count_button.onclick = () => {
					reduceMenuCount(total_price, calc_total_price, menu_count, menu_count_tag, total_price_tag);
				}

				add_menu_count_button.onclick = () => {
					addMenuCount(total_price, calc_total_price, menu_count, menu_count_tag, total_price_tag);
				}
			}
		},
		error: function(xhr, status) {
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
			drink_menu: menu_data_list[drink_index]
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

function makeCartMenuTag(menu_data) {
	console.log(menu_data);
	const li = document.createElement("li");
	li.classList.add("menu-list");
	li.innerHTML = `
		<div class="menu-content-box">
            <div id="menu-title" class="menu-title-wrap">
                <label for="menu-title" class="menu-name">
                    <input type="checkbox" name="menu" title="선택" class="menu-checkbox">
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
                <div class="menu-img-box">
                    <img src="${menu_data.menu.menu_images}" alt="">
                </div>
            </div>
            <div class="set-menu-detail">
                <ul>
                    
                </ul>
            </div>
            <div class="quantity">
                <strong>수량</strong>
                <div class="num-set">
                    <button type="button" class="btn-minus"></button>
                    <input type="number" readonly="readonly" value="1">
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
                        <span class="total-price">${menu_data.menu.price.toLocaleString('ko-KR')}</span>
                        <span>원</span>
                    </strong>
                </div>
            </div>
        </div>
	`;
	return li;
}



add_menu_to_card_button.onclick = () => {
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



function addMenuCount(total_price, calc_total_price, menu_count, menu_count_tag, total_price_tag) {
	menu_count_tag.value = ++menu_count;
	calcTotalPrice(total_price, calc_total_price, menu_count, total_price_tag);
}

function reduceMenuCount(total_price, calc_total_price, menu_count, menu_count_tag, total_price_tag) {
	if (menu_count == 1) return;
	menu_count_tag.value = --menu_count;
	calcTotalPrice(total_price, calc_total_price, total_price_tag, menu_count);
}



function calcTotalPrice(total_price, calc_total_price, menu_count, total_price_tag) {
	console.log(total_price);
	total_price_tag.innerText = Number(total_price * menu_count).toLocaleString('ko-KR');
	console.log(total_price.textContent)
	calcLastPrice(total_price_tag, calc_total_price, menu_count);
}

function calcLastPrice(total_price, calc_total_price, menu_count) {
	if (total_price * menu_count > 17000) {
		calc_total_price = total_price * menu_count - 5000;
		calc_total_price_tag.innerText = calc_total_price.toLocaleString('ko-KR');
	} else {
		calc_total_price = total_price * menu_count;
		calc_total_price_tag.innerText = calc_total_price.toLocaleString('ko-KR');
	}
}

