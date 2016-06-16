'use strict';

angular.module('mean')
  .controller('CartCtrl', function ($scope, paymentService) {

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
        paymentService.stripe()
          .then(function(res){
            console.log(res);
          }, function(err) {
            console.log(err);
          });
      }
    }

  });
