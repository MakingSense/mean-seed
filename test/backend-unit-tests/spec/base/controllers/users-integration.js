'use strict';

var should = require('should'),
    app = require('../../server-test'),
    simpleDI = require('config/simpleDI');

var usersController = simpleDI.resolve('base/usersController'),
    UserModel = simpleDI.resolve('base/userModel'),
    RoleModel = simpleDI.resolve('base/roleModel'),
    mongoose = simpleDI.resolve('mongoose');

var createRole = function(roleParams, callback) {
    var newRole = new RoleModel(roleParams);

    newRole.save(function (err, createdRole) {
        callback(createdRole);
    });
};

describe('Base#UserController Integration Tests', function() {

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
        // Drop the users and roles collections before each test
        mongoose.connection.db.dropCollection('users', function(err, result) {
            mongoose.connection.db.dropCollection('roles', function(err, result) {
                done();
            });
        });
    });

    var userParams = {
        email: 'test01@local.com',
        username: 'test01',
        password: 'dummy'
    };

    var roleParams = {
        roleName: 'Role'
    };

    describe('#create', function() {

        it('should create a user and return the expected response', function (done) {
            createRole(roleParams, function (createdRole) {

                userParams.role = { _id: createdRole._id };

                usersController.create({
                    body: userParams
                }, {
                    json: function (code, response) {
                        code.should.eql(200);
                        response.token.should.exist;
                        response.message.should.eql('User created.');
                        done();
                    }
                });

            });
        });

        it('should fail to create a user if it already exists', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err) {
                usersController.create({
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

    });

    describe('#show', function() {

        it('should find a user if it already exists', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err, createdUser) {
                usersController.show({
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
            usersController.show({
                params: {
                    userId: '123456789012'
                }
            }, {
                send: function (code, error) {
                    code.should.eql(404);
                    error.should.eql({ message: 'User not found'});
                    done();
                }
            });
        });

    });

    describe('#exists', function() {

        it('should return an ok response if user exists', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err, createdUser) {
                usersController.exists({
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
            usersController.exists({
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
