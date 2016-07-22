'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject([
  'blog/blogController'
], function (blogController) {

  return function blogRoutes(app) {

    // get all posts
    app.get('/api/blog', function(req, res){
      res.json(200, { message: 'Welcome' })
    });

    // get all posts
    app.get('/api/myPosts',
      //Auth middleware?
      blogController.getPosts
    );

    //get a particular post by ID
    app.get('/api/myPosts/:id',
      //Auth middleware?
      blogController.show
    );

    // create a new post
    app.post('/api/newPost',
      //Auth middleware?
      blogController.create
    );

    // update a created post
    app.put('/api/editPost/:id',
      //Auth middleware?
      blogController.edit
    );

    // delete a particular post
    app.delete('/api/delete/:id',
      //Auth middleware?
      blogController.delete
    );
  };
});
