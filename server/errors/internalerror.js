const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class InternalError extends CustomAPIError {
 constructor(message, status = StatusCodes.INTERNAL_SERVER_ERROR, isPublic = false) {
    super(message, status, isPublic);    
  } 
}

module.exports = InternalError;
