'use strict';

/* Services */
angular.module('mean').service('userService', function ($http, $localStorage, $q, auth, authService) {

  auth.init({
    domain: $localStorage.auth0_domain,
    clientID: $localStorage.auth0_client_id,
    loginUrl: '/login'
  });

  this.create = function (postData) {
    var deferred = $q.defer();

    auth.signup({
      connection: $localStorage.auth0_connection,
      email: postData.email,
      username: postData.username,
      password: postData.password,
      email_verified: false
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
      connection: $localStorage.auth0_connection
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
