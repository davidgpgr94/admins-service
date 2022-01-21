const validator = require('express-validator');

const enableAdminValidator = validator.checkSchema({
  adminId: {
    in: 'params',
    exists: {
      errorMessage: 'Missing admin id',
      bail: true
    },
    isUUID: {
      errorMessage: 'Invalid id',
      bail: true
    }
  }
});

module.exports = enableAdminValidator;
