const  { createLogger, format, transports, error }  = require('winston');

const logger = createLogger ({
  transports: [
    new (transports.Console)({
      json: true,
      colorize: true
    })
  ]
});

module.exports = logger;