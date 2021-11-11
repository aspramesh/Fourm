const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class ValidationError extends CustomAPIError {
 constructor(message, status = StatusCodes.UNPROCESSABLE_ENTITY, isPublic = false) {
    super(message, status, isPublic);    
  } 
}

module.exports = ValidationError;
