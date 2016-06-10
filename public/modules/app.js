'use strict';

angular.module('mean', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngStorage',
  'ngRoute',
  'autofill-directive',
  'auth0',
  'dotenv'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.interceptors.push('authInterceptor');

    $routeProvider
      .when('/', {
        templateUrl: 'modules/base/views/main.html',
        controller: 'MainCtrl',
        requireAuth: true
      })
      .when('/login', {
        templateUrl: 'modules/base/views/login.html',
        controller: 'LoginCtrl',
        requireAuth: false
      })
      .when('/signup', {
        templateUrl: 'modules/base/views/signup.html',
        controller: 'SignupCtrl',
        requireAuth: false
      })
      //===== mean-cli hook =====//
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(false);
  })
  .config(function(authProvider, dotenv) {
    dotenv.config();
    // routing configuration and other stuff
    // ...

    authProvider.init({
      domain: 'mydomain.auth0.com',
      clientID: 'myClientID',
      loginUrl: '/login'
    });
  })


.run(function ($route, $rootScope, $location, $window, authService) {

  $rootScope.$on('$locationChangeStart', function (ev, next, current) {
    var nextPath = $location.path();
    var nextRoute = $route.routes[nextPath];

    if (nextRoute && nextRoute.requireAuth && !authService.isAuthed()) {
      $location.path('/login');
    }

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
})
.run(function(auth) {
  auth.hookEvents();
});
