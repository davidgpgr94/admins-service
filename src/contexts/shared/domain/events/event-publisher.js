const DomainEvent = require('./domain-event');

class EventPublisher {
  /** @param {DomainEvent} domainEvent */
  publish(domainEvent) {
    throw new Error('not implemented yet');
  }
}

module.exports = EventPublisher;
