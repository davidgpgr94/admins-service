class RestorePasswordResponse {

  /** @type {boolean} */
  #wasRestored;

  constructor({ wasRestored }) {
    this.#wasRestored = wasRestored;
  }

  get wasRestored() {
    return this.#wasRestored;
  }
}

module.exports = RestorePasswordResponse;
