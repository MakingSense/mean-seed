'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['stripe'], function (stripe) {

  var stripeObject = stripe(process.env.STRIPE_SECRET_KEY);

  return {

    payment: function (req, res) {

      return res.json(200, {
        message: 'Enjoy your token!'
      });
    }

  };

});
