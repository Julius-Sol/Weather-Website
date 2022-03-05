import WEATHER_API_KEY from "./apiKey.js";

const unitTemperature = document.querySelector(".toggle-switch");
const searchIcon = document.querySelector(".search-icon");
const searchElement = document.querySelector(".search-background");

const apiUrl = "https://api.openweathermap.org/data/2.5/";
const apiGeocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";

const cityToCordinates = async (city) => {
  try {
    let url = `${apiGeocodingUrl}` + `${city}&limit=2&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    const geoCord = await response.json();
    oneCallAPI(geoCord);
  } catch (error) {
    console.log(error);
  }
};

const unitVerify = (unitTemperature) => {
  let unit = "C";
  if (unitTemperature.checked === true) {
    unit = "C";
  } else {
    unit = "F";
  }
  return unit;
};

const oneCallAPI = async (cordArray) => {
  try {
    const url = `${apiUrl}` + `onecall?lat=${cordArray[0].lat}&lon=${cordArray[0].lon}&exclude=minutely,alerts&units=imperial&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    const weatherData = await response.json();
    console.log(weatherData);
  } catch (error) {
    console.log(error);
  }
};

const currentWeather = () => {};

const closeSearch = () => {
  searchElement.style.display = "none";
};

searchIcon.addEventListener("click", () => {
  searchElement.style.display = "block";
});

// let cityName = "Atlanta";
// cityToCordinates(cityName.toLowerCase());
