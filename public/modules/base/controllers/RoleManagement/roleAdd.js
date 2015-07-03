angular.module('mean').controller('RoleAddCtrl', function ($scope, $rootScope, $location, roleService) {

    $scope.saveRole = function (form){
        roleService.add($scope.role)
            .success(function (response, status, headers, config) {
                $location.path('/roles');
            })
            .error(function(response, status, headers, config) {
                $scope.errorMessage = response.message;
            });
    };
    
    $scope.Cancel = function () {
        $location.path('/roles');   
    };
});
