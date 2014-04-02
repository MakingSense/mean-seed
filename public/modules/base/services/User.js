'use strict';

angular.module('meanp')
  .factory('User', function ($resource) {
    return $resource('/auth/users/:id/', {},
      {
        'update': {
          method:'PUT'
        }
      });
  });

/* Services */
angular.module('meanp').service('userService', function ($http) {

    this.getAll = function () {
        return $http.get('/auth/users/');
    }

    this.getById = function (blogItemId) {
        return $http.get('/auth/users/'+blogItemId);
    };

    this.create = function (postData) {
        return $http.post('/auth/users', postData);
    };

    this.update = function (blogItemId, blogItem) {
        return $http.put('/auth/users/'+blogItemId, blogItem);
    };

    this.remove = function (blogItemId) {
        return $http.delete('/auth/users/'+blogItemId);
    };
});