var currentDate = dayjs();
var when;
var myKey = "1c142e1c318254dff9cf9240d0f423c4";
var pastCities = document.getElementsByTagName("li");
var cityList = document.getElementsByTagName("ul");

document.getElementById("current-date").textContent = currentDate.format(
  "MM/DD/YYYY"
);

document.getElementById("enter-city").addEventListener("click", function () {
  var searchCity = document.getElementById("city-search");
  var enterCity = searchCity.value;

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      enterCity +
      "&APPID=" +
      myKey
  ).then((response) =>
    response.json().then((data) => {
      console.log(data);
      if (data) {
        displayCurrent(data);
      }
      var Lat = data.coord.lat;
      var Lon = data.coord.lon;
      return fetch(
        "https://api.openweathermap.org/data/2.5/onecall?exclude=hourly,minutely&appid=" +
          myKey +
          "&lat=" +
          Lat +
          "&lon=" +
          Lon,
        requestOptions
      )
        .then((response) => response.json())
        .then((onedata) => {
          console.log(onedata);
          if (onedata) {
            displayUVI(onedata);
            displayForescast(onedata);
          }
        })
        .catch((error) => console.log("error", error));
    })
  );

  function displayCurrent(tempData) {
    var currentTemp = tempData.main.temp;
    currentTemp = (currentTemp - 273.15) * 1.8 + 32;
    currentTemp = Math.floor(currentTemp);
    document.getElementById("today-temp").textContent = currentTemp;

    var currentHumidity = tempData.main.humidity;
    document.getElementById("today-humidity").textContent = currentHumidity;

    var currentSpeed = tempData.wind.speed;
    document.getElementById("today-speed").textContent = currentSpeed;

    var currentCity = tempData.name;
    document.getElementById("city-name").textContent = currentCity;
    return;
  }
});

function displayUVI(onedata) {
  var currentUVI = onedata.current.uvi;
  document.getElementById("today-uvi").textContent = currentUVI;
}

function displayForescast(onedata) {}







// When the page loads search localStorage to see last city viewed and view it's stats + list up to 5(?) past searches. If nothing in localStorage view basic page format or set a city as a default?


// In 5 day cards display next days in order of proper sequence {card1/card2/card3/card4/card5} correct image/date (DD/MM/YYYY)/temperature/humidity
