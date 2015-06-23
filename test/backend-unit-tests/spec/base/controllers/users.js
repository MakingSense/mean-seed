'use strict';

var should = require('should'),
    app = require('../../server-test'),
    mongoose = app.meanSeed.dependencies.mongoose,
    sinon = require('sinon'),
    UserModel = mongoose.model('User'),
    users = require('base/controllers/users')(app);

var sinonSandbox;

describe('Base#UserController', function() {

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

    describe('#create', function() {

        var userSaveStub, hookStub;

        before(function () {
            // Stub the hooks mechanism that's around the save method
            hookStub = sinonSandbox.stub(UserModel.prototype, 'hook');
            // Now stub the save
            userSaveStub = sinonSandbox.stub(UserModel.prototype, 'save');
        });

        it('should create a user and return the expected response', function (done) {
            // Make the call to "save". Invokes the first callback it encounters
            // with the provided arguments. Why it must be run before the controller
            // action is beyond my understanding but it works :(
            userSaveStub.callsArgWith(0, null);

            // Call to the controller method
            users.create({
                body: userParams
            }, {
                json: function (code, error) {
                    code.should.eql(200);
                    done();
                }
            });

        });

        it('should fail to create a user if it already exists', function (done) {
            // Make the call to "save". Invokes the first callback it encounters
            // with the provided arguments. Why it must be run before the controller
            // action is beyond my understanding but it works :(
            userSaveStub.callsArgWith(0, {
                message: 'Validation failed',
                name: 'ValidationError'
            });

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

    describe('#show', function() {

        var findByIdStub;

        before(function () {
            findByIdStub = sinonSandbox.stub(UserModel, 'findById');
        });

        it('should find a user if it already exists', function (done) {

            findByIdStub.callsArgWith(1, null, {
                username: 'test01',
                profile: undefined
            });

            users.show({
                params: {
                    userId: '#dummyId1234'
                }
            }, {
                send: function (response) {
                    response.username.should.eql('test01');
                    (response.profile === undefined).should.be.true;
                    done();
                }
            });

        });

        it('should fail to find a user if it does not exists', function (done) {

            findByIdStub.callsArgWith(1, null, undefined);

            users.show({
                params: {
                    userId: '#dummyId1234'
                }
            }, {
                send: function (code, error) {
                    code.should.eql(404);
                    error.should.eql({ message: 'User not found'});
                    done();
                }
            });
        });

        it('should return an error if the search for the user caused an error', function (done) {

            findByIdStub.callsArgWith(1, 'Some weird error in query');

            users.show({
                params: {
                    userId: '#dummyId1234'
                }
            }, {}, function (error) {
                error.should.be.instanceOf(Error);
                error.message.should.eql('Failed to load User');
                done();
            });
        });

    });

    describe('#exists', function() {

        var findOneStub;

        before(function () {
            findOneStub = sinonSandbox.stub(UserModel, 'findOne');
        });

        it('should return an ok response if user exists', function (done) {
            findOneStub.callsArgWith(1, null, {
                username: 'test01'
            });

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

        it('should return an non ok response if user does not exists', function (done) {
            findOneStub.callsArgWith(1, null, undefined);

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

        it('should return an error if the search for the user caused an error', function (done) {
            findOneStub.callsArgWith(1, 'Some weird error in query');

            users.exists({
                params: {
                    username: 'test01'
                }
            }, {}, function (error) {
                error.should.be.instanceOf(Error);
                error.message.should.eql('Failed to load User test01');
                done();
            });
        });

    });

});
