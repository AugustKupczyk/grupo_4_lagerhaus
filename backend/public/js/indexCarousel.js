const carouselContainer = document.querySelector(".carousel-container");
const carouselSlides = document.querySelector(".carousel-slides");
const indicators = document.querySelectorAll(".indicator");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

let slideIndex = 0;

function showSlide(index) {
    carouselSlides.style.transform = `translateX(-${index * 100}%)`;
    indicators.forEach((indicator, i) => {
        indicator.classList.remove("active");
        if (i === index) {
            indicator.classList.add("active");
        }
    });
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % indicators.length;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + indicators.length) % indicators.length;
    showSlide(slideIndex);
}

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        slideIndex = index;
        showSlide(slideIndex);
    });
});

setInterval(nextSlide, 10000);
