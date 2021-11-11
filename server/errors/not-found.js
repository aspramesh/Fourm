const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class NotFoundError extends CustomAPIError { 
  constructor(message, status = StatusCodes.NOT_FOUND, isPublic = false) {
    super(message, status, isPublic);    
  } 
}

module.exports = NotFoundError;
