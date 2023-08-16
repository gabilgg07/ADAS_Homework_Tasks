const toggle = document.getElementById("indicator__toggle");

toggle.addEventListener("click", function (e) {
  toggle.classList.toggle("active");
  document.querySelector(".indicator").classList.toggle("active");
  document.querySelector(".header").classList.toggle("my-view");
  document.querySelector(".hero").classList.toggle("my-view");
  document.querySelector(".footer").classList.toggle("my-view");
});
