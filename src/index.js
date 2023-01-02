import { searchLocation } from '../dist/modules/api';

let searchButton = document.querySelector('#search-button');
let searchBox = document.querySelector('#search-box');

function searchWeather(event) {
    event.preventDefault();
    searchLocation(searchBox.value);
}

searchButton.addEventListener('click', searchWeather, false);