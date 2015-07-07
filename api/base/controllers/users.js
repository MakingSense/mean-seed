'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['mongoose', 'base/userModel', 'jsonwebtoken', 'app/config'], function (mongoose, User, jwt, appConfig) {

  var ObjectId = mongoose.Types.ObjectId,
      secretKey = appConfig.secretKey;

  return {

    /**
     * Create user
     * requires: {username, password, email}
     * returns: {email, password}
     */
      create: function (req, res, next) {
          var newUser = new User(req.body);
          newUser.provider = 'local';
          
          newUser.save(function(err) {
            if (err) {
              return res.json(400, err);
            }
        
            var response = {
                user: newUser,
                exp: Math.round(new Date().setDate(new Date().getDate() + 1) / 1000)
            };
            
            var token = jwt.sign(response, secretKey, {
                expiresInMinutes: 1440
            });
                        
            res.json(200, { token: token, message: 'User created.' });
          });
        },
    
      /**
       *  Show profile
       *  returns {username, profile}
       */
      show: function (req, res, next) {
          var userId = req.params.userId;
        
          User.findById(ObjectId(userId), function (err, user) {
            if (err) {
              return next(new Error('Failed to load User'));
            }
            if (user) {
              res.send({username: user.username, profile: user.profile });
            } else {
              res.send(404, { message: 'User not found' });
            }
          });
      },
    
      /**
       *  Username exists
       *  returns {exists}
       */
      exists: function (req, res, next) {
        var username = req.params.username;
        User.findOne({ username : username }, function (err, user) {
          if (err) {
            return next(new Error('Failed to load User ' + username));
          }
      
          if(user) {
            res.json({exists: true});
          } else {
            res.json({exists: false});
          }
        });
      }
    
  };

});
