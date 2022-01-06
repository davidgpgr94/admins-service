const GreaterOrEqualZeroIntValueObject = require('../../value-objects/greater-or-equal-zero-int-value-object');

class PageOffset extends GreaterOrEqualZeroIntValueObject {
  static createFirst() {
    return new PageOffset(0);
  }
}

module.exports = PageOffset;
