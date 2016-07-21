'use strict';

var should = require('should'),
  app = require('../../server-test'),
  simpleDI = require('config/simpleDI'),
  sinon = require('sinon');

var blogService = simpleDI.resolve('blog/blogService'),
    blogModel = simpleDI.resolve('blog/blogModel');

var sinonSandbox;

describe('Blog#blogService', function () {
  var findByIdStub, saveStub;

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

  describe('#getPosts', function () {

    var findStub;

    before(function () {
      findStub = sinonSandbox.stub(blogModel, 'find');
    });

    it('shout retrieve the posts and return the expected response', function (done) {

      findStub.callsArgWith(0, null, { post: posts });

      blogService.getPosts(function (err, response) {
        response.should.eql({
          post: posts
        });
        done();
      });
    });


  });

  describe('#show', function(){


    before(function () {
      findByIdStub = sinonSandbox.stub(blogModel, 'findOne');
    });

    it('should find a post if it already exists', function (done) {

      var idPost = '5ecc7850-4ac5-11e6-958e-edc6f4d97e2';
      findByIdStub.callsArgWith(1, null, {
        _id: idPost
      });

      blogService.show({
        params: {
          id: '5ecc7850-4ac5-11e6-958e-edc6f4d97e24'
        }
      }, function (err, response) {
        response._id.should.eql(idPost);
        done();
      });
    });

    it('should return an error if the search for the post caused an error', function (done) {

      findByIdStub.callsArgWith(1, { error: 'error on query'}, null);

      blogService.show({
        params: {
          id: '5ecc7850-4ac5-11e6-958e-edc6f4d97e24'
        }
      }, function(err, response){
          err.error.should.eql('error on query');
          done();
      });
    });


  });

  describe('#create', function(){ //ToDo: check bien con el ejemplo

    before(function () {
      saveStub = sinonSandbox.stub(blogModel.prototype, 'save');
    });

    it('should create a post and return the expected response', function (done) {
      saveStub.callsArgWith(0, null, { post: posts });

      blogService.create(
          'TestPost',
          'TestTextPost'
      , function(err, response){
        response.should.eql({
          post: posts
        });
        done();
      });
    });
  });

  describe('#edit', function(){

    before(function () {
      //saveStub is already wrapped
      //findByIdStub is already wrapped
    });

    it('should edit a particular post and return the expected response', function (done) {
      findByIdStub.callsArgWith(1, null,
        new blogModel({
          id: '5ecc7850-4ac5-11e6-958e-edc6f4d97e24',
          title: 'TestPost2',
          text: 'blogPost2'}
        ));

      saveStub.callsArgWith(0, null, {
        id: '5ecc7850-4ac5-11e6-958e-edc6f4d97e24',
        title: 'TestPost2',
        text: 'blogPost2'
      });

      blogService.edit(
          '5ecc7850-4ac5-11e6-958e-edc6f4d97e24',
          'TestPost',
          'TestTextPost'
          , function(err, response){
            response.should.eql({
                id: '5ecc7850-4ac5-11e6-958e-edc6f4d97e24',
                title: 'TestPost2',
                text: 'blogPost2'
            });
            done();
          });
    });
  });


  describe('#delete', function(){
    var removeStub;

    before(function () {
      removeStub = sinonSandbox.stub(blogModel, 'remove');
    });

    it('should delete a post if it exists', function (done) {
      var idPost = '5ecc7850-4ac5-11e6-958e-edc6f4d97e2';

      removeStub.callsArgWith(1, null, {
        _id: idPost
      });

      blogService.delete({
        params: {
          id: '5ecc7850-4ac5-11e6-958e-edc6f4d97e2'
        }
      }, function(err, response) {
        response.should.eql(true);
        done();
      });
    });

    it('should return an error if the delete of the post caused an error', function (done) {

      removeStub.callsArgWith(1, {error: 'error on query'}, null);

      blogService.delete({
        params: {
          id: '5ecc7850-4ac5-11e6-958e-edc6f4d97e2'
        }
      }, function (err, response) {
        err.should.eql({
          error: 'error on query'
        });
        done();
      });
    });
  });
});
