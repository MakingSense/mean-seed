'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    sinon = require('sinon'),
    app = require('../../server-test'),
    UserModel = mongoose.model('User');

describe('Base#UserModel', function() {

    var makeSaltStub;

    before(function (done) {
        makeSaltStub = sinon.stub(UserModel.prototype, 'makeSalt', function () {
            return 'dummySalt';
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

    after(function () {
      makeSaltStub.restore();
    });

    describe('#password', function() {

        it('should generate a proper hashed password when the password is set', function () {

            var newUser = new UserModel();

            newUser.password = 'dummy';

            newUser.hashedPassword.should.eql('Mj2+CZWOX0yB2qlf7sqR4+XF3Ea7tPuubChrXnO0h3lhYXbakhHxRFpbL0ytaQq+aAiP7y12MJpSZCstT5a7/g==');
        });

    });

    describe('#validatePassword', function() {

        it('should validate a password or not depending on if it\'s valid or not', function () {

            var newUser = new UserModel();

            newUser.password = 'dummy';

            newUser.validatePassword('dummy').should.be.true;
            newUser.validatePassword('invalid').should.be.false;
        });

    });

    describe('#email', function() {

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

                done();
            });
        });

        it('should prevent creation of user if email address is already registered', function (done) {

            var userParams = {
                email: 'test01@local.com',
                password: 'dummy'
            };

            userParams.username = 'test01';
            var newUser = new UserModel(userParams);

            newUser.save(function (error) {

                userParams.username = 'test02';
                var otherUser = new UserModel(userParams);

                otherUser.save(function (error) {
                    error.message.should.eql('Validation failed');
                    error.name.should.eql('ValidationError');
                    error.errors.email.message.should.eql('Validator "The specified email address is already in use." failed for path email');
                    error.errors.email.path.should.eql('email');
                    error.errors.email.type.should.eql('The specified email address is already in use.');

                    done();
                });
            });
        });

    });

    describe('#username', function() {

        it('should prevent creation of user if username is already registered', function (done) {

            var userParams = {
                username: 'test01',
                password: 'dummy'
            };

            userParams.email = 'test01@local.com';
            var newUser = new UserModel(userParams);

            newUser.save(function (error) {

                userParams.email = 'test02@local.com';
                var otherUser = new UserModel(userParams);

                otherUser.save(function (error) {
                    error.message.should.eql('Validation failed');
                    error.name.should.eql('ValidationError');
                    error.errors.username.message.should.eql('Validator "The specified username is already in use." failed for path username');
                    error.errors.username.path.should.eql('username');
                    error.errors.username.type.should.eql('The specified username is already in use.');

                    done();
                });
            });
        });

    });

});
