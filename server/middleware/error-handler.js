const  {StatusCodes}  = require('http-status-codes');
const CustomError = require('../errors');
const expressValidation = require('express-validation');

const errorHandlerMiddleware = async (err, req, res, next) => {      
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new CustomError.ValidationError (unifiedErrorMessage, StatusCodes.UNPROCESSABLE_ENTITY, true);
    return res.status(error.status).json({...error,  "message":error.message || 'Something went wrong try again later'})
  } else if (!(err instanceof CustomError.CustomAPIError)) {     
    const error = new CustomError.InternalError(err.message, StatusCodes.INTERNAL_SERVER_ERROR, err.isPublic||true);     
    if (err.name === 'ValidationError') {
      error.message = Object.values(err.errors).map((item) => item.message).join(',');      
      error.status = StatusCodes.UNPROCESSABLE_ENTITY;
    }
   if (err.code && err.code === 11000) {
      error.message = `Duplicate value entered for ${Object.keys(err.keyValue )} field, please choose another value`;
      error.status = StatusCodes.UNPROCESSABLE_ENTITY;
    }
   if (err.name === 'CastError') {
      error.message = `No item found with id : ${err.value}`;
      error.status = StatusCodes.NOT_FOUND;    
    }  
    return res.status(error.status||StatusCodes.INTERNAL_SERVER_ERROR).json({...error,  "message":error.message || 'Something went wrong try again later'})
  } else {    
   const error = new CustomError.CustomAPIError(err.message|| 'Something went wrong try again later', err.status || StatusCodes.BAD_REQUEST, err.isPublic||true);  
   return res.status(error.status||StatusCodes.BAD_REQUEST).json({...err, "message": error.message || 'Something went wrong try again later'})      
  } 
}

module.exports = errorHandlerMiddleware