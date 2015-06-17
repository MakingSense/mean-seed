'use strict';

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/meanp',
    options: {
      db: {
        safe: true
      }
    }
  }
};
