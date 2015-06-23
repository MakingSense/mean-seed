'use strict';

module.exports = function(app) {
 
  // User Routes
  var users = require('base/controllers/users')(app);
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', users.show);

  // Auth Routes
  var auth = require('base/controllers/auth')(app);
  app.post('/auth/', auth.authenticate);

  var common = require('base/controllers/common.js')(app);
  app.get('/api/common/menu/', auth.verifySignature, common.menu);
};
