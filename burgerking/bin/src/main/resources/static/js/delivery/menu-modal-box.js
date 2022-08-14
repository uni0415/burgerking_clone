const modal_full_pop_wrap = document.querySelector(".modal-full-pop-wrap");
const modal_close_button = document.querySelectorAll(".modal-close-button");
const menu_modal_box = document.querySelector(".menu-modal-box");
const side_modal_box = document.querySelector(".side-modal-box");
const choice_button = document.querySelectorAll(".choice");
const body = document.querySelector("body");
const btn_top = document.querySelector(".btn-top");
/*let menu_id = '';
let size = '';
let side_menu_id = '';
let drink_menu_id = '';*/

const Toast = Swal.mixin({
	toast: true,
	position: 'center',
	showConfirmButton: false,
	timer: 1500,
	timerProgressBar: true,
})

function loadProductDetail(product_menu_detail, menu_data) {
	for (let i = 0; i < product_menu_detail.length; i++) {
		product_menu_detail[i].onclick = () => {
			if (menu_data[i].id < 4) {
				sessionStorage.setItem("menu_id", menu_data[i].id);
				sessionStorage.setItem("size", 0);
				sessionStorage.setItem("side_menu_id", 0);
				sessionStorage.setItem("drink_menu_id", 165);
				sessionStorage.setItem("menu_count", 1);
				sessionStorage.setItem("menu_price", menu_data[i].price);
				sessionStorage.setItem("side_price", 0);
				sessionStorage.setItem("drink_price", 0);
				const cart_list = sessionStorage.getItem("cart_list") != null ? JSON.parse(sessionStorage.getItem("cart_list")) : new Array();
				const menu = {
					"menu_id": sessionStorage.getItem("menu_id"),
					"size": sessionStorage.getItem("size"),
					"side_menu_id": sessionStorage.getItem("side_menu_id"),
					"drink_menu_id": sessionStorage.getItem("drink_menu_id"),
					"menu_count": sessionStorage.getItem("menu_count"),
					"menu_price": sessionStorage.getItem("menu_price"),
					"side_price": sessionStorage.getItem("side_price"),
					"drink_price": sessionStorage.getItem("drink_price")
				};
				cart_list.push(menu);
				sessionStorage.setItem("cart_list", JSON.stringify(cart_list));
				location.href = "/delivery/cart";
			}
			modal_full_pop_wrap.classList.add("on");
			body.style = "overflow: hidden";
			menu_modal_box.classList.add("on");
			$.ajax({
				type: "get",
				dataType: "text",
				url: `/api/v1/delivery/menu/detail/${menu_data[i].menu_id}`,
				success: function(data) {
					data = JSON.parse(data);
					setDeliveryModalMenu(data);
				}
			})
		}
	}

	modal_close_button[0].onclick = () => {
		modal_full_pop_wrap.classList.remove("on");
		body.style = "";
		menu_modal_box.classList.remove("on");
	}
}

function setDeliveryModalMenu(submenu_data) {
	const product_title = document.querySelector(".product-title");
	const product_subtext = document.querySelector(".product-subtext>span");
	const product_image = document.querySelector(".product-image-box>img");
	const menu_sub_list = document.querySelector(".menu-sub-list");
	let str = ``;

	product_title.innerText = submenu_data[0].main_menu_name;
	product_image.src = submenu_data[0].main_menu_image;
	if (submenu_data[0].main_menu_summary.length > 50) {
		product_subtext.innerText = '';
	} else {
		product_subtext.innerText = submenu_data[0].main_menu_summary;
	}
	for (let i = 0; i < submenu_data.length; i++) {
		let price = submenu_data[i].price;
		price = price.toLocaleString('ko-KR');
		str += `
        <li class="sub-menu-list">
            <div class="menu-sub-image-box">
                <img src=${submenu_data[i].menu_images} alt="">
            </div>
            <div class="menu-sub-list-content">
                <p class="submenu-title">
                    <strong>${submenu_data[i].name}</strong>
                </p>
                <p class="set">
                    <span>${submenu_data[i].summary}</span>
                </p>
                <p class="submenu-price">
                    <strong><span>₩${price}</span></strong>
                </p>
            </div>
        </li>
        `
	}
	menu_sub_list.innerHTML = str;
	const sub_menu_list = document.querySelectorAll(".sub-menu-list");
	popSideMenuModal(sub_menu_list, submenu_data);
}

