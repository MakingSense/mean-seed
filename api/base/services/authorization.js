'use strict';

var simpleDI = require('config/simpleDI');

// TODO: Add required models here
module.exports = simpleDI.inject(['app/roles', 'app/resources', 'app/permissions'], function (roles, resources, permissions) {

  return {
    /**
     * Checks if a list of roles is allowed to access an resources's action
     */
    isAuthorized: function (roles, resource, action, callback) {
      var perms = [];

      roles.forEach(function (role) {
        if (permissions[role]) {
          perms = perms.concat(permissions[role]);
        }
      });

      for (var i = 0; i < perms.length; i++) {
        if (perms[i].resource === resource && perms[i].action === action) {
          return callback(null, true);
        }
      }

      return callback(null, false);
    }

  };

});
