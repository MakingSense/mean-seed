'use strict';

angular.module('mean').controller('NavbarCtrl', function ($scope,$rootScope, $location, $sessionStorage, authService) {

    $scope.logout = function() {
           authService.logout();
           $rootScope.unsetCurrentUser();
           $sessionStorage.$reset();
           $location.path('/login');
    };

});
