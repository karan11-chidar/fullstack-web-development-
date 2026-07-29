import { fetchWeather } from "./api.js";
import { getUserLocation } from "./location.js";

document.addEventListener('DOMContentLoaded', function () {
    // Dom elements inputs ids
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const fetchLocationBtn = document.getElementById('geo-btn');
    const locationName = document.getElementById('location-name');
    const currentDate = document.getElementById('current-date');
    const tempC = document.getElementById('temp-val');
    const weatherIcon = document.getElementById('weather-show-icon');
    const weatherIconCloud = document.getElementById('cloud-icon');
    const weatherCondition = document.getElementById('weather-condition');
    const suggestionsDesc = document.getElementById('suggestion-desc');
    const windSpeed = document.getElementById('wind-val');
    const humiditySpeed = document.getElementById('humidity-val');
    const uvIndex = document.getElementById('uv-val');
    const airPressure = document.getElementById('pressure-val');
    const forecastTimes = [
        document.getElementById('forecast-time-1'),
        document.getElementById('forecast-time-2'),
        document.getElementById('forecast-time-3'),
        document.getElementById('forecast-time-4')
    ];
    const forecastTemps = [
        document.getElementById('forecast-temp-1'),
        document.getElementById('forecast-temp-2'),
        document.getElementById('forecast-temp-3'),
        document.getElementById('forecast-temp-4')
    ];
    // input validation
    function isValidCityName(cityName) {
        if (cityName.trim() === '') {
            return false;
        }
        const regex = /^[a-zA-Z\s-]+$/;
        return regex.test(cityName);
    }

    // Function to format date
    function formatDate(dateString) {
      const date = new Date(dateString); // API se aaya hua date/time yahan daal

      return date.toLocaleDateString("en-IN", {
        weekday: "long", // Jaise: Sunday
        day: "numeric", // Jaise: 17
        month: "long", // Jaise: May
        year: "numeric", // Jaise: 2026
      });
    }

    // Function to get weather suggestions based on conditions
    function getWeatherSuggestion(weatherText, temp, humidity, wind, uv) {
      weatherText = weatherText.toLowerCase();

      if (weatherText.includes("rain")) {
        return "🌧️ Don't forget your umbrella today.";
      }

      if (weatherText.includes("sunny")) {
        return "☀️ It's sunny outside. Wear sunglasses.";
      }

      if (weatherText.includes("cloud")) {
        return "☁️ Cloudy weather feels relaxing today.";
      }

      if (weatherText.includes("snow")) {
        return "❄️ Snowfall expected. Wear heavy warm clothes.";
      }

      if (wind >= 40) {
        return "🌪️ Strong winds outside. Travel carefully.";
      }

      if (humidity >= 80) {
        return "💧 Humidity is high. Stay hydrated.";
      }

      if (uv >= 8) {
        return "☀️ UV rays are very strong today.";
      }

      if (temp >= 35) {
        return "🔥 It's extremely hot outside.";
      }

      if (temp <= 10) {
        return "🧥 It's very cold outside.";
      }

      return "😄 Weather looks good today.";
    }

    // update DOM with weather data
    function updateUI(weatherData) {
        if (weatherData === undefined) {
            return;
        }
        // Update location and date
        const city = weatherData.location.name;
        const weatherDate = weatherData.location.localtime.split(" ")[0];
        const cloudIcon = weatherData.current.condition.icon;
        const weatherText = weatherData.current.condition.text;
        const temp = weatherData.current.temp_c;
        const wind = weatherData.current.wind_kph;
        const humidity = weatherData.current.humidity;
        const uv = weatherData.current.uv;
        const pressure = weatherData.current.pressure_mb;
    console.log('Temp:', temp);

        tempC.textContent = `${temp}`;
        weatherCondition.textContent = weatherText;
        locationName.textContent  = city;
        currentDate.textContent = formatDate(weatherDate);
        windSpeed.textContent = `${wind} km/h`;
        humiditySpeed.textContent = `${humidity}%`;
        uvIndex.textContent = uv;
        airPressure.textContent = `${pressure} mb`;
        // Update weather icon
        const existingIcon = document.getElementById("newCloud-icon");

        if (existingIcon) {
          existingIcon.remove();
        }
        const newCloudIcon = document.createElement('img');
        newCloudIcon.id = 'newCloud-icon';
        newCloudIcon.src = cloudIcon;
        newCloudIcon.alt = weatherText;
        weatherIcon.insertAdjacentElement('afterbegin', newCloudIcon);   
        
        // Get weather suggestion
        const suggestion = getWeatherSuggestion(weatherText, temp, humidity, wind, uv);
        suggestionsDesc.textContent = suggestion;
    }
    // Fetching data from weather api
    searchBtn.addEventListener('click', async function () {
      console.log("Fetching weather data...");
      const city = cityInput.value;
      console.log(`User entered city: ${city}`);
      searchBtn.innerText = "Searching...";
      searchBtn.disabled = true;
      try {
        if (!isValidCityName(city)) {
          alert(
            "Please enter a valid city name (letters, spaces, and hyphens only).",
          );
          return;
        }
          const weatherData = await fetchWeather(city);
          console.log('Fetched in city search event listener:', city);   
          console.log("Weather data fetched successfully:", weatherData);

        updateUI(weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        alert(
          "Unable to fetch weather data. Please check the city name and try again.",
        );
      } finally {
        searchBtn.innerText = "Search";
        searchBtn.disabled = false;
        console.log("Weather data fetch attempt completed.");
      }
    });
    // fetching data using geolocation
    fetchLocationBtn.addEventListener('click', async function () {
      console.log("Fetching location...");
        fetchLocationBtn.innerText = "Finding location...";
        fetchLocationBtn.disabled = true;
      try {
        const cityName = await getUserLocation();
        if (!isValidCityName(cityName)) {
          alert(
            "Please enter a valid city name (letters, spaces, and hyphens only).",
          );
          return;
        }
          const weatherData = await fetchWeather(cityName);
          console.log('Fetched in geolocation event listener:', cityName);
          console.log("Weather data fetched successfully:", weatherData);
        updateUI(weatherData);
      } catch (error) {
        console.error("Error fetching location:", error);
        alert(
          "Unable to access location. Please allow location access and try again.",
        );
      } finally {
        fetchLocationBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="3"></circle>
                    <line x1="12" y1="1" x2="12" y2="4"></line>
                    <line x1="12" y1="20" x2="12" y2="23"></line>
                    <line x1="1" y1="12" x2="4" y2="12"></line>
                    <line x1="20" y1="12" x2="23" y2="12"></line>
                </svg>`;
          fetchLocationBtn.disabled = false;

        console.log("Location fetch attempt completed.");
      }
    });
});