const logger = require( "./logger-service" );
class ErrorService {
   static ErrorHandler( error, req, res, next ) {
       let parsedError;

       // Attempt to gracefully parse error object
       try {
           if ( error && typeof error === "object" ) {
               parsedError = JSON.stringify( error );
           } else {
               parsedError = error;
           }
       } catch ( e ) {
           logger.error( e );
       }

       // Log the original error
       logger.error( parsedError );

       // If response is already sent, don't attempt to respond to client
       if ( res.headersSent ) {
           return next( error );
       }

       res.status( 400 ).json( {
           success: false,
           error
       } );
   }
}

module.exports = ErrorService;
