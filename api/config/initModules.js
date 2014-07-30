var path = require('path'),
    fs = require('fs');

module.exports = function(app){
    var path = __dirname.substr(0, __dirname.indexOf('api/'));
    fs.readdirSync(path + 'api/').forEach(function(dir){
        if(dir != '.DS_Store' && dir != 'config' && dir != 'db'){
            fs.readdirSync(path + 'api/' + dir + '/models').forEach(function(file){
                if(dir + '.js' == file || file == 'user.js' && dir == 'base'){
                    require(path + 'api/' + dir + '/models/' + file);
                }
            })
            fs.readdirSync(path + 'api/' + dir + '/routes').forEach(function(file){
                if(dir + '.js' == file){
                    require(path + 'api/' + dir + '/routes/' + file)(app); // We pass the app object to the routes function
                }
            })
        }
    })
}