const weeklyAside = document.querySelector(".main-weather-weekly");

const weeklyCreator = () => {
  const card = document.createElement("div");
  card.classList.add("weekly-card");
  weeklyAside.append(card);

  const cardDate = document.createElement("div");
  cardDate.classList.add("weekly-card-date");
  card.append(cardDate);

  const weeklyDate = document.createElement("h2");
  weeklyDate.classList.add("weekly-date");
  weeklyDate.textContent = "Sat, Feb 26";
  cardDate.append(weeklyDate);

  const weeklyImg = document.createElement("img");
  weeklyImg.src = "images/Sunny.png";
  weeklyImg.alt = "Condition image";
  weeklyImg.classList.add("weekly-weather-icon");
  cardDate.append(weeklyImg);

  const weeklyConditon = document.createElement("h3");
  weeklyConditon.textContent = "Sunny";
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
  maxDegree.innerHTML = `71<span class="temp-degree">&#176;</span>`;
  weeklyInfoMax.append(maxDegree);

  const weeklyInfoMin = document.createElement("div");
  weeklyInfoMin.classList.add("info-min");
  weeklyTemp.append(weeklyInfoMin);

  const weeklyMin = document.createElement("h6");
  weeklyMin.textContent = "Min";
  weeklyInfoMin.append(weeklyMin);

  const minDegree = document.createElement("p");
  minDegree.innerHTML = `60<span class="temp-degree">&#176;</span>`;
  weeklyInfoMin.append(minDegree);
};

export default weeklyCreator;
