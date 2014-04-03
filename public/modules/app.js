'use strict';

angular.module('meanp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/base/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/blogs', {
        templateUrl: 'modules/blogs/views/list.html',
        controller: 'BlogsCtrl'
      })
      .when('/blogs/create', {
        templateUrl: 'modules/blogs/views/create.html',
        controller: 'BlogsCtrl'
      })
      .when('/blogs/:blogId/edit', {
        templateUrl: 'modules/blogs/views/edit.html',
        controller: 'BlogsCtrl'
      })
      .when('/blogs/:blogId', {
        templateUrl: 'modules/blogs/views/view.html',
        controller: 'BlogsCtrl'
      })
      .when('/login', {
        templateUrl: 'modules/base/views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'modules/base/views/signup.html',
        controller: 'SignupCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(false);
  })

  .run(function ($rootScope, $location, sessionService) {

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && ([ '/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {

          sessionService.getCurrentUser()
              .success(function (response, status, headers, config) {
               $rootScope.currentUser = response;
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