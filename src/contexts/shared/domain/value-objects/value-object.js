class ValueObject {
  #value;

  constructor(value) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  equal(other) {
    if (other.value !== this.value)
      return false;

    return true;
  }

  toString() {
    return `${this.#value}`;
  }

  clone() {
    const Constructor = this.constructor;

    return new Constructor(this.value);
  }
}

module.exports = ValueObject;
