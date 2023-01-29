// Set global variables, including Open Weather Maps API Key
var apiKey = "23836be9e644e5cc97d1e586103214ce";
var currentCity = "";
var lastCity = "";

var handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// Function to get and display the current conditions on Open Weather Maps
var getCurrentConditions = (event) => {
    // Obtain city name from the search box
    var city = $('#search-input').val();
    currentCity= $('#search-input').val();
    // Set the queryURL to fetch from API using weather search - added units=imperial to fix
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + apiKey;
    fetch(queryURL)
    .then(handleErrors)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
   // Save city to local storage
   saveCity(city);
   $('#search-error').text("");
   // Create icon for the current weather using Open Weather Maps
   var  currentWeatherIcon="https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
   // Offset UTC timezone - using moment.js
   var currentTimeUTC = response.dt;
   var currentTimeZoneOffset = response.timezone;
   var currentTimeZoneOffsetHours = currentTimeZoneOffset / 60 / 60;
   var currentMoment = moment.unix(currentTimeUTC).utc().utcOffset(currentTimeZoneOffsetHours);
   // Render cities list