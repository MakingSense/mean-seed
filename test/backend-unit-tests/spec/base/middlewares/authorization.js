'use strict';

var should = require('should'),
    app = require('../../server-test'),
    simpleDI = require('config/simpleDI'),
    sinon = require('sinon');

var authorizationMiddleware = simpleDI.resolve('base/authorizationMiddleware'),
    authorizationService = simpleDI.resolve('base/authorizationService');

var sinonSandbox;

describe('Base#AuthorizationService', function() {

    before(function () {
        sinonSandbox = sinon.sandbox.create();
    });

    after(function () {
      sinonSandbox.restore();
    });

    describe('#checkAuthorization', function() {

        var authSrvStub, authFn;

        beforeEach(function () {
            authSrvStub = sinonSandbox.stub(authorizationService, 'isAuthorized');
        });

        afterEach(function () {
          sinonSandbox.restore();
        });

        it('should forward to next callback when errors are found', function (done) {
            authSrvStub.callsArgWith(3, 'Unkwnown error');

            authFn = authorizationMiddleware.getAuthorizationFn('dummy_resource', 'dummy_action');

            authFn({}, {}, function (error) {
                error.should.eql('Unkwnown error');
                done();
            });

        });

        it('should invoke the auth service with the "user" role if a user was authenticated and move into next callback', function (done) {
            authSrvStub.callsArgWith(3, null, true);

            authFn = authorizationMiddleware.getAuthorizationFn('dummy_resource', 'dummy_action');

            authFn({
                decoded: {
                    id: 'dummy_id'
                }
            }, {}, function () {
                authSrvStub.calledOnce.should.be.true;
                authSrvStub.firstCall.args[0].should.eql([ 'user' ]);
                authSrvStub.firstCall.args[1].should.eql('dummy_resource');
                authSrvStub.firstCall.args[2].should.eql('dummy_action');

                done();
            });

        });

        it('should invoke the auth service with the "anonymous" role if no user was authenticated and move into next callback', function (done) {
            authSrvStub.callsArgWith(3, null, true);

            authFn = authorizationMiddleware.getAuthorizationFn('dummy_resource', 'dummy_action');

            authFn({}, {}, function () {
                authSrvStub.calledOnce.should.be.true;
                authSrvStub.firstCall.args[0].should.eql([ 'anonymous' ]);
                authSrvStub.firstCall.args[1].should.eql('dummy_resource');
                authSrvStub.firstCall.args[2].should.eql('dummy_action');

                done();
            });

        });

        it('should return an authorization error if the role is not allowed to access the resource', function (done) {
            authSrvStub.callsArgWith(3, null, false);

            authFn = authorizationMiddleware.getAuthorizationFn('dummy_resource', 'dummy_action');

            authFn({}, {
                json: function(code, response) {
                    code.should.eql(403);
                    response.should.eql({ message: 'Not authorized.' });
                    done();
                }
            });

        });

    });

});
