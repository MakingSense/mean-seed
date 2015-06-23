'use strict';

describe('Controller: SignupCtrl', function () {

  // load the controller's module
  beforeEach(module('mean'));

  var SignupCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope
    });

    // mock angular form
    scope.optionsForm = {model:{}};
    scope.optionsForm.model.$setValidity = function() {};

    // mock user
    scope.user = { email: '', password: '', username: '' };
  }));

  it('should set scope.errorMessage on mongoose errors', function () {
    $httpBackend.expectPOST('/auth/users').respond(404, { message: 'Test Error'});

    scope.register(scope.optionsForm);
    $httpBackend.flush();
    expect(scope.errorMessage).toBe('Test Error');
  });
});
