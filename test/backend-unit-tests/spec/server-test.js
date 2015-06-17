'use strict';

var modulepath = require('app-module-path'),
    config = require('./config');

var apiPath = __dirname + '/../../../api/'

modulepath.addPath(apiPath); //Add's path of api to require

var app = {};

app.meanSeed = {
    dependencies: {},
    middleware: {}
};

app.meanSeed.dependencies.mongoose = require('mongoose');
app.meanSeed.dependencies.crypto = require('crypto');
app.meanSeed.dependencies.passport = require('passport');
app.meanSeed.dependencies.localStrategy = require('passport-local').Strategy;
app.meanSeed.menus = require(apiPath + 'templates/menus');

// Included needed models
require(apiPath + 'base/models')(app);

// Passport initialization
require(apiPath + 'config/passport')(app);

// Connect to Database
app.meanSeed.dependencies.mongoose.connect(config.db.uri, config.db.options, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + config.db.uri + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + config.db.uri);
  }
});

module.exports = app;
