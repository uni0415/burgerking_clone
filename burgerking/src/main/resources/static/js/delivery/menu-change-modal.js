/*const modal_pop_wrap = document.querySelector(".modal-full-pop-wrap");
const modal_close_button = document.querySelectorAll(".modal-close-button");
const side_modal_box = document.querySelector(".side-modal-box");
const choice_button = document.querySelectorAll(".choice");
const menu_change_button = document.querySelectorAll(".additional-list-button");
const body = document.querySelector("body");
const btn_top = document.querySelector(".btn-top");


popSideMenuModal();
popDrinkMenuModal();


function popSideMenuModal() {
	let side_menu_data_list;
	
    menu_change_button[1].onclick = () => {
        modal_pop_wrap.classList.add("on");
        body.style = "overflow: hidden";
        side_modal_box.classList.add("on");
	
	
        $.ajax({
            type: "get",
            dataType: "text",
            url: `/api/v1/delivery/side/${size}`,
            async: false,
            success: function (data) {
                side_menu_data_list = JSON.parse(data);
                loadChangeSideMenu(side_menu_data_list);
            }
        })
    }

    modal_close_button[0].onclick = () => {
        side_modal_box.classList.remove("on");
        body.style = "";
        modal_pop_wrap.classList.remove("on");
    }
    
    choice_button[0].onclick = () => {
		selected_side_menu = side_menu_data_list[side_menu_data_list.findIndex(e => e.id == side_menu_id)];
		side_menu_list[0].innerText = selected_side_menu.name;
		side_menu_price[0].innerText = size == 1 ? selected_side_menu.set_add_price : selected_side_menu.large_add_price;
		console.log(selected_side_menu);
        modal_close_button[0].click();
    }
}

function loadChangeSideMenu(side_menu_data_list) {
    const menu_change = document.querySelector(".menu-change");
    for (let i = 0; i < side_menu_data_list.length; i++) {
		const tag = makeTag(side_menu_data_list[i]);
        menu_change.appendChild(tag);
        tag.onclick = () => {
        	sessionStorage.setItem("side_menu_id", side_menu_data_list[i].id);
			side_menu_id = sessionStorage.getItem("side_menu_id");
		}
    }
}

function makeTag(side_menu_data) {
	const add_price = size == 1 ? side_menu_data.set_add_price : side_menu_data.large_add_price;
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

function popDrinkMenuModal() {
    const drink_modal_box = document.querySelector(".drink-modal-box");

    menu_change_button[2].onclick = () => {
        modal_pop_wrap.classList.add("on");
        body.style = "overflow: hidden";
        drink_modal_box.classList.add("on");

        $.ajax({
            type: "get",
            dateType: "text",
            async: false,
            url: `/api/v1/delivery/drink/${size}`,
            success: function (data) {
                console.log(data);
                loadChangeDrinkMenu(data, size);
            }
        })
    }
    modal_close_button[1].onclick = () => {
        drink_modal_box.classList.remove("on");
        body.style = "";
        modal_pop_wrap.classList.remove("on");
    }
}

function loadChangeDrinkMenu(drink_menu_data, set_size) {
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

function drinkMenuChoice(drink_menu_data) {
    const check_drink = document.querySelectorAll("input[name=drink-option");

    for (let i = 0; i < check_drink.length; i++) {
        if (drink_menu_data[i].id == drink_menu_id) {
            check_drink[i].checked = true;
        }
        choice_button[1].onclick = () => {
            if (check_drink[i].checked == true) {
                drink_menu_id = drink_menu_data[i].id;
                console.log(drink_menu_id);
            }
        }

    }
}*/