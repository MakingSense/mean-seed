'use strict';

module.exports = function (app) {

    var mongoose = app.meanSeed.dependencies.mongoose,
        passport = app.meanSeed.dependencies.passport;

    return {

        /**
         * Session
         * returns info on authenticated user
         */
        session: function (req, res) {
            res.json(req.user.user_info);
        },

        /**
         * Logout
         * returns nothing
         */
        logout: function (req, res) {
            if (req.user) {
                req.logout();
                res.send(200);
            } else {
                res.send(400, "Not logged in");
            }
        },

        /**
         *  Login
         *  requires: {email, password}
         */
        login: function (req, res, next) {
            passport.authenticate('local', function (err, user, info) {
                var error = err || info;
                if (error) {
                    return res.json(400, error);
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return res.send(err);
                    }
                    res.json(req.user.user_info);
                });
            })(req, res, next);
        }

    };

};
