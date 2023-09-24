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
  "11.jpg",
  "12.JPG",
  "13.JPG",
  "14.JPG",
  "15.JPG",
  "16.jpg",
  "17.jpg",
  "18.jpg",
];

const path = "./assets/images/";
let prev = document.querySelector(".slider__prev");
let next = document.querySelector(".slider__next");
const slider__lent = document.querySelector(".slider__lent");
const withSlider = document.querySelector(".slider__wrapper").clientWidth;

let currentIndex = 0;

creatLentItems(arrImg);

function creatLentItems(arr) {
  arr.forEach((item, index) => {
    createItem(item, index, true);
  });

  createItem(arrImg[arrImg.length - 1], arrImg.length - 1, false);
  // createItem(arrImg[arrImg.length - 2], arrImg.length - 2, false);

  slider__lent.style.left = -withSlider + "px";
}

function createItem(item, index, isAppend) {
  const slider__image = document.createElement("div");
  slider__image.className = "slider__image";
  slider__image.dataset.index = index;
  slider__image.style.width = withSlider + "px";

  const image = document.createElement("img");
  image.src = path + item;
  slider__image.append(image);

  const slider__image__num = document.createElement("span");
  slider__image__num.className = "slider__image--num";
  slider__image__num.textContent = index + 1;
  slider__image.append(slider__image__num);

  isAppend
    ? slider__lent.append(slider__image)
    : slider__lent.prepend(slider__image);
}

prev.addEventListener("click", function () {
  if (currentIndex - 1 < 0) {
    currentIndex = arrImg.length - 1;
  } else {
    currentIndex--;
  }

  slider__lent.lastElementChild.remove();

  slider__lent.style.transition = "all 0s";
  const prevIndex =
    currentIndex - 1 >= 0 ? currentIndex - 1 : arrImg.length - 1;
  createItem(arrImg[prevIndex], prevIndex, false);

  slider__lent.style.left =
    +slider__lent.style.left.slice(0, slider__lent.style.left.length - 2) -
    withSlider +
    "px";

  setTimeout(() => {
    slider__lent.style.transition = "all 0.5s";
    slider__lent.style.left =
      +slider__lent.style.left.slice(0, slider__lent.style.left.length - 2) +
      withSlider +
      "px";
  }, 0);
});

next.addEventListener("click", function () {
  if (currentIndex + 1 > arrImg.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }

  slider__lent.firstElementChild.remove();

  slider__lent.style.transition = "all 0s";
  const nextIndex =
    currentIndex - 1 >= 0 ? currentIndex - 1 : arrImg.length - 1;
  createItem(arrImg[nextIndex], nextIndex, true);

  slider__lent.style.left =
    +slider__lent.style.left.slice(0, slider__lent.style.left.length - 2) +
    withSlider +
    "px";

  setTimeout(() => {
    slider__lent.style.transition = "all 0.5s";
    slider__lent.style.left =
      +slider__lent.style.left.slice(0, slider__lent.style.left.length - 2) -
      withSlider +
      "px";
  }, 0);
});
