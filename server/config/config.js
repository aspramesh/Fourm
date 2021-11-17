const Joi = require('joi');
const CustomError = require('../errors');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  HTTP_PORT: Joi.number()
    .default(8080),
  HTTPS_PORT: Joi.number()
    .default(8443),  
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  PROD_LOGGER_LEVEL: Joi.string()
   // .valid('error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly')
    .default('info'),
  DEV_LOGGER_LEVEL: Joi.string()
    //.valid('error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly')
    .default('silly'),
}).unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  //throw new Error(`Config validation error: ${error.message}`);
  throw new CustomError.InternalError(`Config validation error: ${error.message}`);
}
const config = {
  env: envVars.NODE_ENV,
  httpPort: envVars.HTTP_PORT,
  httpsPort: envVars.HTTPS_PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  prodLoggerLevel: envVars.PROD_LOGGER_LEVEL,
  devLoggerLevel: envVars.DEV_LOGGER_LEVEL,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  }
};

module.exports = config;
