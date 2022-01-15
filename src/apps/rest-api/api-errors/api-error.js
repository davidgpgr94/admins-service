class ApiError extends Error {
  constructor(statusCode, code, message, data = {}) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.data = { ...data };

    Error.captureStackTrace(this, this.constructor);
  }

  toJson() {
    return {
      code: this.code,
      message: this.message,
      data: this.data
    };
  }
}

module.exports = ApiError;
