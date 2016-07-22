'use strict';

module.exports = {
  env: process.env.node_env === 'production' ? 'production' : 'development', // jshint ignore:line
  port: process.env.PORT || 3001,
  db: {
    // uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/meanp',
    uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/blog',
    options: {
      db: {
        safe: true
      }
    }
  },
  secretKey: 'ourSecretKey'
};
