'use strict';

exports.menu = function (req, res) {
	var menus = require('templates/menus');
  	res.json(menus);
};