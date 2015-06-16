'use strict';

var path = require('path');

module.exports = function(app) {
  // User Routes
  var users = require('base/controllers/users');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', users.show);

  // Check if username is available
  // todo: pro  bably should be a query on users
  app.get('/auth/check_username/:username', users.exists);

  // Auth Routes
  var auth = require('base/controllers/auth');
  app.post('/auth/', auth.authenticate);

  var common = require('base/controllers/common.js');
  app.get('/api/common/menu/', auth.verifySignature, common.menu);
}