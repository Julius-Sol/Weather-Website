import WEATHER_API_KEY from "./apiKey.js";

//DOM objects
const unitTemperature = document.querySelector(".toggle-switch");
const searchIcon = document.querySelector(".search-icon");
const searchElement = document.querySelector(".search-background");
const cityNameTitle = document.querySelector(".city-name");
const closeBtn = document.querySelector(".closebtn");
// let globalCurrentData;

// Query Selectors for current weather
const currentWeatherDate = document.querySelector(".main-weather-date");
const currentWeatehrCondition = document.querySelector(".current-weather-condition");
const currentWeatherTemperature = document.querySelector(".current-temp");
const currentWeatherMax = document.querySelector(".info-max > p");
const currentWeatherMin = document.querySelector(".info-min > p");
const currentWeatherHumidity = document.querySelector(".info-humidity > p");
const currentWeatherWind = document.querySelector(".info-pre > p");

//API URLs
const apiCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?";
const apiUrl = "https://api.openweathermap.org/data/2.5/";
const apiGeocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";

//Function that takes the name of a city and produces that city's Latitude and Longitude
const cityToCordinates = async (city, unit) => {
  try {
    let url = `${apiGeocodingUrl}` + `${city}&limit=2&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    const geoCord = await response.json();
    currentWeather(geoCord, unit);
  } catch (error) {
    console.log(error);
  }
};

// const oneCallAPI = async (cordArray) => {
//   try {
//     const url = `${apiUrl}` + `onecall?lat=${cordArray[0].lat}&lon=${cordArray[0].lon}&exclude=minutely,alerts&units=imperial&appid=${WEATHER_API_KEY}`;
//     const response = await fetch(url);
//     const weatherData = await response.json();
//     console.log(weatherData);
//   } catch (error) {
//     console.log(error);
//   }
// };

// Function to call openweather current API and display data into the current weather html section
const currentWeather = async (cordArray, unit) => {
  try {
    let url = apiCurrentWeather + `lat=${cordArray[0].lat}&lon=${cordArray[0].lon}&units=${unit.unitSystem}&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    const currentData = await response.json();
    // globalCurrentData = currentData;
    console.log(currentData);

    cityNameTitle.textContent = currentData.name;

    const date = getDateTitle(currentData.dt);
    currentWeatherDate.textContent = date;

    currentWeatehrCondition.textContent = currentData.weather[0].main;
    console.log(currentData.weather[0].main);
    currentWeatherTemperature.innerHTML = Math.round(currentData.main.temp) + `<span class="temp-degree">&#176;</span>`;

    currentWeatherMax.innerHTML = Math.round(currentData.main.temp_max) + `<span class="temp-degree">&#176;</span>`;

    currentWeatherMin.innerHTML = Math.round(currentData.main.temp_min) + `<span class="temp-degree">&#176;</span>`;

    currentWeatherHumidity.innerHTML = Math.round(currentData.main.humidity) + `<span class="hum-percent">&#37;</span>`;
    currentWeatherWind.innerHTML = Math.round(currentData.wind.speed) + `<span class="wind-speed">${unit.unitAbbr}</span>`;
  } catch (error) {}
};

//Function that take a unix time and converts it to the format of [Day of the week], [Month(text)] [day]
const getDateTitle = (unixTime) => {
  let date = new Date(unixTime * 1000).toDateString();
  let dateStart = date.substring(0, 3);
  date = dateStart.concat("," + date.substring(3, 10));
  return date;
};

//Function that creates unit object that holds if the toggle switch is set to metric or imperial units
const unitVerify = () => {
  let unit = {
    unitSystem: "metirc",
    unitAbbr: "m/s",
  };
  if (unitTemperature.checked === true) {
    unit.unitSystem = "metric";
    unit.unitAbbr = "m/s";
  } else {
    unit.unitSystem = "imperial";
    unit.unitAbbr = "mph";
  }
  return unit;
};

//Functions to close and open search page
closeBtn.addEventListener("click", () => {
  searchElement.style.display = "none";
});

searchIcon.addEventListener("click", () => {
  searchElement.style.display = "block";
});

const hideSearch = () => {
  searchElement.style.display = "none";
};

//function to get user's city name from text input and call openweather api.

document.querySelector(".form-search").addEventListener("submit", (event) => {
  event.preventDefault();
  let unit = unitVerify();
  cityToCordinates(event.target[0].value, unit);
  hideSearch();
});
