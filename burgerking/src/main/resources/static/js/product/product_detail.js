const menu_id = Number(location.pathname.replace("/menu/detail/", ""));
const main_name = document.querySelector(".product-name");
const main_summary = document.querySelector(".product-summary");
const main_image = document.querySelector(".product-image > img");
const detail_product_list = document.querySelector(".detail-product-list");
const title_box = document.querySelector(".title-box>h3");

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
	console.log(detail_list.length);
	let str = ``;
	for (let i = 0; i < detail_list.length; i++) {
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



	let str = ``;
	for (let i = 0; i < detail_list.length; i++) {

	}
}