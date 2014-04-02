'use strict';

angular.module('meanp')
  .controller('BlogsCtrl', function ($scope, $location, $routeParams, $rootScope, blogService) {

    $scope.create = function() {

        blogService.create($scope.blog)
            .success(function (response, status, headers, config) {
                $scope.blog.title = "";
                $scope.blog.content = "";
                $location.path("/blogs/" + response._id);
            })
            .error(function(error, status, headers, config) {
                //TODO: remove console logs, and add toaster notification in red color
                console.log(error);
            });
    };

    $scope.remove = function() {
        blogService.remove($routeParams.blogId)
            .success(function (response, status, headers, config) {
                $location.path("/blogs");
            })
            .error(function(error, status, headers, config) {
                console.log(error)
            });
    };

    $scope.update = function() {
        blogService.update($routeParams.blogId, $scope.blog)
            .success(function (response, status, headers, config) {
                $location.path('/blogs/' + response._id);
            })
            .error(function(error, status, headers, config) {
                console.log(error)
            });
    };

    $scope.find = function() {
        blogService.getAll()
            .success(function (response, status, headers, config) {
                $scope.blogs = response;
            })
            .error(function(error, status, headers, config) {
                console.log(error)
            });
    };

    $scope.findOne = function() {
        blogService.getById($routeParams.blogId)
            .success(function (response, status, headers, config) {
                $scope.blog = response;
            })
            .error(function(error, status, headers, config) {
                console.log(error)
            });
    };
  });
