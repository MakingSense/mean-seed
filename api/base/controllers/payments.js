'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['stripe'], function (stripe) {

  var stripeObject = stripe(process.env.STRIPE_PUBLISHABLE_KEY);

  return {

    stripe: function (req, res) {
      if(!req.body.id || !req.body.amount || !req.body.currency) {
        return res.json(404, {
          message: 'Field not found. Token id, amoung and currency are required.'
        });
      }

      var algo;

      stripeObject.customers.create({
        description: req.body.description,
        source: req.body.id
      }).then(function(customer) {
        algo = {
          amount: parseInt(req.body.amount),
          currency: req.body.currency,
          customer: customer.id
        };

        return stripeObject.charges.create({
          amount: req.body.amount,
          currency: req.body.currency,
          customer: customer.id
        });
      }).then(function(charge) {
        return res.json(200, {
          message: 'Succesfully charged!',
          charge: charge
        });
      }).catch(function(err) {
        return res.json(404, {
          message: 'Could not charge.',
          error: err,
          algo: algo
        });
      });

    },

  };

});
