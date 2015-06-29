'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject([], function() {
  // Define models, they will be resolved the first time they are needed
  simpleDI.define('base/authController', 'base/controllers/auth');
  simpleDI.define('base/commonController', 'base/controllers/common');
  simpleDI.define('base/usersController', 'base/controllers/users');
});
