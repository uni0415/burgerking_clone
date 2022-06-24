const delivery_header_name = document.querySelector(".delivery-header-name");
const header_logout = document.querySelector(".header-logout");
$.ajax({
    type: "post",
    dataType: "text",
    url: "/api/v1/delivery/user-auth",
    success: function (data) {
        data = JSON.parse(data);
        console.log(data);
        setDeliveryHeader(data);
    }
})

function setDeliveryHeader(data) {
    delivery_header_name.innerText = data.name;
}

header_logout.onclick = () => {
	sessionStorage.clear();
}