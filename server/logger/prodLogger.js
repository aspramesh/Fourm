const  { createLogger, format, transports }  = require('winston');
const { combine, timestamp,  printf, json, prettyPrint, errors, colorize  } = format;

const prodLogger = () => {
  return createLogger({
    level: process.env.PROD_LOGGER_LEVE,
    //format: simple(),
    format: combine(
      prettyPrint(),      
      timestamp(),
      errors({ stack: true }),
      json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'errors.log', })
    ],
  });
}

module.exports = prodLogger;