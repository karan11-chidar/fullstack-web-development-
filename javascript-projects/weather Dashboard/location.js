
import { getCityName } from "./api.js";
// Function to fetch GeoLocation
    export function getUserLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                resolve(getCityName(position.coords.latitude, position.coords.longitude));
            }, error => {
                reject("Location access denied");
            });
        });
    }