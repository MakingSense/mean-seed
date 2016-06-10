'use strict';

angular.module('mean').controller('NavbarCtrl', function ($scope, $rootScope, $location, $sessionStorage, authService, menuService) {

  $scope.menu = {
    base: []
  };

  $scope.logout = function () {
    authService.logout();
    $rootScope.unsetCurrentUser();
    $sessionStorage.$reset();
    $location.path('/login');
  };

  $scope.init = function () {
    menuService.get()
      .success(function (response, status, headers, config) {
        console.log(response)
        $scope.menu = response;
      })
      .error(function (error, status, headers, config) {
        console.log(error);
        // TODO: handle this scenario (or not)
      });
  };

  $scope.init();
});
