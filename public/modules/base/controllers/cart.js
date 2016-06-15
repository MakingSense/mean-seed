'use strict';

angular.module('mean')
  .controller('CartCtrl', function ($scope, ngCart) {
    $scope.ngCart = ngCart;
  });
