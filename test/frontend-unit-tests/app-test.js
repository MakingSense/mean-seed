'use strict';

angular.module('mean', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ( $locationProvider) {
    $locationProvider.html5Mode(true);
  })