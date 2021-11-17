const config = require('../config/config');
const  { createLogger, format, transports, error }  = require('winston');
const { combine, timestamp, printf, json, prettyPrint, errors, colorize  } = format;

const myFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });

const logger = createLogger ({
  level: config.devLoggerLevel,
    format: combine(   
      prettyPrint(),               
      timestamp(),      
      errors({ stack: true }),
      myFormat,     
      json()
    ),
    colorize: true,
    defaultMeta: { service: 'user-service' },
  transports: [ 
    new (transports.Console)({json: true, colorize: true}), //check if necessary log in production
    new transports.File({filename: "./Log/Log.log", maxsize:5242880, maxFiles:500, tailable:true})
  ]
});

module.exports = logger;
