angular.module('mean').controller('RolesCtrl', function ($scope, $rootScope, $location, roleService) {

        $scope.errorMessage = '';
        $scope.roles = [];
        
        function LoadRoles(){
              roleService.getAll()
               .then(function (response, status, headers, config) {
                        $scope.roles = response.data;
                      }, function (response, status, headers, config) {
                            $scope.errorMessage = response.data.message;
                      });
        }
        LoadRoles();
        
        $scope.edit = function (role){
              $location.path('/roles/' + role._id + '/edit');
        };
        
        $scope.delete = function (role){
              roleService.delete(role._id)
                  .success(function (response, status, headers, config) {
                      // Reload the current page
                      LoadRoles();
                  })
                  .error(function (response, status, headers, config) {
                      // This should never happen
                      $scope.errorMessage = response.data.message;
                  });
        };

      $scope.create = function(){
            $location.path('/roles/add');   
      };
});