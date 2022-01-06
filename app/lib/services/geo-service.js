const dataAccessService = require('../data-access/data-access-service');
const queries = require('../data-access/queries');

class GeoService {

    async getAll(latitude, longitude, radius, count) {
        radius = radius / 1000
        const query = queries.fetchLocations;
        return new Promise ((resolve, reject) =>
        {
            dataAccessService.query(query, [latitude, latitude, longitude, radius, count], function (err, rows) {
                if (err)
                    throw err;
                resolve(rows)
            });
        })
    }
}

module.exports = GeoService;
