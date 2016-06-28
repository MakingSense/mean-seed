'use strict';

/* Services */
angular.module('mean').service('configService', function ($localStorage, $http, $q) {

  this.get = function () {
    if($localStorage.auth0Domain) {
      return $q.when();
    }

    var deferred = $q.defer();

    $http.get('/config')
      .then(function(res) {
        $localStorage.auth0Domain = res.data.auth0Domain;
        $localStorage.auth0Connection = res.data.auth0Connection;
        $localStorage.auth0ClientId = res.data.auth0ClientId;
        deferred.resolve();
      }, function(err) {
        deferred.reject(err);
      });

    return deferred.promise;

  };

});
