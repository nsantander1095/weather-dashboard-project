var appid = 'aa9a3cc1acf925497a48dd50cbf62287'; // API KEY 1: 485bbc753e29e9770f09ca55c32c6d79 API KEY 2: a83cd16f45a517250a52f83592bb80be
var q = 'Charlotte';
var searchBtnEl = document.querySelector('#search');

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
    h2El.textContent = city.name + " (" + moment(data.dt).format('M/D/YYYY') + ")";
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
    var oneCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`;

    fetch(oneCall)
        .then(toJSON)
        .then(function(data) {
            displayWeather(data, city);
            displayForecast(data);
        })
}

var getGeo = function (locations) {
    var city = locations[0]
    console.log('Lat', city.lat);
    console.log('Lon', city.lon);

    getOneCall(city);
}

var displayForecast = function (data) {
    console.log(data);
    var forecastEl = document.getElementById('fiveForecast');
    var h3El = document.createElement('h3');
    h3El.className = 'col-lg-12';
    h3El.textContent = "5-Day Forecast:";
    forecastEl.appendChild(h3El);

    for (var i = 1; i < 6; i++) {
        var cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.style.width = '10rem';
        var cardBodyEl = document.createElement('div');
        cardBodyEl.className = 'card-body';
        var h4El = document.createElement('h4')
        h4El.className = 'card-title';
        var cardTextEl = document.createElement('div');
        cardTextEl.className = 'card-text';
        var tempEl = document.createElement('p');
        var windEl = document.createElement('p');
        var humidityEl = document.createElement('p');
        h4El.textContent = moment(data.daily[i].dt, 'X').format('M/D/YYYY');
        tempEl.textContent = "Temp: " + data.daily[i].temp.day + "\xB0 F";
        windEl.textContent = "Wind: " + data.daily[i].wind_speed + "MPH";
        humidityEl.textContent = "Humidity: " + data.daily[i].humidity + "%";
        forecastEl.appendChild(cardEl);
        cardEl.appendChild(cardBodyEl);
        cardBodyEl.appendChild(h4El);
        cardBodyEl.appendChild(cardTextEl);
        cardTextEl.appendChild(tempEl);
        cardTextEl.appendChild(windEl);
        cardTextEl.appendChild(humidityEl);
    }
}

// var renderLastCities = function () {

// }

fetch(geoURL)
    .then(toJSON)
    .then(getGeo);


    searchBtnEl.addEventListener('click', function() {
        q = document.querySelector('#cityInput').value;
        console.log(q);
        localStorage.setItem('q', q);
        
    })
   