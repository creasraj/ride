module.exports = {
     fetchLocations : `SELECT b.*, g.GeoId, g.Latitude, g.Longitude, (
          acos (
           sin (radians(g.Latitude) ) * sin(radians(?))
           + cos(radians(?)) * cos(radians(g.Latitude)) * cos(radians(g.Longitude) - radians(?))
              ) * 6367
            ) AS distance
          FROM geolocations g
          INNER JOIN markers m ON m.GeoId = g.GeoId
          INNER JOIN bikes b ON m.BikeId = b.BikeId
          HAVING distance < ?
          ORDER BY distance
          LIMIT 0 , ?`,
     fetchTrips: 'SELECT * FROM trips LIMIT ? OFFSET ?',
};
