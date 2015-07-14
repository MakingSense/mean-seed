'use strict';

/* Services */
angular.module('mean').service('menuService', function ($http) {
  this.get = function () {
    return $http.get('/api/common/menu/');
  };
});
