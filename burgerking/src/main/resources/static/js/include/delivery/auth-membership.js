const user_info = document.querySelector(".user-info>strong");


$.ajax({
    type: "post",
    dataType: "text",
    url: "/api/v1/delivery/auth-membership",
    success: function (data) {
        data = JSON.parse(data);
        console.log(data);
    }
})

function setUserInfo(data) {

}