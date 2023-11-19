const ApplicationError = require('./application-error');

class InvalidPlateauSizeError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'InvalidPlateauSizeError';
  }
}

module.exports = InvalidPlateauSizeError;
