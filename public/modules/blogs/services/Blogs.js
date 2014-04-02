'use strict';

/* Services */
angular.module('meanp').service('blogService', function ($http) {

    //return the array
    this.getAll = function () {
        return $http.get('/api/blogs');
    }

    //search by id in the current array
    this.getById = function (blogItemId) {
        return $http.get('/api/blogs/'+blogItemId);
    };

    //add a new element to array
    this.create = function (postData) {
        return $http.post('/api/blogs', postData);
    };

    //update blogItem matching by id
    this.update = function (blogItemId, blogItem) {
        return $http.put('/api/blogs/'+blogItemId, blogItem);
    };

    //remove blogItem matching by id
    this.remove = function (blogItemId) {
        return $http.delete('/api/blogs/'+blogItemId);
    };
});
