angular.module('mean').controller('RolesCtrl', function ($scope, $rootScope, $location, $filter, roleService, ngTableParams) {

        $scope.errorMessage = '';
        var data = [];
        
        function LoadRoles(){
              roleService.getAll()
               .then(function (response, status, headers, config) {
                        data = response.data;
                        $scope.tableParams.reload();
                      }, function (response, status, headers, config) {
                            $scope.errorMessage = response.data.message;
                      });
        }
        LoadRoles();
        
        $scope.tableParams = new ngTableParams({
              page: 1,            // show first page
              count: 10,          // count per page
              sorting: {
                  roleName: 'asc'     // initial sorting
              }
          }, {
              total: data.length,
              getData: function($defer, params) {
                    
                  var orderedData = params.sorting() ?
                          $filter('orderBy')(data, params.orderBy()) :
                          data;
      
                  $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
              }
          });
        
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