'use strict';

angular.module('mean')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, authService) {

    $scope.submitted = false;
    
    $scope.errorMessage = '';

    $scope.login = function(form) {
        
        $scope.submitted = true;
        if(form.email.$error.required) return;
        
        authService.login($scope.user)
            .then(function (response, status, headers, config) {
                 var params = authService.parseToken(response.data.token);
                 $rootScope.setCurrentUser(params.user);
                 $location.path('/');
            }, function (response, status, headers, config) {
                $scope.errorMessage = response.data.message; 
            }); 
    };
  });