const carousel = document.querySelector('.carousel');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
let currentIndex = 0;

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

nextButton.addEventListener('click', () => {
  const slides = document.querySelectorAll('.carousel-slide');
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

updateCarousel();
