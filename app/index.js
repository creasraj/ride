const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const stoppable = require('stoppable');
const router = require('./lib/routes');
const ErrorService = require('./lib/services/error-service');
const logger = require('./lib/services/logger-service');

const app = express();

app.use(ErrorService.ErrorHandler)
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', '5000');
logger.info('Express setup and listening on port 5000')
/**
 * Create HTTP server and wrap in in a stoppable decorator. This allows
 * inflight requests and long life keep-alive connections to be shutdown gracefully
 */
const shutdownGrace = process.env.SHUTDOWN_GRACE || 5000;
const server = stoppable(http.createServer(app), shutdownGrace);
console.info('Shutdown grace period set to ', shutdownGrace);

/**
 * Listen on provided port, on all network interfaces.
 */

app.use('/api/', router);
server.listen('5000');

module.exports = app;
