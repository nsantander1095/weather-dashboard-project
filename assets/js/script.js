var appid = 'a83cd16f45a517250a52f83592bb80be'; // API KEY 1: 485bbc753e29e9770f09ca55c32c6d79 API KEY 2: a83cd16f45a517250a52f83592bb80be
var q = '';

var toJSON = function(response) {
    return response.json();
}

var displayWeather = function (data, city) {
    console.log(data);
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

}