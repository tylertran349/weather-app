import { searchLocation } from '../dist/modules/api';

let searchButton = document.querySelector('#search-button');
let searchBox = document.querySelector('#search-box');
let checkbox = document.querySelector('#checkbox');

function greeting() {
    console.log("Hello world");
}

export class WeatherAppController {
    constructor(units, tempUnit, windUnit, precipUnit, tempLabel, windLabel, precipLabel, distanceLabel) {
        this.units = units;
        this.tempUnit = tempUnit;
        this.windUnit = windUnit;
        this.precipUnit = precipUnit;
        this.tempLabel = tempLabel;
        this.windLabel = windLabel;
        this.precipLabel = precipLabel;
        this.distanceLabel = distanceLabel;
    }

    get units() {
        return this._units;
    }
    get tempUnit() {
        return this._tempUnit;
    }
    get windUnit() {
        return this._windUnit;
    }
    get precipUnit() {
        return this._precipUnit;
    }
    get tempLabel() {
        return this._tempLabel;
    }
    get windLabel() {
        return this._windLabel;
    }
    get precipLabel() {
        return this._precipLabel;
    }
    get distanceLabel() {
        return this._distanceLabel;
    }

    set units(units) {
        this._units = units;
    }
    set tempUnit(tempUnit) {
        this._tempUnit = tempUnit;
    }
    set windUnit(windUnit) {
        this._windUnit = windUnit;
    }
    set precipUnit(precipUnit) {
        this._precipUnit = precipUnit;
    }
    set tempLabel(tempLabel) {
        this._tempLabel = tempLabel;
    }
    set windLabel(windLabel) {
        this._windLabel = windLabel;
    }
    set precipLabel(precipLabel) {
        this._precipLabel = precipLabel;
    }
    set distanceLabel(distanceLabel) {
        this._distanceLabel = distanceLabel;
    }
}

export let weatherAppObject = new WeatherAppController("imperial", "fahrenheit", "mph", "inch", "°F", "mph", 
"in", "mi"); // Create weather object (stores units for the entire webpage)

function searchWeather(event) {
    event.preventDefault();
    searchLocation(searchBox.value);
}

searchButton.addEventListener('click', searchWeather, false);
checkbox.addEventListener('change', function() {
    if(this.checked) {
        changeUnits("metric"); // Call changeUnits to change units in api.js
    } else {
        changeUnits("imperial"); // Call changeUnits to change units in api.js
    }
});

function changeUnits(units) {
    weatherAppObject.units = units;
    if(weatherAppObject.units === "imperial") {
        weatherAppObject.tempUnit = "fahrenheit";
        weatherAppObject.windUnit = "mph";
        weatherAppObject.precipUnit = "inch";
        weatherAppObject.tempLabel = "°F";
        weatherAppObject.windLabel = "mph";
        weatherAppObject.precipLabel = "in";
        weatherAppObject.distanceLabel = "mi";
    }
    if(weatherAppObject.units === "metric") {
        weatherAppObject.tempUnit = "celsius";
        weatherAppObject.windUnit = "ms";
        weatherAppObject.precipUnit = "mm";
        weatherAppObject.tempLabel = "°C";
        weatherAppObject.windLabel = "m/s";
        weatherAppObject.precipLabel = "mm";
        weatherAppObject.distanceLabel = "km";
    }
    console.log(document.querySelector('#search-box').value);
    searchLocation(document.querySelector('#search-box').value); // Re-search whatever was in the location search box to display new units
}