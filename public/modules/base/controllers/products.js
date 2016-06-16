'use strict';

angular.module('mean')
  .controller('ProductsCtrl', function ($scope) {
    $scope.products = [
      {
        productName: 'Product #1',
        productId: '1',
        productPrice: 342,
        productCurrency: 'USD'
      },
      {
        productName: 'Product #2',
        productId: '2',
        productPrice: 332,
        productCurrency: 'USD'
      },
      {
        productName: 'Product #3',
        productId: '3',
        productPrice: 312,
        productCurrency: 'USD'
      },
    ];
  });
