const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slidesSize = slides[0].getBoundingClientRect();
const slidesWidth = slidesSize.width;

// arrange the slides next to one another
// slides[0].style.left = slidesWidth * 0 + 'px';
// slides[1].style.left = slidesWidth * 1 + 'px';
// slides[2].style.left = slidesWidth * 2 + 'px';
// slides[3].style.left = slidesWidth * 3 + 'px';

const setSlidesPosition = (slide, index) => {
  slide.style.left = slidesWidth * index + 'px';
}
slides.forEach(setSlidesPosition);

/*nextButton.addEventListener('click', e =>{
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const amountToMove = nextSlide.style.left;
  // move to the next slide
  track.style.transform = 'translateX(-' + amountToMove + ')';
  currentSlide.classList.remove('current-slide');
  nextSlide.classList.add('current-slide');
});*/

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

const updateDot = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

const hideArrows = (slides, prevButton, nextButton, targetIndex) =>{
  if(targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if(targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

// when I click right, move slides to the right
nextButton.addEventListener('click', e =>{
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDot(currentDot, nextDot);
  hideArrows(slides, prevButton, nextButton, nextIndex);
});

// when I click left, mov slides to the left
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDot(currentDot, prevDot);
  hideArrows(slides, prevButton, nextButton, prevIndex);
});

// when I click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {

  const targetDot = e.target.closest('button');

  if(!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDot(currentDot, targetDot);
  hideArrows(slides, prevButton, nextButton, targetIndex);
})


