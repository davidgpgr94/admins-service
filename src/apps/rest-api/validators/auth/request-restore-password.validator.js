const validator = require('express-validator');

const requestRestorePasswordValidator = validator.checkSchema({
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
  }
});

module.exports = requestRestorePasswordValidator;
