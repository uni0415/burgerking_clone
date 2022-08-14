const page_nav = document.querySelector(".page-nav");
const destination = document.querySelector(".destination");
const pin_address = document.querySelector(".pin-address");
let pageUrl = location.pathname;

sessionStorage.getItem("pin_address") != null ? pin_address.innerHTML = sessionStorage.getItem("pin_address") : pin_address.innerText = "배달지를 선택하세요";

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
    destination.style = "display:none";
}else if(location.pathname.match("myking")) {
	page_nav.innerHTML=`
		<a href="/delivery/menu/1" class="location-menu">
            <span>딜리버리</span>
        </a>
        <a href="/delivery/myking" class="location-menu">
            <span>MY킹</span>
        </a>
	`;
} else if(location.pathname.match("membership")) {
	page_nav.innerHTML= `
	<a href="/delivery/menu/1" class="location-menu">
        <span>딜리버리</span>
    </a>
    <a href="/delivery/myking" class="location-menu">
        <span>MY킹</span>
    </a>
    <a href="" class="location-menu">
        <span>멤버십</span>
    </a>
	`
} else if(location.pathname.match("mycoupon")) {
	page_nav.innerHTML = `
	<a href="/delivery/menu/1" class="location-menu">
        <span>딜리버리</span>
    </a>
    <a href="/delivery/myking" class="location-menu">
        <span>MY킹</span>
    </a>
    <a href="" class="location-menu">
        <span>딜리버리쿠폰</span>
    </a>
	`
} else if(location.pathname.match("orderlist")) {
	page_nav.innerHTML = `
	<a href="/delivery/menu/1" class="location-menu">
        <span>딜리버리</span>
    </a>
    <a href="/delivery/myking" class="location-menu">
        <span>MY킹</span>
    </a>
    <a href="" class="location-menu">
        <span>주문내역</span>
    </a>
	`
} else if (location.pathname.match("info-change")) {
	page_nav.innerHTML = `
	<a href="/delivery/menu/1" class="location-menu">
        <span>딜리버리</span>
    </a>
    <a href="/delivery/myking" class="location-menu">
        <span>MY킹</span>
    </a>
    <a href="#" class="location-menu">
        <span>회원 정보변경</span>
    </a>
	`
} else if(location.pathname.match("delivery_search")) {
	page_nav.innerHTML =`
	<a href="/delivery/menu/1" class="location-menu">
        <span>딜리버리</span>
    </a>
    <a href="" class="location-menu">
        <span>배달지검색</span>
    </a>
	`
} else if(location.pathname.match("mydelivery")) {
	page_nav.innerHTML = `
	<a href="/delivery/menu/1" class="location-menu">
	    <span>딜리버리</span>
	</a>
	<a href="/delivery/myking" class="location-menu">
	    <span>MY킹</span>
	</a>
	<a href="" class="location-menu">
	    <span>MY배달지</span>
	</a>
	`
} else if(location.pathname.match("cart")) {
	page_nav.innerHTML=`
	<a href="/delivery/menu/1" class="location-menu">
	    <span>딜리버리</span>
	</a>
	<a href="/delivery/myking" class="location-menu">
	    <span>카트</span>
	</a>
	`
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

