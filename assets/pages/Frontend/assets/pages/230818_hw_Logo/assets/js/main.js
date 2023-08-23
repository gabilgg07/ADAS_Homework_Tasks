const logo = document.querySelector(".header__logo");

logo.addEventListener("click", function (e) {
  e.preventDefault();
  logo.classList.add("clicked");

  setTimeout(() => {
    logo.classList.remove("clicked");
  }, 2100);
});
