'use strict';

angular.module('mean')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, authService) {
    $scope.errors =  {};
    $scope.submitted = false;

    $scope.login = function(form) {
        
        $scope.submitted = true;
        if(form.email.$error.required) return;
        
        authService.login($scope.user)
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
                $scope.errors.other = response.message;
            }); 
    };
  });