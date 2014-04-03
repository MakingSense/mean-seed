'use strict';

/* Services */
angular.module('meanp').service('sessionService', function ($http) {

    this.create = function (provider,user) {
        return $http.post('/auth/session/', {
            provider: provider,
            email: user.email,
            password: user.password,
            rememberMe: user.rememberMe
        });
    };

    this.remove = function () {
        return $http.delete('/auth/session/');
    };

    this.getCurrentUser = function () {
        return $http.delete('/auth/session/');
    };
});