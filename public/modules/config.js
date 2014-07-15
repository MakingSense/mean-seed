'use strict';

define(['app','angular',
    "base/controllers/main.js",
    "base/controllers/login.js",
    "base/controllers/navbar.js",
    "base/controllers/signup.js",
    "base/services/User.js",
    "base/directives/onFocus.js",
    "base/directives/mongooseError.js",
    "base/services/Session.js"
],

    function (app, angular) {
        angular.module('meanp').config(
            ['$routeProvider', '$provide', '$httpProvider','$compileProvider',
                function($routeProvider, $provide, $httpProvider,$compileProvider) {
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
                        .otherwise({
                            redirectTo: '/'
                        });
                    $locationProvider.html5Mode(false);

                    //added method success and error to the original $q library
                    $provide.decorator('$q', function ($delegate) {
                        var defer = $delegate.defer;
                        $delegate.defer = function () {
                            var deferred = defer();
                            deferred.promise.success = function (fn) {
                                deferred.promise.then(function (value) {
                                    fn(value);
                                });
                                return deferred.promise;
                            };
                            deferred.promise.error = function (fn) {
                                deferred.promise.then(null, function (value) {
                                    fn(value);
                                });
                                return deferred.promise;
                            };
                            return deferred;
                        };
                        return $delegate;
                    });


                    //http://docs.angularjs.org/api/ng/provider/$compileProvider
                    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
                    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
                }]
        )
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
    }
);
