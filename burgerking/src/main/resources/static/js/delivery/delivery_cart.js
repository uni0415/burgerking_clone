let menu_id = sessionStorage.getItem("menu_id");
let size = sessionStorage.getItem("size");
let side_menu_id = sessionStorage.getItem("side_menu_id");
let drink_menu_id = sessionStorage.getItem("drink_menu_id");
console.log(menu_id, size, side_menu_id, drink_menu_id);
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
        success: function (data) {
            data = JSON.parse(data);
        }
    })
}
