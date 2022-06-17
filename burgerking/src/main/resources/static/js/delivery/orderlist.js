const page_tit_tab = document.querySelectorAll(".page-tit-tab>ul>li");


for (let i = 0; i < page_tit_tab.length; i++) {
    page_tit_tab[i].onclick = () => {
        for (let j = 0; j < page_tit_tab.length; j++) {
            if (i == j) {
                page_tit_tab[j].classList.add("on");
            } else {
                page_tit_tab[j].classList.remove("on");
            }
        }
    }
}