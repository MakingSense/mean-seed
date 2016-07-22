'use strict';

angular.module('mean')
  .service('blogService', function ($http, $location) {

    var baseBath = '/api';

        //return the array
        this.getAll = function () {
           return $http.get(baseBath + '/myPosts');
        };

        //search by id in the current array
        this.getById = function (blogItemId) {
            return $http.get(baseBath + '/myPosts/'+blogItemId);
        };

        //add a new element to array
        this.create = function (postData) {
            return $http.post(baseBath + '/newPost', postData);
        };

        //update blogItem matching by id
        this.update = function (blogItemId, blogItem) {
            return $http.put(baseBath + '/editPost/'+blogItemId, blogItem);
        };

        //remove blogItem matching by id
        this.remove = function (blogItemId) {
            return $http.delete(baseBath + '/delete/'+blogItemId);

        };

        //
        // this.login = function (user) {
        //     return $http.post('/login',user);
        // };
        // this.logout = function () {
        //     return $http.post('/logout',{});
        // };
});
