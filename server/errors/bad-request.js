const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class BadRequestError extends CustomAPIError {
 constructor(message, status = StatusCodes.BAD_REQUEST, isPublic = false) {
    super(message, status, isPublic);    
  } 
}

module.exports = BadRequestError;
