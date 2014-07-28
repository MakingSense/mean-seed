'use strict';
// It would be good to be able to pass only the name without the extension, and also that it searches automaticly for the file
// Get the file who call the function, tell by the path which module it belongs and do an internal search inside the module only
// If it doesn't get a match, search globally
function mapDI (){
	var nodeHook = require('node-hook'),
	path = require('path'),
	_ = require('underscore'), 
	dependencies = [];
	GLOBAL.meanpInject = function(name, type){ //Name of file, and type of dependency, beign a 'c'ontroller, 'm'odel or 'r'oute
		var artifact = _.find(dependencies, function(script){
			if(script.name == name && script.type == type){
				return script;
			}
		});
		return require(artifact.path);
	}
	GLOBAL.meanpDependencies = function(){
		return dependencies;
	}
	function saveDependencies(source, filename) {
	    if(filename.indexOf('api') != -1 && filename.indexOf('db') == -1 && filename.indexOf('config') == -1){
	        var file = filename.substr(filename.lastIndexOf('/') + 1, filename.lastIndexOf('.') - 1);
	        var type;
	        if(filename.indexOf('controllers') != -1){
	        	type = 'c';
	        }
	        if(filename.indexOf('models') != -1){
	        	type = 'm';
	        }
	        if(filename.indexOf('routes') != -1){
	        	type = 'r';
	        }	        
	        dependencies.push({
	        	name: file,
	        	path: filename,
	        	type: type
	        });
	    }
	    return source;
	}
	nodeHook.hook('.js', saveDependencies);
}
exports = mapDI()