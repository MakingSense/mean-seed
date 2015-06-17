'use strict';

angular.module('mean')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, authService) {

    $scope.submitted = false;

    $scope.login = function(form) {
        
        $scope.submitted = true;
        if(form.email.$error.required) return;
        
        authService.login($scope.user)
            .then(function (response, status, headers, config) {
                if (response.data.success) {
                    var params = authService.parseToken(response.data.token);
                    $rootScope.setCurrentUser(params.user);
                    $location.path('/');
                } else {
                    $scope.errorMessage = response.data.message;
                }
            }); 
    };
  });