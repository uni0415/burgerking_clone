const modal_pop_wrap = document.querySelector(".modal-full-pop-wrap");
const modal_close_button = document.querySelectorAll(".modal-close-button");
const side_modal_box = document.querySelector(".side-modal-box");
const drink_modal_box = document.querySelector(".drink-modal-box");
const choice_button = document.querySelectorAll(".choice");

const body = document.querySelector("body");
const btn_top = document.querySelector(".btn-top");



function removeAllChild(tag) {
	while (tag.hasChildNodes()) {
		tag.removeChild(tag.firstChild);
	}
}

function popSideMenuModal(side_change_button, menu, cart_menu_tag, index, total_price_tag) {
	let side_menu_data_list;
	side_change_button.onclick = () => {
		modal_pop_wrap.classList.add("on");
		body.style = "overflow: hidden";
		side_modal_box.classList.add("on");

		$.ajax({
			type: "get",
			dataType: "json",
			url: `/api/v1/delivery/side/${menu.set_size}`,
			async: false,
			success: function(data) {
				side_menu_data_list = data;
				loadChangeSideMenu(side_menu_data_list, menu, index);
				sideMenuChoice(side_menu_data_list, menu, cart_menu_tag, index, total_price_tag);
			}
		});
	}

	modal_close_button[0].onclick = () => {
		side_modal_box.classList.remove("on");
		body.style = "";
		modal_pop_wrap.classList.remove("on");
	}
}

function sideMenuChoice(side_menu_data_list, menu, cart_menu_tag, index, total_price_tag) {
	const side_menu_name = cart_menu_tag.querySelector(".side-menu-name");
	const side_add_price = cart_menu_tag.querySelector(".side-add-price");
	choice_button[0].onclick = () => {
		selected_side_menu = side_menu_data_list[side_menu_data_list.findIndex(e => e.id == side_menu_id)];
		side_menu_name.innerText = selected_side_menu.name;
		side_add_price.innerText = menu.set_size == 1 ? selected_side_menu.set_add_price : selected_side_menu.large_add_price;

		modal_close_button[0].click();

		let adjust_side_price = (menu.set_size == 1 ? selected_side_menu.set_add_price : selected_side_menu.large_add_price);
		cart_list = JSON.parse(sessionStorage.getItem("cart_list"));
		sessionStorage.setItem("side_price", adjust_side_price);
		side_price = sessionStorage.getItem("side_price");
		for (let i = 0; i < cart_list.length; i++) {
			cart_list[index].side_price = side_price;
			sessionStorage.setItem("cart_list", JSON.stringify(cart_list));
		}
		calcTotalPrice(total_price_tag, index);
	}
}

function loadChangeSideMenu(side_menu_data_list, menu_data_list, index) {

	cart_list = JSON.parse(sessionStorage.getItem("cart_list"));
	const menu_change = document.querySelector(".menu-change");
	removeAllChild(menu_change);
	for (let i = 0; i < side_menu_data_list.length; i++) {
		const tag = makeSideTag(side_menu_data_list[i], menu_data_list);
		menu_change.appendChild(tag);
		tag.onclick = () => {
			sessionStorage.setItem("side_menu_id", side_menu_data_list[i].id);
			side_menu_id = sessionStorage.getItem("side_menu_id");
			for (let j = 0; j < cart_list.length; j++) {
				cart_list[index].side_menu_id = side_menu_id;
				sessionStorage.setItem("cart_list", JSON.stringify(cart_list));
			}
		}
		menu_change.appendChild(tag);
	}

}

function makeSideTag(side_menu_data, menu_data_list) {
	const side_add_price = menu_data_list.set_size == 1 ? side_menu_data.set_add_price : side_menu_data.large_add_price;
	const li = document.createElement("li");
	li.className = "";
	li.innerHTML = `
        <li>
            <div class="menu-change-image-box">
                <img src="${side_menu_data.menu_images}" alt="">
            </div>
            <div class="menu-change-content-box">
                <p class="menu-change-title">
                    <span>${side_menu_data.name} 교환</span>
                </p>
                <p class="menu-change-price">
                    <span>+${side_add_price}원</span>
                </p>
            </div>
            <label class="list-check">
                <input type="radio" name="side-option" ${side_menu_data.id == side_menu_id ? 'checked' : ''}>
                <span></span>
            </label>
        </li>
    `;
	return li;
}



