'use strict';

var should = require('should'),
    sinon = require('sinon'),
    app = require('../../server-test'),
    simpleDI = require('config/simpleDI');

var authController = simpleDI.resolve('base/authController'),
    UserModel = simpleDI.resolve('base/userModel'),
    mongoose = simpleDI.resolve('mongoose'),
    jwt = simpleDI.resolve('jsonwebtoken');

describe('Base#AuthController', function() {

    before(function (done) {
          
        var signUserStub = sinon.stub(jwt, 'sign', function () {
            return 'dummyToken';
        });
                
        // Already connected, we are good to go
        if (mongoose.connection.readyState === 1) {
            return done();
        }
        // Drop the users collection before each test
        mongoose.connection.on('connected', function() {
            done();
        });
    });

    beforeEach(function (done) {
        // Drop the users collection before each test
        mongoose.connection.db.dropCollection('users', function(err, result) {
            done();
        });
    });

    var userParams = {
        email: 'test01@local.com',
        username: 'test01',
        password: 'dummy'
    };

    describe('#authenticate', function() {

        it('should properly auhenticate a user with valid credentials', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err, createdUser) {
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
        });

        it('should prevent the authentication of a user with non existent email address', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err, createdUser) {
                authController.authenticate({
                    body: {
                        email: 'test01@local.com.ar',
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
        });

        it('should prevent the authentication of a user with an invalid password', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err, createdUser) {
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

});
