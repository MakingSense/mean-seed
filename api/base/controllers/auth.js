var config = require('../../config/config'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    User = mongoose.model('User');

// Authenticate a user
exports.authenticate = function (req, res) {

    var email = req.body.email;
  
    User.findOne({ email: email }, function (err, user) {
    
    if (err) {
      throw err;
    }
    
    // If the user does not exist
    if (!user) {
      
      res.json({ success: false, message: 'Authentication failed. User not found'});
      
    } else { 
      
            var password = req.body.password;
            
            // Check if the password matches      
            if (!user.authenticate(password)) {
              
              res.json({ success: false, message: 'Authentication failed. Wrong password.'});
              
            } else {
              
                // Add one day
                var date = new Date();
                date.setDate(date.getDate() + 1);
              
                var response = {
                    user: user,
                    exp: Math.round(date.getTime() / 1000)
                };
              
                // If the user is found and the password correct then create a token 
                var token = jwt.sign(response, config.secretKey, {
                  expiresInMinutes: 1440 // the new token expires in 24hs
                });
                
                res.json({
                  success: true,
                  message: 'Enjoy your token!',
                  token: token
                });
            } 
    }
  });
};

// Middleware to verify a token
exports.verifySignature = function (req, res, next) {
  
  // Check header, url or post parameters to get the token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
  // If there is no token then return an error
  if (!token) {
    
     return res.status(403).send({
       success: false,
       message: 'No token provided.'
     });
     
  } else { 
    
      // Decode and verify the token
      jwt.verify(token, config.secretKey, function(err, decodedToken) {
        
          if (err) {
            
            return res.json({ success: false, message: 'Failed to authenticate token.'});
            
          } else {
              // If everything goes right, save the request for use in other routes
              req.decoded = decodedToken;
              next();  
          }
      });
      
  }
};
