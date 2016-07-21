'use strict';

angular.module('mean')
  .controller('postDetailsCtrl', function($scope, $routeParams, blogService, $location, toaster) {

    //Call to getById() method in blogService
    blogService.getById($routeParams.postId)
        .success(function (current, status, headers, config) {
            $scope.current = current;
        })
        .error(function(current, status, headers, config) {
            toaster.pop('error', current);
         });

    // removePost function
    $scope.removePost = function () {
        blogService.remove($scope.current._id)
            .success(function (current, status, headers, config) {
                $location.path('/blog/');
                toaster.pop('success', 'Post removed successfully!');
            })
            .error(function(current, status, headers, config) {
                toaster.pop('error', current);
            });
    };
});
