const ApplicationError = require('./application-error');

class InvalidDirectionError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'InvalidDirectionError';
  }
}

module.exports = InvalidDirectionError;
