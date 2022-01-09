class CheckCredentialsResponse {

  /** @type {boolean} */
  #areCorrect;

  constructor({ areCorrect }) {
    this.#areCorrect = areCorrect;
  }

  get areCorrect() {
    return this.#areCorrect;
  }
}

module.exports = CheckCredentialsResponse;
