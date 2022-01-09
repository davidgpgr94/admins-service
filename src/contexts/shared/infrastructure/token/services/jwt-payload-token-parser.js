const AdminId = require('../../../domain/admin/admin-id');
const Token = require('../../../domain/token/token');
const TokenCreatedAt = require('../../../domain/token/token-created-at');
const TokenDuration = require('../../../domain/token/token-duration');
const Uuid = require('../../../domain/value-objects/uuid');

class JwtPayloadTokenParser {

  /** @param {Token} token */
  static toJwtPayload(token) {
    const { id, adminId, duration, createdAt } = token;

    const iat = this.#fromDateToNumericDate(createdAt.value);
    const exp = iat + duration.value;

    return {
      sub: id.value,
      adminId: adminId.value,
      iat,
      exp
    };
  }

  /** @returns {Token} */
  static toToken(jwtPayload) {
    const { sub, adminId, exp, iat } = jwtPayload;

    const duration = exp - iat;
    const createdAtDate = this.#fromNumericDateToDate(iat);

    return new Token({
      id: new Uuid(sub),
      adminId: new AdminId(adminId),
      duration: new TokenDuration(duration),
      createdAt: new TokenCreatedAt(createdAtDate)
    });
  }

  /**
   * @param {Date} date
   * @returns {Number}
   */
  static #fromDateToNumericDate(date) {
    const time = date.getTime();
    return (Math.floor( time / 1000 ) - 30);
  }

  /**
   * @param {Number} numbericDate
   * @returns {Date}
   */
   static #fromNumericDateToDate(numbericDate) {
    return new Date((numbericDate + 30) * 1000);
  }
}

module.exports = JwtPayloadTokenParser;
