import { getLatAndLon } from '../dist/modules/api';

getLatAndLon(79832);

let searchButton = document.querySelector('#search-button');
let searchBox = document.querySelector('#search-box');

function printGreeting(event) {
    event.preventDefault();
    console.log(searchBox.value);
}

searchButton.addEventListener('click', printGreeting, false);