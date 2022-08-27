var appid = 'a83cd16f45a517250a52f83592bb80be'; // API KEY 1: 485bbc753e29e9770f09ca55c32c6d79 API KEY 2: a83cd16f45a517250a52f83592bb80be
var q = 'Chicago';

var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;

var toJSON = function(response) {
    return response.json();
}

var displayWeather = function (data, city) {
    console.log(data);
    var currentWeatherLocale = document.getElementById('currentWeather');
    var h2El = document.createElement('h2');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    var uvIndexEl = document.createElement('p');
    h2El.textContent = city.name;
    tempEl.textContent = "Temp: " + data.current.temp + "\xB0 F";
    windEl.textContent = "Wind: " + data.current.wind_speed + "MPH";
    humidityEl.textContent = "Humidity: " + data.current.humidity + "%";
    uvIndexEl.textContent = "UV Index: " + data.current.uvi;
    currentWeatherLocale.appendChild(h2El);
    currentWeatherLocale.appendChild(tempEl);
    currentWeatherLocale.appendChild(windEl);
    currentWeatherLocale.appendChild(humidityEl);
    currentWeatherLocale.appendChild(uvIndexEl);
}

var getOneCall = function(city) {
    var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`;

    fetch(oneCall)
        .then(toJSON)
        .then(function(data) {
            displayWeather(data, city);
        })
}

var getGeo = function (locations) {
    var city = locations[0]
    console.log('Lat', city.lat);
    console.log('Lon', city.lon);

    getOneCall(city);
}

fetch(geoURL)
    .then(toJSON)
    .then(getGeo);