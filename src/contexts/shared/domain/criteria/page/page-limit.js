const GreaterOrEqualZeroIntValueObject = require('../../value-objects/greater-or-equal-zero-int-value-object');

class PageLimit extends GreaterOrEqualZeroIntValueObject {
  static ITEMS_PER_PAGE = 10;

  static createDefault() {
    return new PageLimit(PageLimit.ITEMS_PER_PAGE);
  }
}

module.exports = PageLimit;
