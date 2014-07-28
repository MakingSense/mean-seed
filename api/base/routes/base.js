'use strict';

var path = require('path'),
    auth = require('../../config/auth');

module.exports = function(app) {
  // User Routes
  var users = meanpInject('users.js', 'c');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', users.show);

  // Check if username is available
  // todo: pro  bably should be a query on users
  app.get('/auth/check_username/:username', users.exists);

  // Session Routes
  var session = meanpInject('session.js', 'c');
  app.get('/auth/session', auth.ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);
}