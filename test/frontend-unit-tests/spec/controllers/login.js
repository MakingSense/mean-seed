'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('mean'));

  var LoginCtrl,
    scope,
    rootScope,
    UserService,
    loginDeferred,
    location,
    loginForm;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_, $q) {
    rootScope = _$rootScope_;
    scope = rootScope.$new();

    loginDeferred = $q.defer();
    location = jasmine.createSpyObj('location', ['path']);
    UserService = jasmine.createSpyObj('UserService', ['login']);
    UserService.login.and.returnValue(loginDeferred.promise);

    rootScope.setCurrentUser = jasmine.createSpy('setCurrentUser');

    loginForm = {
      username: {
        $error: {
          required: false
        }
      }
    };

    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      $rootScope: rootScope,
      $location: location,
      userService: UserService
    });

  }));

  it('should initialize controller with variables defined', function () {
    expect(typeof LoginCtrl).toBe('object');
    expect(scope.errorMessage).toBeDefined();
    expect(scope.submitted).toBeDefined();
    expect(scope.submitted).toBeFalsy();
    expect(scope.errorMessage).toEqual('');
  });

  it('should initialize call and resolve after login', function() {
    scope.login(loginForm);

    scope.$apply(function() {
      loginDeferred.resolve({});
    });

    expect(UserService.login).toHaveBeenCalled();
    expect(rootScope.setCurrentUser).toHaveBeenCalled();
    expect(location.path).toHaveBeenCalled();
    expect(scope.errorMessage).toEqual('');
  });

  it('should initialize call and resolve after login', function() {
    scope.login(loginForm);

    scope.$apply(function() {
      loginDeferred.reject('error');
    });

    expect(UserService.login).toHaveBeenCalled();
    expect(scope.errorMessage).toEqual('error');
  });

});
