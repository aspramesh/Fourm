const  {StatusCodes}  = require('http-status-codes');
const CustomError = require('../errors');
const responseFormatter = require('./responseFormatter');

const notFound = (req, res) => {       
   const error = new CustomError.NotFoundError('Route does not exist', StatusCodes.NOT_FOUND, true);      
   //const response = responseFormatter("error", error.message || 'Route does not exist...', '', error)
   return res.status(error.status||StatusCodes.NOT_FOUND).json(responseFormatter("error", error.message || 'Route does not exist...', '', error))      
}

module.exports = notFound