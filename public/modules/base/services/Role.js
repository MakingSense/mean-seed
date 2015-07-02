'use strict';

/* Services */
angular.module('mean').service('roleService', function ($http) {

    this.getAll = function () {
        return $http.get('/auth/roles/getall');
    };
    
    this.getById = function (roleId) {
        return $http.get('/auth/roles/' + roleId);
    };
    
    this.add = function(postData){
        return $http.post('/auth/roles', postData);
    };
    
   this.update = function (roleId, roleData) {
        return $http.put('/auth/roles/' + roleId, roleData);
    };
    
    this.delete = function (roleId) {
        return $http.delete('/auth/roles/' + roleId);
    };
});