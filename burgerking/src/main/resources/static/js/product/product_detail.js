const menu_id = Number(location.pathname.replace("/menu/detail/", ""));
const main_name = document.querySelector(".product-name");
const main_summary = document.querySelector(".product-summary");
const main_image = document.querySelector(".product-image > img");

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
		}
	});
}

function setData(detail_list) {
	main_name.innerText = detail_list[0].main_menu_name;
	main_summary.innerText = detail_list[0].main_menu_summary == null ? "" : detail_list[0].main_menu_summary;
	main_image.src = detail_list[0].main_menu_image;
}