'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['blog/blogModel'], function (Blog) {

  return {

    getPosts: function(callback){
      Blog.find(function (err, myPosts) {
        if (err) return callback(err, null);
        return callback(null, myPosts);
      });
    },
    //Get specific Post by id
    show: function(id, callback){
      Blog.findOne({_id: id}, function (err, selPost) {
        if (err) return callback(err, null);
        callback(null, selPost);
      });
    },

    //Create/Store Post
    create: function(title, text, callback){
      var newPost = new Blog({
        title: title,
        text: text
      });

      newPost.save( function(err, result){
        if (err) return callback(err, null);
        callback(null, result);
      });

    },

    //Edit particular post
    edit: function(id, title, text, callback){
      Blog.findOne({_id: id}, function (err, selPost) {
        selPost.title = title;
        selPost.text = text;

        selPost.save( function(err, result){
          if (err) return callback(err, null);
          callback(null, result);
        });
      });
    },

    //Delete
    delete: function(id, title, text, callback){
      Blog.remove({_id: id}, function (err) {
        if (err) return callback(err, null);
        callback(null, true);
      });
    }


  };

});
