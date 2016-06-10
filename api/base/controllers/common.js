'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['app/menus'], function (menus) {

  return {

    menu: function (req, res) {
      res.json(menus);
    },

    config: function (req, res) {
      var config = {
        auth0_domain: process.env.AUTH0_DOMAIN,
        auth0_connection: process.env.AUTH0_CONNECTION,
        auth0_client_id: process.env.AUTH0_CLIENT_ID
      };

      res.json(config);
    }

  };

});
