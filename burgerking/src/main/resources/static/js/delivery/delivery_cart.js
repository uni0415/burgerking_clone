let menu_id = sessionStorage.getItem("menu_id");
let side_menu_id = sessionStorage.getItem("side_menu_id");
let drink_menu_id = sessionStorage.getItem("drink_menu_id");
let size = sessionStorage.getItem("size");
const additional = document.querySelectorAll(".additional");
console.log(menu_id, size, side_menu_id, drink_menu_id);

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

const add_menu_to_card_button = document.querySelector(".menu-add-button");

let total_price = 0;
let calc_total_price = 0;
let menu_count = 1;

reduce_menu_count_button.onclick = reduceMenuCount;
add_menu_count_button.onclick = addMenuCount;

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
	/*total_sum.innerText = total_price.toLocaleString('ko-KR');*/
	if (total_price * menu_count > 17000) {
		calc_total_price = total_price * menu_count - 5000;
		calc_total_sum.innerText = calc_total_price.toLocaleString('ko-KR');
	} else {
		calc_total_price = total_price * menu_count;
		calc_total_sum.innerText = calc_total_price.toLocaleString('ko-KR');
	}
}

