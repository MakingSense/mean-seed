'use strict';

function SimpleDI() {
  // Custom definitions
  this.definitions = {};
  // Already resolved modules
  this.resolvedModules = {};
  // Not used yet
  this.options = {};
}


/**
 * Sets a specific resolution for a module name
 *
 * @param {String} name
 * @param {String|Object|Function} Path to a module, an object representing a module or a closure
 * @return {Module}
 */
SimpleDI.prototype.define = function (name, value) {
  this.definitions[name] = value;
};

/**
 * Resolves a module name and return it
 *
 * @param {String} name
 * @return {Module}
 */
SimpleDI.prototype.resolve = function (name) {
  if (this.resolvedModules[name]) {
    // Module was already resolved before, return it
    return this.resolvedModules[name];
  }

  if (!this.definitions[name]) {
    // Module is not defined, try to use a regular require as a last resort
    // This throws an exception if it fails, since this is likely a critical
    // error we let the caller decide if he would handle or not
    // TODO: Perhaps some simple routine might be used to handle certain convention
    // on the name of the module (i.e., consider '/' chars in the name to be parts
    // of a path on which the actual module can be found)
    this.resolvedModules[name] = require(name);
    return this.resolvedModules[name];
  }

  var definition = this.definitions[name];

  // Different strategies to resolve the module
  if (typeof definition === 'string') {
    // Regular old school require
    this.resolvedModules[name] = require(definition);
  } else if (typeof definition === 'function') {
    // Definition might be a closure
    this.resolvedModules[name] = definition.call();
  } else if (typeof definition === 'object') {
    // Most likely a mocked version of the module
    this.resolvedModules[name] = definition;
  }

  return this.resolvedModules[name];
};

/**
 * Search dependencies and inject them into the callback call
 *
 * @param {Array} modules
 * @param {Function} callback
 * @return {Module}
 */
SimpleDI.prototype.inject = function (modules, callback) {
  var self = this;
  // Resolve dependencies. If one of the dependencies could not fullfilled
  // this will throw an exception
  var dependencies = modules.map(function (module) {
    return self.resolve(module);
  });
  // Invoke the callback with the dependencies
  return callback.apply(null, dependencies);
};

// We want the DI to behave as a singleton
module.exports = new SimpleDI();
