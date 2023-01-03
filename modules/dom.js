import { weatherAppObject } from '../../src/index';

let content = document.querySelector('#content');

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
    icon.setAttribute('src', `./images/${interpretOpenWeatherIcon(obj.icon)}`);
    icon.setAttribute('title', `${obj.description}`);
    currentWeather.appendChild(icon);

    description.textContent = (obj.description).charAt(0).toUpperCase() + (obj.description).slice(1); // slice(1) gets rest of description besides first character
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
    value.textContent = `${obj.visibility / 1000} ${weatherAppObject.distanceLabel}`;
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
        return "mist.svg";
    }
}

function clearWeatherDisplay() {
    let currentWeather = document.querySelector('#current-weather');
    let hourByHourWeather = document.querySelector('#hour-by-hour-weather');
    let sevenDayWeather = document.querySelector('#seven-day-weather');
    if(currentWeather !== null) {
        currentWeather.remove();
    }
    if(hourByHourWeather !== null) {
        hourByHourWeather.remove();
    }
    if(sevenDayWeather !== null) {
        sevenDayWeather.remove();
    }
}