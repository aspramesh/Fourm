const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class UnauthenticatedError extends CustomAPIError {
  constructor(message, status = StatusCodes.UNAUTHORIZED, isPublic = false) {
    super(message, status, isPublic);    
  } 
}

module.exports = UnauthenticatedError;
