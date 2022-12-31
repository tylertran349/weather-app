(()=>{"use strict";let e,t,o,i;!async function(r){let a,n,s;a="fahrenheit",n="mph",s="inch";try{const r=await fetch("https://geocoding-api.open-meteo.com/v1/search?name=Miami&count=1",{mode:"cors"}),a=await r.json();console.log("LOCATION DATA:"),console.log(a),console.log("Location name: "+a.results[0].name),console.log("Latitude: "+a.results[0].latitude),console.log("Longitude: "+a.results[0].longitude),async function(r,a,n,s,l,c){try{await async function(r,a,n){e="°F",t="mph",o="in",i="mi";try{const o=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${r}&lon=${a}&appid=c0516e126153fdd7ea8c4f9d0a7a0460&units=${n}&cnt=5`,{mode:"cors"}),s=await o.json();console.log("CURRENT WEATHER:"),console.log(s),console.log(`Current temperature: ${Math.round(s.main.temp)} ${e}`),console.log(`Current feels like: ${Math.round(s.main.feels_like)} ${e} `),console.log(`Current humidity: ${Math.round(s.main.humidity)} %`),console.log(`Current wind speed: ${Math.round(s.wind.speed)} ${t}`),console.log(`Current conditions: ${s.weather[0].description}`),console.log(`Current visibility: ${s.visibility/1e3} ${i}`)}catch(e){console.log("currentWeatherData() error")}}(r,a,n),await async function(e,t,o){try{const i=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${e}&lon=${t}&appid=c0516e126153fdd7ea8c4f9d0a7a0460&units=${o}`,{mode:"cors"}),r=await i.json();console.log("DATA FOR NEXT 15 HOURS:"),console.log(r);for(let e=0;e<5;e++)console.log(`Forecast time: ${r.list[e].dt_txt}, ${r.list[e].main.temp} F, ${r.list[e].weather[0].description}, ${100*r.list[e].pop}% precipitation`)}catch(e){console.log("fifteenHourForecast() error")}}(r,a,n),await async function(t,o,i,r,a){try{const s=await fetch(`https://api.open-meteo.com/v1/gfs?latitude=${t}&longitude=${o}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=${i}&windspeed_unit=${r}&precipitation_unit=${a}&timezone=auto`,{mode:"cors"}),l=await s.json();console.log("7 DAY FORECAST"),console.log(l);for(let t=0;t<7;t++)console.log(`${l.daily.time[t]}: HIGH ${l.daily.temperature_2m_max[t]} ${e}, LOW ${l.daily.temperature_2m_min[t]} ${e}, ${n=l.daily.weathercode[t],0===n?"Clear sky":1===n?"Mainly clear":2===n?"Partly cloudy":3===n?"Overcast":45===n?"Fog":48===n?"Depositing rime fog":51===n?"Light drizzle":53===n?"Moderate drizzle":55===n?"Drizzle: dense intensity":56===n?"Light freezing drizzle":57===n?"Freezing drizzle: dense intensity":61===n?"Light rain":63===n?"Moderate rain":65===n?"Heavy rain":66===n?"Light freezing rain":67===n?"Heavy freezing rain":71===n?"Light snow":73===n?"Moderate snow":75===n?"Heavy snow":77===n?"Snow grains":80===n?"Light rain showers":81===n?"Moderate rain showers":82===n?"Violent rain showers":85===n?"Light snow showers":86===n?"Heavy snow showers":95===n?"Thunderstorm, slight or moderate, without hail":96===n?"Thunderstorm, slight or moderate, with hail":99===n?"Thunderstorm, heavy, with hail":"Weather description error"}`)}catch(e){console.log("sevenDayForecast error")}var n}(r,a,s,l,c)}catch(e){console.log("makeApiCalls error")}}(a.results[0].latitude,a.results[0].longitude,"imperial","fahrenheit","mph","inch")}catch(e){console.log("getLatAndLon error")}}()})();