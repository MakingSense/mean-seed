'use strict';

angular.module('meanp').controller('SignupCtrl', function ($scope, Auth, $location) {

		$scope.register = function(form) {

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

	    };
});