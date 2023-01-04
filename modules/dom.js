import { weatherAppObject } from '../../src/index';
import { searchLocation } from './api';

let content = document.querySelector('#content');
let searchButton = document.querySelector('#search-button');
let searchBox = document.querySelector('#search-box');
let checkbox = document.querySelector('#checkbox');

searchButton.addEventListener('click', searchWeather, false); // Event listener for search button

// Event listener for units toggle slider
checkbox.addEventListener('change', function() {
    if(this.checked) {
        weatherAppObject.changeUnits("metric"); // Update units stored in the webpage's master object (in index.js)
        document.querySelector('#switch-fahrenheit').style.color = "white";
        document.querySelector('#switch-celsius').style.color = "#303030";
    } else {
        weatherAppObject.changeUnits("imperial"); // Update units stored in the webpage's master object (in index.js)
        document.querySelector('#switch-fahrenheit').style.color = "#303030";
        document.querySelector('#switch-celsius').style.color = "white";
    }
});

function searchWeather(event) {
    event.preventDefault();
    searchLocation(searchBox.value);
}

export function displayCurrentWeather(obj) {
    // Clear any weather data that is currently on the screen before displaying new weather data
    clearWeatherDisplay();

    let currentWeather = document.createElement('div');
    let title = document.createElement('span');
    let temp = document.createElement('span');
    let icon = document.createElement('img');
    let description = document.createElement('span');

    // Re-use these elements multiple times when creating feels like, wind, humidity, and visibility subsections
    let subsection; 
    let valueTitle;
    let value;

    currentWeather.setAttribute('id', 'current-weather');

    // Current weather title
    title.innerHTML = `<strong>Current Weather</strong> - ${obj.location}, ${obj.country}`;
    title.setAttribute('id', 'section-title');
    currentWeather.appendChild(title);

    temp.textContent = `${Math.round(obj.temp)} ${weatherAppObject.tempLabel}`;
    temp.setAttribute('id', 'temp');
    currentWeather.appendChild(temp);

    icon.setAttribute('id', 'icon');
    icon.setAttribute('src', `./assets/${interpretOpenWeatherIcon(obj.icon)}`);
    icon.setAttribute('title', `${obj.description.charAt(0).toUpperCase() + (obj.description).slice(1)}`);
    currentWeather.appendChild(icon);

    description.textContent = obj.description.charAt(0).toUpperCase() + (obj.description).slice(1); // slice(1) gets rest of description besides first character
    description.setAttribute('id', 'description');
    currentWeather.appendChild(description);

    // Feels like subsection
    subsection = document.createElement('div');
    valueTitle = document.createElement('span');
    value = document.createElement('span');
    valueTitle.textContent = "Feels Like";
    valueTitle.setAttribute('id', 'value-title');
    subsection.appendChild(valueTitle);
    value.textContent = `${Math.round(obj.feelsLike)} ${weatherAppObject.tempLabel}`;
    value.setAttribute('id', 'value');
    subsection.setAttribute('id', 'subsection');
    subsection.appendChild(value);
    currentWeather.appendChild(subsection);

    // Wind subsection
    subsection = document.createElement('div');
    valueTitle = document.createElement('span');
    value = document.createElement('span');
    valueTitle.textContent = "Wind";
    valueTitle.setAttribute('id', 'value-title');
    subsection.appendChild(valueTitle);
    value.textContent = `${Math.round(obj.wind)} ${weatherAppObject.windLabel}`;
    value.setAttribute('id', 'value');
    subsection.setAttribute('id', 'subsection');
    subsection.appendChild(value);
    currentWeather.appendChild(subsection);

    // Humidity subsection
    subsection = document.createElement('div');
    valueTitle = document.createElement('span');
    value = document.createElement('span');
    valueTitle.textContent = "Humidity";
    valueTitle.setAttribute('id', 'value-title');
    subsection.appendChild(valueTitle);
    value.textContent = `${obj.humidity}%`;
    value.setAttribute('id', 'value');
    subsection.setAttribute('id', 'subsection');
    subsection.appendChild(value);
    currentWeather.appendChild(subsection);

    // Visibility subsection
    subsection = document.createElement('div');
    valueTitle = document.createElement('span');
    value = document.createElement('span');
    valueTitle.textContent = "Visibility";
    valueTitle.setAttribute('id', 'value-title');
    subsection.appendChild(valueTitle);
    value.textContent = `${Math.round(obj.visibility / 1000)} ${weatherAppObject.distanceLabel}`;
    value.setAttribute('id', 'value');
    subsection.setAttribute('id', 'subsection');
    subsection.appendChild(value);
    currentWeather.appendChild(subsection);

    content.appendChild(currentWeather); 
}

