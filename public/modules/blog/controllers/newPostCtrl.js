'use strict';

angular.module('mean')
  .controller('newPostCtrl', function($scope, blogService, $location, toaster) {

    // Call to blogService.create()
    $scope.addPost = function() {
        var postData = {
            title : $scope.titlePost,
            text : $scope.bodyPost
        };
        blogService.create(postData)
            .success(function (current, status, headers, config) {
                $location.path('/blog');
                toaster.pop('success', 'Post saved successfully!');
            })
            .error(function(current, status, headers, config) {
                toaster.pop('error', current);
            });
    };
});
