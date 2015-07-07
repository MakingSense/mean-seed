'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject([
  'base/authController',
  'base/authenticationMiddleware',
  'base/authorizationMiddleware',
  'base/commonController',
  'base/usersController'
], function(authController, authenticationMiddleware, authorizationMiddleware, commonController, usersController) {

  return function baseRoutes(app) {
    // User Routes
    app.post('/auth/users',
      authorizationMiddleware.getAuthorizationFn('signup', 'create'),
      usersController.create
    );
    app.get('/auth/users/:userId',
      authenticationMiddleware.verifySignature,
      authorizationMiddleware.getAuthorizationFn('users', 'view'),
      usersController.show
    );

    app.post('/auth/',
      authorizationMiddleware.getAuthorizationFn('login', 'create'),
      authController.authenticate
    );

    app.get('/api/common/menu/',
      authenticationMiddleware.verifySignature,
      authorizationMiddleware.getAuthorizationFn('menu', 'view'),
      commonController.menu
    );
  };
});
