'use strict';

angular.module('mean').factory('authService', ['$http', '$window', 'auth', function ($http, $window, auth) {

  var authService = {};

  // Save the token in the local storage
  authService.saveToken = function (token) {
    $window.localStorage.auth0_token = token;
  };

  // Retrieve the token in the local storage
  authService.getToken = function () {
    return $window.localStorage.auth0_token;
  };

  // Logout
  authService.logout = function () {
    if (authService.getToken()) {
      auth.signout();
      $window.localStorage.removeItem('auth0_token');
    }
  };

  // Check if the user is authenticated
  authService.isAuthed = function () {

    var token = authService.getToken();

    return token ? true : false;
  };

  // Parse the JSON Web Token
  authService.parseToken = function (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse($window.atob(base64));
  };

  return authService;
}]);
