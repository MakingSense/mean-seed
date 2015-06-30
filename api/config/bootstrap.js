'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject([], function() {

  // Define and resolve modules related to config
  simpleDI.define('app/config', 'config/appConfig');
  simpleDI.define('app/mongoDbConn', 'db/mongo');
  simpleDI.define('app/menus', 'templates/menus');

  // Define models
  simpleDI.define('base/userModel', 'base/models/user');

  // Define controllers
  simpleDI.define('base/authController', 'base/controllers/auth');
  simpleDI.define('base/commonController', 'base/controllers/common');
  simpleDI.define('base/usersController', 'base/controllers/users');

  // Define routes index and resolve using the express app's object
  simpleDI.define('base/baseRoutes', 'base/routes/base');

});
