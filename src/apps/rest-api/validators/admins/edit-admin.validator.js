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
  },
  isSuperAdmin: {
    in: 'body',
    optional: {
      options: {
        nullable: false
      }
    },
    isBoolean: {
      bail: true,
      options: { loose: false },
      errorMessage: 'Invalid boolean value'
    },
    toBoolean: true
  }
});

module.exports = editAdminValidator;
