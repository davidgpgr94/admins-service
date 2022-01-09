const AdminId = require('../admin/admin-id');
const NotEmptyStringValueObject = require('../value-objects/not-empty-string-value-object');
const Uuid = require('../value-objects/uuid');
const TokenCreatedAt = require('./token-created-at');
const TokenDuration = require('./token-duration');

class Token {
  #id;
  #adminId;
  #duration;
  #createdAt;
  #privateKey;

  /**
   * @param {Object} o
   * @param {Uuid} o.id
   * @param {AdminId} o.adminId
   * @param {TokenDuration} o.duration
   * @param {TokenCreatedAt} o.createdAt
   * @param {NotEmptyStringValueObject} o.privateKey
   * @param {Unexpect}
   */
  constructor({ id, adminId, duration, createdAt, privateKey }) {
    this.#id = id;
    this.#adminId = adminId;
    this.#duration = duration;
    this.#createdAt = createdAt;
    this.#privateKey = privateKey;
  }

  get id() {
    return this.#id;
  }

  get adminId() {
    return this.#adminId;
  }

  get duration() {
    return this.#duration;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get privateKey() {
    return this.#privateKey;
  }

  static generate(adminId, privateKey) {
    return new Token({
      id: Uuid.generate(),
      adminId: adminId,
      createdAt: TokenCreatedAt.now(),
      duration: TokenDuration.default(),
      privateKey: privateKey
    });
  }
}

module.exports = Token;
