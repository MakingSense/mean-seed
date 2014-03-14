'use strict';

angular.module('meanp')
  .factory('Session', function ($resource) {
    return $resource('/auth/session/');
  });
