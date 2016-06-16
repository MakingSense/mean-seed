'use strict';

angular.module('mean').factory('authService', ['$http', '$window', 'auth', function ($http, $window, auth) {

  var authService = {};

  // Save the token in the local storage
  authService.saveToken = function (token) {
    $window.localStorage.auth0Token = token;
  };

  authService.saveRefreshToken = function (token) {
    $window.localStorage.auth0RefreshToken = token;
  };

  // Retrieve the token in the local storage
  authService.getToken = function () {
    return $window.localStorage.auth0Token;
  };

  authService.getRefreshToken = function () {
    return $window.localStorage.auth0RefreshToken;
  };

  // Logout
  authService.logout = function () {
    if (authService.getToken()) {
      auth.signout();
      $window.localStorage.removeItem('auth0Token');
      $window.localStorage.removeItem('auth0RefreshToken');
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
