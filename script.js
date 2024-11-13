const inputbox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchbtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('#humidity');
const wind_speed = document.querySelector('#windspeed');
const locationName = document.querySelector('.location-name');
const loading = document.querySelector('.loading');
const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

async function checkWeather(city) {
    loading.style.display = "block";
    locationNotFound.style.display = "none";
    weatherBody.style.display = "none";

    const api_key = "19ba7bad07dd7cb898df3169614f5b8b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    
    try {
        const weather_data = await fetch(url).then(response => response.json());
        if (weather_data.cod === '404') {
            locationNotFound.style.display = "flex";
            loading.style.display = "none";
            return;
        }

        locationNotFound.style.display = "none";
        weatherBody.style.display = "flex";
        loading.style.display = "none";

        locationName.innerHTML = weather_data.name;
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "/images/cloudy.png";
                break;
            case 'Clear':
                weather_img.src = "/images/cloudsun.png";
                break;
            case 'Rain':
                weather_img.src = "/images/thunder.png";
                break;
            case 'Mist':
                weather_img.src = "/images/rainy.png";
                break;
            case 'Snow':
                weather_img.src = "/images/ice.png";
                break;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        locationNotFound.style.display = "flex";
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputbox.value);
});