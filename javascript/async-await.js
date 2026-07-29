
function getUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject("Location access denied");
      },
    );
  });
}
async function getCityName(lati, lon) {
    try {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lati}&longitude=${lon}&localityLanguage=en`;
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to fetch city name. Please try again.');
        }
    }catch (error) {
        console.error('Error fetching city name:', error);
    }
}
fu