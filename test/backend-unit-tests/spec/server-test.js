'use strict';

var modulepath = require('app-module-path');

var apiPath = __dirname + '/../../../api/';

modulepath.addPath(apiPath); //Add's path of api to require

var simpleDI = require(apiPath + 'config/simpleDI');

// Define and resolve modules related to config
simpleDI.define('app/config', __dirname + '/config/config');
simpleDI.define('app/menus', apiPath + 'templates/menus');

// Define roles, resources and permissions
simpleDI.define('app/roles', __dirname + '/config/roles');
simpleDI.define('app/resources', __dirname + '/config/resources');
simpleDI.define('app/permissions', __dirname + '/config/permissions');

// Define models
simpleDI.define('base/userModel', 'base/models/user');
simpleDI.define('base/roleModel', 'base/models/role');
simpleDI.define('blog/blogModel', 'blog/models/blog');

// Define controllers
simpleDI.define('base/authController', 'base/controllers/auth');
simpleDI.define('base/commonController', 'base/controllers/common');
simpleDI.define('base/usersController', 'base/controllers/users');
simpleDI.define('blog/blogController', 'blog/controllers/blog');

// Define services
simpleDI.define('base/authorizationService', 'base/services/authorization');
simpleDI.define('blog/blogService', 'blog/services/blog');

// Define middlewares
simpleDI.define('base/authorizationMiddleware', 'base/middlewares/authorization');
simpleDI.define('blog/blogRoutes', 'blog/routes/blog');
