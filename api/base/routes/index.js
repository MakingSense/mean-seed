'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject([], function() {

  // We need to pass the app object in order to set express routes
  return function routesIndex(app) {
    simpleDI.define('base/baseRoutes', 'base/routes/base');
    simpleDI.resolve('base/baseRoutes')(app);
  };

});
