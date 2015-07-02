'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['mongoose', 'base/roleModel', 'jsonwebtoken', 'app/config'], function (mongoose, Role, jwt, appConfig) {

  var ObjectId = mongoose.Types.ObjectId;

  return {

    /**
     * Create role
     * requires: {roleName}
     * returns: {message}
     */
      create: function (req, res, next) {
          var newRole = new Role();
          newRole.roleName = req.body.roleName;
          try {
            newRole.save(function(err) {
              if (err) {
                return res.json(400, { message: err });
              }
                          
              res.json(200, { message: 'Role created.' });
            });
          }
          catch (err){
              return res.json(400, { message: err });            
          }
        },
    
      /**
       *  get all roles
       *  returns {_id, roleName}
       */
      getAll: function (req, res, next) {          
        
          Role.find({}, function (err, roles) {
            if (err) {
              return next(new Error('Failed to load roles'));
            }
            if (roles) {
              res.json(roles);
            } else {
              res.json(404, { message: 'Roles not found' });
            }
          });
      },
      
      getById: function (req, res, next) {
         var roleId = req.params.roleId;
        
          Role.findById(ObjectId(roleId)).exec(function (err, role) {
            if (err) {
              return next(new Error('Failed to load Role'));
            }
            if (role) {
              res.json({_id: roleId, roleName: role.roleName });
            } else {
              res.json(404, { message: 'Role not found' });
            }
          });
      },
            
      update: function (req, res, next) {
        var idToUpdate = ObjectId(req.params.roleId);
        Role.update({ _id : idToUpdate }, { roleName : req.body.roleName }, {}, function (err, affectedRows) {
            if (err) {
              res.json(400, err);
            }
            
            if (affectedRows && affectedRows == 1) {
              res.send(200, "OK");
            }
            else {
              res.json(404, { message: 'Role not found' });
            }            
          });
       },
      
      delete: function (req, res, next) { 
        //TODO: check the role doesn't have users associated?
        var idToDelete = ObjectId(req.params.roleId);
        Role.remove({ _id : idToDelete }, function (err) {
            if (err) {
              res.json(400, err);
            }
            
            res.send(200, "OK");
          });
      },
  };

});
