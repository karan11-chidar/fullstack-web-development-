
// Dealyed function
    function delay(ms=5000) {
        return new Promise(( reject) => setTimeout(() => reject(new Error('Request timeout')), ms));
    }


// Function to get city name using geolocation
 export async function getCityName(lati, lon) {
  console.log(
    `Fetching city name for coordinates: Latitude ${lati}, Longitude ${lon}...`,
  );
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lati}&longitude=${lon}&localityLanguage=en`;
    const response = fetch(url);
    const timer = delay(5000); // Simulate a 3-second delay
    const result = await Promise.race([response, timer]);
    if (!result.ok) {
      throw new Error("Failed to fetch city name. Please try again.");
    }
    const data = await result.json();
    console.log("fetching the data :- by using get locattion method :", data);
    return data.locality;
  } catch (error) {
    console.error("Error fetching city name:", error);
  }
}
 // fetch weather data using city name
   export async function fetchWeather(cityName) {
        try {
            console.log(`Fetching weather data for ${cityName}...`);    
            const url = `https://api.weatherapi.com/v1/current.json?key=d58a24dc32a44cb6b6954344261705&q=${cityName}&aqi=yes`;
            const weahterApi = fetch(url);
            const timer = delay(7000); // Simulate a 2-second delay
            const apiResponse = await Promise.race([weahterApi, timer]);
            if (!apiResponse.ok) {
                throw new Error('City not found. Please check the city name and try again.');
            }
            const weatherData = await apiResponse.json();
            return weatherData;
        }catch (error) {
            console.error('Error fetching weather data:', error);
        }
        finally {
            
        }
}