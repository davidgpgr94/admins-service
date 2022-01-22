const validator = require('express-validator');

const editAdminValidator = validator.checkSchema({
  adminId: {
    in: 'params',
    exists: {
      errorMessage: 'Missing id',
      bail: true
    },
    isUUID: {
      errorMessage: 'Invalid id',
      bail: true
    }
  },
  name: {
    in: 'body',
    trim: true,
    optional: true,
    isLength: {
      options: { min: 1 },
      errorMessage: 'Name cannot be blank'
    }
  },
  surname: {
    in: 'body',
    trim: true,
    optional: true,
    isLength: {
      options: { min: 1 },
      errorMessage: 'Surname cannot be blank'
    }
  }
});

module.exports = editAdminValidator;
