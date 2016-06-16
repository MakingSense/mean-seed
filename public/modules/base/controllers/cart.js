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
        console.log(response.error);
      } else {
        var data = {
          id: response.id,
          amount: 400,
          currency: 'USD',
          description: 'test description'
        };

        // paymentService.stripe(data)
        //   .then(function(res){
        //     console.log(res);
        //   }, function(err) {
        //     console.log(err);
        //   });
      }
    }

  });
