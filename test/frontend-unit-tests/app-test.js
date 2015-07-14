'use strict';

angular.module('mean', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
  })
