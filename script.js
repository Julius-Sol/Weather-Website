const unitTemperature = document.querySelector(".toggle-switch");
const searchIcon = document.querySelector(".search-icon");
const searchElement = document.querySelector(".search-background");

//Flase is farenheight true is celcius
// console.log(unitTemperature.checked);
// console.log(searchIcon);
console.log(searchElement);

const closeSearch = () => {
  searchElement.style.display = "none";
};

searchIcon.addEventListener("click", () => {
  searchElement.style.display = "block";
});

const unitVerify = (unitTemperature) => {
  let unit = "C";
  if (unitTemperature.checked === true) {
    unit = "C";
  } else {
    unit = "F";
  }
  return unit;
};

unitVerify(unitTemperature);
