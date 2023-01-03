import { displayCurrentWeather } from './dom';
import { weatherAppObject } from '../../src/index';

export async function searchLocation(location) {
    console.log("WeatherAppController units: " + weatherAppObject.units);
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`, {mode: 'cors'});
        const latAndLon = await response.json();
        makeApiCalls(latAndLon.results[0].latitude, latAndLon.results[0].longitude, weatherAppObject.units, weatherAppObject.tempUnit, weatherAppObject.windUnit, weatherAppObject.precipUnit)
    } catch(error) {
        console.log("searchLocation error");
    }
}

// Function to make API calls in the correct order
async function makeApiCalls(lat, lon, units, tempUnit, windUnit, precipUnit) {
    try {
        await currentWeatherData(lat, lon, units);
    } catch(error) {
        console.log("makeApiCalls error");
    }
}

// Use OpenWeatherMap
async function currentWeatherData(lat, lon, units) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c0516e126153fdd7ea8c4f9d0a7a0460&units=${units}&cnt=5`, {mode: 'cors'});
        const currentWeatherData = await response.json();
        console.log("CURRENT WEATHER:")
        console.log(currentWeatherData);

        // Create object to pass into displayCurrentWeather in dom.js
        let currentWeatherObject = {location: currentWeatherData.name, country: currentWeatherData.sys.country, 
            temp: currentWeatherData.main.temp, icon: currentWeatherData.weather[0].icon, 
            description: currentWeatherData.weather[0].description, 
            feelsLike: currentWeatherData.main.feels_like, wind: currentWeatherData.wind.speed, 
            humidity: currentWeatherData.main.humidity, visibility: currentWeatherData.visibility};
        
        // Pass object into external DOM function
        displayCurrentWeather(currentWeatherObject);
    } catch(error) {
        console.log("currentWeatherData() error");
    }
}