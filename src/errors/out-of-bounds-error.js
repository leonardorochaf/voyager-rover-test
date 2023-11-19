const ApplicationError = require('./application-error');

class OutOfBoundsError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'OutOfBoundsError';
  }
}

module.exports = OutOfBoundsError;
