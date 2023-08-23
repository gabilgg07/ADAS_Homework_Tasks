const toggle = document.getElementById("additional__indicator--toggle");

toggle.addEventListener("click", function (e) {
  toggle.classList.toggle("active");
  document.querySelector(".additional__indicator").classList.toggle("active");
  document.querySelector(".header").classList.toggle("my-view");
  document.querySelector(".hero").classList.toggle("my-view");
  document.querySelector(".footer").classList.toggle("my-view");
});