function interpretOpenWeatherIcon(iconCode) {
    if(iconCode === "01d" || iconCode === "01n") {
        return "sunny.svg";
    } else if(iconCode === "02d" || iconCode === "02n") {
        return "partly-cloudy.svg";
    } else if(iconCode === "03d" || iconCode === "03n") {
        return "mostly-cloudy.svg";
    } else if(iconCode === "04d" || iconCode === "04n") {
        return "cloudy.svg";
    } else if(iconCode === "09d" || iconCode === "09n") {
        return "showers.svg";
    } else if(iconCode === "10d" || iconCode === "10n") {
        return "rain.svg";
    } else if(iconCode === "11d" || iconCode === "11n") {
        return "thunderstorms.svg";
    } else if(iconCode === "13d" || iconCode === "13n") {
        return "snow.svg";
    } else if(iconCode === "50d" || iconCode === "50n") {
        return "fog.svg";
    }
}

function clearWeatherDisplay() {
    let currentWeather = document.querySelectorAll('#current-weather');
    let hourByHourWeather = document.querySelectorAll('#hour-by-hour-weather');
    let fourteenDayWeather = document.querySelectorAll('#fourteen-day-weather');
    if(currentWeather !== null) {
        currentWeather.forEach((element) => {
            element.remove();
        });
    }
    if(hourByHourWeather !== null) {
        hourByHourWeather.forEach((element) => {
            element.remove();
        });
    }
    if(fourteenDayWeather !== null) {
        fourteenDayWeather.forEach((element) => {
            element.remove();
        });
    }
}

export function showErrorPopup(text) {
    document.querySelector('#error-message').textContent = text; // Add the current error message to the error popup before displaying error popup
    document.querySelector('#error-popup').style.display = "flex";
}

export function hideErrorPopup() {
    document.querySelector('#error-popup').style.display = "none";
}

export function displayHourByHourWeather(obj) {
    let hourByHourWeather = document.createElement('div');
    hourByHourWeather.setAttribute('id', 'hour-by-hour-weather');

    let sectionTitle = document.createElement('span');
    sectionTitle.textContent = "Hour-by-Hour Forecast";
    sectionTitle.setAttribute('id', 'section-title');
    hourByHourWeather.appendChild(sectionTitle);

    let subsections = document.createElement('div');
    subsections.setAttribute('id', 'subsections');

    for(let i = 0; i < 12; i++) {
        let subsection = document.createElement('div');
        subsection.setAttribute('id', 'subsection');

        let dateAndTime = document.createElement('span');
        let tempDate = new Date(obj.hourlyTimes[i] * 1000).toLocaleDateString("en-US"); // Formats Unix date to MM/DD/YYYY
        let tempTime = new Date(obj.hourlyTimes[i] * 1000).toLocaleTimeString("en-US"); // Formats Unix time to the following format: 8:00:00 PM
        dateAndTime.textContent = `${tempDate.slice(0, -5)} ${formatTime(tempTime)}`;
        dateAndTime.setAttribute('id', 'date-and-time');
        subsection.appendChild(dateAndTime);

        let icon = document.createElement('img');
        icon.setAttribute('src', `./assets/${weatherCodeToIcon(obj.hourlyDescriptions[i])}`);
        icon.setAttribute('title', `${weatherCodeToDescription(obj.hourlyDescriptions[i])}`);
        icon.setAttribute('id', 'icon');
        subsection.appendChild(icon);

        let description = document.createElement('span');
        description.textContent = `${weatherCodeToDescription(obj.hourlyDescriptions[i])}`;
        description.setAttribute('id', 'description');
        subsection.appendChild(description);

        let temp = document.createElement('span');
        temp.innerHTML = `Temp <strong>${Math.round(obj.hourlyTemps[i])} ${weatherAppObject.tempLabel}</strong>`;
        subsection.appendChild(temp);

        let wind = document.createElement('span');
        wind.innerHTML = `Wind <strong>${Math.round(obj.hourlyWinds[i])} ${weatherAppObject.windLabel}</strong>`;
        subsection.appendChild(wind);
        
        subsections.appendChild(subsection);
    }

    hourByHourWeather.appendChild(subsections);
    content.appendChild(hourByHourWeather);
}

// Function to convert 8:00:00 PM to 8PM
function formatTime(time) {
    let data = time.split(':');
    return `${data[0]}${data[2].slice(3, 5)}`;
}

