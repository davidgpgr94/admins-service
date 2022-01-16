const validator = require('express-validator');

const checkCredentialsValidator = validator.checkSchema({
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
    }
  }
});

module.exports = checkCredentialsValidator;
