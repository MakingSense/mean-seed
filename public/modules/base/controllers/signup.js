'use strict';

angular.module('mean').controller('SignupCtrl', function ($scope, $rootScope, $location, userService, authService) {

    $scope.errorMessage = '';
    $scope.roles = [];
    $scope.user = {};

    $scope.register = function (form) {
        $scope.errors = {};
        
        userService.create($scope.user)
            .then(function (response, status, headers, config) {
                var params = authService.parseToken(response.data.token);
                $rootScope.setCurrentUser(params.user);
                $location.path('/');
            }, function (response, status, headers, config) {
                $scope.errorMessage = response.data.message;
            });
    };
});