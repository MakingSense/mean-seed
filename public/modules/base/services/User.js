'use strict';

/* Services */
angular.module('meanp').service('userService', function ($http) {

    this.create = function (postData) {
        return $http.post('/auth/users', postData);
    };

    this.remove = function (blogItemId) {
        return $http.delete('/auth/users/'+blogItemId);
    };
});