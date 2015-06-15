'use strict';

var modulepath = require('app-module-path'),
    mongoose = require('mongoose'),
    config = require('./config'),
    mongoOptions = { db: { safe: true } };

var apiPath = __dirname + '/../../api/'

modulepath.addPath(apiPath); //Add's path of api to require

// Included needed models
require(apiPath + 'base/models/user');

var User = mongoose.model('User');

// Connect to Database
mongoose.connect(config.db, mongoOptions, function (err, res) {
  if (err) {
      throw new Error('ERROR connecting to: ' + config.db + '. ' + err);
  }
  console.log('Successfully connected to: ' + config.db);

  User.findOneAndRemove({ email: 'e2e_test@domain.com' }, function (err, user) {
      if (err) {
          throw new Error('Failed to remove User');
      }

      if (user) {
          console.log('User found and removed');
      } else {
          console.log('User not found');
      }
  });
});
