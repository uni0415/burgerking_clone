$.ajax({
    type: "post",
    dataType: "text",
    url: "/api/v1/delivery/auth-membership",
    success: function (data) {
        data = JSON.parse(data);
        console.log(data);
    }
})