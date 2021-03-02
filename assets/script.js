var currentDate = dayjs();
var myKey = "1c142e1c318254dff9cf9240d0f423c4";
var pastCities = document.getElementsByTagName("li");
// var cityList = document.getElementsByTagName("ul");
var historyCities=[];
var enterCity;

document.getElementById("current-date").textContent = currentDate.format(
  "MM/DD/YYYY"
);

document.getElementById("enter-city").addEventListener("click", function () {
  var searchCity = document.getElementById("city-search");
  enterCity = searchCity.value;
  createWeather();
  
}
);

function createWeather(){
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
          Lon +
          "&units=imperial",
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

  historyCities.push(enterCity);
  localStorage.setItem('cities', enterCity);


}


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
};

function displayUVI(onedata) {
  var currentUVI = onedata.current.uvi;
  document.getElementById("today-uvi").textContent = currentUVI;
};

function displayForescast(onedata) {
  var oneTemp = onedata.daily[0].temp.day;
  document.getElementById("temp-1").textContent = oneTemp;

  var oneHumid = onedata.daily[0].humidity;
  document.getElementById("humid-1").textContent = oneHumid;

  var twoTemp = onedata.daily[1].temp.day;
  document.getElementById("temp-2").textContent = twoTemp;

  var twoHumid = onedata.daily[1].humidity;
  document.getElementById("humid-2").textContent = twoHumid;

  var threeTemp = onedata.daily[2].temp.day;
  document.getElementById("temp-3").textContent = threeTemp;

  var threeHumid = onedata.daily[2].humidity;
  document.getElementById("humid-3").textContent = threeHumid;

  var fourTemp = onedata.daily[3].temp.day;
  document.getElementById("temp-4").textContent = fourTemp;

  var fourHumid = onedata.daily[3].humidity;
  document.getElementById("humid-4").textContent = fourHumid;

  var fiveTemp = onedata.daily[4].temp.day;
  document.getElementById("temp-5").textContent = fiveTemp;

  var fiveHumid = onedata.daily[4].humidity;
  document.getElementById("humid-5").textContent = fiveHumid;

};

var localStoragecity= localStorage.getItem('cities');

if(localStoragecity){
  var savedCity= localStorage.getItem('cities');
  console.log("hi",savedCity);
  enterCity= savedCity;
  createWeather();
  var cityList = document.getElementsByTagName("ul");
}

