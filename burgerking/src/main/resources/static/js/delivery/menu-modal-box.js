

function loadMenuDetailData() {
    $.ajax({
        type: "get",
        url: `/api/v1/delivery/menu/detail/${menu_id}`,
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