function popDrinkMenuModal(drink_change_button, menu, cart_menu_tag, index, total_price_tag) {
	let drink_menu_data_list;

	drink_change_button.onclick = () => {
		modal_pop_wrap.classList.add("on");
		body.style = "overflow: hidden";
		drink_modal_box.classList.add("on");


		$.ajax({
			type: "get",
			dateType: "text",
			async: false,
			url: `/api/v1/delivery/drink/${menu.set_size}`,
			success: function(data) {
				drink_menu_data_list = JSON.stringify(data);
				drink_menu_data_list = JSON.parse(drink_menu_data_list);
				loadChangeDrinkMenu(drink_menu_data_list, menu, index);
				drinkMenuChoice(drink_menu_data_list, menu, cart_menu_tag, index, total_price_tag);
			}
		})
	}
	modal_close_button[1].onclick = () => {
		drink_modal_box.classList.remove("on");
		body.style = "";
		modal_pop_wrap.classList.remove("on");
	}
}


function loadChangeDrinkMenu(drink_menu_data_list, menu, index) {
	cart_list = JSON.parse(sessionStorage.getItem("cart_list"));
	const drink_change = document.querySelector(".drink-change");
	removeAllChild(drink_change);
	for (let i = 0; i < drink_menu_data_list.length; i++) {
		const tag = makeDrinkTag(drink_menu_data_list[i], menu);
		drink_change.appendChild(tag);
		tag.onclick = () => {
			sessionStorage.setItem("drink_menu_id", drink_menu_data_list[i].id);
			drink_menu_id = sessionStorage.getItem("drink_menu_id");
			for (let j = 0; j < cart_list.length; j++) {
				cart_list[index].drink_menu_id = drink_menu_id;
				sessionStorage.setItem("cart_list", JSON.stringify(cart_list));
			}
		}
		drink_change.appendChild(tag);

	}
}


function makeDrinkTag(drink_menu_data, menu) {
	const drink_add_price = menu.set_size == 1 ? drink_menu_data.set_add_price : drink_menu_data.large_add_price;
	const li = document.createElement("li");
	li.className = "";
	li.innerHTML = `
	<li>
        <div class="drink-change-image-box">
            <img src="${drink_menu_data.menu_images}" alt="">
        </div>
        <div class="drink-change-content-box">
            <p class="drink-change-title">
                <span>${drink_menu_data.name} 교환</span>
            </p>
            <p class="drink-change-price">
                <span>+${drink_add_price}원</span>
            </p>
        </div>
        <label class="list-check">
            <input type="radio" name="drink-option" ${drink_menu_data.id == drink_menu_id ? 'checked' : ''}>
            <span></span>
        </label>
    </li>
        `
	return li;
}



function drinkMenuChoice(drink_menu_data_list, menu, cart_menu_tag, index, total_price_tag) {
	const drink_menu_name = cart_menu_tag.querySelector(".drink-menu-name");
	const drink_add_price = cart_menu_tag.querySelector(".drink-add-price");
	choice_button[1].onclick = () => {
		selected_drink_menu = drink_menu_data_list[drink_menu_data_list.findIndex(e => e.id == drink_menu_id)];
		drink_menu_name.innerText = selected_drink_menu.name;
		drink_add_price.innerText = menu.set_size == 1 ? selected_drink_menu.set_add_price : selected_drink_menu.large_add_price;
		modal_close_button[1].click();

		let adjust_drink_price = (menu.set_size == 1 ? selected_drink_menu.set_add_price : selected_drink_menu.large_add_price);
		cart_list = JSON.parse(sessionStorage.getItem("cart_list"));
		sessionStorage.setItem("drink_price", adjust_drink_price);
		drink_price = sessionStorage.getItem("drink_price");
		for (let i = 0; i < cart_list.length; i++) {
			cart_list[index].drink_price = drink_price;
			sessionStorage.setItem("cart_list", JSON.stringify(cart_list));
		}
		sessionStorage.setItem("cart_list", JSON.stringify(cart_list));
		calcTotalPrice(total_price_tag, index);
	}
}
