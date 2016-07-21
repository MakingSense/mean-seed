'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['blog/blogService'], function (blogService) {

  return {

    //Get All posts
    getPosts: function(req, res){
      blogService.getPosts(function(error, ret){
        if (error){
          return res.json(400, error);
        }

        res.send(ret);
      });
    },

    //Get specific Post by id
    show: function(req, res){
      var id = req.params.id;
      blogService.show(id, function(error, ret){
        if (error){
          return res.json(400, error);
        }

        if (ret == undefined){
          res.json(404, {message: 'Post not found'})
        } else {
          res.send(ret);
        }
      });
    },

    //Create/Store Post
    create: function(req, res){
      var title =  req.body.title;
      var text =  req.body.text;

      blogService.create(title, text, function(error, ret){
        if (error){
          return res.json(400, error);
        }

        res.send(ret);

      });
    },

    //Edit particular post
    edit: function(req, res){
      var id = req.params.id;
      var title = req.body.title;
      var text = req.body.text;
      blogService.edit(id, title, text, function(error, ret){
        if (error){
          return res.json(400, error);
        }

        res.send(ret);
      });
    },

    //Delete
    delete: function(req, res){
      var id = req.params.id;
      blogService.delete(id, function(error, ret){
        if (error){
          return res.json(400, error);
        }

        res.send(ret);
      });
    }

  };

});
