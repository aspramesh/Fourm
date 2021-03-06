const StatusCodes = require('http-status');
const config = require('../config/config');

class ExtendableError extends Error {
  constructor(message, status, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, this.constructor.name);
    //if (config.env === 'development') { Error.captureStackTrace(this, this.constructor.name);}
  }
}


class CustomAPIError extends ExtendableError {
   constructor(message, status = StatusCodes.INTERNAL_SERVER_ERROR, isPublic = false) {
    super(message, status, isPublic);    
  }
}

module.exports = CustomAPIError
