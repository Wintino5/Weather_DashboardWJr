var searchInput = $('#search-input');
var searchBtn = $('#search-btn');

var apiKey = '816e75384c682000c08f075f3bd888ee';
var currentURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial`;
var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=atlanta&appid=${apiKey}&units=imperial`;

// $.get(forecastURL)
//     .then(function(data) {
//         var blocks = data.list;

//         for (var i = 0; i < blocks.length; i++) {
//             var blockObj = blocks[i];

//             // Only work with non time blocks
//             if (blockObj.dt_txt.includes('12:00')) {
//                 // Output an element for each block into the DOM/Window
//             }
//         }
//     });

function getSearchHistory() {
    var rawData = localStorage.getItem('search-history');
    var history = JSON.parse(rawData) || [];

    return history;

}

function getForecastWeather() {
    console.log('forecast');
}

function getCurrentForecast() {
    var cityName = searchInput.val();
    var history = getSearchHistory();

    if (!history.includes(cityName)) {
        // Add the city to the history array
        history.push(cityName)
        // Replace the old history array in the localStorage with the new array
        localStorage.setItem('search-history', JSON.stringify(history));
    }

    // Make a request for current weather using the url and inject the city name value at the end
    $.get(currentURL + `&q=${cityName}`)
        .then(function (data) {
            // Output the current Weather conditions
            console.log(data.main.temp);
            // Retrieve the forecast weather
            
        })
        .then(getForecastWeather)
}


searchBtn.click(getCurrentForecast);

// $('.history').on('click', 'button', function () {
//     console.log('clicked');
// })