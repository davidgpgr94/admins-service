const { v4:uuidV4 } = require('uuid');
const validateUuid = require('uuid-validate');
const InvalidArgumentError = require('../errors/invalid-argument-error');
const StringValueObject = require('./string-value-object');

class Uuid extends StringValueObject {
  constructor(uuid) {
    super(uuid);
    this.#ensureIsValidUuid();
  }

  #ensureIsValidUuid() {
    if (!validateUuid(this.value)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value "${this.value}". Expected to be a valid uuid`, { uuid: this.value });
    }
  }

  static generate() {
    return new Uuid(uuidV4());
  }
}

module.exports = Uuid;
