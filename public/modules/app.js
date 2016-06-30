'use strict';

angular.module('mean', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngStorage',
  'ngRoute',
  'autofill-directive',
  'auth0'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.interceptors.push('authInterceptor');

    $routeProvider
      .when('/', {
        templateUrl: 'modules/base/views/main.html',
        controller: 'MainCtrl',
        requireAuth: true
      })
      //===== meanp-cli hook =====//
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(false);

  })

.run(function ($route, $rootScope, $location, $window, configService, authService, auth, $localStorage) {
  
  //===== meanp-cli login cgf hook =====//

  $rootScope.$on('$locationChangeStart', function (ev, next, current) {

    //===== meanp-cli login hook =====//

  });

  // Check if the user is authenticated
  $rootScope.isAuthed = function () {
    return authService.isAuthed() !== null && authService.isAuthed() !== false;
  };

  // Store current user info
  $rootScope.setCurrentUser = function (me) {
    $window.localStorage.setItem('currentUser', JSON.stringify(me));
  };

  // Retrieve current user info
  $rootScope.getCurrentUser = function () {
    return JSON.parse($window.localStorage.getItem('currentUser'));
  };

  // Remove the current use info
  $rootScope.unsetCurrentUser = function () {
    $window.localStorage.removeItem('currentUser');
  };
});
