'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject([], function() {
  // Define models, they will be resolved the first time they are needed
  simpleDI.define('base/userModel', 'base/models/user');
});
