'use strict';

module.exports = function (app) {
  return {
    common: require('./common')(app),
    users: require('./users')(app),
    auth: require('./auth')(app)
  };
};
