require('dotenv').config();
const  { createLogger, format, transports }  = require('winston');
const { combine, timestamp, printf, json, prettyPrint, errors, colorize  } = format;

const devLogger = () => {
  const myFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });
  return createLogger({
    level: process.env.DEV_LOGGER_LEVE,
    //format: format.simple(),
    format: combine(   
      prettyPrint(),          
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),      
      errors({ stack: true }),
      myFormat,        
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),
      new transports.File({
        filename: 'errors.log',
      })
    ],
  });
}

 module.exports = devLogger;