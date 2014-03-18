'use strict';

angular.module('meanp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.error = {};
    $scope.user = {};

    $scope.login = function(form) {
      Auth.login('password', $scope.user , function(err) {
          $scope.errors = {};

          if (!err) {
            $location.path('/');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
            $scope.error.other = err.message;
          }
      });
    };
  });