export function getWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=c0516e126153fdd7ea8c4f9d0a7a0460`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
    });
}