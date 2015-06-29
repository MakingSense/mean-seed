'use strict';

var modulepath = require('app-module-path');

var apiPath = __dirname + '/../../../api/';

modulepath.addPath(apiPath); //Add's path of api to require

var simpleDI = require(apiPath + 'config/simpleDI');

// Define and resolve modules related to config
simpleDI.define('app/config', __dirname + '/config');
simpleDI.define('app/menus', apiPath + 'templates/menus');

var appConfig = simpleDI.resolve('app/config');

// Define and resolve models index, which in turn will define each model
simpleDI.define('baseModels', apiPath + 'base/models');
simpleDI.resolve('baseModels');

// Define and resolve controllers index, which in turn will define each controller
simpleDI.define('baseControllers', 'base/controllers');
simpleDI.resolve('baseControllers');

var mongoose = simpleDI.resolve('mongoose');

// Connect to Database
mongoose.connect(appConfig.db.uri, appConfig.db.options, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + appConfig.db.uri + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + appConfig.db.uri);
  }
});
