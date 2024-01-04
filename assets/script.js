var searchInput = $('#search-input');
var searchBtn = $('#search-btn');

var apiKey = '816e75384c682000c08f075f3bd888ee';
var currentURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial`;
var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?&appid=${apiKey}&units=imperial`;

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

function renderSearchHistory(history) {
    var historyContainer = $('.history');
    historyContainer.empty();

    history.forEach(function (city) {
        var button = $('<button>').text(city);
        button.on('click', function () {
            searchInput.val(city);
            getCurrentWeather(city);
            getForecastWeather(city);
        });
        historyContainer.append(button);
    });
    
    return history;
}

function getSearchHistory() {
    var rawData = localStorage.getItem('search-history');
    return JSON.parse(rawData) || [];
}

function getForecastWeather(cityName) {
    $.get(forecastURL + `&q=${cityName}`)
        .then(function (data) {
            var forecastBlocks = data.list;
            var filteredForecast = forecastBlocks.filter(function (block) {
                return block.dt_txt.includes('12:00');
            });

            $('.weather-cards .card').each(function (index, card) {
                var forecastDay = filteredForecast[index];
                $(card).find('h3').text(new Date(forecastDay.dt * 1000).toLocaleDateString());
                $(card).find('img').attr('src', `https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png`);
                $(card).find('h4:nth-of-type(1)').text(`Temp: ${forecastDay.main.temp} °F`);
                $(card).find('h4:nth-of-type(2)').text(`Wind: ${forecastDay.wind.speed} mph`);
                $(card).find('h4:nth-of-type(3)').text(`Humidity: ${forecastDay.main.humidity}%`);
            });

            // filteredForecast.forEach(function (forecastDay) {
            //     var date = forecastDay.dt_txt.split(' ')[0];
            //     var temperature = forecastDay.main.temp;
            //     var windSpeed = forecastDay.wind.speed;
            //     var humidity = forecastDay.main.humidity;

            //     console.log(`Date: ${date}`);
            //     console.log(`Temp: ${temperature} degrees F`);
            //     console.log(`Wind Speed: ${windSpeed} mph`);
            //     console.log(`Humidity: ${humidity}%`);

            // });
            
        });
    }
function getCurrentWeather(cityName) {
    // Make a request for current weather using the url and inject the city name value at the end
    $.get(currentURL + `&q=${cityName}`)
        .then(function (data) {
            $('.current-weather .details h2').text(`${cityName} (${new Date().toLocaleDateString()})`);
            $('.current-weather .details h4:nth-of-type(1)').text(`Temp: ${data.main.temp} °F`);
            $('.current-weather .details h4:nth-of-type(2)').text(`Wind: ${data.wind.speed} mph`);
            $('.current-weather .details h4:nth-of-type(3)').text(`Humidity: ${data.main.humidity}%`);
            $('.current-weather .icon img').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
            $('.current-weather .icon h4').text(data.weather[0].description);

        })
        .then(getForecastWeather)
}

searchBtn.click(function() {
    var cityName = searchInput.val();
    console.log(typeof cityName, cityName);
    if (cityName) {
        getCurrentWeather(cityName);
        getForecastWeather(cityName);

        var history = getSearchHistory();

        if (!history.includes(cityName)) {
            // Add the city to the history array
            history.push(cityName)
            // Replace the old history array in the localStorage with the new array
            localStorage.setItem('search-history', JSON.stringify(history));
            renderSearchHistory(history);
        }
    }

    var initialHistory = getSearchHistory();
    renderSearchHistory(initialHistory);


    
});


searchBtn.click(getCurrentWeather);

// $('.history').on('click', 'button', function () {
//     console.log('clicked');
// })