const mysql = require('mysql');

const dbConfig = require('../../config/database');

// Database setup
const pool = mysql.createPool(dbConfig.connection);

// Returns a connection to the db
const getConnection = function (callback) {
  pool.getConnection(function (err, conn) {
    callback(err, conn);
  });
};

// Helper function for querying the db; releases the db connection
// callback(err, rows)
const query = function (queryString, params, callback) {
  getConnection(function (err, conn) {
    if (err)
      return callback(err);
    conn.query(queryString, params, function (err, rows) {
      conn.release();
      if (err)
        return callback(err);
      return callback(err, rows);
    });
  });
};

// Heartbeat function to keep the connection to the database up
const keepAlive = function () {
  getConnection(function (err, conn) {
    if (err)
      return;
    conn.ping();
    conn.release();
  });
};

// Set up a keepalive heartbeat
setInterval(keepAlive, 30000);

exports.query = query;
