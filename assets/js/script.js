//VARIABLE DECLARATIONS
var fieldInput = document.getElementById("city-input");

var searchBtn = document.getElementById("search-form");

//FUNCTIONS
function runSearch(e) {
  e.preventDefault();
  var field = fieldInput.value;
 
}

//EVENT LISTENERS
searchBtn.addEventListener("submit", runSearch);
