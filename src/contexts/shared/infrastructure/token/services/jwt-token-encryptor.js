const jwt = require('jsonwebtoken');

const { jwt:jwtConfig } = require('../../config');

const TokenEncryptor = require('../../../domain/token/services/token-encryptor');
const Token = require('../../../domain/token/token');
const NotEmptyStringValueObject = require('../../../domain/value-objects/not-empty-string-value-object');
const JwtPayloadTokenParser = require('./jwt-payload-token-parser');
const EncryptedTokenNotValid = require('../../../domain/token/errors/encrypted-token-not-valid');

class JwtTokenEncryptor extends TokenEncryptor {

  #jwtPayloadTokenParser;
  #tokenAlgorithm;

  constructor() {
    super();
    this.#tokenAlgorithm = jwtConfig.certAlgorithm;
    this.#jwtPayloadTokenParser = JwtPayloadTokenParser;
  }

  /**
   * @param {Token} token
   * @returns {NotEmptyStringValueObject}
   */
  encrypt(token) {
    const payload = this.#jwtPayloadTokenParser.toJwtPayload(token);

    const strEncryptedToken = jwt.sign(payload, token.privateKey.value, { algorithm: this.#tokenAlgorithm });
    return new NotEmptyStringValueObject(strEncryptedToken);
  }

  /**
   * @param {NotEmptyStringValueObject} encryptedToken
   * @returns {Token}
   */
  decode(encryptedToken) {
    const jwtPayload = jwt.decode(encryptedToken.value, { complete: false });

    return this.#jwtPayloadTokenParser.toToken(jwtPayload);
  }

  /**
   * @param {NotEmptyStringValueObject} encryptedToken
   * @param {NotEmptyStringValueObject} privateKey
   * @returns {Token}
   * @throws {EncryptedTokenNotValid}
   */
  decodeAndVerify(encryptedToken, privateKey) {
    try {
      const jwtPayload = jwt.verify(encryptedToken.value, privateKey.value, { algorithms: this.#tokenAlgorithm, complete: false });

      return this.#jwtPayloadTokenParser.toToken(jwtPayload);
    } catch (error) {
      throw new EncryptedTokenNotValid(encryptedToken);
    }
  }
}

module.exports = JwtTokenEncryptor;
