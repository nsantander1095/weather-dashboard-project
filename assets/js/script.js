var appid = 'aa9a3cc1acf925497a48dd50cbf62287'; // API KEY 1: 485bbc753e29e9770f09ca55c32c6d79 API KEY 2: a83cd16f45a517250a52f83592bb80be
var q = '';
var searchBtnEl = document.querySelector('#search');
var previousCitiesEl = document.querySelector('#previousCities');


var toJSON = function(response) {
    return response.json();
}

var displayWeather = function (data, city) {
    console.log(data);
    var currentWeatherLocale = document.getElementById('currentWeather');
    currentWeatherLocale.innerHTML = null;
    var h2El = document.createElement('h2');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    var uvIndexEl = document.createElement('p');
    var iconEl = document.createElement('img');
    var icon = data.current.weather[0].icon;
    iconEl.alt = icon;
    iconEl.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    h2El.textContent = city.name + " (" + moment(data.dt).format('M/D/YYYY') + ")";
    tempEl.textContent = "Temp: " + data.current.temp + "\xB0F";
    windEl.textContent = "Wind: " + data.current.wind_speed + "MPH";
    humidityEl.textContent = "Humidity: " + data.current.humidity + "%";
    uvIndexEl.textContent = "UV Index: " + data.current.uvi;
    currentWeatherLocale.appendChild(h2El);
    currentWeatherLocale.appendChild(iconEl);
    currentWeatherLocale.appendChild(tempEl);
    currentWeatherLocale.appendChild(windEl);
    currentWeatherLocale.appendChild(humidityEl);
    currentWeatherLocale.appendChild(uvIndexEl);
}

var displayPrevButtons = function () {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    previousCitiesEl.innerHTML = null;
    for (var city of cities) {
        var cityButtonEl = document.createElement('button');
        cityButtonEl.textContent = city;
        cityButtonEl.className = 'btn btn-secondary mb-3 btn-block';
        previousCitiesEl.appendChild(cityButtonEl);
    }
}

var getOneCall = function(city) {
    var oneCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`;

    fetch(oneCall)
        .then(toJSON)
        .then(function(data) {
            displayWeather(data, city);
            displayForecast(data);
        })
}

var saveToLocalStorage = function (city) {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.push(city);
    var citySet = Array.from(new Set(cities));
    var data = JSON.stringify(citySet);
    localStorage.setItem('cities', data);
    displayPrevButtons(); 
}

var getGeo = function (locations) {
    var city = locations[0]
    console.log('Lat', city.lat);
    console.log('Lon', city.lon);
    saveToLocalStorage(city.name);
    getOneCall(city);
}

var displayForecast = function (data) {
    console.log(data);
    var forecastEl = document.getElementById('fiveForecast');
    var h3El = document.createElement('h3');
    h3El.className = 'col-lg-12';
    h3El.textContent = "5-Day Forecast:";
    forecastEl.appendChild(h3El);
    forecastEl.innerHTML = null;
    for (var i = 1; i < 6; i++) {
        var cardEl = document.createElement('div');
        var cardBodyEl = document.createElement('div');
        cardBodyEl.innerHTML = null;
        var h4El = document.createElement('h4');
        var cardTextEl = document.createElement('div');
        var tempEl = document.createElement('p');
        var windEl = document.createElement('p');
        var humidityEl = document.createElement('p');
        var iconEl = document.createElement('img');
        var icon = data.daily[i].weather[0].icon;
        iconEl.alt = icon;
        iconEl.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        cardEl.className = 'card m-3';
        cardEl.style.width = '10rem';
        cardBodyEl.className = 'card-body';
        h4El.className = 'card-title';
        cardTextEl.className = 'card-text';
        h4El.textContent = moment(data.daily[i].dt, 'X').format('M/D/YYYY');
        tempEl.textContent = "Temp: " + data.daily[i].temp.day + "\xB0F";
        windEl.textContent = "Wind: " + data.daily[i].wind_speed + "MPH";
        humidityEl.textContent = "Humidity: " + data.daily[i].humidity + "%";
        forecastEl.appendChild(cardEl);
        cardEl.appendChild(cardBodyEl);
        cardBodyEl.appendChild(h4El);
        cardBodyEl.appendChild(iconEl);
        cardBodyEl.appendChild(cardTextEl);
        cardTextEl.appendChild(tempEl);
        cardTextEl.appendChild(windEl);
        cardTextEl.appendChild(humidityEl);
    }
}

var searchHandler = function (event) {
    event.preventDefault();

    if (event.target.matches('button')) {
        q = document.querySelector('#cityInput');
        var geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${q.value}&appid=${appid}`;
    
        fetch(geoURL)
            .then(toJSON)
            .then(getGeo);
    }
}

var prevCityHandler = function (event) {
    event.preventDefault();
    q = event.target.textContent;
    var geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;

    fetch(geoURL)
        .then(toJSON)
        .then(getGeo);
}

searchBtnEl.addEventListener('click', searchHandler);
previousCitiesEl.addEventListener('click', prevCityHandler);

displayPrevButtons();