'use strict';

angular.module('meanp').controller('SignupCtrl', function ($scope,$rootScope, $location, userService) {

		$scope.register = function(form) {
            $scope.errors = {};

            userService.create($scope.user)
                .success(function (response, status, headers, config) {
                    $rootScope.currentUser = response;
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