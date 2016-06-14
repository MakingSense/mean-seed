'use strict';

/* Services */
angular.module('mean').service('userService', function ($http, $localStorage, $q, auth, authService) {

  this.create = function (postData) {
    var deferred = $q.defer();
    auth.signup({
      connection: $localStorage.auth0Connection,
      email: postData.email,
      username: postData.username,
      password: postData.password
    }, function(profile) {
      deferred.resolve(profile);
    }, function(error) {
      deferred.reject('Error: ' + error);
    }, 'Auth0');

    return deferred.promise;
  };

  // Login - Make a request to the api for authenticating
  this.login = function(credentials) {
    var deferred = $q.defer();

    auth.signin({
      username: credentials.username,
      password: credentials.password,
      connection: $localStorage.auth0Connection
    }, function(profile, idToken, accessToken, state, refreshToken) {
      authService.saveToken(idToken);
      deferred.resolve(profile);
    }, function(error) {
      deferred.reject('Error: ' + error);
    }, 'Auth0');

    return deferred.promise;
  };

  this.remove = function (blogItemId) {
    return $http.delete('/auth/users/' + blogItemId);
  };
});