function popSideMenuModal(sub_menu_list, submenu_data) {
	for (let i = 0; i < sub_menu_list.length; i++) {
		sub_menu_list[i].onclick = () => {
			menu_id = submenu_data[i].id;
			menu_modal_box.classList.remove("on");
			side_modal_box.classList.add("on");
			let set_size = 0;
			i == 0 ? set_size = 2 : i == 1 ? set_size = 1 : set_size = 0;
			size = set_size;
			if (i == 2) {
				sessionStorage.setItem("menu_id", submenu_data[i].id);
				sessionStorage.setItem("size", 0);
				sessionStorage.setItem("side_menu_id", 0);
				sessionStorage.setItem("drink_menu_id", 0);
				sessionStorage.setItem("menu_count", 1);
				sessionStorage.setItem("menu_price", submenu_data[i].price);
				sessionStorage.setItem("side_price", 0);
				sessionStorage.setItem("drink_price", 0);
				const cart_list = sessionStorage.getItem("cart_list") != null ? JSON.parse(sessionStorage.getItem("cart_list")) : new Array();
				const menu = {
					"menu_id": sessionStorage.getItem("menu_id"),
					"size": sessionStorage.getItem("size"),
					"side_menu_id": sessionStorage.getItem("side_menu_id"),
					"drink_menu_id": sessionStorage.getItem("drink_menu_id"),
					"menu_count": sessionStorage.getItem("menu_count"),
					"menu_price": sessionStorage.getItem("menu_price"),
					"side_price": sessionStorage.getItem("side_price"),
					"drink_price": sessionStorage.getItem("drink_price")
				};
				cart_list.push(menu);
				sessionStorage.setItem("cart_list", JSON.stringify(cart_list));
				location.href = "/delivery/cart";
			}

			$.ajax({
				type: "get",
				dataType: "text",
				url: `/api/v1/delivery/side/${set_size}`,
				success: function(data) {
					data = JSON.parse(data);
					loadChangeSideMenu(data, set_size, submenu_data[i].price);
				}
			})
		}
	}

	modal_close_button[1].onclick = () => {
		side_modal_box.classList.remove("on");
		body.style = "";
		modal_full_pop_wrap.classList.remove("on");
	}
}

function loadChangeSideMenu(side_menu_data, set_size, menu_price) {

	let str = ``;
	let add_price = 0;
	for (let i = 0; i < side_menu_data.length; i++) {
		set_size == 1 ? add_price = side_menu_data[i].set_add_price : add_price = side_menu_data[i].large_add_price;
		str += `
        <li>
            <div class="menu-change-image-box">
                <img src="${side_menu_data[i].menu_images}" alt="">
            </div>
            <div class="menu-change-content-box">
                <p class="menu-change-title">
                    <span>${side_menu_data[i].name} 교환</span>
                </p>
                <p class="menu-change-price">
                    <span>+${add_price}원</span>
                </p>
            </div>
            <label class="list-check">
                <input type="radio" name="side-option" value="${i}">
                <span></span>
            </label>
        </li>
        `
	}
	const menu_change = document.querySelector(".menu-change");
	menu_change.innerHTML = str;
	sideMenuChoice(side_menu_data, set_size, menu_price);
}

