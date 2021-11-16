const config = require('../config/config');
const  { createLogger, format, transports, error }  = require('winston');
const { combine, timestamp, printf, json, prettyPrint, errors, colorize  } = format;

const devLogger = () => {
  const myFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });

  return createLogger({
    level: config.devLoggerLevel,
    //format: format.simple(),
    format: combine(   
      prettyPrint(),               
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),      
      errors({ stack: true }),
      myFormat,     
      json()
    ),
    colorize: true,
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),
      new transports.File({filename: "./Log/devLog.log", maxsize:5242880, maxFiles:500, tailable:true})
    ],
  });

}

 module.exports = devLogger;