'use strict';

exports.menu = function (req, res) {
	var menus = require('config/menus');
  	res.json(menus);
};