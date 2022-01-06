const dataAccessService = require('../data-access/data-access-service');
const queries = require('../data-access/queries');

class TripService {

    async getAll(size, page) {
        const offset = (page - 1) * size;
        const query = queries.fetchTrips;
        return new Promise ((resolve, reject) =>
        {
            dataAccessService.query(query, [size, offset], function (err, rows) {
                if (err)
                    throw err;
                resolve(rows)
            });
        })
    }
}

module.exports = TripService;
