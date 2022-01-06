const Uuid = require('../value-objects/uuid');

class DomainEvent {
  constructor(eventName, eventId, occurredOn) {
    this._eventName = eventName;
    this._eventId = eventId || Uuid.generate();
    this._occurredOn = occurredOn || new Date();
  }

  get eventName() {
    return this._eventName;
  }

  get eventId() {
    return this._eventId;
  }

  get occurredOn() {
    return this._occurredOn;
  }

  toPrimitive() {
    throw new Error('Not implemented yet');
  }
}

module.exports = DomainEvent;
