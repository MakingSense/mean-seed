'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('mean'));

  var LoginCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });

    // mock angular form
    scope.optionsForm = {model:{}, email:{$error:{}}};
    scope.optionsForm.model.$setValidity = function() {};

    // mock user
    scope.user = { email: '', password: '', username: '' };
  }));

  it('should set scope.errorMessage on mongoose errors', function () {
    $httpBackend.expectPOST('/auth/').respond(404, { message: 'Test Error'});
      
    scope.login(scope.optionsForm);
    $httpBackend.flush();
    expect(scope.errorMessage).toBe('Test Error');
  });
});
