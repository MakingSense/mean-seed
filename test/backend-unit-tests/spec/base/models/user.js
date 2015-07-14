'use strict';

var should = require('should'),
  sinon = require('sinon'),
  app = require('../../server-test'),
  simpleDI = require('config/simpleDI');

var UserModel = simpleDI.resolve('base/userModel');

var sinonSandbox;

describe('Base#UserModel', function () {

  var makeSaltStub, findOneStub;

  before(function () {
    sinonSandbox = sinon.sandbox.create();

    makeSaltStub = sinonSandbox.stub(UserModel.prototype, 'makeSalt', function () {
      return 'dummySalt';
    });
  });

  after(function () {
    sinonSandbox.restore();
  });

  beforeEach(function () {
    findOneStub = sinonSandbox.stub(UserModel, 'findOne');
  });

  afterEach(function () {
    findOneStub.restore();
  });

  describe('#password', function () {

    it('should generate a proper hashed password when the password is set', function () {

      var newUser = new UserModel();

      newUser.password = 'dummy';

      newUser.hashedPassword.should.eql('Mj2+CZWOX0yB2qlf7sqR4+XF3Ea7tPuubChrXnO0h3lhYXbakhHxRFpbL0ytaQq+aAiP7y12MJpSZCstT5a7/g==');
    });

    it('should require password only for new users', function (done) {

      var newUser = new UserModel({
        email: 'test01@email.com',
        username: 'test01'
      });

      newUser.save(function (error) {
        error.should.be.instanceOf(Error);
        error.message.should.eql('Invalid password');

        // Two calls for findOne, to look for existing email and username
        findOneStub.calledTwice.should.be.true;

        done();
      });

      // The search for existing email and username won't return anyting
      findOneStub.callsArgWith(1, null, undefined);
    });

  });

  describe('#validatePassword', function () {

    it('should validate a password or not depending on if it\'s valid or not', function () {

      var newUser = new UserModel();

      newUser.password = 'dummy';

      newUser.validatePassword('dummy').should.be.true;
      newUser.validatePassword('invalid').should.be.false;
    });

  });

  describe('#email', function () {

    it('should validate email addresses', function (done) {

      var newUser = new UserModel({
        email: 'invalid',
        username: 'test01'
      });

      newUser.save(function (error) {
        error.message.should.eql('Validation failed');
        error.name.should.eql('ValidationError');
        error.errors.email.message.should.eql('Validator "The specified email is invalid." failed for path email');
        error.errors.email.path.should.eql('email');
        error.errors.email.type.should.eql('The specified email is invalid.');

        // Two calls for findOne, to look for existing email and username
        findOneStub.calledTwice.should.be.true;

        done();
      });

      // The search for existing email and username won't return anyting
      findOneStub.callsArgWith(1, null, undefined);
    });

    it('should prevent creation of user if email address is already registered', function (done) {

      var newUser = new UserModel({
        email: 'test01@local.com',
        username: 'test01',
        password: 'dummy'
      });

      newUser.validate(function (error) {
        error.message.should.eql('Validation failed');
        error.name.should.eql('ValidationError');
        error.errors.email.message.should.eql('Validator "The specified email address is already in use." failed for path email');
        error.errors.email.path.should.eql('email');
        error.errors.email.type.should.eql('The specified email address is already in use.');

        // Two calls for findOne, to look for existing email and username
        // We can't assert that two calls were made because the order in which existing entries
        // are found is not strictly defined, so it might have searched by email first
        //findOneStub.calledTwice.should.be.true;
        findOneStub.callCount.should.be.within(1, 2);

        done();
      });

      // When searching by email an user is returned
      findOneStub.withArgs({
        email: 'test01@local.com'
      }).callsArgWith(1, null, new UserModel());

      // In any other case no results are found
      findOneStub.callsArgWith(1, null, undefined);
    });

  });

  describe('#username', function () {

    it('should prevent creation of user if username is already registered', function (done) {

      var newUser = new UserModel({
        email: 'test01@local.com',
        username: 'test01',
        password: 'dummy'
      });

      newUser.save(function (error) {
        error.message.should.eql('Validation failed');
        error.name.should.eql('ValidationError');
        error.errors.username.message.should.eql('Validator "The specified username is already in use." failed for path username');
        error.errors.username.path.should.eql('username');
        error.errors.username.type.should.eql('The specified username is already in use.');

        // Two calls for findOne, to look for existing email and username
        // We can't assert that two calls were made because the order in which existing entries
        // are found is not strictly defined, so it might have searched by username first
        //findOneStub.calledTwice.should.be.true;
        findOneStub.callCount.should.be.within(1, 2);

        done();
      });

      // When searching by username an user is returned
      findOneStub.withArgs({
        username: 'test01'
      }).callsArgWith(1, null, new UserModel());

      // In any other case no results are found
      findOneStub.callsArgWith(1, null, undefined);
    });

  });

});
