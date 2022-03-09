import { imagePath } from "./script.js";

const hourlyContainer = document.querySelector(".hourly");

const hourlyCreator = (hourlyArray) => {
  const cardRemoval = document.querySelectorAll(".hourly-card");
  cardRemoval.forEach((element) => {
    element.remove();
  });

  for (let i = 1; i <= 6; i++) {
    const card = document.createElement("div");
    card.classList.add("hourly-card");
    hourlyContainer.append(card);

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("hourly-info");
    card.append(cardInfo);

    const hourTime = document.createElement("h3");
    hourTime.classList.add("hourly-weather-time");
    const time = getHour(hourlyArray[i].dt);
    hourTime.textContent = time;
    cardInfo.append(hourTime);

    const hourImg = document.createElement("img");
    const imageLocation = imagePath(hourlyArray[i].weather[0].main, hourlyArray[i].weather[0].description);
    hourImg.src = imageLocation;
    hourImg.alt = "Condition image";
    hourImg.classList.add("hourly-weather-icon");
    cardInfo.append(hourImg);

    const hourConditon = document.createElement("h4");
    const condition = hourlyArray[i].weather[0].main;
    hourConditon.textContent = condition;
    cardInfo.append(hourConditon);

    const hourTemp = document.createElement("p");
    hourTemp.classList.add("hourly-temp");
    const temp = Math.round(hourlyArray[i].temp);
    hourTemp.innerHTML = `${temp}<span>&#176;</span>`;
    card.append(hourTemp);
  }
};

const getHour = (unixTime) => {
  let date = new Date(unixTime * 1000);
  let timeOfDay = "AM";
  let hours = date.getHours();
  if (hours > 12) {
    timeOfDay = "PM";
    hours = hours - 12;
  }
  if (hours == 12) {
    timeOfDay = "PM";
  }
  if (hours == 0) {
    hours = 12;
  }
  let minutes = "0" + date.getMinutes();
  let formatTime = hours + ":" + minutes.slice(-2) + timeOfDay;
  return formatTime;
};

export default hourlyCreator;
