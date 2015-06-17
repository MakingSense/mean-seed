'use strict';

angular.module('mean').controller('SignupCtrl', function ($scope, $rootScope, $location, userService, authService) {

		$scope.register = function(form) {
            $scope.errors = {};

            userService.create($scope.user)
                .then(function (response, status, headers, config) {
                    if (response.data.success) {
                        var params = authService.parseToken(response.data.token);
                        $rootScope.setCurrentUser(params.user);
                        $location.path('/');
                    } else { 
                        $scope.errorMessage = response.data.message;  
                    }
                },function (response, status, headers, config) {
                    $scope.errorMessage = response.data.message;
                });
            
	    };
});