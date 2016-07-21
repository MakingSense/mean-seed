'use strict';

var should = require('should'),
  app = require('../../server-test'),
  simpleDI = require('config/simpleDI');

var commonController = simpleDI.resolve('base/commonController');

describe('Base#CommonController', function () {

  describe('#menu', function () {

    it('should return the expected menu structure', function (done) {
      commonController.menu({}, {
        json: function (response) {
          response.should.eql({
            "base": [{
              "name": "Home",
              "path": "/",
              "subMenu": null
              },
              {
                "name": "Blog",
                "path": "/blog",
                "subMenu": null
              }]
          });
          done();
        }
      });
    });

  });

});
