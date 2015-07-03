angular.module('mean').controller('ResourceAddCtrl', function ($scope, $rootScope, $location, resourceService) {

    $scope.save = function (){
        resourceService.add($scope.resource)
            .success(function (response, status, headers, config) {
                $location.path('/resources');
            })
            .error(function(response, status, headers, config) {
                $scope.errorMessage = response.message;
            });
    };
    
    $scope.Cancel = function () {
        $location.path('/resources');   
    };
});
