'use strict';

angular.module('mean', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngStorage',
  'ngRoute',
  'autofill-directive',
  'auth0',
  'toaster'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.interceptors.push('authInterceptor');

    $routeProvider
      .when('/', {
        templateUrl: 'modules/base/views/main.html',
        controller: 'MainCtrl',
        requireAuth: true
      })
      .when('/blog', {
        templateUrl: 'modules/blog/views/myPosts.html',
        controller: 'myPostsCtrl',
        requireAuth: true
      })
      .when('/login', {
          templateUrl: 'modules/blog/views/login.html',
          controller: 'LoginCtrl'
      })
      .when('/addpost', {
          controller: 'newPostCtrl',
          templateUrl: 'modules/blog/views/newPost.html'
      })
      // .when('/toaster', {
      //     controller: 'toasterCtrl',
      //     templateUrl: 'modules/blog/views/toaster.html'
      // })
      .when('/posts/:postId', {
          controller: 'postDetailsCtrl',
          templateUrl: 'modules/blog/views/postDetails.html'
      })
      .when('/edit/:postId', {
          controller: 'editPostCtrl',
          templateUrl: 'modules/blog/views/editPost.html'
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
    return true;
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
