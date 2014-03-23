'use strict';

angular.module('meanp')
  .controller('BlogsCtrl', function ($scope, Blogs, $location, $routeParams, $rootScope, blogService) {

    $scope.create = function() {

        var post = {
            title: this.title,
            content: this.content
        };

        blogService.create(post)
            .success(function (response, status, headers, config) {
                this.title = "";
                this.content = "";
                $location.path("blogs/" + response._id);
            })
            .error(function(error, status, headers, config) {
                //TODO: remove console logs, and add toaster notification in red color
                console.log(error);
            });
    };

    $scope.remove = function(blog) {
        remove(blog.id)
            .success(function (response, status, headers, config) {
                $location.path("/blogs");
            })
            .error(function(error, status, headers, config) {
                console.log(error)
            });
    };

    $scope.update = function() {
      var blog = $scope.blog;
      blog.$update(function() {
        $location.path('blogs/' + blog._id);
      });
    };

    $scope.find = function() {
      Blogs.query(function(blogs) {
        $scope.blogs = blogs;
      });
    };

    $scope.findOne = function() {
      Blogs.get({
        blogId: $routeParams.blogId
      }, function(blog) {
        $scope.blog = blog;
      });
    };
  });
