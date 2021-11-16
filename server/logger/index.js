const config = require('../config/config');
const devLogger = require('./devLogger')
const prodLogger = require('./prodLogger')
const winstonInstance = require('./winston')

let winstonLogger = null;

if (config.env === 'development') {
  winstonLogger = devLogger()
} else {
  winstonLogger = prodLogger()
}
 
module.exports = {winstonLogger, winstonInstance};