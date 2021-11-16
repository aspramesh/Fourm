//const {winstonLogger} = require('../logger')

const responseFormatter = (status, message = "", payload = "", error = "") => {      
  /* const response = {status, message, payload, error}      
   let loggerResponsce = JSON.parse(JSON.stringify(response));
   if (status === 'error') { winstonLogger.error(loggerResponsce)}
   else {winstonLogger.info(loggerResponsce)}*/
   return {status, message, payload, error}   ;
}

module.exports = responseFormatter