'use strict';

angular.module('meanp').controller('SignupCtrl', function ($scope,$rootScope, Auth, $location, userService) {

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
/*
			Auth.createUser( $scope.user , function(err) {
			  $scope.errors = {};

			  if (!err) {
				$location.path('/');
			  } else {
				angular.forEach(err.errors, function(error, field) {
				  form[field].$setValidity('mongoose', false);
				  $scope.errors[field] = error.type;
				});
			  }
			});
*/
	    };
});