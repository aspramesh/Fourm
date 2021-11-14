const config = require('../config/config');
const  { createLogger, format, transports }  = require('winston');
const { combine, timestamp,  printf, json, prettyPrint, errors, colorize  } = format;

const prodLogger = () => {

  return createLogger({
    level: config.prodLoggerLevel,
    //format: simple(),
    format: combine(
      prettyPrint(),           
      timestamp(),
      errors({ stack: true }),
      json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [      
      new transports.File({filename: "./Log/prodLog.log", maxsize:5242880, maxFiles:500, tailable:true})
    ],
  });
  
}

module.exports = prodLogger;