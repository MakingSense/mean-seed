'use strict';

angular.module('mean')
  .directive('confirmMessage', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var msg = attrs.confirmMessage || 'Are you sure?';
        var clickAction = attrs.confirmedAction;

        element.click(function (event) {
          if (window.confirm(msg)) {
            scope.$eval(clickAction);
          }
        });
      }
    };
  });
