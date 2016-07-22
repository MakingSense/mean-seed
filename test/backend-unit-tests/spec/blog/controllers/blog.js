'use strict';

var should = require('should'),
  app = require('../../server-test'),
  simpleDI = require('config/simpleDI'),
  sinon = require('sinon');

var blogController = simpleDI.resolve('blog/blogController'),
  blogService = simpleDI.resolve('blog/blogService');

var sinonSandbox;

describe('Blog#BlogController', function () {

  before(function () {
    sinonSandbox = sinon.sandbox.create();
  });

  after(function () {
    sinonSandbox.restore();
  });

  var posts = {
    "_id": "5ecc7850-4ac5-11e6-958e-edc6f4d97e24",
    "title": "juampiv2",
    "__v": 0,
    "text": "juampi descriptions"
  };

  var postParam = {
    title: 'TitlePostText',
    text: 'TextPostParam'
  };

  describe('#getPosts', function() {

    var serviceGetPostStub;

    before(function () {
      serviceGetPostStub = sinonSandbox.stub(blogService, 'getPosts');
    });

    it('shout retrieve the posts and return the expected response', function (done) {

      // Call to the controller method
      blogController.getPosts({
        body:{}
      },{
        send: function(ret){
          ret.should.eql({
            post: posts
          });
          done();
        }
      });

      serviceGetPostStub.callArgWith(0, null, { post: posts });
    });

    it('should fail to get the posts', function (done) {

      serviceGetPostStub.callsArgWith(0, { error: 'errorMessage'}, null);

      blogController.getPosts({
        body: {}
      },{
        json: function(err, ret){
          err.should.eql(400);
          ret.should.eql({
            error: 'errorMessage'
          });
          done();
        }
      });
    });

  });

  describe('#show', function(){

    var serviceShowStub;

    before(function () {
      serviceShowStub = sinonSandbox.stub(blogService, 'show');
    });

    it('should find a post if it already exists', function (done) {

      var idPost = '5ecc7850-4ac5-11e6-958e-edc6f4d97e2';
      serviceShowStub.callsArgWith(1, null, {
        _id: idPost
      });

      blogController.show({
        params: {
          id: '5ecc7850-4ac5-11e6-958e-edc6f4d97e24'
        }
      }, {
        send: function (response) {
          response._id.should.eql(idPost);
          done();
        }
      });
    });

    it('should fail to find a post if it does not exists', function (done) {

      serviceShowStub.callsArgWith(1, null, undefined);

      blogController.show({
        params: {
          id: '5ecc7850-4ac5-11e6-958e-edc6f4d97e24'
        }
      }, {
        json: function (code, res) {
          code.should.eql(404);
          res.should.eql({
            message: 'Post not found'
          });
          done();
        }
      });
    });

    it('should return an error if the search for the post caused an error', function (done) {

      serviceShowStub.callsArgWith(1, { error: 'error on query'}, null);

      blogController.show({
        params: {
          id: '5ecc7850-4ac5-11e6-958e-edc6f4d97e24'
        }
      }, {
        json: function (code, res){
          code.should.eql(400);
          res.should.eql({
            error: 'error on query'
          });
          done();
        }
      });
    });

  });

  describe('#create', function(){
      var serviceCreateStub;

      before(function () {
        serviceCreateStub = sinonSandbox.stub(blogService, 'create');
      });

      it('should create a post and return the expected response', function (done) {
        serviceCreateStub.callsArgWith(2, null, { title: 'TestPost', text: 'blogPost'});

        // Call to the controller method
        blogController.create({
          body: postParam
        }, {
          send: function (res) {
            res.should.eql({
              title: 'TestPost',
              text: 'blogPost'
            });
            done();
          }
        });
      });
  });

  describe('#delete', function(){
    var serviceDeleteStub;

    before(function () {
      serviceDeleteStub = sinonSandbox.stub(blogService, 'delete');
    });

    it('should delete a post if it exists', function (done) {

      serviceDeleteStub.callsArgWith(1, null, true);

      blogController.delete({
        params: {
          id: '5ecc7850-4ac5-11e6-958e-edc6f4d97e24'
        }
      }, {
        send: function (response) {
          response.should.eql(true);
          done();
        }
      });
    });

    it('should return an error if the delete of the post caused an error', function (done) {

      serviceDeleteStub.callsArgWith(1, { error: 'error on query'}, null);

      blogController.delete({
        params: {
          id: '5ecc7850-4ac5-11e6-958e-edc6f4d97e24'
        }
      }, {
        json: function (code, res){
          code.should.eql(400);
          res.should.eql({
            error: 'error on query'
          });
          done();
        }
      });
    });
  });

  describe('#edit', function(){
    var serviceEditStub;

    before(function () {
      serviceEditStub = sinonSandbox.stub(blogService, 'edit');
    });

    it('should edit a particular post and return the expected response', function (done) {
      serviceEditStub.callsArgWith(3, null, {
        id: '5ecc7850-4ac5-11e6-958e-edc6f4d97e24',
        title: 'TestPost2',
        text: 'blogPost2'
      });

      // Call to the controller method
      blogController.edit({
        body: postParam,
        params: {
          id: '5ecc7850-4ac5-11e6-958e-edc6f4d97e24'
        }
      }, {
        send: function (res) {
          res.should.eql({
            id: '5ecc7850-4ac5-11e6-958e-edc6f4d97e24',
            title: 'TestPost2',
            text: 'blogPost2'
          });
          done();
        }
      });
    });


  });
});
