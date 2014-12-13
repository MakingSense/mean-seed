'use strict';

/* Services */
angular.module('meanp').service('menuService', function ($http) {
    this.get = function () {
        return $http.get('/api/common.js/');
    };
});