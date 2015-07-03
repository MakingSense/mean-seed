'use strict';

/* Services */
angular.module('mean').service('resourceService', function ($http) {

    this.getAll = function () {
        return $http.get('/auth/resources/getall');
    };
    
    this.getById = function (resourceId) {
        return $http.get('/auth/resources/' + resourceId);
    };
    
    this.add = function(postData){
        return $http.post('/auth/resources', postData);
    };
    
   this.update = function (resourceId, resourceData) {
        return $http.put('/auth/resources/' + resourceId, resourceData);
    };
    
    this.delete = function (resourceId) {
        return $http.delete('/auth/resources/' + resourceId);
    };
});
