'use strict';

module.exports = function(app) {
  var auth = app.meanSeed.middleware.auth;

  // User Routes
  var users = require('base/controllers/users')(app);
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', users.show);

  // Check if username is available
  // todo: probably should be a query on users
  app.get('/auth/check_username/:username', users.exists);

  // Session Routes
  var session = require('base/controllers/session')(app);
  app.get('/auth/session', auth.ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);

  var common = require('base/controllers/common.js')(app);
  app.get('/api/common/menu/', auth.ensureAuthenticated, common.menu);
};
