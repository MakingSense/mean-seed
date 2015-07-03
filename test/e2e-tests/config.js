'use strict';

module.exports = {
  db: {
    uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/meanp',
    options: {
      db: {
        safe: true
      }
    }
  }
};
