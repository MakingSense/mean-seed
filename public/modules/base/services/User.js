'use strict';

/* Services */
angular.module('mean').service('userService', function ($http, $localStorage, $q, auth) {

  auth.init({
    domain: $localStorage.auth0_domain,
    clientID: $localStorage.auth0_client_id,
    loginUrl: '/login'
  });

  this.create = function (postData) {
    var deferred = $q.defer();

    auth.signup({
      username: postData.email,
      password: postData.password,
      connection: 'Username-Password-Authentication',
      popup:  false,
      auto_login: true
    }, function(profile) {
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
