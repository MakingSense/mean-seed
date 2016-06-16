'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['stripe', 'q'], function (stripe, Q) {

  var stripeObject = stripe(process.env.STRIPE_PUBLISHABLE_KEY);

  return {

    stripe: function (req, res) {
      // Q.when({ result: req.body })
      res.json({ result: req.body });
      
      // stripe.charges.create({
      //   amount: 1600,
      //   currency: 'usd',
      //   customer: customer.id
      // });
    },

  };

});
