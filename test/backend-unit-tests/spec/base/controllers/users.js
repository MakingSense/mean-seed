'use strict';

var should = require('should'),
    sinon = require('sinon'),
    app = require('../../server-test'),
    mongoose = app.meanSeed.dependencies.mongoose,
    jwt = app.meanSeed.dependencies.jwt,
    UserModel = mongoose.model('User'),
    users = require('base/controllers/users')(app);

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
                body: userParams
            }, {
                json: function (response) {
                    response.token.should.eql('dummyToken');
                    response.success.should.eql(true);
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
