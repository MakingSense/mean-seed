angular.module('mean').controller('RoleEditCtrl', function ($scope, $rootScope, $location, $routeParams, roleService) {

    $scope.init = function() {
        $scope.editMode = true;
        $scope.roleId = $routeParams.id;

        // Used to fill the select in the form
        roleService.getById($scope.roleId)
            .success(function (response, status, headers, config) {
                $scope.role = response;
            })
            .error(function(response, status, headers, config) {
                $scope.errorMessage = response.data.message;
            });

    };

    $scope.init();

    $scope.saveRole = function (form){
        roleService.update($scope.roleId, $scope.role)
            .success(function (response, status, headers, config) {
                $location.path('/roles');
            })
            .error(function(response, status, headers, config) {
                $scope.errorMessage = response.data.message;
            });
    };

    $scope.Cancel = function () {
        $location.path('/roles');   
    };
});
