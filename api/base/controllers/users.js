'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  jwt = require('jsonwebtoken'),
  ObjectId = mongoose.Types.ObjectId,
  config = require('../../config/config');

/**
 * Create user
 * requires: {username, password, email}
 * returns: {email, password}
 */
exports.create = function (req, res, next) {
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
    
    var token = jwt.sign(response, config.secretKey, {
        expiresInMinutes: 1440
    });
                
    res.json({
        success: true,
        token: token
    });
  });
};

/**
 *  Show profile
 *  returns {username, profile}
 */
exports.show = function (req, res, next) {
  var userId = req.params.userId;

  User.findById(ObjectId(userId), function (err, user) {
    if (err) {
      return next(new Error('Failed to load User'));
    }
    if (user) {
      res.send({username: user.username, profile: user.profile });
    } else {
      res.send(404, 'USER_NOT_FOUND')
    }
  });
};

/**
 *  Username exists
 *  returns {exists}
 */
exports.exists = function (req, res, next) {
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
