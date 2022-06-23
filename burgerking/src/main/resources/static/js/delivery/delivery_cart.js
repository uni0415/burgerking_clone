let menu_id = sessionStorage.getItem("menu_id");
let size = sessionStorage.getItem("size");
let side_menu_id = sessionStorage.getItem("side_menu_id");
let drink_menu_id = sessionStorage.getItem("drink_menu_id");
const additional = document.querySelectorAll(".additional");
console.log(menu_id, size, side_menu_id, drink_menu_id);

const menu_title = document.querySelector(".menu-title>strong>span");
const menu_price = document.querySelector(".price");
const menu_image = document.querySelector(".menu-img-box>img");
const side_menu_list = document.querySelectorAll(".side-menu-list>span");
const add_price = document.querySelectorAll(".add-price");
const total_sum = document.querySelector(".total-price");
const calc_total_sum = document.querySelector(".calc-total-price");
let total_price = 0;
let calc_total_price = 0;
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

// $.ajax({
//     type: "post",
//     dataType: "text",
//     url: "/api/v1/delivery/user",
//     success: function (data) {
//         data = JSON.parse(data);
//         console.log(data);
//         loadOrderList();
//     }
// })
loadOrderList();

function loadOrderList() {
	$.ajax({
		type: "post",
		dataType: "text",
		data: {
			"menu_id": menu_id
		},
		url: `/api/v1/delivery/cart/${menu_id}`,
		success: function(data) {
			data = JSON.parse(data);
			additionalList();
			setMenuList(data);
		}
	})
	$.ajax({
		type: "post",
		dataType: "text",
		data: {
			"side_menu_id": side_menu_id
		},
		url: `/api/v1/delivery/cart/side/${side_menu_id}`,
		success: function(data) {
			data = JSON.parse(data);
			console.log(data);
			setSideMenuList(data);

		}
	})

	$.ajax({
		type: "post",
		dataType: "text",
		data: {
			"drink_menu_id": drink_menu_id
		},
		url: `/api/v1/delivery/cart/drink/${drink_menu_id}`,
		success: function(data) {
			data = JSON.parse(data);
			console.log(data);
			setSideDrinkList(data);
			calcTotalPrice();
		}
	})


}

function setMenuList(menu_data) {
	let price = menu_data.price;
	menu_title.innerText = menu_data.name;
	menu_price.innerText = price.toLocaleString('ko-KR')
	menu_image.src = menu_data.menu_images;
	total_price += Number(price);
}

function setSideMenuList(side_data) {
	let side_add = size == 1 ? side_data.set_add_price : side_data.large_add_price;
	side_menu_list[0].innerText = side_data.name;
	add_price[0].innerText = side_add;
	total_price += Number(side_add);
}

function setSideDrinkList(drink_data) {
	let drink_add = size == 1 ? drink_data.set_add_price : drink_data.large_add_price;
	side_menu_list[1].innerText = drink_data.name;
	add_price[1].innerText = drink_add;
	total_price += Number(drink_add);
}

function calcTotalPrice() {
	total_sum.innerText = total_price.toLocaleString('ko-KR');
	if (total_price > 17000) {
		calc_total_price = total_price - 5000;
		calc_total_sum.innerText = calc_total_price.toLocaleString('ko-KR');
	} else {
		calc_total_price = total_price;
		calc_total_sum.innerText = calc_total_price.toLocaleString('ko-KR');
	}
}
