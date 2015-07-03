angular.module('mean').controller('ResourcesCtrl', function ($scope, $rootScope, $location, $filter, resourceService, ngTableParams) {

        $scope.errorMessage = '';
        var data = [];
        
        function LoadResources(){
              resourceService.getAll()
               .then(function (response, status, headers, config) {
                        data = response.data;
                        $scope.tableParams.reload();
                      }, function (response, status, headers, config) {
                            $scope.errorMessage = response.data.message;
                      });
        }
        LoadResources();
        
        $scope.tableParams = new ngTableParams({
              page: 1,            // show first page
              count: 10,          // count per page
              sorting: {
                  name: 'asc'     // initial sorting
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
              $location.path('/resources/' + role._id + '/edit');
        };
        
        $scope.delete = function (role){
              resourceService.delete(role._id)
                  .success(function (response, status, headers, config) {
                      // Reload the current page
                      LoadResources();
                  })
                  .error(function (response, status, headers, config) {
                      // This should never happen
                      $scope.errorMessage = response.data.message;
                  });
        };

      $scope.create = function(){
            $location.path('/resources/add');   
      };
});
