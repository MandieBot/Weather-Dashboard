//VARIABLE DECLARATIONS
var fieldInput = document.getElementById("city-input");

var searchBtn = document.getElementById("search-form");

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//api key = f18a21a46c14735a21d43be4f3afb792

//test Austin
//30.2711286 - lat
//-97.7436995 - lon

var weatherApi = "https://api.openweathermap.org/data/3.0/onecall?";

var apiKey = "f18a21a46c14735a21d43be4f3afb792";

//FUNCTIONS

//responsible for getting the lat and lon for the city passed
function grabCoordinates(city) {
  var rootEndpoint = "http://api.openweathermap.org/geo/1.0/direct";

  var apiCall = rootEndpoint + "?q=" + city + "&appid=" + apiKey;

  console.log(apiCall);

  //this will make the call to get the coordinates for that city

  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      grabWeather(lat, lon);
    });
}

//responsible for making api call with the user search term
function grabWeather(lat, lon) {
  // console.log(lat);
  // console.log(lon);

  var apiCall = weatherApi + "lat=" + lat + "&lon=" + lon + "&units=imperial&" + "appid=f18a21a46c14735a21d43be4f3afb792";

  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
    });

  //   //render the temp as an h1 to the user
}
// //responsible for form submission by capturing user input
function runSearch(e) {
  e.preventDefault();
  var field = fieldInput.value;

  //make an api call with that search term and confirm data is sent back
  grabWeather(field);
  grabCoordinates(field);
}

// //EVENT LISTENERS
searchBtn.addEventListener("submit", runSearch);
