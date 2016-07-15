'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject([], function () {

  // Define and resolve modules related to config
  simpleDI.define('app/config', 'config/appConfig');
  simpleDI.define('app/mongoDbConn', 'db/mongo');
  simpleDI.define('app/menus', 'templates/menus');

  // TODO: This .json files should be replaced with the corresponding
  // models when they get implemented
  simpleDI.define('app/roles', 'config/roles');
  simpleDI.define('app/resources', 'config/resources');
  simpleDI.define('app/permissions', 'config/permissions');

  // Define models
  simpleDI.define('base/userModel', 'base/models/user');
  simpleDI.define('blog/blogModel', 'blog/models/blog');

  // Define controllers
  simpleDI.define('base/authController', 'base/controllers/auth');
  simpleDI.define('base/commonController', 'base/controllers/common');
  simpleDI.define('base/usersController', 'base/controllers/users');
  simpleDI.define('blog/blogController', 'blog/controllers/blog');
  /*===== cart hook =====*/

  // Define services
  simpleDI.define('base/authorizationService', 'base/services/authorization');
  simpleDI.define('blog/blogService', 'blog/services/blog');

  // Define middlewares
  simpleDI.define('base/authenticationMiddleware', 'base/middlewares/authentication');
  simpleDI.define('base/authorizationMiddleware', 'base/middlewares/authorization');

  // Define routes index and resolve using the express app's object
  simpleDI.define('base/baseRoutes', 'base/routes/base');
  simpleDI.define('blog/blogRoutes', 'blog/routes/blog');

});
