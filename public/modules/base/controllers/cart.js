'use strict';

angular.module('mean')
  .controller('CartCtrl', function ($scope) {

    $scope.settings = {
      paypal: {
        business: 'mzelarayan@makingsense.com',
        itemName: 'Group of products',
        itemNumber: '22323',
        currencyCode: 'USD'
      }
    };

    $scope.handleStripe = function(status, response){
      if(response.error) {
        // there was an error. Fix it.
        console.log(response.error);
      } else {
        // got stripe token, now charge it or smt
        console.log(response.id);
        // token = response.id
        var charge = Stripe.charges.create({
          amount: 1000, // amount in cents, again
          currency: "usd",
          source: response.id,
          description: "Example charge"
        }, function(err, charge) {
          if (err && err.type === 'StripeCardError') {
            // The card has been declined
            console.log(err);
          }
        });
      }
    }

  });
