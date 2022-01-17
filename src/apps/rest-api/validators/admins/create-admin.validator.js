const validator = require('express-validator');

const AdminPassword = require('../../../../contexts/admin/domain/admin-password');

const createAdminValidator = validator.checkSchema({
  name: {
    in: 'body',
    exists: {
      errorMessage: 'Missing name',
      bail: true
    },
    trim: true,
    isLength: {
      options: { min: 1 },
      errorMessage: 'Name cannot be blank'
    }
  },
  surname: {
    in: 'body',
    exists: {
      errorMessage: 'Missing surname',
      bail: true
    },
    trim: true,
    isLength: {
      options: { min: 1 },
      errorMessage: 'Surname cannot be blank'
    }
  },
  email: {
    in: 'body',
    exists: {
      errorMessage: 'Missing email',
      bail: true
    },
    isEmail: {
      errorMessage: 'Is not a valid email',
      bail: true
    }
  },
  password: {
    in: 'body',
    exists: {
      errorMessage: 'Missing password',
      bail: true
    },
    isLength: {
      bail: true,
      options: { min: AdminPassword.MIN_LENGTH },
      errorMessage: `Password should be at least ${AdminPassword.MIN_LENGTH} chars long`
    }
  },
  isSuperAdmin: {
    in: 'body',
    toBoolean: true,
    isBoolean: {
      bail: true,
      options: { loose: false },
      errorMessage: 'Invalid boolean value'
    }
  }
});

module.exports = createAdminValidator;
