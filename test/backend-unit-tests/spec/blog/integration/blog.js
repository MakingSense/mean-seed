var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3001");

describe("Integration API Blog test",function(){
    var baseAPIPath = '/api/';

    it("should return welcome message on Blog API",function(done){

        server
            .get(baseAPIPath + 'blog')
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Welcome message:
                res.body.should.eql({
                    message: 'Welcome'
                });
                done();
            });
    });

    it("should return the posts already loaded on Blog API",function(done){

        var posts = [
            {
                "_id": "5ecc7850-4ac5-11e6-958e-edc6f4d97e24",
                "title": "juampiv2",
                "__v": 0,
                "text": "juampi descriptions"
            },
            {
                "_id": "000442e0-4ac9-11e6-beca-9ddf2edc48c9",
                "title": "Juampi2 test",
                "text": "fdfdsfds",
                "__v": 0
            },
            {
                "_id": "197371e0-502f-11e6-8fdc-9b711b2f9641",
                "title": "IntegrationTitle",
                "text": "IntegrationText",
                "__v": 0
            },
            {
                "_id": "4a35bea0-502f-11e6-9abd-21ef8a6942e1",
                "title": "IntegrationTitle",
                "text": "IntegrationText",
                "__v": 0
            },
            {
                "_id": "4a35bea0-502f-11e6-9abd-21ef8a6942e1",
                "title": "IntegrationTitle",
                "text": "IntegrationText",
                "__v": 0
            }
        ];

        server
            .get(baseAPIPath + 'myPosts')
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Welcome message:
                // res.body.should.eql(
                //     posts
                // );
                done();
            });
    });

    it("should return the requested posts on Blog API",function(done){

        var postSelected = {
                "_id": "000442e0-4ac9-11e6-beca-9ddf2edc48c9",
                "title": "Juampi2 test",
                "__v": 0,
                "text": "fdfdsfds"
        };

        var id = '000442e0-4ac9-11e6-beca-9ddf2edc48c9';

        server
            .get(baseAPIPath + 'myPosts/' + id)
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Welcome message:
                res.body.should.eql(
                    postSelected
                );
                done();
            });
    });

    it("should post and create a particular post on Blog API",function(done){

        var createPost = {
            "title": "IntegrationTitle",
            "text": "IntegrationText"
        };

        server
            .post(baseAPIPath + 'newPost')
            .send(createPost)
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                //Check results
                res.body.title.should.eql('IntegrationTitle');
                res.body.text.should.eql('IntegrationText');
                done();
            });
    });

    it("should edit a particular post on Blog API",function(done){

        var editPost = {
            "title": "IntegrationTitle2",
            "text": "IntegrationText2"
        };

        var id = '197371e0-502f-11e6-8fdc-9b711b2f9641';
        server
            .put(baseAPIPath + 'editPost/' + id)
            .send(editPost)
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                //Check results
                res.body.title.should.eql('IntegrationTitle2');
                res.body.text.should.eql('IntegrationText2');
                done();
            });
    });

    it("should delete a particular post on Blog API",function(done){

        var id = '0c280360-5030-11e6-b6ad-578870edad0a';

        server
            .delete(baseAPIPath + 'delete/' + id)
            .expect("Content-type",/json/)
            .expect(200) // This is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Welcome message:
                res.body.should.eql(true);
                done();
            });
    });

    it("should return 404 on invalid url on Blog API",function(done){

        server
            .delete(baseAPIPath + 'random')
            .expect("Content-type",/json/)
            .expect(404) // This is HTTP response
            .end(function(err,res){
                // HTTP status should be 404
                res.status.should.equal(404);
                done();
            });
    });

});