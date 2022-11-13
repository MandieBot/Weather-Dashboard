//VARIABLE DECLARATIONS
var fieldInput = document.getElementById("city-input");

var searchBtn = document.getElementById("search-form");

var todayForecast = document.getElementById("current-forecast");

// var cardBody = document.querySelectorAll(".card-body)");

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//api key = f18a21a46c14735a21d43be4f3afb792

var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?";

var apiKey = "f18a21a46c14735a21d43be4f3afb792";

//FUNCTIONS

//responsible for getting the lat and lon for the city passed
function grabCoordinates(city) {
  var rootEndpoint = "http://api.openweathermap.org/geo/1.0/direct";

  var apiCall = rootEndpoint + "?q=" + city + "&appid=" + apiKey;

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
  var weatherIcon = `https://openweathermap.org/img/wn/${data.list[0].weather[0]["icon"]}.png`;

  var h1Name = document.createElement("h1");
  var h1Date = document.createElement("h1");
  var h1Temp = document.createElement("h1");
  var h1Wind = document.createElement("h1");
  var h1Humidity = document.createElement("h1");
  var img = document.createElement("img");

  h1Name.textContent = data.city.name;
  todayForecast.append(h1Name);

  img.src = weatherIcon;
  todayForecast.append(img);

  h1Date.textContent = data.list[0].dt_txt;
  todayForecast.append(h1Date);

  h1Temp.textContent = data.list[0].main.temp;
  todayForecast.append(h1Temp);

  h1Wind.textContent = data.list[0].wind.speed;
  todayForecast.append(h1Wind);

  h1Humidity.textContent = data.list[0].main.humidity;
  todayForecast.append(h1Humidity);

  show5Day(data);
}

function show5Day(data) {
  // var weatherIcon = `https://openweathermap.org/img/wn/${data.list[0].weather[0]["icon"]}.png`;
  console.log(data);
  for (let i = 1; i < data.list.length; i += 8) {
    console.log(data.list[i]);
    var img = document.createElement("img");
    var date = document.getElementById(`date${i}`);
    var icon = document.getElementById(`icon${i}`);
    var temp = document.getElementById(`temp${i}`);
    var wind = document.getElementById(`wind${i}`);
    var humidity = document.getElementById(`humidity${i}`);
    date.textContent = data.list[i].dt_txt;
    console.log(date);
    temp.textContent = `Temperature(F): ${data.list[i].main.temp}`;
    console.log(temp);
    wind.textContent = `Wind Speed(MPH): ${data.list[i].wind.speed}`;
    console.log(wind);
    humidity.textContent = `Humidity: ${data.list[i].main.humidity}`;
    console.log(humidity);
    // img.src = weatherIcon;
    // cardBody.append(img);
  }
}

// //responsible for form submission by capturing user input
function runSearch(e) {
  e.preventDefault();
  var field = fieldInput.value;

  //make an api call with that search term and confirm data is sent back
  grabCoordinates(field);
  storageSet(field);
}

function storageSet(city) {
  console.log(city);
  localStorage.setItem("city", city);
}
function storageGet() {
  localStorage.getItem("city");
}

// //EVENT LISTENERS
searchBtn.addEventListener("submit", runSearch);

//LOCAL STORAGE
//create an empty array in global scope
//push that value (city name) to that array as they type it in
//["austin", "denver", "seattle"]
