'use strict';

angular.module('mean')
  .controller('CartCtrl', function ($scope, paymentService, $location, ngCart) {
    $scope.total = ngCart.totalCost();
    $scope.isCartEmpty = ngCart.getItems();

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
          amount: $scope.total,
          currency: 'USD',
          description: 'test description'
        };

        paymentService.stripe(data)
          .then(function(){
            ngCart.empty();
            $location.path('#/');
          }, function(err) {
            console.log(err);
          });
      }
    }

  });
