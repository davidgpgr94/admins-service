const validator = require('express-validator');

const { pagination:{defaultPage} } = require('../../config');

const realGetAdminsValidator = validator.checkSchema({
  page: {
    in: 'query',
    isInt: true,
    toInt: true
  },
  email: {
    in: 'query',
    optional: true,
    isEmail: {
      bail: true,
      errorMessage: 'Is not a valid email'
    },
  }
});

const getAdminsValidator = {
  run: (req, res, next) => {
    const { query } = req;
    if (!query.page) req.query.page = defaultPage;

    return realGetAdminsValidator.run(req, res, next);
  }
}

module.exports = getAdminsValidator;
