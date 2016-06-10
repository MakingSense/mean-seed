'use strict';

angular.module('mean')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, userService) {

    $scope.submitted = false;
    $scope.errorMessage = '';

    $scope.login = function (form) {
      $scope.submitted = true;
      $scope.errorMessage = '';

      if (form.username.$error.required) {
        return;
      }

      userService.login($scope.user)
        .then(function (user) {
          $rootScope.setCurrentUser(user);
          $location.path('/');
        }, function (response) {
          $scope.errorMessage = response;
        });
    };
  });