function sideMenuChoice(side_menu_data, set_size, menu_price) {
	const drink_modal_box = document.querySelector(".drink-modal-box");
	const side_check = document.querySelectorAll("input[name=side-option]");
	console.log(side_menu_data);
	choice_button[0].onclick = () => {
		let checkFlag = null;
		let side_price;
		for (let i = 0; i < side_check.length; i++) {
			if (side_check[i].checked == true) {
				checkFlag = side_check[i].value;
				side_menu_id = side_menu_data[i].id;
				set_size == 1 ? side_price = side_menu_data[i].set_add_price : side_price = side_menu_data[i].large_add_price;
			}
		}
		if (checkFlag == null) {
			Toast.fire({
				icon: "error",
				title: "사이드를 선택해주세요"
			})
			return false;
		} else {
			side_modal_box.classList.remove("on");
			drink_modal_box.classList.add("on");
			$.ajax({
				type: "get",
				dateType: "text",
				async: false,
				url: `/api/v1/delivery/drink/${set_size}`,
				success: function(data) {
					console.log(data);
					loadChangeDrinkMenu(data, set_size, menu_price, side_price);
				}
			})
		}

	}

	modal_close_button[2].onclick = () => {
		drink_modal_box.classList.remove("on");
		body.style = "";
		modal_full_pop_wrap.classList.remove("on");
	}
}

function loadChangeDrinkMenu(drink_menu_data, set_size, menu_price, side_price) {
	let str = ``;
	for (let i = 0; i < drink_menu_data.length; i++) {
		set_size == 1 ? add_price = drink_menu_data[i].set_add_price : add_price = drink_menu_data[i].large_add_price;
		str += `
        <li>
            <div class="drink-change-image-box">
                <img src="${drink_menu_data[i].menu_images}" alt="">
            </div>
            <div class="drink-change-content-box">
                <p class="drink-change-title">
                    <span>${drink_menu_data[i].name} 교환</span>
                </p>
                <p class="drink-change-price">
                    <span>+${add_price}원</span>
                </p>
            </div>
            <label class="list-check">
                <input type="radio" name="drink-option" value="${i}">
                <span></span>
            </label>
        </li>
        `
	}
	const drink_change = document.querySelector(".drink-change");
	drink_change.innerHTML = str;
	drinkMenuChoice(drink_menu_data, menu_price, set_size, side_price);
}

function drinkMenuChoice(drink_menu_data, menu_price, set_size, side_price) {
	const check_drink = document.querySelectorAll("input[name=drink-option");
	choice_button[1].onclick = () => {
		let checkFlag = null;
		let drink_price;
		for (let i = 0; i < check_drink.length; i++) {
			if (check_drink[i].checked == true) {
				checkFlag = check_drink[i].value;
				drink_menu_id = drink_menu_data[i].id;
				set_size == 1 ? drink_price = drink_menu_data[i].set_add_price : drink_price = drink_menu_data[i].large_add_price;
			}
		}
		if (checkFlag == null) {
			Toast.fire({
				icon: "error",
				title: "음료를 선택해주세요"
			})
			return false;
		}
		sessionStorage.setItem("menu_id", menu_id);
		sessionStorage.setItem("size", size);
		sessionStorage.setItem("side_menu_id", side_menu_id);
		sessionStorage.setItem("drink_menu_id", drink_menu_id);
		sessionStorage.setItem("menu_count", 1);
		sessionStorage.setItem("menu_price", menu_price);
		sessionStorage.setItem("side_price", side_price);
		sessionStorage.setItem("drink_price", drink_price);
		const cart_list = sessionStorage.getItem("cart_list") != null ? JSON.parse(sessionStorage.getItem("cart_list")) : new Array();
		const menu = {
			"menu_id": sessionStorage.getItem("menu_id"),
			"size": sessionStorage.getItem("size"),
			"side_menu_id": sessionStorage.getItem("side_menu_id"),
			"drink_menu_id": sessionStorage.getItem("drink_menu_id"),
			"menu_count": sessionStorage.getItem("menu_count"),
			"menu_price": sessionStorage.getItem("menu_price"),
			"side_price": sessionStorage.getItem("side_price"),
			"drink_price": sessionStorage.getItem("drink_price")
		};
		cart_list.push(menu);
		sessionStorage.setItem("cart_list", JSON.stringify(cart_list));
		location.href = "/delivery/cart";
	}
}