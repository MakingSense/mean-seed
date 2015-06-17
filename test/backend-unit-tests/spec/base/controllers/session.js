'use strict';

var should = require('should'),
    app = require('../../server-test'),
    mongoose = app.meanSeed.dependencies.mongoose,
    UserModel = mongoose.model('User'),
    session = require('base/controllers/session')(app);

describe('Base#SessionController', function() {

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

    describe('#session', function() {

        it('should return current user info', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err, createdUser) {
                session.session({
                    user: createdUser
                }, {
                    json: function (response) {
                        response.email.should.eql('test01@local.com');
                        response.username.should.eql('test01');
                        done();
                    }
                });

            });
        });

    });

    describe('#logout', function() {

        it('should properly logout a user with a valid session', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err, createdUser) {
                session.logout({
                    user: createdUser,
                    logout: function () {}
                }, {
                    send: function (code) {
                        code.should.eql(200);
                        done();
                    }
                });

            });
        });

        it('should return an error code when trying to logout a user without a valid session', function (done) {
            session.logout({
                user: undefined
            }, {
                send: function (code, msg) {
                    code.should.eql(400);
                    msg.should.eql('Not logged in');
                    done();
                }
            });
        });

    });

    describe('#login', function() {

        it('should properly login a user with valid credentials', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err, createdUser) {
                session.login({
                    body: {
                        email: 'test01@local.com',
                        password: 'dummy'
                    },
                    user: createdUser,
                    logIn: function (user, callback) {
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
        });

        it('should prevent login of a user with non existent email address', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err, createdUser) {
                session.login({
                    body: {
                        email: 'test01@local.com.ar',
                        password: 'dummy'
                    }
                }, {
                    json: function (code, error) {
                        code.should.eql(400);
                        error.should.eql({ errors: { email: { type: 'Email is not registered.' } } });
                        done();
                    }
                });

            });
        });

        it('should prevent login of a user with an invalid password', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err, createdUser) {
                session.login({
                    body: {
                        email: 'test01@local.com',
                        password: 'invalid'
                    }
                }, {
                    json: function (code, error) {
                        code.should.eql(400);
                        error.should.eql({ errors: { password: { type: 'Password is incorrect.' } } });
                        done();
                    }
                });

            });
        });

        it('should return an error if the credentials are valid but the user could not be logged in', function (done) {
            var newUser = new UserModel(userParams);

            newUser.save(function (err, createdUser) {
                session.login({
                    body: {
                        email: 'test01@local.com',
                        password: 'dummy'
                    },
                    user: createdUser,
                    logIn: function (user, callback) {
                        callback('Some random error');
                    }
                }, {
                    send: function (error) {
                        error.should.eql('Some random error');
                        done();
                    }
                });

            });
        });

    });

});
