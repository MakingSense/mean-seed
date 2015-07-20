'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['mongoose', 'app/config'], function (mongoose, appConfig) {

  var dbConfig = appConfig.db;

  // Connect to Database and return the connection
  return mongoose.connect(dbConfig.uri, dbConfig.options, function (error) {
    if (error) {
      console.log('ERROR connecting to: ' + dbConfig.uri + '. ' + error);
    } else {
      console.log('Successfully connected to: ' + dbConfig.uri);
    }
  });

});
