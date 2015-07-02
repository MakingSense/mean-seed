'use strict';

angular.module('mean', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngStorage',
  'ngRoute',
  'ui.bootstrap',
  'autofill-directive',
  'ngTable'
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
      .when('/roles', {
        templateUrl: 'modules/base/views/roles.html',
        controller: 'RolesCtrl',
        requireAuth: true
      })
      .when('/roles/add', {
        templateUrl: 'modules/base/views/roleEdit.html',
        controller: 'RoleAddCtrl'
      })
      .when('/roles/:id/edit', {
        templateUrl: 'modules/base/views/roleEdit.html',
        controller: 'RoleEditCtrl'
      })
      //===== mean-cli hook =====//
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(false);
  })

  .run(function ($route, $rootScope, $location, $window, authService) {
   
     $rootScope.$on('$locationChangeStart', function(ev, next, current) {
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
     $rootScope.setCurrentUser = function(me) {
            $window.localStorage.setItem("currentUser", JSON.stringify(me));
      };
      
     // Retrieve current user info
     $rootScope.getCurrentUser = function() {
            return JSON.parse($window.localStorage.getItem("currentUser"));
     };
     
     // Remove the current use info 
     $rootScope.unsetCurrentUser = function() {
            $window.localStorage.removeItem('currentUser');
     };
});