'use strict';

var modulepath = require('app-module-path'),
    config = require('./config');

var apiPath = __dirname + '/../../api/'

modulepath.addPath(apiPath); //Add's path of api to require

var app = {};

app.meanSeed = {
    dependencies: {},
    middleware: {}
};

app.meanSeed.dependencies.mongoose = require('mongoose');
app.meanSeed.dependencies.crypto = require('crypto');

// Included needed models
require(apiPath + 'base/models')(app);

// Once the models are included we can extract them from mongoose singleton
var User = app.meanSeed.dependencies.mongoose.model('User');

// Connect to Database
app.meanSeed.dependencies.mongoose.connect(config.db.uri, config.db.options, function (err, res) {
  if (err) {
      throw new Error('ERROR connecting to: ' + config.db.uri + '. ' + err);
  }
  console.log('Successfully connected to: ' + config.db.uri);

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
