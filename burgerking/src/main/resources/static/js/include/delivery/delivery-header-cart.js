const order_cart_box = document.querySelector(".order-cart-box");
const count = document.querySelector(".count");
let count_num = document.querySelector(".count>span");
let cart_list = sessionStorage.getItem("cart_list");
let menu_name;

if (cart_list == null) {
    order_cart_box.querySelector("span").innerText = "카트에 담은 상품이 없습니다";
    count.classList.remove("on");
} else {
    cart_list = JSON.parse(cart_list);
    count_num.innerText = cart_list.length;
    count.classList.add("on");
    if (cart_list.length == 1) {
        document.querySelector(".order-cart-box>span").innerText = sessionStorage.getItem("cart_menu_name");
        menu_name = document.querySelector(".order-cart-box>span").innerText;
    } else {
        document.querySelector(".order-cart-box>span").innerText = sessionStorage.getItem("cart_menu_name") + " 외 " + (cart_list.length - 1) + "건";
        menu_name = document.querySelector(".order-cart-box>span").innerText;
    }
}

order_cart_box.onclick = () => {
    location.href = "/delivery/cart";
}