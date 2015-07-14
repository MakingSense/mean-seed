'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['base/authorizationService'], function (authorizationService) {

  return {

    getAuthorizationFn: function (resource, action) {

      return function checkAuthorization(req, res, next) {
        var roles = [];
        // Check if there is an authenticated user
        if (req.decoded) {
          // User is logged in, get its roles
          // TODO: Get actual roles for user
          roles.push('user');
        } else {
          roles.push('anonymous');
        }

        authorizationService.isAuthorized(roles, resource, action, function (error, isAuthorized) {
          if (error) {
            return next(error);
          }

          if (!isAuthorized) {
            return res.json(403, {
              message: 'Not authorized.'
            });
          }

          next();
        });
      };

    }

  };

});
