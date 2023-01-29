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
