'use strict';

angular.module('mean', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'ui.bootstrap'
])
  .config(function ( $locationProvider) {
    $locationProvider.html5Mode(true);
  })