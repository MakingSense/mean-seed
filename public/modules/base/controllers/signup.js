'use strict';

angular.module('mean').controller('SignupCtrl', function ($scope, $rootScope, $location, userService, authService) {

		$scope.register = function(form) {
            $scope.errors = {};

            userService.create($scope.user)
                .success(function (response, status, headers, config) {
                    var params = authService.parseToken(response.token);
                    $rootScope.setCurrentUser(params.user);
                    $location.path('/');
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });

	    };
});