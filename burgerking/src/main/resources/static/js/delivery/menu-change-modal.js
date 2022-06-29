const modal_pop_wrap = document.querySelector(".modal-full-pop-wrap");
const modal_close_button = document.querySelectorAll(".modal-close-button");
const side_modal_box = document.querySelector(".side-modal-box");
const drink_modal_box = document.querySelector(".drink-modal-box");
const choice_button = document.querySelectorAll(".choice");

const body = document.querySelector("body");
const btn_top = document.querySelector(".btn-top");





function popSideMenuModal(side_change_button, menu_data_list, cart_menu_tag, index) {
	let side_menu_data_list;
	side_change_button.onclick = () => {
		modal_pop_wrap.classList.add("on");
		body.style = "overflow: hidden";
		side_modal_box.classList.add("on");
		console.log("side: ");
		console.log(menu_data_list);

		$.ajax({
			type: "get",
			dataType: "text",
			url: `/api/v1/delivery/side/${menu_data_list.set_size}`,
			async: false,
			success: function(data) {
				side_menu_data_list = JSON.parse(data);
				loadChangeSideMenu(side_menu_data_list, menu_data_list, index);
				sideMenuChoice(side_menu_data_list, menu_data_list, cart_menu_tag)
				console.log(sessionStorage.getItem("side_menu_id"));
			}
		})
	}

	modal_close_button[0].onclick = () => {
		side_modal_box.classList.remove("on");
		body.style = "";
		modal_pop_wrap.classList.remove("on");
	}
}

function sideMenuChoice(side_menu_data_list, menu_data_list, cart_menu_tag) {
	const side_menu_name = cart_menu_tag.querySelector(".side-menu-name");
	const add_price = cart_menu_tag.querySelector(".add-price");
	choice_button[0].onclick = () => {
		selected_side_menu = side_menu_data_list[side_menu_data_list.findIndex(e => e.id == side_menu_id)];
		side_menu_name.innerText = selected_side_menu.name;
		add_price.innerText = menu_data_list.set_size == 1 ? selected_side_menu.set_add_price : selected_side_menu.large_add_price;
		modal_close_button[0].click();
	}
}

function loadChangeSideMenu(side_menu_data_list, menu_data_list, index) {

	cart_list = JSON.parse(sessionStorage.getItem("cart_list"));
	const menu_change = document.querySelector(".menu-change");
	for (let i = 0; i < side_menu_data_list.length; i++) {
		const tag = makeSideTag(side_menu_data_list[i], menu_data_list);
		menu_change.appendChild(tag);
		tag.onclick = () => {
			sessionStorage.setItem("side_menu_id", side_menu_data_list[i].id);
			side_menu_id = sessionStorage.getItem("side_menu_id");
			for (let i = 0; i < cart_list.length; i++) {
				cart_list[index].side_menu_id = side_menu_id;
				sessionStorage.setItem("cart_list", JSON.stringify(cart_list));
			}
			console.log(cart_list);

		}
		menu_change.appendChild(tag);
	}

}

function makeSideTag(side_menu_data, menu_data_list) {
	const add_price = menu_data_list.set_size == 1 ? side_menu_data.set_add_price : side_menu_data.large_add_price;
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
                    <span>+${add_price}원</span>
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



function popDrinkMenuModal(drink_change_button, menu_data_list, cart_menu_tag, index) {
	let drink_menu_data_list;

	drink_change_button.onclick = () => {
		modal_pop_wrap.classList.add("on");
		body.style = "overflow: hidden";
		drink_modal_box.classList.add("on");

		$.ajax({
			type: "get",
			dataType: "text",
			url: `/api/v1/delivery/side/${menu_data_list.set_size}`,
			async: false,
			success: function(data) {
				side_menu_data_list = JSON.parse(data);
				loadChangeSideMenu(side_menu_data_list, menu_data_list, index);
				sideMenuChoice(side_menu_data_list, menu_data_list, cart_menu_tag)
				console.log(sessionStorage.getItem("side_menu_id"));
			}
		})


		$.ajax({
			type: "get",
			dateType: "text",
			async: false,
			url: `/api/v1/delivery/drink/${menu_data_list.size}`,
			success: function(data) {
				drink_menu_data_list = JSON.parse(data);
				loadChangeDrinkMenu(drink_menu_data_list, menu_data_list, index);
			}
		})
	}
	modal_close_button[1].onclick = () => {
		drink_modal_box.classList.remove("on");
		body.style = "";
		modal_pop_wrap.classList.remove("on");
	}
}

function loadChangeDrinkMenu(drink_menu_data_list, menu_data_list, index) {
	let str = ``;
	let add_price = 0;
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
	drinkMenuChoice(drink_menu_data);
}

function drinkMenuChoice(drink_menu_data_list, menu_data_list, cart_menu_tag) {
	const drink_menu_name = cart_menu_tag.querySelector(".drink-menu-name");
	const add_price = cart_menu_tag.querySelector(".add-price");
	choice_button[1].onclick = () => {
		selected_drink_menu = drink_menu_data_list[drink_menu_data_list.findIndex(e => e.id == drink_menu_id)];
		drink_menu_name.innerText = selected_drink_menu.name;
		add_price.innerText = menu_data_list.set_size == 1 ? selected_drink_menu.set_add_price : selected_drink_menu.large_add_price;
		modal_close_button[1].click();
	}
}