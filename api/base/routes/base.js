'use strict';

module.exports = function(app) {
  var controllers = require('base/controllers')(app);

  // User Routes
  app.post('/auth/users', controllers.users.create);
  app.get('/auth/users/:userId', controllers.users.show);

  app.post('/auth/', controllers.auth.authenticate);

  app.get('/api/common/menu/', controllers.auth.verifySignature, controllers.common.menu);
};
