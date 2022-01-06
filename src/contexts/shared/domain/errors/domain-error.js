class DomainError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.data = {};

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = DomainError;
