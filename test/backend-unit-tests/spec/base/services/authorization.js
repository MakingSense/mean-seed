'use strict';

var should = require('should'),
    app = require('../../server-test'),
    simpleDI = require('config/simpleDI');

var authorizationService = simpleDI.resolve('base/authorizationService');

describe('Base#AuthorizationService', function() {

    describe('#isAuthorized', function() {

        it('should return false when no roles are passed', function (done) {

            authorizationService.isAuthorized([], 'resource1', 'action1', function (error, isAuthorized) {
                isAuthorized.should.be.false;
                done();
            });

        });

        it('should return false when no known roles are passed', function (done) {

            authorizationService.isAuthorized(['dummy1', 'dummy2'], 'resource1', 'action1', function (error, isAuthorized) {
                isAuthorized.should.be.false;
                done();
            });

        });

        it('should return true when the role is allowed to perform action', function (done) {

            authorizationService.isAuthorized(['anonymous'], 'resource1', 'action1', function (error, isAuthorized) {
                isAuthorized.should.be.true;
                done();
            });

        });

        it('should return false when the role is not allowed to perform action', function (done) {

            authorizationService.isAuthorized(['user'], 'resource1', 'action1', function (error, isAuthorized) {
                isAuthorized.should.be.false;
                done();
            });

        });

        it('should return true when any of the passed roles is allowed to perform action', function (done) {

            authorizationService.isAuthorized(['anonymous', 'user'], 'resource3', 'action3', function (error, isAuthorized) {
                isAuthorized.should.be.true;
                done();
            });

        });

        it('should return true when all passed roles are allowed to perform action', function (done) {

            authorizationService.isAuthorized(['anonymous', 'user'], 'resource2', 'action2', function (error, isAuthorized) {
                isAuthorized.should.be.true;
                done();
            });

        });

        it('should return false for resource/action combination that do not have a permission set', function (done) {

            authorizationService.isAuthorized(['anonymous', 'user'], 'resource3', 'action4', function (error, isAuthorized) {
                isAuthorized.should.be.false;
                done();
            });

        });

        it('should return false for resource/action combination that do not exist', function (done) {

            authorizationService.isAuthorized(['anonymous', 'user'], 'resource_dummy', 'action_dummy', function (error, isAuthorized) {
                isAuthorized.should.be.false;
                done();
            });

        });

    });

});
