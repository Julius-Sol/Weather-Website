import { imagePath, getDateTitle } from "./script.js";

const weeklyAside = document.querySelector(".main-weather-weekly");

const weeklyCreator = (weeklyArray) => {
  const cardRemoval = document.querySelectorAll(".weekly-card");
  cardRemoval.forEach((element) => {
    element.remove();
  });

  for (let i = 1; i <= 5; i++) {
    const card = document.createElement("div");
    card.classList.add("weekly-card");
    weeklyAside.append(card);

    const cardDate = document.createElement("div");
    cardDate.classList.add("weekly-card-date");
    card.append(cardDate);

    const weeklyDate = document.createElement("h2");
    weeklyDate.classList.add("weekly-date");
    const date = getDateTitle(weeklyArray[i].dt);
    weeklyDate.textContent = date;
    cardDate.append(weeklyDate);

    const weeklyImg = document.createElement("img");

    const imageLocation = imagePath(weeklyArray[i].weather[0].main, weeklyArray[i].weather[0].description);
    weeklyImg.src = imageLocation;
    weeklyImg.alt = "Condition image";
    weeklyImg.classList.add("weekly-weather-icon");
    cardDate.append(weeklyImg);

    const weeklyConditon = document.createElement("h3");
    const condition = weeklyArray[i].weather[0].main;
    weeklyConditon.textContent = condition;
    cardDate.append(weeklyConditon);

    const weeklyTemp = document.createElement("div");
    weeklyTemp.classList.add("weekly-card-temp");
    card.append(weeklyTemp);

    const weeklyInfoMax = document.createElement("div");
    weeklyInfoMax.classList.add("info-max");
    weeklyTemp.append(weeklyInfoMax);

    const weeklyMax = document.createElement("h6");
    weeklyMax.textContent = "Max";
    weeklyInfoMax.append(weeklyMax);

    const maxDegree = document.createElement("p");
    const max = Math.round(weeklyArray[i].temp.max);
    maxDegree.innerHTML = `${max}<span class="temp-degree">&#176;</span>`;
    weeklyInfoMax.append(maxDegree);

    const weeklyInfoMin = document.createElement("div");
    weeklyInfoMin.classList.add("info-min");
    weeklyTemp.append(weeklyInfoMin);

    const weeklyMin = document.createElement("h6");
    weeklyMin.textContent = "Min";
    weeklyInfoMin.append(weeklyMin);

    const minDegree = document.createElement("p");
    const min = Math.round(weeklyArray[i].temp.min);
    minDegree.innerHTML = `${min}<span class="temp-degree">&#176;</span>`;
    weeklyInfoMin.append(minDegree);
  }
};

export default weeklyCreator;
