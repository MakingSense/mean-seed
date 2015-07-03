'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['mongoose'], function(mongoose) {

  var Schema   = mongoose.Schema;

  var ResourceSchema = new Schema({
    name: {
      type: String,
      unique: true,
      required: true
    },
	  description: String
  });

  return mongoose.model('resource', ResourceSchema);

});
