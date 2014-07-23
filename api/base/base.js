module.exports = function (app, module) {
    var fs = require('fs'),
        path = require('path'),
        async = require('async');
        
    module.globals.controllers = module.globals.controllers || [];
    console.log(module.globals.controllers)
    fs.readdirSync(__dirname + '/controllers').forEach(function (fileName) { 
        if (fileName === "index.js" || path.extname(fileName) !== '.js') {
            return;
        }
 
        var controller = require(path.join(__dirname + '/controllers', fileName))(app, module);
        if (controller && controller.name) {
            console.log('Loading controller: ' + controller.name);
            module.globals.controllers[controller.name] = controller;
 
            if (typeof controller.initController === 'function') {
                async.series([
                    function (callback) {
                        controller.initController(callback);
                    }], function (error) {
                    if (error) {
                        console.log('error initializing ' + controller.name + ' ' + error);
                    }
                });
            }
        }
    });
};