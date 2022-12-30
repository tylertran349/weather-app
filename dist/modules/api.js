/*
export function getLatAndLon(location, units) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=c0516e126153fdd7ea8c4f9d0a7a0460`, {mode: 'cors'})
    .then(function(response) {
        return response.json();increments
    })
    .then(function(response) {
        console.log("LOCATION DATA:");
        console.log(response);
        console.log(`Location name: ${response[0].name}`); // Name of location
        console.log(`Latitude: ${response[0].lat}`); // Latitude of location
        console.log(`Longitude: ${response[0].lon}`); // Longitude of location
        currentWeatherData(response[0].lat, response[0].lon, units); // Call function to get current weather data
        fifteenHourForecast(response[0].lat, response[0].lon, units); // Call function to get weather data for next 15 hours
    })
    .catch(function(response) {
        console.log("Error");
    })
}

function fifteenHourForecast(lat, lon, units) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c0516e126153fdd7ea8c4f9d0a7a0460&units=${units}`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log("DATA FOR NEXT 15 HOURS:")
        console.log(response);

        // Prints out weather data for next five 3-hour increments
        for(let i = 0; i < 5; i++) {
            console.log(`Forecast time: ${response.list[i].dt_txt}, ${response.list[i].main.temp} F, ${response.list[i].weather[0].description}, ${(response.list[i].pop) * 100}% precipitation`);
        }
    })
    .catch(function(response) {
        console.log("Error");
    })
}

function currentWeatherData(lat, lon, units) {
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
*/

let tempLabel, windLabel, precipLabel, distanceLabel;

export function getLatAndLon(location) {
    let units = "imperial";
    let tempUnit, windUnit, precipUnit;
    if(units === "imperial") {
        tempUnit = "fahrenheit";
        windUnit = "mph";
        precipUnit = "inch";
    }
    if(units === "metric") {
        tempUnit = "celsius";
        windUnit = "ms";
        precipUnit = "mm";
    }
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log("LOCATION DATA:");
        console.log(response);
        console.log("Location name: " + response.results[0].name);
        console.log("Latitude: " + response.results[0].latitude);
        console.log("Longitude: " + response.results[0].longitude);
        currentWeatherData(response.results[0].latitude, response.results[0].longitude, units);
        fifteenHourForecast(response.results[0].latitude, response.results[0].longitude, units);
        sevenDayForecast(response.results[0].latitude, response.results[0].longitude, tempUnit, windUnit, precipUnit);
    })
    .catch(function(response) {
        console.log("getLatAndLon error");
    })
}

// Use Open Meteo
function sevenDayForecast(lat, lon, tempUnit, windUnit, precipUnit) {
    fetch(`https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=${tempUnit}&windspeed_unit=${windUnit}&precipitation_unit=${precipUnit}&timezone=auto`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log("7 DAY FORECAST");
        console.log(response);
        for(let i = 0; i < 7; i++) {
            console.log(`${response.daily.time[i]}: HIGH ${response.daily.temperature_2m_max[i]} ${tempLabel}, LOW ${response.daily.temperature_2m_min[i]} ${tempLabel}, ${interpretWeatherCode(response.daily.weathercode[i])}`);
        }
    })
    .catch(function(response) {
        console.log("sevenDayForecast error");
    })
}

// Use OpenWeatherMap
function fifteenHourForecast(lat, lon, units) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c0516e126153fdd7ea8c4f9d0a7a0460&units=${units}`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log("DATA FOR NEXT 15 HOURS:")
        console.log(response);

        // Prints out weather data for next five 3-hour increments
        for(let i = 0; i < 5; i++) {
            console.log(`Forecast time: ${response.list[i].dt_txt}, ${response.list[i].main.temp} F, ${response.list[i].weather[0].description}, ${(response.list[i].pop) * 100}% precipitation`);
        }
    })
    .catch(function(response) {
        console.log("Error");
    })
}

// Use OpenWeatherMap
function currentWeatherData(lat, lon, units) {
    if(units === "imperial") {
        tempLabel = "°F";
        windLabel = "mph";
        precipLabel = "in";
        distanceLabel = "mi"
    }
    if(units === "metric") {
        tempLabel = "°C";
        windLabel = "m/s";
        precipLabel = "mm";
        distanceLabel = "km"
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c0516e126153fdd7ea8c4f9d0a7a0460&units=${units}&cnt=5`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log("CURRENT WEATHER:")
        console.log(response);
        console.log(`Current temperature: ${Math.round(response.main.temp)} ${tempLabel}`);
        console.log(`Current feels like: ${Math.round(response.main.feels_like)} ${tempLabel} `);
        console.log(`Current humidity: ${Math.round(response.main.humidity)} %`);
        console.log(`Current wind speed: ${Math.round(response.wind.speed)} ${windLabel}`);
        console.log(`Current conditions: ${response.weather[0].description}`);
        console.log(`Current visibility: ${(response.visibility) / 1000} ${distanceLabel}`);
    })
    .catch(function(response) {
        console.log("currentWeatherData error");
    })
}

// Convert WMO weather code to weather description
function interpretWeatherCode(code) {
    if(code === 0) {
        return "Clear sky";
    } else if(code === 1) {
        return "Mainly clear";;
    } else if(code === 2) {
        return "Partly cloudy";
    } else if(code === 3) {
        return "Overcast";
    } else if(code === 45) {
        return "Fog";
    } else if(code === 48) {
        return "Depositing rime fog";
    } else if(code === 51) {
        return "Light drizzle";
    } else if(code === 53) {
        return "Moderate drizzle";
    } else if(code === 55) {
        return "Drizzle: dense intensity";
    } else if(code === 56) {
        return "Light freezing drizzle";
    } else if(code === 57) {
        return "Freezing drizzle: dense intensity";
    } else if(code === 61) {
        return "Light rain";
    } else if(code === 63) {
        return "Moderate rain";
    } else if(code === 65) {
        return "Heavy rain";
    } else if(code === 66) {
        return "Light freezing rain";
    } else if(code === 67) {
        return "Heavy freezing rain";
    } else if(code === 71) {
        return "Light snow";
    } else if(code === 73) {
        return "Moderate snow";
    } else if(code === 75) {
        return "Heavy snow";
    } else if(code === 77) {
        return "Snow grains";
    } else if(code === 80) {
        return "Light rain showers";
    } else if(code === 81) {
        return "Moderate rain showers";
    } else if(code === 82) {
        return "Violent rain showers";
    } else if(code === 85) {
        return "Light snow showers";
    } else if(code === 86) {
        return "Heavy snow showers";
    } else if(code === 95) {
        return "Thunderstorm, slight or moderate, without hail";
    } else if(code === 96) {
        return "Thunderstorm, slight or moderate, with hail";
    } else if(code === 99) {
        return "Thunderstorm, heavy, with hail";
    } else {
        return "Weather description error";
    }
}