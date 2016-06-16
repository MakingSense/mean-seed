'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject([
  'base/authController',
  'base/authenticationMiddleware',
  'base/authorizationMiddleware',
  'base/commonController',
  'base/usersController',
  'base/paymentsController'
], function (authController, authenticationMiddleware, authorizationMiddleware, commonController, usersController, paymentsController) {

  return function baseRoutes(app) {
    // Config Route
    app.get('/config',
      commonController.config
    );

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
      authenticationMiddleware.verifySecret,
      authorizationMiddleware.getAuthorizationFn('menu', 'view'),
      commonController.menu
    );

    app.get('/api/payments/stripe/',
      authenticationMiddleware.verifySignature,
      authenticationMiddleware.verifySecret,
      paymentsController.stripe
    );
    
  };
});
