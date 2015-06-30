'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['base/authController', 'base/commonController', 'base/usersController'], function(authController, commonController, usersController) {

  return function baseRoutes(app) {
    // User Routes
    app.post('/auth/users', usersController.create);
    app.get('/auth/users/:userId', usersController.show);

    app.post('/auth/', authController.authenticate);

    app.get('/api/common/menu/', authController.verifySignature, commonController.menu);
  };

});
