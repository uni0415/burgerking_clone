const swiper_container = document.querySelector(".swiper-container");
const swiper_wrapper = document.querySelector(".swiper-container");
const swiper_slide = document.querySelectorAll(".swiper-slide");

let imageCount = 0;
let currentIndex = 0;
let currentPosition = 0;

window.onload = () => {
    imageCount = swiper_wrapper.children.length - 1;
    setInterval(autoSlide, 4000);
}

function showSlide(event, swiper_slide) {
    for (let i = 0; i < swiper_slide.length; i++) {
        if (swiper_slide[i] == event.target) {
            currentIndex = i;
            break;
        }
    }
}

function activeSlide() {
    for (let i = 0; i < swiper_slide.length; i++) {
        if (i == currentIndex) swiper_slide[i].classList.add("active");
        else swiper_slide[i].classList.remove("active");
    }
}

function moveSlide() {
    swiper_wrapper.querySelector("ul").style = `transform: translate3d(${currentPosition}px, 0, 0); transition: all 0.5s ease 0s`;
    activeSlide();
}

function calcImagePosition() {
    currentPosition = currentIndex * (-1440);
}

function imageIndexUp() {
    currentIndex++;
    if (currentIndex > imageCount - 1) currentIndex = 0;
}

function imageIndexDown() {
    currentIndex--;
    if (currentIndex < 0) currentIndex = imageCount - 1;
}

function autoSlide() {
    imageIndexUp();
    calcImagePosition();
    moveSlide();
}

