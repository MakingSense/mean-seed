'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject([], function() {

  // Define and resolve modules related to config
  simpleDI.define('app/config', 'config/appConfig');
  simpleDI.define('app/mongoDbConn', 'db/mongo');
  simpleDI.define('app/menus', 'templates/menus');

  // Define models
  simpleDI.define('base/userModel', 'base/models/user');
  simpleDI.define('base/roleModel', 'base/models/role');
  simpleDI.define('base/resourceModel', 'base/models/resource');

  // Define controllers
  simpleDI.define('base/authController', 'base/controllers/auth');
  simpleDI.define('base/commonController', 'base/controllers/common');
  simpleDI.define('base/usersController', 'base/controllers/users');
  simpleDI.define('base/rolesController', 'base/controllers/roles');
  simpleDI.define('base/resourcesController', 'base/controllers/resources');

  // Define routes index and resolve using the express app's object
  simpleDI.define('base/baseRoutes', 'base/routes/base');

});
