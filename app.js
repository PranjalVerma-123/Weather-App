const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
}


const searchInputBox = document.getElementById('input-box');
// EventListenr Function on keypress
searchInputBox.addEventListener('keypress', (event) => {

    if(event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display="block";
    }

});


// Get weather Report

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

//Show weather Report
function showWeatherReport(weather){
  console.log(weather);
  let city = document.getElementById('city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temp=document.getElementById('temp');
  temp.innerHTML=`${Math.floor(weather.main.temp)}&deg;C`;

  let tempfeel=document.getElementById('temp-feel');
  tempfeel.innerHTML=`Feels like: ${Math.floor(weather.main.feels_like)}&deg;C`;

  let humidity=document.getElementById('humidity');
  humidity.innerHTML=`Humidity : ${Math.floor(weather.main.humidity)}%`;

  let minMaxTemp = document.getElementById('min-max');
  minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

  let weatherType = document.getElementById('weather');
  weatherType.innerHTML = `${weather.weather[0].main}`;

  let date = document.getElementById('date');
  let todayDate = new Date();
  date.innerText= dateManage(todayDate);

  if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpg')";

    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";

    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";

    }     else if(weatherType.textContent == 'Rain') {

        document.body.style.backgroundImage = "url('images/rain.jpg')";

    } else if(weatherType.textContent == 'Snow') {

        document.body.style.backgroundImage = "url('images/snow.jpg')";

    } else if(weatherType.textContent == 'Thunderstorm') {

        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";

    }
}
// Date Manager

function dateManage(dateArg){
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
}
