'use strict';

module.exports = {
  db: {
    uri: 'mongodb://localhost/mean_test',
    options: {
      db: {
        safe: true
      }
    }
  },
  secretKey: 'ourTestingSecretKey'
};
