'use strict';

angular.module('mean').controller('NavbarCtrl', function ($scope,$rootScope, sessionService, $location, $sessionStorage) {

    $scope.logout = function() {
        sessionService.remove()
            .success(function (response, status) {
                console.log("Ok:",response);
            })
            .error(function(response, status) {
                console.log("Error:",response);
            })
            .finally(function() {
                $rootScope.currentUser = undefined;
                $sessionStorage.$reset();
                $location.path('/login');
            });

    };

});
