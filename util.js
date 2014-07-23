'use strict';

var fs = require('fs'),
    path = require('path');

var baseRgx = /(.*).(js)$/;
function excluded (path){
    var dir = path.substr(path.lastIndexOf('/') + 1)
    if(dir == '.DS_Store' || dir == 'config' || dir == 'db'){
        return true;
    }
    return false;
}
function modulePath(dir, name) {
    return path.join(process.cwd(), dir, name);
}
function Module (name) {
    var name = name.toLowerCase();
    var dependencies = [];
    walk(modulePath('/api/' + name, '/controllers'), null, function(resource) {
        dependencies.push(resource);
        require(resource);
    });
    walk(modulePath('/api/' + name, '/models'), null, function(resource) {
        dependencies.push(resource);
        require(resource);
    });
    var addToApp = function(app){
        walk(modulePath('/api/' + name,'/routes'), null, function(resource) {
            require(resource)(app);
        });
    }
    var module = {
        name: name,
        dependencies: dependencies,
        routes: addToApp
    }
    return module;
};
function walk(wpath, excludeDir, callback) {
    if (!fs.existsSync(wpath) || excluded(wpath)) return;
    fs.readdirSync(wpath).forEach(function(file) {
        var newPath = path.join(wpath, file);
        if(!excluded(newPath)){
            var stat = fs.statSync(newPath);
            if (stat.isFile() && baseRgx.test(file)) {
                console.log(file + ' was readed');
                callback(newPath);
            } else if (stat.isDirectory() && !(excludeDir instanceof Array) && file !== excludeDir) {
                walk(newPath, excludeDir, callback);
            } else if (stat.isDirectory()) {
                for(var i in excludeDir){
                    if(excludeDir[i] !== file){
                        console.log(newPath)
                        walk(newPath, excludeDir, callback);
                    }
                }
            }
        }
    });
}
exports.Module = Module;
exports.walk = walk;