function weatherCodeToDescription(code) {
    if(code === 0) {
        return "Clear sky";
    } else if(code === 1) {
        return "Mainly clear";;
    } else if(code === 2) {
        return "Partly cloudy";
    } else if(code === 3) {
        return "Overcast";
    } else if(code === 45 || code === 48) {
        return "Fog";
    } else if(code === 51 || code === 53 || code === 55) {
        return "Drizzle";
    } else if(code === 56 || code === 57) {
        return "Freezing drizzle";
    } else if(code === 61) {
        return "Light rain";
    } else if(code === 63) {
        return "Moderate rain";
    } else if(code === 65) {
        return "Heavy rain";
    } else if(code === 66 || code === 67) {
        return "Freezing rain";
    } else if(code === 71) {
        return "Light snow";
    } else if(code === 73) {
        return "Moderate snow";
    } else if(code === 75) {
        return "Heavy snow";
    } else if(code === 77) {
        return "Snow grains";
    } else if(code === 80 || code === 81 || code === 82) {
        return "Light rain showers";
    } else if(code === 85) {
        return "Light snow showers";
    } else if(code === 86) {
        return "Heavy snow showers";
    } else if(code === 95 || code === 96 || code === 99) {
        return "Thunderstorms";
    } else {
        return "Description error";
    }
}

function weatherCodeToIcon(code) {
    if(code === 0) {
        return "sunny.svg";
    } else if(code === 1) {
        return "partly-cloudy.svg";
    } else if(code === 2) {
        return "partly-cloudy.svg";
    } else if(code === 3) {
        return "cloudy.svg";
    } else if(code === 45) {
        return "cloudy.svg";
    } else if(code === 48) {
        return "cloudy.svg";
    } else if(code === 51) {
        return "fog.svg";
    } else if(code === 53) {
        return "fog.svg";
    } else if(code === 55) {
        return "fog.svg";
    } else if(code === 56) {
        return "fog.svg";
    } else if(code === 57) {
        return "fog.svg";
    } else if(code === 61) {
        return "rain.svg";
    } else if(code === 63) {
        return "rain.svg";
    } else if(code === 65) {
        return "rain.svg";
    } else if(code === 66) {
        return "freezing-rain.svg";
    } else if(code === 67) {
        return "freezing-rain.svg";
    } else if(code === 71) {
        return "snow.svg";
    } else if(code === 73) {
        return "snow.svg";
    } else if(code === 75) {
        return "snow.svg";
    } else if(code === 77) {
        return "snow.svg";
    } else if(code === 80) {
        return "showers.svg";
    } else if(code === 81) {
        return "showers.svg";
    } else if(code === 82) {
        return "showers.svg";
    } else if(code === 85) {
        return "snow.svg";
    } else if(code === 86) {
        return "snow.svg";
    } else if(code === 95) {
        return "thunderstorms.svg";
    } else if(code === 96) {
        return "thunderstorms.svg";
    } else if(code === 99) {
        return "thunderstorms.svg";
    } else {
        return "unknown.svg";
    }
}

export function displayFourteenDayWeather(obj) {
    let fourteenDayWeather = document.createElement('div');
    fourteenDayWeather.setAttribute('id', 'fourteen-day-weather');

    let sectionTitle = document.createElement('span');
    sectionTitle.textContent = "14-Day Forecast";
    sectionTitle.setAttribute('id', 'section-title');
    fourteenDayWeather.appendChild(sectionTitle);

    let subsections = document.createElement('div');
    subsections.setAttribute('id', 'subsections');

    for(let i = 0; i < 14; i++) {
        let subsection = document.createElement('div');
        subsection.setAttribute('id', 'subsection');

        let dateAndTime = document.createElement('span');
        let tempDate = new Date(obj.dailyDates[i] * 1000).toLocaleDateString("en-US"); // Formats Unix date to MM/DD/YYYY
        dateAndTime.textContent = `${tempDate.slice(0, -5)}`;
        dateAndTime.setAttribute('id', 'date-and-time');
        subsection.appendChild(dateAndTime);

        let icon = document.createElement('img');
        icon.setAttribute('src', `./assets/${weatherCodeToIcon(obj.dailyDescriptions[i])}`);
        icon.setAttribute('title', `${weatherCodeToDescription(obj.dailyDescriptions[i])}`);
        icon.setAttribute('id', 'icon');
        subsection.appendChild(icon);

        let description = document.createElement('span');
        description.textContent = `${weatherCodeToDescription(obj.dailyDescriptions[i])}`;
        description.setAttribute('id', 'description');
        subsection.appendChild(description);

        let highTemp = document.createElement('span');
        highTemp.innerHTML = `High <strong>${Math.round(obj.dailyHighs[i])} ${weatherAppObject.tempLabel}</strong>`;
        subsection.appendChild(highTemp);

        let lowTemp = document.createElement('span');
        lowTemp.innerHTML = `Low <strong>${Math.round(obj.dailyLows[i])} ${weatherAppObject.tempLabel}</strong>`;
        subsection.appendChild(lowTemp);

        subsections.appendChild(subsection);
    }

    fourteenDayWeather.appendChild(subsections);
    content.appendChild(fourteenDayWeather);
}