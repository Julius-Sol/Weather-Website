import WEATHER_API_KEY from "./apiKey.js";

const unitTemperature = document.querySelector(".toggle-switch");
const searchIcon = document.querySelector(".search-icon");
const searchElement = document.querySelector(".search-background");

// Query Selectors for current weather
const currentWeatherDate = document.querySelector(".main-weather-date");

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

const currentWeather = (currentData) => {
  const date = getDateTitle(1646524179);
  currentWeatherDate.textContent = date;
};

//Function that take a unix time and converts it to the format of [Day of the week], [Month(text)] [day]
const getDateTitle = (unixTime) => {
  let date = new Date(unixTime * 1000).toDateString();
  let dateStart = date.substring(0, 3);
  date = dateStart.concat("," + date.substring(3, 10));
  return date;
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

const closeSearch = () => {
  searchElement.style.display = "none";
};

searchIcon.addEventListener("click", () => {
  searchElement.style.display = "block";
});

currentWeather();

// let cityName = "Atlanta";
// cityToCordinates(cityName.toLowerCase());
