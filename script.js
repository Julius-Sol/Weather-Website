import WEATHER_API_KEY from "./apiKey.js";
import weeklyCreator from "./weeklyWeather.js";
import hourlyCreator from "./hourlyWeather.js";

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
const currentWeatherImage = document.querySelector(".current-weather-icon");

//API URLs
const apiCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?";
const apiOneCallUrl = "https://api.openweathermap.org/data/2.5/";
const apiGeocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";

export const imagePath = (main, description) => {
  let imageSource = "images/Fog.png";
  if (main == "Thunderstorm") {
    imageSource = "images/Thunderstorm.png";
  }
  if (main == "Rain" || main == "Drizzle") {
    imageSource = "images/Rain.png";
  }
  if (main == "Snow") {
    imageSource = "images/Snow.png";
  }
  if (main == "Clear") {
    imageSource = "images/Sunny.png";
  }
  if (main == "Clouds") {
    if (description == "few clouds") {
      imageSource = "images/Partly Cloudy.png";
    }
    imageSource = "images/Cloudy.png";
  }
  return imageSource;
};

//Function that takes the name of a city and produces that city's Latitude and Longitude
const cityToCordinates = async (city, unit) => {
  try {
    let url = `${apiGeocodingUrl}` + `${city}&limit=2&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    const geoCord = await response.json();
    let lat = geoCord[0].lat;
    let lon = geoCord[0].lon;
    currentWeather(lat, lon, unit);
    oneCallAPI(lat, lon, unit);
    hideSearch();
  } catch (error) {
    alert("Please Enter a valid City");
  }
};

const oneCallAPI = async (Latitude, Longitude, unit) => {
  try {
    const url = `${apiOneCallUrl}` + `onecall?lat=${Latitude}&lon=${Longitude}&exclude=minutely,alerts,current&units=${unit.unitSystem}&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    const weatherData = await response.json();
    console.log(weatherData);
    weeklyCreator(weatherData.daily);
    hourlyCreator(weatherData.hourly);
  } catch (error) {
    console.log(error);
  }
};

// Function to call openweather current API and display data into the current weather html section
const currentWeather = async (Latitude, Longitude, unit) => {
  try {
    let url = apiCurrentWeather + `lat=${Latitude}&lon=${Longitude}&units=${unit.unitSystem}&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    const currentData = await response.json();
    // globalCurrentData = currentData;
    console.log(currentData);

    cityNameTitle.textContent = currentData.name;

    const date = getDateTitle(currentData.dt);
    currentWeatherDate.textContent = date;

    const imageLocation = imagePath(currentData.weather[0].main, currentData.weather[0].description);
    currentWeatherImage.src = imageLocation;

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
export const getDateTitle = (unixTime) => {
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

const displaySearch = () => {
  searchElement.style.display = "block";
};

const hideSearch = () => {
  searchElement.style.display = "none";
};

//function to get user's city name from text input and call openweather api.

document.querySelector(".form-search").addEventListener("submit", (event) => {
  event.preventDefault();
  let unit = unitVerify();
  cityToCordinates(event.target[0].value, unit);
});

navigator.geolocation.getCurrentPosition(
  (location) => {
    let units = unitVerify();
    currentWeather(location.coords.latitude, location.coords.longitude, units);
    oneCallAPI(location.coords.latitude, location.coords.longitude, units);
    hideSearch();
  },
  (error) => {}
);
