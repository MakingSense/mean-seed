'use strict';

module.exports = function(app) {
  var mongoose = app.meanSeed.dependencies.mongoose,
      dbConfig = app.meanSeed.appConfig.db;

  // Connect to Database and return the connection
  return mongoose.connect(dbConfig.uri, dbConfig.options, function (error) {
    if (error) {
      console.log ('ERROR connecting to: ' + dbConfig.uri + '. ' + error);
    } else {
      console.log ('Successfully connected to: ' + dbConfig.uri);
    }
  });
};
