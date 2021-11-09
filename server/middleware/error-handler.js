const APIError = require('../../server/helpers/APIError');
const expressValidation = require('express-validation');

const errorHandlerMiddleware = async (err, req, res, next) => {
  //console.log("test error ")
  //console.log(err)  
  //const {message, statusCode} = err;
  //console.log(message)
  //console.log(err.res.statusCode)
  //return res.status(500).json({ msg: 'Something went wrong, please try again' })
  //console.log("Check 123")
  if (err instanceof expressValidation.ValidationError) {
    //console.log("Check 456")
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    //return next(error);
    return res.status(400).json({"error": error,  "detail": error.message})
  } else if (!(err instanceof APIError)) {
   // console.log("Check 789")
    const apiError = new APIError(err.message, err.status, err.isPublic);
   // return next(apiError);
   return res.status(500).json({"error": error,  "detail": error.message})
  }
  //return next(err);
 // console.log(err)
 
  return res.status(500).json({"msg": err})
}

module.exports = errorHandlerMiddleware
