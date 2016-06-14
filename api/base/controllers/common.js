'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['app/menus'], function (menus) {

  return {

    menu: function (req, res) {
      res.json(menus);
    },

    config: function (req, res) {
      var config = {
        auth0Domain: process.env.AUTH0_DOMAIN,
        auth0Connection: process.env.AUTH0_CONNECTION,
        auth0ClientId: process.env.AUTH0_CLIENT_ID
      };

      res.json(config);
    }

  };

});
