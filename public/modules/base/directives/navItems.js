'use strict';

angular.module('mean')
  .directive('navItems', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        items: '='
      },
      templateUrl: "modules/base/views/partials/navItems.html"
    }
  });