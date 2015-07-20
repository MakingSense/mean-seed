'use strict';

// Inject the $interceptor to avoid circular dependencies
angular.module('mean').factory('authInterceptor', ['$q', '$injector', function ($q, $injector) {

  return {

    // Automatically attach Authorization header
    request: function (config) {

      var AuthService = $injector.get('authService');
      var token = AuthService.getToken();

      if (token) {
        config.headers['x-access-token'] = token;
      }

      config.headers['Content-Type'] = 'application/json; charset=UTF-8';

      return config;

    },

    // If a token was sent back, then save it
    response: function (res) {

      var token = res.data.token;
      var AuthService = $injector.get('authService');

      if (token) {
        AuthService.saveToken(token);
      }

      return res;
    }
  };

}]);
