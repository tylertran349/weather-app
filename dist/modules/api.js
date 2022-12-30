export function getLatAndLon(location, units) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=c0516e126153fdd7ea8c4f9d0a7a0460`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log("LOCATION DATA:");
        console.log(response);
        console.log(`Location name: ${response[0].name}`); // Name of location
        console.log(`Latitude: ${response[0].lat}`); // Latitude of location
        console.log(`Longitude: ${response[0].lon}`); // Longitude of location
        getCurrentWeatherData(response[0].lat, response[0].lon, units); // Call function to get current weather data
        //getFifteenHrForecast(response[0].lat, response[0].lon, units); // Call function to get weather data for next 15 hours
    })
    .catch(function(response) {
        console.log("Error");
    })
}

function getCurrentWeatherData(lat, lon, units) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c0516e126153fdd7ea8c4f9d0a7a0460&units=${units}&cnt=5`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log("CURRENT WEATHER:")
        console.log(response);
        console.log(`Current temperature: ${Math.round(response.main.temp)} F`);
        console.log(`Current feels like: ${Math.round(response.main.feels_like)} F`);
        console.log(`Current humidity: ${Math.round(response.main.humidity)} %`);
        console.log(`Current wind speed: ${response.wind.speed} MPH`);
        console.log(`Current conditions: ${response.weather[0].description}`);
        console.log(`Current visibility: ${(response.visibility) / 1000} mi`);
    })
    .catch(function(response) {
        console.log("Error");
    })
}