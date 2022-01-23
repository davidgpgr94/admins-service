const validator = require('express-validator');

const AdminPassword = require('../../../../contexts/admin/domain/admin-password');

const changeAdminPasswordValidator = validator.checkSchema({
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
  },
  currentPassword: {
    in: 'body',
    exists: {
      errorMessage: 'Missing current password',
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

module.exports = changeAdminPasswordValidator;
