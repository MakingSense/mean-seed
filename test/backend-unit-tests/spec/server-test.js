'use strict';

var modulepath = require('app-module-path'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    config = require('./config'),
    app = {},
    mongoOptions = { db: { safe: true } };

var apiPath = __dirname + '/../../../api/'

modulepath.addPath(apiPath); //Add's path of api to require

// Included needed models
require(apiPath + 'base/models/user');

// Passport initialization
require(apiPath + 'config/passport');

// Connect to Database
app.db = mongoose.connect(config.db, mongoOptions, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + config.db + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + config.db);
  }
});

module.exports = app;
