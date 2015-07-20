'use strict';

/* Services */
angular.module('mean').service('userService', function ($http) {

  this.create = function (postData) {
    return $http.post('/auth/users', postData);
  };

  this.remove = function (blogItemId) {
    return $http.delete('/auth/users/' + blogItemId);
  };
});
