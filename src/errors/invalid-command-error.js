const ApplicationError = require('./application-error');

class InvalidCommandError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'InvalidCommandError';
  }
}

module.exports = InvalidCommandError;
