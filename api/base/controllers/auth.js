'use strict';

module.exports = function (app) {

  var mongoose = app.meanSeed.dependencies.mongoose,
    User = mongoose.model('User'),
    jwt = app.meanSeed.dependencies.jwt,
    secretKey = app.meanSeed.appConfig.secretKey;

  return {
   
    /**
     * Authenticate a user
     * requires: { email, password }
     * returns: { success, message, token }
     */
    authenticate: function (req, res) {

      var email = req.body.email;

      User.findOne({ email: email }, function (err, user) {

        if (err) {
          return res.json(400, err);
        }
        
        // If the user does not exist
        if (!user) {

          return res.json(404, { message: 'Authentication failed. User not found' });

        } 

        var password = req.body.password;
                
        // Check if the password matches      
        if (!user.validatePassword(password)) {

           return res.json(401, { message: 'Authentication failed. Wrong password.' });

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
        } 
      );
    },
    
    /**
     * Middleware to verify a token
     * require: { token }
     * returns: { success, message }
     */
    verifySignature: function (req, res, next) {
      
      // Check header, url or post parameters to get the token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      
      // If there is no token then return an error
      if (!token) {

        return res.json(403, { message: 'No token provided.' });

      } else { 
        
        // Decode and verify the token
        jwt.verify(token, secretKey, function (err, decodedToken) {

          if (err) {

            return res.json(401, { message: 'Failed to authenticate token.' });

          } else {
            // If everything goes right, save the request for use in other routes
            req.decoded = decodedToken;
            next();
          }
        });

      }
    }
  };
};
