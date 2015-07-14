'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['app/menus'], function (menus) {

  return {

    menu: function (req, res) {
      res.json(menus);
    }

  };

});
