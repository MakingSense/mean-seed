module.exports = function (app, module) {
    var fs = require('fs'),
        path = require('path'),
        async = require('async');
    module.globals.models = module.globals.models || [];
    fs.readdirSync(__dirname + '/models').forEach(function (fileName) { 
        if (fileName === "index.js" || path.extname(fileName) !== '.js') {
            return;
        }
        var model = require(path.join(__dirname + '/models/', fileName));
        if (model && model.name) {
            console.log('Loading models: ' + model.name);
            module.globals.models[model.name] = model;
        }
    });
    module.globals.controllers = module.globals.controllers || [];
    fs.readdirSync(__dirname + '/controllers').forEach(function (fileName) { 
        if (fileName === "index.js" || path.extname(fileName) !== '.js') {
            return;
        }
        var controller = require(path.join(__dirname + '/controllers/', fileName));
        if (controller && controller.name) {
            console.log('Loading controller: ' + controller.name);
            module.globals.controllers[controller.name] = controller;
        }
    });
    module.globals.routes = module.globals.routes || [];
    fs.readdirSync(__dirname + '/routes').forEach(function (fileName) { 
        if (fileName === "index.js" || path.extname(fileName) !== '.js') {
            return;
        }
        var route = require(path.join(__dirname + '/routes/', fileName))(app);
        if (route && route.name) {
            console.log('Loading routes: ' + route.name);
            module.globals.routes[route.name] = route;
        }
    });
};