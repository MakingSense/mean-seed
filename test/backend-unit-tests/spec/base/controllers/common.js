'use strict';

var should = require('should'),
    app = require('../../server-test'),
    mongoose = app.meanSeed.dependencies.mongoose,
    common = require('base/controllers/common')(app);

describe('Base#CommonController', function() {


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
