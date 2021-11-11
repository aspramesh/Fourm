const  {StatusCodes}  = require('http-status-codes');
const CustomError = require('../errors');

const notFound = (req, res) => {    
   const error = new CustomError.NotFoundError('Route does not exist', StatusCodes.NOT_FOUND, true);          
   return res.status(error.status||StatusCodes.NOT_FOUND).json({...error, "message": error.message || 'Route does not exist...'})      
}

module.exports = notFound