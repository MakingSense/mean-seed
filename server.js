'use strict';

// Module dependencies.
var express = require('express'),
    passport = require('passport'),
    mongoStore = require('connect-mongo')(express),
    modulepath = require('app-module-path');

var app = express();
modulepath.addPath(__dirname + '/api/'); //Add's path of api to require

// Space for our naive DI. Perhaps it would be better to just use a
// module for that purpose, there's an increasingly high number of them
// available at the moment
app.meanSeed = {
    dependencies: {},
    middleware: {}
};
app.meanSeed.dependencies.mongoose = require('mongoose');
app.meanSeed.dependencies.crypto = require('crypto');
app.meanSeed.dependencies.passport = require('passport');
app.meanSeed.dependencies.localStrategy = require('passport-local').Strategy;
app.meanSeed.appConfig = require('config/appConfig');
app.meanSeed.db = require('db/mongo')(app);
app.meanSeed.middleware.auth = require('config/auth');
app.meanSeed.menus = require('templates/menus');

// Environments configuration
app.configure( function(){
    app.use(express.errorHandler());
    app.use(express.static(__dirname + '/public'));
});

app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());

// express/mongo session storage
app.use(express.session({
  secret: 'MEAN', store: new mongoStore({ url: app.meanSeed.appConfig.db.uri, collection: 'sessions' })
}));

// Use passport session
app.use(passport.initialize());
app.use(passport.session());

// Bootstrap routes
app.use(app.router);

// Models are available through the mongoose singleton for single connection
// and through the corresponding db connection for multiple db's
require('base/models')(app);

// Routes are available immediately
require('base/routes')(app);

// Configure passport local strategy
require('config/passport')(app);

// Start server
var port = app.meanSeed.appConfig.port;
app.listen(port, function () {
    console.log('listening on port %d in %s mode', port, app.get('env'));
});
