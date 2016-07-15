/**********************************************************************
 * Login controller
 **********************************************************************/

'use strict';

angular.module('mean')
  .controller('LoginCtrl', function($scope, $rootScope, $http, blogService,$location) {
  // Register the login() function
  $scope.login = function(){
    blogService.login($scope.user)
      .success(function(user){
        $rootScope.message = 'Authentication successful!';
        $rootScope.isLogged = true;
        $rootScope.user = $scope.user.username;
        $location.url('/posts');
      })
      .error(function(){
        $rootScope.message = 'Authentication failed. Please, try again.';
        $rootScope.isLogged = false;
        $location.url('/login');
      });
  };

  $scope.logout = function(){
    blogService.logout()
        .success(function(){
          $rootScope.message = '';
          $rootScope.isLogged = false;
          $location.url('/login');
        })
        .error(function(){
          $rootScope.isLogged = true;
          $location.url('/login');
        });
  };
});
