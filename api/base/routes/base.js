'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['base/authController', 'base/commonController', 'base/usersController', 'base/rolesController'], 
function(authController, commonController, usersController, rolesController) {

  return function baseRoutes(app) {
    // User Routes
    app.post('/auth/users', usersController.create);
    app.get('/auth/users/:userId', usersController.show);

    app.post('/auth/', authController.authenticate);

    app.get('/api/common/menu/', authController.verifySignature, commonController.menu);

    app.get('/auth/roles/getall', rolesController.getAll);
    app.get('/auth/roles/:roleId', rolesController.getById);
    app.post('/auth/roles', rolesController.create);
    app.put('/auth/roles/:roleId', rolesController.update);
    app.delete('/auth/roles/:roleId', rolesController.delete);
  
  };
});
