'use strict';

/* Services */
angular.module('mean').service('paymentService', function ($localStorage, $http, $q) {

  this.stripe = function () {
    var deferred = $q.defer();

    $http.get('/api/stripe')
      .then(function(res) {
        deferred.resolve(res);
      }, function(err) {
        deferred.reject(err);
      });

    return deferred.promise;

  };

});
