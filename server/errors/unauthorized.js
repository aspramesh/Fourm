const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class UnauthorizedError extends CustomAPIError { 
  constructor(message, status = StatusCodes.FORBIDDEN, isPublic = false) {
    super(message, status, isPublic);    
  } 
}

module.exports = UnauthorizedError;
