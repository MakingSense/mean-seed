'use strict';

/* Services */
angular.module('mean').service('configService', function ($localStorage, $http, $q) {

  this.get = function () {
    if($localStorage.auth0_domain) {
      return $q.when();
    }

    var deferred = $q.defer();

    $http.get('/config')
      .then(function(res) {
        $localStorage.auth0_domain = res.data.auth0_domain;
        $localStorage.auth0_connection = res.data.auth0_connection;
        $localStorage.auth0_client_id = res.data.auth0_client_id;
        deferred.resolve();
      }, function(err) {
        deferred.reject(err);
      });

    return deferred.promise;

  };

});
