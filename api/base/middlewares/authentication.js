'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['jsonwebtoken', 'express-jwt'/*===== jwt hook1 =====*/], function (jwt, expressJwt/*===== jwt hook2 =====*/) {

  /*===== jwt hook3 =====*/

  var validateAndEnforceJwt = expressJwt({
    secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64')
  });

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
        return res.json(403, {
          message: 'No token provided.'
        });
      } else {
        req.decoded = token;next();
      }
    },

    verifySecret: function (req, res, next) {
      validateAndEnforceJwt(req, res, next);
    }

  };

});
