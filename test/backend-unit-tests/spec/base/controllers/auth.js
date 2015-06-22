'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    app = require('../../server-test'),
    jwt = require('jsonwebtoken'),
    sinon = require('sinon'),
    UserModel = mongoose.model('User'),
    auth = require('base/controllers/auth');

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
                auth.authenticate({
                    body: {
                        email: 'test01@local.com',
                        password: 'dummy'
                    },
                    res: { success: true, message: 'Enjoy your token!', token: 'dummyToken'}
                }, {
                    json: function (response) {
                        response.token.should.eql('dummyToken');
                        response.message.should.eql('Enjoy your token!');
                        response.success.should.eql(true);
                        done();
                    }
                });
            });
        });

        it('should prevent the authentication of a user with non existent email address', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err, createdUser) {
                auth.authenticate({
                    body: {
                        email: 'test01@local.com.ar',
                        password: 'dummy'
                    }
                }, {
                    json: function (response) {
                        response.should.eql({ success: false, message: 'Authentication failed. User not found'});
                        done();
                    }
                });

            });
        });

        it('should prevent the authentication of a user with an invalid password', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err, createdUser) {
                auth.authenticate({
                    body: {
                        email: 'test01@local.com',
                        password: 'invalid'
                    }
                }, {
                    json: function (response) {
                        response.should.eql({ success: false, message: 'Authentication failed. Wrong password.'});
                        done();
                    }
                });

            });
        });

    });

});
