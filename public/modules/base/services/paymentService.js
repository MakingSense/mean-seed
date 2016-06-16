'use strict';

/* Services */
angular.module('mean').service('paymentService', function ($localStorage, $http, $q) {

  this.stripe = function (data) {
    var deferred = $q.defer();

    $http.post('/api/payments/stripe/', data)
      .then(function(res) {
        deferred.resolve(res);
      }, function(err) {
        deferred.reject(err);
      });

    return deferred.promise;

  };

});
