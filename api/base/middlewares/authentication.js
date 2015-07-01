'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['jsonwebtoken', 'app/config'], function(jwt, appConfig) {

  var secretKey = appConfig.secretKey;

  return {

    /**
     * Middleware to verify a token
     * require: { token }
     * returns: { success, message }
     */
    verifySignature: function (req, res, next) {
      
      // Check header, url or post parameters to get the token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      
      // If there is no token then return an error
      if (!token) {

        return res.json(403, { message: 'No token provided.' });

      } else { 
        
        // Decode and verify the token
        jwt.verify(token, secretKey, function (err, decodedToken) {

          if (err) {

            return res.json(401, { message: 'Failed to authenticate token.' });

          } else {
            // If everything goes right, save the request for use in other routes
            req.decoded = decodedToken;
            next();
          }
        });

      }
    }

  };

});
