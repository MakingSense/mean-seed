angular.module('mean').controller('ResourceEditCtrl', function ($scope, $rootScope, $location, $routeParams, resourceService) {

    $scope.init = function() {
        $scope.editMode = true;
        $scope.resourceId = $routeParams.id;

        // Used to fill the select in the form
        resourceService.getById($scope.resourceId)
            .success(function (response, status, headers, config) {
                $scope.resource = response;
            })
            .error(function(response, status, headers, config) {
                $scope.errorMessage = response.data.message;
            });

    };

    $scope.init();

    $scope.save = function (){
        resourceService.update($scope.resourceId, $scope.resource)
            .success(function (response, status, headers, config) {
                $location.path('/resources');
            })
            .error(function(response, status, headers, config) {
                $scope.errorMessage = response.data.message;
            });
    };

    $scope.Cancel = function () {
        $location.path('/resources');   
    };
});
