const { validationResult } = require('express-validator');
const ValidationError = require('../api-errors/bad-request/validation-error');
const ValidationErrorAggregation = require('../api-errors/bad-request/validation-error-aggregation');

const checkCredentialsValidator = require('./auth/check-credentials.validator');

const createAdminValidator = require('./admins/create-admin.validator');
const getAdminsValidator = require('./admins/get-admins.validator');
const getAdminValidator = require('./admins/get-admin.validator');
const enableAdminValidator = require('./admins/enable-admin.validator');
const disableAdminValidator = require('./admins/disable-admin.validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const validationErrors = [];
  errors.array().forEach(error => {
    const { param, msg } = error;
    validationErrors.push(new ValidationError(param, msg));
  });

  if (validationErrors.length === 1) return next(validationErrors[0]);

  return next(new ValidationErrorAggregation(validationErrors));
}

const validateWrapper = (validationSchema) => {
  return async (req, res, next) => {
    await validationSchema.run(req, res, next);
    return validate(req, res, next);
  }
}

module.exports = {
  validate: validateWrapper,
  auth: {
    checkCredentialsValidator
  },
  admins: {
    createAdminValidator,
    getAdminsValidator,
    getAdminValidator,
    enableAdminValidator,
    disableAdminValidator
  }
}
