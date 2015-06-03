'use strict';

angular.module('mean', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngStorage',
    'ngRoute',
    'http-auth-interceptor',
    'ui.bootstrap',
    'autofill-directive'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/base/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'modules/base/views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'modules/base/views/signup.html',
        controller: 'SignupCtrl'
      })
      //===== mean-cli hook =====//
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(false);
  })

.run(function($rootScope, $location, sessionService, menuService, $sessionStorage) {

  //watching the value of the currentUser variable.
  $rootScope.$watch('currentUser', function(currentUser) {
    // if no currentUser and on a page that requires authorization then try to update it
    // will trigger 401s if user does not have a valid session
    $rootScope.currentUser = $sessionStorage.currentUser ? $sessionStorage.currentUser : $rootScope.currentUser;
    $rootScope.menu = $sessionStorage.menu ? $sessionStorage.menu : $rootScope.menu;

    if (!$rootScope.currentUser && ['/login', '/logout', '/signup'].indexOf($location.path()) == -1) {

      sessionService.getCurrentUser()
        .success(function(response, status, headers, config) {
          $sessionStorage.currentUser = response;
        })
        .error(function(error, status, headers, config) {
          $location.path('/login');
          console.log(error)
        });

      menuService.get()
        .success(function(response, status, headers, config) {
          $sessionStorage.menu = $rootScope.menu = response;
          console.log(response)
        })
        .error(function(error, status, headers, config) {
          $location.path('/login');
          console.log(error)
        });
    }
  });

  // On catching 401 errors, redirect to the login page.
  $rootScope.$on('event:auth-loginRequired', function() {
    $location.path('/login');
    return false;
  });
});