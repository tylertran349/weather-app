let content = document.querySelector('#content');

let tempLabel, windLabel, distanceLabel, precipLabel;

export function updateDisplayLabelUnits(units) {
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
}

export function displayCurrentWeather(obj) {
    // Clear any weather data that is currently on the screen before displaying new weather data
    //clearWeatherDisplay();

    let currentWeather = document.createElement('div');
    let title = document.createElement('span');
    let temp = document.createElement('span');
    let icon = document.createElement('img');
    let description = document.createElement('span');

    currentWeather.setAttribute('id', 'current-weather');

    // Current weather title
    title.innerHTML = `<strong>Current Weather</strong> - ${obj.location}, ${obj.country}`
    title.setAttribute('id', 'section-title');
    currentWeather.appendChild(title);

    temp.textContent = `${Math.round(obj.temp)} ${getTempLabel()}`;
    temp.setAttribute('id', 'temp');
    currentWeather.appendChild(temp);

    content.appendChild(currentWeather); 
}

function getTempLabel() {
    return tempLabel;
}

function getWindLabel() {
    return windLabel;
}

function getDistanceLabel() {
    return distanceLabel;
}

function clearWeatherDisplay() {
    document.querySelectorAll('#current-weather').remove();
    document.querySelectorAll('#hour-by-hour-weather').remove();
    document.querySelectorAll('#seven-day-weather').remove();
}