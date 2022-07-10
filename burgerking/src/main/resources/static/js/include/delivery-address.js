const destination  = document.querySelector(".destination");
const pin_address = document.querySelector(".address+span");
sessionStorage.getItem("pin_address") != null ? pin_address.innerHTML = sessionStorage.getItem("pin_address") : pin_address.innerText = "배달지를 선택하세요";
