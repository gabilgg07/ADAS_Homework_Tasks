let arrImg = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
];
const changeSliderType = document.querySelector(".change-slider-type");
let isToDownn = false;

let prev;
let next;

checkTypeSlider();

const imgsWrapper = document.querySelector(".images-wrapper");
const width = imgsWrapper.clientWidth;
const duration = 500;

const path = "./assets/images/";

const imgBox = document.createElement("div");
imgBox.classList.add("image");
imgBox.dataset.index = 0;
imgBox.style.left = "0px";

const image = document.createElement("img");
image.src = path + arrImg[0];
imgBox.append(image);

const number = document.createElement("span");
number.textContent = 1;
imgBox.append(number);

imgsWrapper.append(imgBox);

let currentView = imgBox;
let currentIndex = 0;

changeSliderType.addEventListener("click", function () {
  isToDownn = !isToDownn;
  checkTypeSlider();
});

function createNewImage(index, isPrev) {
  const imgBox = document.createElement("div");
  imgBox.classList.add("image");
  imgBox.dataset.index = index;
  imgBox.style.left = `${isPrev ? width : -width}px`;

  const image = document.createElement("img");
  image.src = path + arrImg[index];
  imgBox.append(image);

  const number = document.createElement("span");
  number.textContent = index + 1;
  imgBox.append(number);

  imgsWrapper.append(imgBox);

  return imgBox;
}

function slideAsDirection(hasNext, isPrev) {
  const btn = isPrev ? prev : next;
  hasNext
    ? isPrev
      ? ++currentIndex
      : --currentIndex
    : (currentIndex = isPrev ? 0 : arrImg.length - 1);
  const newView = createNewImage(currentIndex, isPrev);
  setTimeout(() => {
    currentView.style.left = `${isPrev ? -width : +width}px`;
    newView.style.left = "0px";
    btn.disabled = true;
    setTimeout(() => {
      currentView.remove();
      currentView = newView;
      btn.disabled = false;
    }, duration + 10);
  }, 0);
}

function sliderDown() {
  slideAsDirection(currentIndex + 1 < arrImg.length, true);
}

function sliderUp() {
  slideAsDirection(currentIndex - 1 >= 0, false);
}

function checkTypeSlider() {
  console.log(isToDownn);
  if (isToDownn) {
    changeSliderType.textContent = "To Down";
    prev = document.querySelector(".prev");
    next = document.querySelector(".next");

    prev.removeEventListener("click", sliderUp);
    next.removeEventListener("click", sliderDown);

    prev.addEventListener("click", sliderDown);
    next.addEventListener("click", sliderUp);
  } else {
    changeSliderType.textContent = "To Up";
    prev = document.querySelector(".next");
    next = document.querySelector(".prev");

    prev.removeEventListener("click", sliderUp);
    next.removeEventListener("click", sliderDown);

    prev.addEventListener("click", sliderDown);
    next.addEventListener("click", sliderUp);
  }
}
