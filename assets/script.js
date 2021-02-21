var currentDate = dayjs();
var myKey = "1c142e1c318254dff9cf9240d0f423c4";
var pastCities = document.getElementsByTagName("li");
var cityList = document.getElementsByTagName("ul");

document.getElementById("current-date").textContent = currentDate.format(
  "MM/DD/YYYY"
);

document.getElementById("enter-city").addEventListener("click", function () {
  var searchCity = document.getElementById("city-search");
  var enterCity = searchCity.value;

 fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=" +
     enterCity +
    "&APPID=" +
    myKey
 ).then((response) =>
  response.json().then((data) => {
    console.log(data.name);
    console.log(data.main.temp);
    if (data) {
      // fiveDay(data.id);
      displayCurrent(data);
    }
    return;
  }))
});


function displayCurrent(tempData) {
  var currentTemp = tempData.main.temp;
  currentTemp = (currentTemp - 273.15) * 1.8 + 32;
  currentTemp = Math.floor(currentTemp);
  document.getElementById("today-temp").textContent = currentTemp;

  console.log(currentTemp);
  var currentHumidity = tempData.main.humidity;
  document.getElementById("today-humidity").textContent = currentHumidity;

  var currentSpeed = tempData.wind.speed;
  document.getElementById("today-speed").textContent = currentSpeed;
 
  var currentCity = tempData.name;
  document.getElementById("city-name").textContent = currentCity;
  return;
};






// When the page loads search localStorage to see last city viewed and view it's stats + list up to 5(?) past searches. If nothing in localStorage view basic page format or set a city as a default?

// When city is searched run weather API (does it have everything for the map side of things too?)

// In 5 day cards display next days in order of proper sequence {card1/card2/card3/card4/card5} correct image/date (DD/MM/YYYY)/temperature/humidity
