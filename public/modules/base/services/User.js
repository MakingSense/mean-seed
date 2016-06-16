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
    }, function(profile, idToken, accessToken) {
      authService.saveToken(idToken);
      // authService.saveRefreshToken(accessToken);
      deferred.resolve(profile);
    }, function(error) {
      deferred.reject('Error: ' + error);
    }, 'Auth0');

    return deferred.promise;
  };

  this.refreshToken = function () {
    var deferred = $q.defer();

    auth.refreshIdToken(authService.getRefreshToken())
      .then(function(res) {
        authService.saveToken(res);
        deferred.resolve();
      }, function(err) {
        deferred.reject('Error: ' + err);
      });

    return deferred.promise;
  };

  this.remove = function (blogItemId) {
    return $http.delete('/auth/users/' + blogItemId);
  };
});
