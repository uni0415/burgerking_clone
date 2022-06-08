const btn_use = document.querySelector(".btn-use");
const active_content_box = document.querySelector(".active-content-box");



btn_use.onclick = () => {
    active_content_box.classList.toggle("open");
}

