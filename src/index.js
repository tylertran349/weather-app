import { searchLocation } from '../dist/modules/api';

class WeatherAppController {
    constructor(units, tempUnit, windUnit, precipUnit, tempLabel, windLabel, precipLabel, distanceLabel, numHourlyForecasts, numDailyForecasts) {
        this.units = units;
        this.tempUnit = tempUnit;
        this.windUnit = windUnit;
        this.precipUnit = precipUnit;
        this.tempLabel = tempLabel;
        this.windLabel = windLabel;
        this.precipLabel = precipLabel;
        this.distanceLabel = distanceLabel;
        this.numHourlyForecasts = numHourlyForecasts;
        this.numDailyForecasts = numDailyForecasts;
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
    get numHourlyForecasts() {
        return this._numHourlyForecasts;
    }
    get numDailyForecasts() {
        return this._numDailyForecasts;
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
    set numHourlyForecasts(numHourlyForecasts) {
        this._numHourlyForecasts = numHourlyForecasts;
    }
    set numDailyForecasts(numDailyForecasts) {
        this._numDailyForecasts = numDailyForecasts;
    }

    changeUnits(units) {
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
        searchLocation(document.querySelector('#search-box').value); // Search whatever is in the location search box to display new units
    }
}

export let weatherAppObject = new WeatherAppController("imperial", "fahrenheit", "mph", "inch", "°F", "mph", 
"in", "mi", 24, 14); // Create weather object (stores units for the entire webpage)