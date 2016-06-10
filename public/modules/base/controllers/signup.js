'use strict';

angular.module('mean').controller('SignupCtrl', function ($scope, $rootScope, $location, userService) {

  $scope.errorMessage = '';
  $scope.roles = [];
  $scope.user = {};

  $scope.register = function (form) {
    $scope.errors = {};

    userService.create($scope.user)
      .then(function (user) {
        $rootScope.setCurrentUser(user);
        $location.path('/');
      }, function (err) {
        $scope.errorMessage = err;
      });
  };
});
