
var cityElement = document.getElementById("enter-city");
var searchElement = document.getElementById("search-button");
// var clearElement = document.getElementById("clear-history");
var cityNameElement = document.getElementById("city-name");
var currentPicElement = document.getElementById("current-pic");
var currentTempElement = document.getElementById("temperature");
var currentWindElement = document.getElementById("wind-speed");
var currentHumidity = document.getElementById("humidity");
var currentUVElement = document.getElementById("UV-index");
var searchHistoryElement = document.getElementById("history");
var currentDate = document.getElementById("date");
var currentWeather = document.getElementById("current-weather");
var searchHistory = JSON.parse(localStorage.getItem("search"));
var APIKey = "40868be632cd135cd6bf8e9cdb5680d1";


//call API based on location
function getWeather(cityName){
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey )
    .then(response => response.json())
    .then(data =>{
        var nameValue = data.name;
        //need to do math in order to conver to farenheit
        var tempValue = Math.round(((parseFloat(data['main']['temp'])-273.15)*1.8)+32) + '&deg';
        var windValue = data.wind.speed;
        var humidValue = data.main.humidity;
        var currentHour = moment.unix(data.dt).format('MMMM Do YYYY');

        cityNameElement.innerHTML = nameValue;
        currentDate.innerHTML = currentHour;
        currentTempElement.innerHTML = "Temperature: " + tempValue + 'F';
        currentWindElement.innerHTML = "Wind Speed: " + windValue;
        currentHumidity.innerHTML = "Humidity: " + humidValue + "%";
       
        //get UV Index
        fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}` + "&appid=" + APIKey )
        .then(response=> response.json())
        .then(data => {
        
        var uvValue = data.current.uvi;
        currentUVElement.innerHTML= "UV Index: " + uvValue;

        if (uvValue > 0 && uvValue <= 3.5){
            $('#uv-color').addClass("low");
        } else if (uvValue > 3.5 &&  uvValue <= 6.5){
            $(`#uv-color`).addClass("moderate");
        } else if (uvValue > 6.5 &&  uvValue <= 10){
            $(`#uv-color`).addClass("high");
        }

       
        var forecastData = data.daily;
        // console.log(forecastData[0].temp.day)

        for (let index = 0; index < forecastData.length; index++) {
            const element = forecastData[index];
            var temp = Math.round(((parseFloat(element.temp.day)-273.15)*1.8)+32) + '&deg' + 'F';
            console.log(element);
            // var currentHour = moment.unix(data.dt).format('MMMM Do YYYY')


            // document.getElementById(`pic-${index}`).innerHTML = element.temp.day;
            document.getElementById(`temperature-${index}`).innerHTML = "Temperature: " + temp;
            document.getElementById(`wind-speed-${index}`).innerHTML = "Wind: " + element.wind_speed;
            document.getElementById(`humidity-${index}`).innerHTML = "Humidity: " + element.humidity;
            document.getElementById(`UV-index-${index}`).innerHTML = "UV-Index: " + element.uvi;

        
        }

     })

    })
}

var saveSearch = document.getElementById("search-button");
saveSearch.onclick = saveData;

function saveData(){
  var input = document.getElementById("enter-city");
  localStorage.setItem("city", input.value);
  var storedValue = localStorage.getItem("city");

  var newCity = document.createElement("button");
  newCity.setAttribute('id', 'newCity');
  newCity.innerHTML = storedValue; 

  document.getElementById("cities").appendChild(newCity);
}

var history = document.getElementById("newCity");


function citySearch () {
    document.getElementById("newCity");
    
}

history.onclick = citySearch();



//add event listener when the button is clicked
    searchElement.addEventListener('click', function(){
        getWeather(cityElement.value);
    })





