'use strict';

angular.module('mean')
  .controller('CartCtrl', function ($scope, ngCart) {
    $scope.settings = {
      paypal: {
        business: 'mzelarayan@makingsense.com',
        item_name: 'Group of products',
        item_number: '22323',
        currency_code: 'USD'
      }
    };
  });
