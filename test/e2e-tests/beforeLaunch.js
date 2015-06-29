'use strict';

var modulepath = require('app-module-path');

var apiPath = __dirname + '/../../api/'

modulepath.addPath(apiPath); //Add's path of api to require

var simpleDI = require(apiPath + 'config/simpleDI');

// Define and resolve modules related to config
simpleDI.define('app/config', __dirname + '/config');

var appConfig = simpleDI.resolve('app/config');

// Define and resolve models index, which in turn will define each model
simpleDI.define('baseModels', apiPath + 'base/models');
simpleDI.resolve('baseModels');

// Once the models are included we can get the definition
var User = simpleDI.resolve('base/userModel');

var mongoose = simpleDI.resolve('mongoose');

// Connect to Database
mongoose.connect(appConfig.db.uri, appConfig.db.options, function (err, res) {
  if (err) {
      throw new Error('ERROR connecting to: ' + appConfig.db.uri + '. ' + err);
  }
  console.log('Successfully connected to: ' + appConfig.db.uri);

  User.findOneAndRemove({ email: 'e2e_test@domain.com' }, function (err, user) {
      if (err) {
          throw new Error('Failed to remove test user');
      }

      User.findOneAndRemove({ email: 'e2e_signup@domain.com' }, function (err, user) {
          if (err) {
              throw new Error('Failed to remove signup user');
          }
      });

  });
});
