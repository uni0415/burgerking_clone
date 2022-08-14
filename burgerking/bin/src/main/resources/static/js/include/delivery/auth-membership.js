const member_name = document.querySelector(".member-name");
const membership_title = document.querySelector(".membership-tit");


if (location.pathname.match("myking")) {
    membership_title.innerText = "MY킹";
} else if (location.pathname.match("membership")) {
    membership_title.innerText = "멤버십";
} else if (location.pathname.match("mycoupon")) {
    membership_title.innerText = "MY킹 > 쿠폰"
} else if (location.pathname.match("orderlist")) {
    membership_title.innerText = "MY킹 > 주문내역";
} else if (location.pathname.match("info-change")) {
    membership_title.innerHTML = "MY킹 > 정보변경";
}


$.ajax({
    type: "post",
    dataType: "text",
    url: "/api/v1/delivery/user-auth",
    success: function (data) {
        data = JSON.parse(data);
        console.log(data);
        console.log(data.name);
        setMembershipInfo(data);
    }
})

function setMembershipInfo(data) {
    member_name.innerText = data.name;
}
