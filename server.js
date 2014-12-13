'use strict';

// Module dependencies.
var express = require('express'),
    http = require('http'),
    passport = require('passport'),
    path = require('path'),
    fs = require('fs'),
    mongoStore = require('connect-mongo')(express),
    config = require('./api/config/config'),
    modulepath =require('app-module-path');

var app = express();
modulepath.addPath(__dirname + '/api/'); //Add's path of api to require
// Connect to database
var db = require('db/mongo').db;
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
  secret: 'MEANP', store: new mongoStore({ url: config.db, collection: 'sessions' })
}));

// Use passport session
app.use(passport.initialize());
app.use(passport.session());

// Bootstrap routes
app.use(app.router);
// boostrap Models and Routes
fs.readdirSync(__dirname + '/api/').forEach(function(dir){
    if(dir != '.DS_Store' && dir != 'config' && dir != 'templates' && dir != 'db'){
        fs.readdirSync(__dirname + '/api/' + dir + '/models').forEach(function(file){
            if(dir + '.js' == file || file == 'user.js' && dir == 'base'){
                require(__dirname + '/api/' + dir + '/models/' + file);
            }
        })
        fs.readdirSync(__dirname + '/api/' + dir + '/routes').forEach(function(file){
            if(dir + '.js' == file){
                require(__dirname + '/api/' + dir + '/routes/' + file)(app); // We pass the app object to the routes function
            }
        })
    }
})
var pass = require('config/passport');
// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('listening on port %d in %s mode', port, app.get('env'));
});