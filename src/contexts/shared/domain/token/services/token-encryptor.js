const NotEmptyStringValueObject = require('../../value-objects/not-empty-string-value-object');
const Token = require('../token');

class TokenEncryptor {

  /**
   * @param {Token} token
   * @returns {NotEmptyStringValueObject}
   */
  encrypt(token) {
    throw new Error('not implemented yet');
  }

  /**
   * @param {NotEmptyStringValueObject} encryptedToken
   * @returns {Token}
   */
  decode(encryptedToken) {
    throw new Error('not implemented yet');
  }

  /**
   * @param {NotEmptyStringValueObject} encryptedToken
   * @param {NotEmptyStringValueObject} privateKey
   * @returns {Token}
   * @throws {EncryptedTokenNotValid}
   */
  decodeAndVerify(encryptedToken, privateKey) {
    throw new Error('not implemented yet');
  }
}

module.exports = TokenEncryptor;
