let menu_id = sessionStorage.getItem("menu_id");
let size = sessionStorage.getItem("size");
let side_menu_id = sessionStorage.getItem("side_menu_id");
let drink_menu_id = sessionStorage.getItem("drink_menu_id");
const additional = document.querySelectorAll(".additional");
console.log(menu_id, size, side_menu_id, drink_menu_id);

const menu_title = document.querySelector(".menu-title>strong>span");
const menu_price = document.querySelector(".price");
const menu_image = document.querySelector(".menu-img-box>img");

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
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            additionalList();
            setMenuList(data);
        }
    })

    // $.ajax({
    //     type: "post",
    //     dataType: "text",
    //     data: {
    //         "side_menu_id": side_menu_id
    //     },
    //     url: `/api/v1/delivery/cart/${side_menu_id}`,
    //     success: function (data) {
    //         data = JSON.parse(data);
    //         console.log(data);
    //     }
    // })
}

function setMenuList(menu_data) {
    price = menu_data.price;
    after_price = price.slice(-3);
    before_price = price.slice(undefined, -3);
    menu_title.innerText = menu_data.name;
    menu_price.innerText = before_price + "," + after_price;
    menu_image.src = menu_data.menu_images;
}

function setSideMenuList() {

}
