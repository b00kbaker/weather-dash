var currentDate = dayjs();
var myKey= "1c142e1c318254dff9cf9240d0f423c4";
var defaultCity="Denver";
var searchCity= document.getElementById('city-search');
var pastCities= document.createElement('li');

document.getElementById('current-date').textContent = currentDate.format("MM/DD/YYYY");



fetch('https://api.openweathermap.org/data/2.5/weather?q=' + defaultCity + '&APPID=' + myKey)
 .then(response => response.json()
 .then(data => {
     console.log(data);
     console.log(data.main.temp);
     console.log.apply(data.main.feels_like);

     var currentTemp = data.main.temp;
     document.getElementById('today-temp').textContent= currentTemp;
     return;
 }))
// Global variables
// Current city
// This week
// Weather Array=[Sunny, Overcast, Rain, Snow, Windy,]

// When the page loads search localStorage to see last city viewed and view it's stats + list up to 5(?) past searches. If nothing in localStorage view basic page format or set a city as a default? 

// View current date (DD/MM/YYYY)

// When city is searched run weather API (does it have everything for the map side of things too?)

// Display in main frame (think jumbotron) the city name/date/current day's weather (temperature/humidity/wind speed/UV index)

// In 5 day cards display next days in order of proper sequence {card1/card2/card3/card4/card5} correct image/date (DD/MM/YYYY)/temperature/humidity