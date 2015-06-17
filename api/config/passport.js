'use strict';

module.exports = function (app) {

  var mongoose = app.meanSeed.dependencies.mongoose,
      passport = app.meanSeed.dependencies.passport,
      LocalStrategy = app.meanSeed.dependencies.localStrategy,
      User = mongoose.model('User');

  // Serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user);
    });
  });

  // Use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            'errors': {
              'email': { type: 'Email is not registered.' }
            }
          });
        }
        if (!user.authenticate(password)) {
          return done(null, false, {
            'errors': {
              'password': { type: 'Password is incorrect.' }
            }
          });
        }
        return done(null, user);
      });
    }
  ));

};
