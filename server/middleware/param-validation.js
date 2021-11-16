//const Joi = require('joi');
const { Joi } = require('express-validation')

 /*'string.alphanum': '{{#label}} must only contain alpha-numeric characters',
  'string.base': '{{#label}} must be a string',
  'string.base64': '{{#label}} must be a valid base64 string',
  'string.creditCard': '{{#label}} must be a credit card',
  'string.dataUri': '{{#label}} must be a valid dataUri string',
  'string.domain': '{{#label}} must contain a valid domain name',
  'string.email': '{{#label}} must be a valid email',
  'string.empty': '{{#label}} is not allowed to be empty',
  'string.guid': '{{#label}} must be a valid GUID',
  'string.hex': '{{#label}} must only contain hexadecimal characters',
  'string.hexAlign': '{{#label}} hex decoded representation must be byte aligned',
  'string.hostname': '{{#label}} must be a valid hostname',
  'string.ip': '{{#label}} must be a valid ip address with a {{#cidr}} CIDR',
  'string.ipVersion': '{{#label}} must be a valid ip address of one of the following versions {{#version}} with a {{#cidr}} CIDR',
  'string.isoDate': '{{#label}} must be in iso format',
  'string.isoDuration': '{{#label}} must be a valid ISO 8601 duration',
  'string.length': '{{#label}} length must be {{#limit}} characters long',
  'string.lowercase': '{{#label}} must only contain lowercase characters',
  'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
  'string.min': '{{#label}} length must be at least {{#limit}} characters long',
  'string.normalize': '{{#label}} must be unicode normalized in the {{#form}} form',
  'string.token': '{{#label}} must only contain alpha-numeric and underscore characters',
  'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}',
  'string.pattern.name': '{{#label}} with value {:[.]} fails to match the {{#name}} pattern',
  'string.pattern.invert.base': '{{#label}} with value {:[.]} matches the inverted pattern: {{#regex}}',
  'string.pattern.invert.name': '{{#label}} with value {:[.]} matches the inverted {{#name}} pattern',
  'string.trim': '{{#label}} must not have leading or trailing whitespace',
  'string.uri': '{{#label}} must be a valid uri',
  'string.uriCustomScheme': '{{#label}} must be a valid uri with a scheme matching the {{#scheme}} pattern',
  'string.uriRelativeOnly': '{{#label}} must be a valid relative uri',
  'string.uppercase': '{{#label}} must only contain uppercase characters'*/

module.exports = {
  // POST /api/users
  validateRegister: {
    body: Joi.object({
      firstName: Joi.string().required().messages({"any.required": "Firstname is required!", "string.empty": "Firstname can't be empty!",}),      
      lastName: Joi.string().required().messages({"any.required": "Lastname is required!", "string.empty": "Lastname can't be empty!",}),           
      mobileNumber: Joi.string().regex(/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{3,15}$/).required().messages({"string.pattern.base": "Please provide valid mobile number!", "any.required": "Mobile number is required!", "string.empty": "Mobile number can't be empty!",}),      
      email: Joi.string().email().required().messages({"string.email": "Please provide a valid email", "any.required": "Email is required!", "string.empty": "Email can't be empty!",}),     
      password:Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({"string.pattern.base": "Password should be minimum 8 characters long, should have 1 upper case and 1 lower case, 1 number and 1 special character", "any.required": "Password is required!", "string.empty": "Password can't be empty!",})
    }).options({ stripUnknown: true }),
  }, 

 // UPDATE /api/users/:userId
  validateUpdateUser: {
    body: Joi.object({
      firstName: Joi.string().required().messages({"any.required": "Firstname is required!", "string.empty": "Firstname can't be empty!",}),      
      lastName: Joi.string().required().messages({"any.required": "Lastname is required!", "string.empty": "Lastname can't be empty!",}),           
      mobileNumber: Joi.string().regex(/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{3,15}$/).required().messages({"string.pattern.base": "Please provide valid mobile number!", "any.required": "Mobile number is required!", "string.empty": "Mobile number can't be empty!",}),      
      email: Joi.string().email().required().messages({"string.email": "Please provide a valid email", "any.required": "Email is required!", "string.empty": "Email can't be empty!",})     
     }).options({ stripUnknown: true }),  
    params: Joi.object({
      userId: Joi.string().hex().required().messages({"string.hex": "User id must only contain hexadecimal characters", "any.required": "User id is required!", "string.empty": "User id can't be empty!",})      
    }).options({ stripUnknown: true }),  
  },

  // POST /api/auth/login
  validateLogin: {
    body: Joi.object({
      email: Joi.string().email().required().messages({"string.email": "Please provide a valid email", "any.required": "Email is required!", "string.empty": "Email can't be empty!",}),     
      password: Joi.string().required().messages({"any.required": "Password is required!", "string.empty": "Password can't be empty!",})      
     }).options({ stripUnknown: true }), 
  },

  validateForgotPassword: {
    body: Joi.object({
      email: Joi.string().email().required().messages({"string.email": "Please provide a valid email", "any.required": "Email is required!", "string.empty": "Email can't be empty!",})
     }).options({ stripUnknown: true }), 
  },

  validateResetPassword: {
    body: Joi.object({
      token: Joi.string().token().required().messages({"string.token": "Token must only contain alpha-numeric and underscore characters", "any.required": "Token is required!", "string.empty": "Token can't be empty!",}),
      email: Joi.string().email().required().messages({"string.email": "Please provide a valid email", "any.required": "Email is required!", "string.empty": "Email can't be empty!",}),
      password:Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({"string.pattern.base": "Password should be minimum 8 characters long, should have 1 upper case and 1 lower case, 1 number and 1 special character", "any.required": "Password is required!", "string.empty": "Password can't be empty!",})
     }).options({ stripUnknown: true }), 
  },

  validateVerifyEmail: {
    body: Joi.object({
      verificationToken: Joi.string().token().required().messages({"string.token": "Token must only contain alpha-numeric and underscore characters", "any.required": "Token is required!", "string.empty": "Token can't be empty!",}),
      email: Joi.string().email().required().messages({"string.email": "Please provide a valid email", "any.required": "Email is required!", "string.empty": "Email can't be empty!",})
     }).options({ stripUnknown: true }), 
  }
};
