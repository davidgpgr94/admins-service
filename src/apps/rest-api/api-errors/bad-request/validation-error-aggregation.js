const BadRequest = require('./bad-request');
const { VALIDATION_ERROR_AGGREGATION } = require('../api-error-codes');

const ValidationError = require('./validation-error');

const InvalidTypeError = require('../../../../contexts/shared/domain/errors/invalid-type-error');

class ValidationErrorAggregation extends BadRequest {
  constructor(validationErrors) {
    super(VALIDATION_ERROR_AGGREGATION, `There are ${validationErrors.length} validation errors`, { validationErrors });

    this.#ensureAreValidationErrors(validationErrors);

    this.errors = validationErrors;
  }

  toJson() {
    return {
      ...super.toJson(),
      data: this.errors.map(error => error.toJson())
    }
  }

  #ensureAreValidationErrors(validationErrors) {
    validationErrors.forEach(validationError => {
      const isValidationError = validationError instanceof ValidationError;

      if (!isValidationError) {
        throw new InvalidTypeError(typeof validationError, ValidationError.constructor.name);
      }
    });
  }
}

module.exports = ValidationErrorAggregation;
