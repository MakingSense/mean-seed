'use strict';

/* Services */
angular.module('mean').service('userService', function ($http) {

  this.create = function (postData) {
    console.log(postData);
    
  };

  this.remove = function (blogItemId) {
    return $http.delete('/auth/users/' + blogItemId);
  };
});
