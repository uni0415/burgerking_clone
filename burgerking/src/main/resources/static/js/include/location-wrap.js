const page_nav = document.querySelector(".page-nav");
let pageUrl = location.pathname;

if (location.pathname.match("detail")) {
    $.ajax({
        type: "get",
        url: "/api/v1" + pageUrl,
        dataType: "text",
        success: function (data) {
            data = JSON.parse(data);
            setLocationWrap(data);
        }
    })
}

function setLocationWrap(data) {
    let a = document.createElement("a");
    let category_name = document.createElement("span");
    let product_name = document.createElement("span");
    category_name.innerHTML=`${data[0].category_name}`;
    product_name.innerHTML=`${data[0].main_menu_name}`;
    page_nav.appendChild(a);
    a.appendChild(category_name);
    page_nav.appendChild(product_name);
}
