const menu_id = Number(location.pathname.replace("/menu/detail/", ""));
const main_name = document.querySelector(".product-name");
const main_summary = document.querySelector(".product-summary");
const main_image = document.querySelector(".product-image > img");
const detail_product_list = document.querySelector(".detail-product-list");
const title_box = document.querySelector(".title-box>h3");
const othermenu_list = document.querySelector(".othermenu-list");
const back_button = document.querySelector(".back-button");

loadMenuDetailData();



function loadMenuDetailData() {
	$.ajax({
		type: "get",
		url: `/api/v1/menu/detail/${menu_id}`,
		dataType: "text",
		success: function (data) {
			data = JSON.parse(data);
			console.log(data);
			setData(data);
			loadDetailMenuList(data);
			loadOtherMenuList(data);
		}
	});
}

function setData(detail_list) {
	main_name.innerText = detail_list[0].main_menu_name;
	main_summary.innerText = detail_list[0].main_menu_summary == null ? "" : detail_list[0].main_menu_summary;
	main_image.src = detail_list[0].main_menu_image;
}

function loadDetailMenuList(detail_list) {
	let str = ``;
	for (let i = 0; i < detail_list.length; i++) {
		detail_list[i].summary = detail_list[i].summary == null ? "" : detail_list[i].summary;
		str += `
		<li>
			<div class="detail-product-img">
				<img src="${detail_list[i].menu_images}" alt="">
			</div>
			<div class="detail-summary-box">
				<p class="detail-product-title">
					<strong>
						${detail_list[i].name}
					</strong>
				</p>
				<p class="detail-product-summary">
					<span>${detail_list[i].summary}</span>
				</p>
			</div>
		</li>
		`
	}
	detail_product_list.innerHTML = str;
}

function loadOtherMenuList(detail_list) {
	title_box.innerText = detail_list[0].category_name + "의 다른 메뉴";

	$.ajax({
		type: "get",
		url: "/api/v1/menu/" + detail_list[0].category_id,
		dataType: "text",
		success: function (data) {
			data = JSON.parse(data);
			setOtherMenuList(data);
			back_button.onclick = (e) => {
				e.preventDefault();
				location.href = `/menu/${data[0].category_id}`;
			}
		}
	})

}

function setOtherMenuList(category_menu_list) {
	let str = ``;
	for (let i = 0; i < category_menu_list.length; i++) {
		str += `
		<li>
			<div class="othermenu-img">
				<img src="${category_menu_list[i].menu_image}" alt="">
			</div>
			<p class="othermenu-name-box">
				<span>${category_menu_list[i].name}</span>
			</p>
		</li>
		`
	}
	othermenu_list.innerHTML = str;
	const othermenu_items = othermenu_list.querySelectorAll("li");
	loadOtherMenuDetailPage(othermenu_items, category_menu_list);

}

function loadOtherMenuDetailPage(othermenu_items, category_menu_list) {
	for (let i = 0; i < othermenu_items.length; i++) {
		othermenu_items[i].onclick = () => {
			location.href = `/menu/detail/${category_menu_list[i].id}`;
		}
	}
}