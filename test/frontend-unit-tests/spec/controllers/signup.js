'use strict';

describe('Controller: SignupCtrl', function () {

  // load the controller's module
  beforeEach(module('mean'));

  var SignupCtrl,
    scope,
    location,
    rootScope,
    UserService,
    createDeferred;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_, $q) {
    rootScope = _$rootScope_;
    scope = rootScope.$new();

    createDeferred = $q.defer();
    location = jasmine.createSpyObj('location', ['path']);
    UserService = jasmine.createSpyObj('UserService', ['create']);
    UserService.create.and.returnValue(createDeferred.promise);

    rootScope.setCurrentUser = jasmine.createSpy('setCurrentUser');

    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope,
      $rootScope: rootScope,
      $location: location,
      userService: UserService
    });

  }));

  it('should initialize controller with variables defined', function () {
    expect(typeof SignupCtrl).toBe('object');
    expect(scope.errorMessage).toBeDefined();
    expect(scope.roles).toBeDefined();
    expect(scope.user).toBeDefined();
    expect(scope.errorMessage).toEqual('');
    expect(scope.roles).toEqual([]);
    expect(scope.user).toEqual({});
  });

  it('should initialize call and resolve after register', function() {
    scope.register({});

    scope.$apply(function() {
      createDeferred.resolve({});
    });

    expect(UserService.create).toHaveBeenCalled();
    expect(rootScope.setCurrentUser).toHaveBeenCalled();
    expect(location.path).toHaveBeenCalled();
    expect(scope.errorMessage).toEqual('');
  });

  it('should initialize call and resolve after register', function() {
    scope.register({});

    scope.$apply(function() {
      createDeferred.reject('error');
    });

    expect(UserService.create).toHaveBeenCalled();
    expect(scope.errorMessage).toEqual('error');
  });

});
