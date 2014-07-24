'use strict';

var fs = require('fs');
var path = require('path');
var util = require('./util');
var modules = [];
var globals = {
    controllers: []
};


var generateModules = function(app){
    findModules();
    modules.forEach(function(module){
        fs.readdirSync('./api/' + module.name).forEach(function(file){
            if(file && file == 'index.js' || file == 'base.js'){
                require('./api/' + module.name + '/' + file)(app, new meanpScaffolding());
            }
        });
    });
}
var findModules = function () {
    modules = [];
    fs.readdirSync('./public/modules/').forEach(function(moduleName){
        if(moduleName != '.DS_Store' && moduleName != 'config' && moduleName != 'db' && moduleName.indexOf('.') == -1){
            var packageJson = require('./public/modules/'+ moduleName +'/package.json');
            modules.push({
                name: moduleName,
                source: path.join(process.cwd(), './public/modules/'),
                version: packageJson.version,
                active: true
            })
        }
    });
    return modules;
}
var activeModules = function(){
    var result = [];
    for(var i in modules){
        if(modules[i].active){
            result.push(modules[i]);
        }
    }
    return result;
}
var enableAll = function(){
    findModules();
    for(var i in modules){
        modules[i].active = true;
    }
    return true;
}
var disableAll = function(){
    findModules();
    for(var i in modules){
        modules[i].active = false;
    }
    return true;
}
var enableModule = function(name) {
    if(!name){ return };
    findModules();
    for(var i in modules){
        if(modules[i].name == name){
            modules[i].active = true;
        }
    }
}
var disableModule = function(name) {
    if(!name){ return };
    findModules();
    for(var i in modules){
        if(modules[i].name == name){
            modules[i].active = false;
        }
    }
}
function meanpScaffolding (){
    this.init = generateModules;
    this.globals = globals;
    this.actions = {
        list: findModules,
        listActive: activeModules,
        enableAll: enableAll,
        disableAll: disableAll,
        enableModule: enableModule,
        disableModule: disableModule
    }
}
module.exports = exports = new meanpScaffolding();
