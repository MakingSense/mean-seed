'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    app = require('../../server-test'),
    UserModel = mongoose.model('User'),
    users = require('base/controllers/users');

describe('Base#UserController', function() {

    before(function (done) {
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

    describe('#create', function() {

        it('should create a user and return the expected response', function (done) {
            users.create({
                body: userParams,
                logIn: function (newUser, callback) {
                    callback(null);
                }
            }, {
                json: function (response) {
                    response.email.should.eql('test01@local.com');
                    response.username.should.eql('test01');
                    done();
                }
            });
        });

        it('should fail to create a user if it already exists', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err) {
                users.create({
                    body: userParams
                }, {
                    json: function (code, error) {
                        code.should.eql(400);
                        error.message.should.eql('Validation failed');
                        error.name.should.eql('ValidationError');
                        done();
                    }
                });

            });
        });

        it('should invoke next callback if the user could not be properly logged in', function (done) {
            users.create({
                body: userParams,
                logIn: function (newUser, callback) {
                    callback('Error during login');
                }
            }, { }, function (error) {
                error.should.eql('Error during login');
                done();
            });
        });

    });

    describe('#show', function() {

        it('should find a user if it already exists', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err, createdUser) {
                users.show({
                    params: {
                        userId: createdUser.id
                    }
                }, {
                    send: function (response) {
                        response.username.should.eql('test01');
                        (response.profile === undefined).should.be.true;
                        done();
                    }
                });

            });
        });

        it('should fail to find a user if it does not exists', function (done) {
            users.show({
                params: {
                    userId: '123456789012'
                }
            }, {
                send: function (code, error) {
                    code.should.eql(404);
                    error.should.eql('USER_NOT_FOUND');
                    done();
                }
            });
        });

    });

    describe('#exists', function() {

        it('should return an ok response if user exists', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err, createdUser) {
                users.exists({
                    params: {
                        username: 'test01'
                    }
                }, {
                    json: function (response) {
                        response.exists.should.be.true;
                        done();
                    }
                });
            });
        });

        it('should return an non ok response if user does not exists', function (done) {
            users.exists({
                params: {
                    username: 'test01'
                }
            }, {
                json: function (response) {
                    response.exists.should.be.false;
                    done();
                }
            });
        });

    });

});
