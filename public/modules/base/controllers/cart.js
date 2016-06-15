'use strict';

angular.module('mean')
  .controller('CartCtrl', function ($scope, ngCart) {
    Stripe.setPublishableKey('sk_test_H7iWeQeC4CJJglEMW8mFhWyT');

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
      } else {
        // got stripe token, now charge it or smt
        token = response.id
      }
    }

  });
