'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['mongoose', 'base/resourceModel', 'jsonwebtoken', 'app/config'], function (mongoose, Resource, jwt, appConfig) {

  var ObjectId = mongoose.Types.ObjectId;

  return {

    /**
     * Create resource
     * requires: {name, description}
     * returns: {message}
     */
      create: function (req, res, next) {
          var newResource = new Resource();
          newResource.name = req.body.name;
          newResource.description = req.body.description;
          newResource.save(function(err) {
            if (err) {
              return res.json(400, { message: err });
            }
                        
            res.json(200, { message: 'Resource created.' });
          });
        },
    
      /**
       *  get all resources
       *  returns {_id, name, description}
       */
      getAll: function (req, res, next) {          
        
          Resource.find({}, function (err, resources) {
            if (err) { return next(err); }
            
            if (resources) {
              res.json(resources);
            } else {
              res.json(404, { message: 'Resources not found' });
            }
          });
      },
      
      getById: function (req, res, next) {
         var resourceId = req.params.resourceId;
        
          Resource.findById(ObjectId(resourceId)).exec(function (err, resource) {
            if (err) { return next(err); }
            
            if (resource) {
              res.json(resource);
            } else {
              res.json(404, { message: 'Resource not found' });
            }
          });
      },
            
      update: function (req, res, next) {
        var idToUpdate = ObjectId(req.params.resourceId);
        Resource.update({ _id : idToUpdate }, { name : req.body.name, description: req.body.description }, {}, function (err, affectedRows) {
            if (err) {
              res.json(400, err);
            }
            
            if (affectedRows && affectedRows == 1) {
              res.send(200, "OK");
            }
            else {
              res.json(404, { message: 'Resource not found' });
            }            
          });
       },
      
      delete: function (req, res, next) { 
        //TODO: check the role doesn't have users associated?
        var idToDelete = ObjectId(req.params.resourceId);
        Resource.remove({ _id : idToDelete }, function (err) {
            if (err) {
              res.json(400, err);
            }
            
            res.send(200, "OK");
          });
      },
  };

});
