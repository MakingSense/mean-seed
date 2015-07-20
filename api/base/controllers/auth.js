'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['base/userModel', 'jsonwebtoken', 'app/config'], function (User, jwt, appConfig) {

  var secretKey = appConfig.secretKey;

  return {

    /**
     * Authenticate a user
     * requires: { email, password }
     * returns: { success, message, token }
     */
    authenticate: function (req, res) {

      var email = req.body.email;

      User.findOne({
        email: email
      }, function (err, user) {

        if (err) {
          return res.json(400, err);
        }

        // If the user does not exist
        if (!user) {

          return res.json(404, {
            message: 'Authentication failed. User not found.'
          });

        }

        var password = req.body.password;

        // Check if the password matches
        if (!user.validatePassword(password)) {

          return res.json(401, {
            message: 'Authentication failed. Wrong password.'
          });

        }

        // Add one day
        var date = new Date();
        date.setDate(date.getDate() + 1);

        var response = {
          user: user,
          exp: Math.round(date.getTime() / 1000)
        };

        // If the user is found and the password correct then create a token
        var token = jwt.sign(response, secretKey, {
          expiresInMinutes: 1440 // the new token expires in 24hs
        });

        return res.json(200, {
          message: 'Enjoy your token!',
          token: token
        });
      });
    }

  };

});
