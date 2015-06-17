'use strict';

var should = require('should'),
    app = require('../../server-test'),
    mongoose = app.meanSeed.dependencies.mongoose,
    common = require('base/controllers/common')(app);

describe('Base#CommonController', function() {

    before(function (done) {
        // Already connected, we are good to go
        if (mongoose.connection.readyState === 1) {
            return done();
        }
        // Wait until a connection with mongo is established
        mongoose.connection.on('connected', function () {
            done();
        });
    });

    describe('#menu', function() {

        it('should return the expected menu structure', function (done) {
            common.menu({}, {
                json: function (response) {
                    response.should.eql({
                        "base": {
                            "name": "Home",
                            "path": "/",
                            "subMenu": null
                        }
                    });
                    done();
                }
            });
        });

    });

});
