import { displayCurrentWeather, updateDisplayLabelUnits } from './dom';

let tempLabel, windLabel, precipLabel, distanceLabel;
let units = "imperial";

export async function searchLocation(location) {
    // Update display label units first before preceeding
    updateDisplayLabelUnits(units);

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
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`, {mode: 'cors'});
        const latAndLon = await response.json();
        makeApiCalls(latAndLon.results[0].latitude, latAndLon.results[0].longitude, units, tempUnit, windUnit, precipUnit)
    } catch(error) {
        console.log("searchLocation error");
    }
}

// Function to make API calls in the correct order
async function makeApiCalls(lat, lon, units, tempUnit, windUnit, precipUnit) {
    try {
        await currentWeatherData(lat, lon, units);
        //await fifteenHourForecast(lat, lon, units);
        //await sevenDayForecast(lat, lon, tempUnit, windUnit, precipUnit);  
    } catch(error) {
        console.log("makeApiCalls error");
    }
}

// Use OpenWeatherMap
async function currentWeatherData(lat, lon, units) {
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
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c0516e126153fdd7ea8c4f9d0a7a0460&units=${units}&cnt=5`, {mode: 'cors'});
        const currentWeatherData = await response.json();
        console.log("CURRENT WEATHER:")
        console.log(currentWeatherData);

        // Create object
        let currentWeatherObject = {location: currentWeatherData.name, country: currentWeatherData.sys.country, 
            temp: currentWeatherData.main.temp, description: currentWeatherData.weather[0].description, 
            feelsLike: currentWeatherData.main.feels_like, wind: currentWeatherData.wind.speed, 
            humidity: currentWeatherData.main.humidity, visibility: currentWeatherData.visibility};
        
        // Pass object into external DOM function
        displayCurrentWeather(currentWeatherObject);
    } catch(error) {
        console.log("currentWeatherData() error");
    }
}

// Use OpenWeatherMap
async function fifteenHourForecast(lat, lon, units) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c0516e126153fdd7ea8c4f9d0a7a0460&units=${units}`, {mode: 'cors'});
        const fifteenHourData = await response.json();
        console.log("DATA FOR NEXT 15 HOURS:")
        console.log(fifteenHourData);

        // Prints out weather data for next five 3-hour increments
        for(let i = 0; i < 5; i++) {
            console.log(`Forecast time: ${fifteenHourData.list[i].dt_txt}, ${fifteenHourData.list[i].main.temp} F, ${fifteenHourData.list[i].weather[0].description}, ${(fifteenHourData.list[i].pop) * 100}% precipitation`);
        }
    } catch(error) {
        console.log("fifteenHourForecast() error");
    }
}

// Use Open Meteo
async function sevenDayForecast(lat, lon, tempUnit, windUnit, precipUnit) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=${tempUnit}&windspeed_unit=${windUnit}&precipitation_unit=${precipUnit}&timezone=auto`, {mode: 'cors'});
        const sevenDayData = await response.json();
        console.log("7 DAY FORECAST");
        console.log(sevenDayData);
        for(let i = 0; i < 7; i++) {
            console.log(`${sevenDayData.daily.time[i]}: HIGH ${sevenDayData.daily.temperature_2m_max[i]} ${tempLabel}, LOW ${sevenDayData.daily.temperature_2m_min[i]} ${tempLabel}, ${interpretWeatherCode(sevenDayData.daily.weathercode[i])}`);
        }
    } catch(error) {
        console.log("sevenDayForecast error");
    }
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