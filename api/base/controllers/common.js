'use strict';

module.exports = function (app) {

    var menus = app.meanSeed.menus;

    return {

        menu: function (req, res) {
            res.json(menus);
        }

    };
};
