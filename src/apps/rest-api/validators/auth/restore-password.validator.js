const validator = require('express-validator');
const AdminPassword = require('../../../../contexts/admin/domain/admin-password');

const restorePasswordValidator = validator.checkSchema({
  token: {
    in: 'query',
    exists: {
      errorMessage: 'Missing token',
      bail: true
    }
  },
  newPassword: {
    in: 'body',
    exists: {
      errorMessage: 'Missing new password',
      bail: true
    },
    isLength: {
      options: { min: AdminPassword.MIN_LENGTH },
      errorMessage: `New password should be at least ${AdminPassword.MIN_LENGTH} chars long`
    }
  },
  confirmPassword: {
    in: 'body',
    exists: {
      errorMessage: 'Missing new password confirmation',
      bail: true
    }
  }
});

module.exports = restorePasswordValidator;
