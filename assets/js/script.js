//VARIABLE DECLARATIONS
var fieldInput = document.getElementById("city-input");

var searchBtn = document.getElementById("search-form");

var todayForecast = document.getElementById("current-forecast");
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//api key = f18a21a46c14735a21d43be4f3afb792

//test Austin
//30.2711286 - lat
//-97.7436995 - lon

var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?";

var apiKey = "f18a21a46c14735a21d43be4f3afb792";

//FUNCTIONS

//responsible for getting the lat and lon for the city passed
function grabCoordinates(city) {
  var rootEndpoint = "http://api.openweathermap.org/geo/1.0/direct";

  var apiCall = rootEndpoint + "?q=" + city + "&appid=" + apiKey;

  // console.log(apiCall);

  //this will make the call to get the coordinates for that city

  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
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
      showDayForecast(data);
      // show5Day(data);

      // console.log(data.list[0].main.temp);

      //take the temp and display to the user as an h1

      // var h1El = document.createElement("h1");

      // h1El.textContent = data.list[0].main.temp;
      // todayForecast.append(h1El);

      //create an h1 element dynamically
      //add text to that element
      //append to DOM
    });

  //render the temp as an h1 to the user
}

function showDayForecast(data) {
  // console.log(data);
  // console.log(data.city.name);
  // console.log(data.list);
  // console.log(data.list[0].dt_txt);
  // console.log(data.list[0].wind.speed);
  // console.log(data.list[0].main.humidity);

  var h1Name = document.createElement("h1");
  var h1Date = document.createElement("h1");
  var h1Temp = document.createElement("h1");
  var h1Wind = document.createElement("h1");
  var h1Humidity = document.createElement("h1");
  var img = document.createElement("img");

  h1Name.textContent = data.city.name;
  todayForecast.append(h1Name);

  h1Date.textContent = data.list[0].dt_txt;
  todayForecast.append(h1Date);

  h1Temp.textContent = data.list[0].main.temp;
  todayForecast.append(h1Temp);

  h1Wind.textContent = data.list[0].wind.speed;
  todayForecast.append(h1Wind);

  h1Humidity.textContent = data.list[0].main.humidity;
  todayForecast.append(h1Humidity);

  img.src = data.list[0].weather.icon;
  todayForecast.append(img);

  show5Day(data);
}

function show5Day(data) {
  console.log(data);
  for (let i = 1; i < data.list.length; i += 8) {
    console.log(data.list[i]);
    var date = document.getElementById(`date${i}`);
    // console.log(date);
    var icon = document.getElementById(`icon${i}`);
    var temp = document.getElementById(`temp${i}`);
    var wind = document.getElementById(`wind${i}`);
    var humidity = document.getElementById(`humidity${i}`);
    date.textContent = data.list[i].dt_txt;
    console.log(date);
    temp.textContent = `Temperature: ${data.list[i].main.temp}`;
    console.log(temp);
    wind.textContent = `Wind Speed(MPH): ${data.list[i].wind.speed}`;
    console.log(wind);
    humidity.textContent = `Humidity: ${data.list[i].main.humidity}`;
    console.log(humidity);
  }
}

// //responsible for form submission by capturing user input
function runSearch(e) {
  e.preventDefault();
  var field = fieldInput.value;

  //make an api call with that search term and confirm data is sent back
  // grabWeather(field);
  grabCoordinates(field);
}

// //EVENT LISTENERS
searchBtn.addEventListener("submit", runSearch);
