'use strict';

// Module dependencies.
var express = require('express'),
    modulepath = require('app-module-path');

modulepath.addPath(__dirname + '/api/'); //Add's path of api to require

var simpleDI = require('config/simpleDI');

var app = express();

// Define and resolve modules related to config
simpleDI.define('app/config', 'config/appConfig');
simpleDI.define('app/mongoDbConn', 'db/mongo');
simpleDI.define('app/menus', 'templates/menus');

var appConfig = simpleDI.resolve('app/config');
var mongoDbConn = simpleDI.resolve('app/mongoDbConn');

// Environments configuration
app.configure( function(){
    app.use(express.errorHandler());
    app.use(express.static(__dirname + '/public'));
});

app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());

// Bootstrap routes
app.use(app.router);

// Define and resolve models index, which in turn will define each model
simpleDI.define('baseModels', 'base/models');
simpleDI.resolve('baseModels');

// Define and resolve controllers index, which in turn will define each controller
simpleDI.define('baseControllers', 'base/controllers');
simpleDI.resolve('baseControllers');

// Define routes index and resolve using the express app's object
simpleDI.define('baseRoutes', 'base/routes');
simpleDI.resolve('baseRoutes')(app);

// Start server
var port = appConfig.port;
app.listen(port, function () {
    console.log('listening on port %d in %s mode', port, app.get('env'));
});
