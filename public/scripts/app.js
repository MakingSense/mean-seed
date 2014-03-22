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
        templateUrl: 'views/modules/base/main.html',
        controller: 'MainCtrl'
      })
      .when('/blogs', {
        templateUrl: 'views/modules/blogs/list.html',
        controller: 'BlogsCtrl'
      })
      .when('/blogs/create', {
        templateUrl: 'views/modules/blogs/create.html',
        controller: 'BlogsCtrl'
      })
      .when('/blogs/:blogId/edit', {
        templateUrl: 'views/modules/blogs/edit.html',
        controller: 'BlogsCtrl'
      })
      .when('/blogs/:blogId', {
        templateUrl: 'views/modules/blogs/view.html',
        controller: 'BlogsCtrl'
      })
      .when('/login', {
        templateUrl: 'views/modules/base/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/modules/base/signup.html',
        controller: 'SignupCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(false);
  })

  .run(function ($rootScope, $location, Auth) {

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && ([ '/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
        Auth.currentUser();
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
  });