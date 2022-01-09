const Uuid = require('../value-objects/uuid');

class AdminId extends Uuid {
  static generate() {
    const uuid = super.generate();
    return new AdminId(uuid.value);
  }
}

module.exports = AdminId;
