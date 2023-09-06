import { displayCurrentWeather, showErrorPopup, hideErrorPopup, displayHourByHourWeather, displayFourteenDayWeather } from './dom';
import { weatherAppObject } from '../../src/index';
require('dotenv').config();

export async function searchLocation(location) {
    if(location === "") {
        return; // If search box value is empty, end this function right here
    }
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`, {mode: 'cors'});
        const latAndLon = await response.json();
        makeApiCalls(latAndLon.results[0].latitude, latAndLon.results[0].longitude, weatherAppObject.units, weatherAppObject.tempUnit, weatherAppObject.windUnit, weatherAppObject.precipUnit);
        hideErrorPopup();
    } catch(error) {
        showErrorPopup("Invalid city or zip code, please try again");
    }
}

// Function to make all 3 API calls in the correct order
async function makeApiCalls(lat, lon, units, tempUnit, windUnit, precipUnit) {
    try {
        await callOpenWeatherMap(lat, lon, units); // For current weather data
        await callOpenMeteo(lat, lon, tempUnit, windUnit, precipUnit); // For hourly and 14-day forecast data
    } catch(error) {
        showErrorPopup("makeApiCalls() error, please try again")
    }
}

// Use OpenWeatherMap
async function callOpenWeatherMap(lat, lon, units) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c0516e126153fdd7ea8c4f9d0a7a0460&units=${units}&cnt=5`, {mode: 'cors'});
        const openWeatherMapData = await response.json();

        // Create object to pass into displayCurrentWeather in dom.js
        let currentWeatherObject = {location: openWeatherMapData.name, country: openWeatherMapData.sys.country, 
            temp: openWeatherMapData.main.temp, icon: openWeatherMapData.weather[0].icon, 
            description: openWeatherMapData.weather[0].description, 
            feelsLike: openWeatherMapData.main.feels_like, wind: openWeatherMapData.wind.speed, 
            humidity: openWeatherMapData.main.humidity, visibility: openWeatherMapData.visibility};
        
        // Pass object into external DOM function
        displayCurrentWeather(currentWeatherObject);
        hideErrorPopup();
    } catch(error) {
        showErrorPopup("OpenWeatherMap API error, please try again");
    }
}

async function callOpenMeteo(lat, lon, tempUnit, windUnit, precipUnit) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=${tempUnit}&windspeed_unit=${windUnit}&precipitation_unit=${precipUnit}&timeformat=unixtime&forecast_days=16&timezone=auto`, {mode: 'cors'});
        const openMeteoData = await response.json();

        // HOUR-BY-HOUR FORECAST
        // Create new empty hourly weather data arrays every time this function is called
        let hourlyTimeArray = [];
        let hourlyDescriptionArray = [];
        let hourlyTempArray = [];
        let hourlyWindArray = [];

        for(let i = 0; i < openMeteoData.hourly.time.length; i++) {
            if(openMeteoData.hourly.time[i] === openMeteoData.current_weather.time) {
                for(let j = i + 1; j <= i + (weatherAppObject.numHourlyForecasts); j++) {
                    hourlyTimeArray.push(openMeteoData.hourly.time[j]);
                    hourlyDescriptionArray.push(openMeteoData.hourly.weathercode[j]);
                    hourlyTempArray.push(openMeteoData.hourly.temperature_2m[j]);
                    hourlyWindArray.push(openMeteoData.hourly.windspeed_10m[j]);
                }
                break;
            }
        }

        let hourlyWeatherObject = {hourlyTimes: hourlyTimeArray, hourlyDescriptions: hourlyDescriptionArray,
        hourlyTemps: hourlyTempArray, hourlyWinds: hourlyWindArray};
        displayHourByHourWeather(hourlyWeatherObject);

        // 14-DAY FORECAST
        let dailyDateArray = [];
        let dailyDescriptionArray = [];
        let dailyHighArray = [];
        let dailyLowArray = [];

        for(let i = 0; i < weatherAppObject.numDailyForecasts; i++) {
            dailyDateArray.push(openMeteoData.daily.time[i]);
            dailyDescriptionArray.push(openMeteoData.daily.weathercode[i]);
            dailyHighArray.push(openMeteoData.daily.temperature_2m_max[i]);
            dailyLowArray.push(openMeteoData.daily.temperature_2m_min[i]);
        }

        let fourteenDayWeatherObject = {dailyDates: dailyDateArray, dailyDescriptions: dailyDescriptionArray, 
        dailyHighs: dailyHighArray, dailyLows: dailyLowArray};
        displayFourteenDayWeather(fourteenDayWeatherObject);
        hideErrorPopup();
    } catch(error) {
        showErrorPopup("Open Meteo API error, please try again");
    }
}