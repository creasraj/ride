const API_URL = 'http://localhost:5000'
import queryUtil from '../utilities/queryString';

class ApiService {
  static async fetchScooters(maxCount, latitude, longitude, radius) {
    const response = await fetch(`${API_URL}/api/markers/fetchLocations`, {
      method: 'POST',
      mode: 'cors',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({
        maxCount, latitude, longitude, radius,
      })
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  }

  static async fetchTrips(size, page) {
    const query = queryUtil.getQueryString({
     size,
     page,
    });
    console.log(query);
    const response = await fetch(`${API_URL}/api/trips/fetchTrips${query}`, {
      method: 'GET',
      mode: 'cors',
      headers: { "Content-Type" : "application/json" }
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  }
}

export default ApiService;
