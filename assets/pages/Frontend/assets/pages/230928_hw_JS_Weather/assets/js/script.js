"use strict";

var MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const lastCities = document.querySelector(".lastCities");
let isF = JSON.parse(localStorage.getItem("isF"));
if (isF === null) {
  isF = true;
}
let searchCities = JSON.parse(localStorage.getItem("searchCities"));
if (searchCities) {
  fetchSearchedCities(searchCities);
  showSearchedCities(searchCities);
} else {
  searchCities = [];
}

let temperature = 0;
const toggle = document.getElementById("temperature__indicator--toggle");

const dashboard__header__city = document.querySelector(
  ".dashboard__header--city span"
);
const dashboard__header__date = document.querySelector(
  ".dashboard__header--date"
);
dashboard__header__date.textContent = getDateNow();

const dashboard__main__temperatureTxt = document.querySelector(
  ".dashboard__main--temperatureTxt"
);
const dashboard__main__weatherIcon = document.querySelector(
  ".dashboard__main--weatherIcon img"
);
const dashboard__footer__humidity__txt = document.querySelector(
  ".dashboard__footer--humidity--txt"
);
const dashboard__footer__wind__txt = document.querySelector(
  ".dashboard__footer--wind--txt"
);

if (isF) {
  toggle.classList.remove("active");
  document.querySelector(".temperature__indicator").classList.remove("active");
} else {
  toggle.classList.add("active");
  document.querySelector(".temperature__indicator").classList.add("active");
}

toggle.addEventListener("click", function (e) {
  toggle.classList.toggle("active");
  document.querySelector(".temperature__indicator").classList.toggle("active");
  isF = !isF;
  dashboard__main__temperatureTxt.textContent =
    changeTempType(isF, temperature) + (isF ? "°F" : "°C");

  showSearchedCities(searchCities);
});

showWeather("Baku");

const formSearch = document.querySelector("form.search");
const search__inp = document.querySelector(".search__inp");
const search__btn = document.querySelector(".search__btn");

formSearch.addEventListener("submit", function (e) {
  e.preventDefault();
});

search__btn.addEventListener("click", function () {
  if (search__inp.value && search__inp.value.length <= 2) {
    alert("En az 3 herfden ibaret olmalidir");
    search__inp.focus();
    return;
  }

  showWeather(search__inp.value);
  search__inp.value = "";
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8d348a62ee12b2bb05648ea0a4a52078`;
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

function getDateNow() {
  const now = new Date();
  const month = now.getMonth();
  const weekDay = now.getDay().toString();
  const day = now.getDate();

  return `${MONTH_SHORT[month]} ${day}, ${WEEKDAYS[weekDay - 1].substring(
    0,
    3
  )}`;
}

function showWeather(city) {
  getWeather(city).then((data) => {
    if (data.cod === 200) {
      const name = data.name;
      temperature = data.main.temp;
      const humidity = data.main.humidity;
      const speed = data.wind.speed;
      const typeWeather = data.weather[0].main;
      const icon = data.weather[0].icon;

      const weatherObj = {
        name,
        temp: temperature,
        humidity,
        speed,
        typeWeather,
        icon,
        date: new Date(),
      };

      if (
        searchCities.find(
          (c) => c.name.toLowerCase() === city.toLowerCase()
        ) === undefined
      ) {
        if (searchCities.length < 5) {
          searchCities.push(weatherObj);
        } else {
          searchCities.shift();
          searchCities.push(weatherObj);
        }
      }
      showSearchedCities(searchCities);
      setViews(weatherObj);
    } else {
      alert(data.message);
    }
  });
}

function fetchSearchedCities(cities) {
  cities.forEach((c) => {
    getWeather(c.name).then((data) => {
      if (data.cod === 200) {
        temperature = data.main.temp;
        const humidity = data.main.humidity;
        const speed = data.wind.speed;
        const typeWeather = data.weather[0].main;
        const icon = data.weather[0].icon;

        c.temp = temperature;
        c.humidity = humidity;
        c.speed = speed;
        c.typeWeather = typeWeather;
        c.icon = icon;
        c.date = new Date();
      } else {
        alert(data.message);
      }
    });
  });
}

function showSearchedCities(cities) {
  if (!cities.length > 0) return;

  lastCities.innerHTML = "";
  cities.forEach((c) => {
    const article = document.createElement("article");
    article.innerHTML = `<h4 class="lastCities__cityName">${c.name}</h4>
    <div class="lastCities__weatherIcon">
      <img src="https://openweathermap.org/img/wn/${c.icon}@2x.png" alt="city ${
      c.name
    } weather" />
    </div>
    <div class="lastCities__temperature">${changeTempType(
      isF,
      c.temp
    )} °</div>`;
    lastCities.append(article);
  });
}

function setViews(weather) {
  dashboard__header__city.textContent = weather.name;
  dashboard__main__temperatureTxt.textContent =
    changeTempType(isF, weather.temp) + (isF ? "°F" : "°C");
  // dashboard__main__weatherIcon.src = `./assets/images/${weather.typeWeather}.png`;
  dashboard__main__weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  dashboard__footer__humidity__txt.textContent = weather.humidity + "%";
  dashboard__footer__wind__txt.textContent = weather.speed + "mph";
}

function changeTempType(isFahrenheit, temp) {
  if (isFahrenheit) {
    return ((temp * 9) / 5 - 459.67).toFixed(2);
  } else {
    return (temp - 273.15).toFixed(2);
  }
}

// add all localStorage

window.onbeforeunload = function () {
  localStorage.setItem("searchCities", JSON.stringify(searchCities));
  localStorage.setItem("isF", JSON.stringify(isF));
};
