const nav_membership = document.querySelectorAll(".nav-membership>ul>li");
const benefits_box = document.querySelectorAll(".benefits");


for (let i = 0; i < nav_membership.length; i++) {
    nav_membership[i].onclick = () => {
        for (let j = 0; j < nav_membership.length; j++) {
            if (i == j) {
                nav_membership[j].classList.add("on");
                benefits_box[j].classList.add("on");
            } else {
                nav_membership[j].classList.remove("on");
                benefits_box[j].classList.remove("on");
            }
        }
    }
}

