'use strict';

var should = require('should'),
    sinon = require('sinon'),
    app = require('../../server-test'),
    simpleDI = require('config/simpleDI');

var authController = simpleDI.resolve('base/authController'),
    UserModel = simpleDI.resolve('base/userModel'),
    jwt = simpleDI.resolve('jsonwebtoken');

var sinonSandbox;

describe('Base#AuthController', function() {

    before(function () {
        sinonSandbox = sinon.sandbox.create();
    });

    after(function () {
      sinonSandbox.restore();
    });

    var userParams = {
        email: 'test01@local.com',
        username: 'test01',
        password: 'dummy'
    };

    describe('#authenticate', function() {

        var findOneStub, signUserStub;

        before(function () {
            findOneStub = sinonSandbox.stub(UserModel, 'findOne');

            signUserStub = sinon.stub(jwt, 'sign', function () {
                return 'dummyToken';
            });
        });

        it('should properly auhenticate a user with valid credentials', function (done) {

            findOneStub.callsArgWith(1, null, new UserModel(userParams));

            authController.authenticate({
                body: {
                    email: 'test01@local.com',
                    password: 'dummy'
                },
                res: { message: 'Enjoy your token!', token: 'dummyToken'}
            }, {
                json: function (code, error) {
                    code.should.eql(200);
                    done();
                }
            });

        });

        it('should prevent the authentication of a user with non existent email address', function (done) {

            findOneStub.callsArgWith(1, null, undefined);

            authController.authenticate({
                body: {
                    email: 'test01@local.com',
                    password: 'dummy'
                }
            }, {
                json: function (code, error) {
                    error.should.eql({ message: 'Authentication failed. User not found' } );
                    code.should.eql(404);
                    done();
                }
            });

        });

        it('should prevent the authentication of a user with an invalid password', function (done) {

            findOneStub.callsArgWith(1, null, new UserModel(userParams));

            authController.authenticate({
                body: {
                    email: 'test01@local.com',
                    password: 'invalid'
                }
            }, {
                json: function (code, error) {
                    error.should.eql( { message: 'Authentication failed. Wrong password.' });
                    code.should.eql(401);
                    done();
                }
            });

        });

    });

});
