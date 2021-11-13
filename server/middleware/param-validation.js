const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      firstName: Joi.string().required().error(() => {return {message: 'Firstname can not be empty'};}),
      lastName: Joi.string().required().error(() => {return {message: 'Lastname can not be empty'};}),
      mobileNumber: Joi.string().regex(/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{3,15}$/).required().error(() => {return {message: 'Please provide a valid mobile number'};}),
      email: Joi.string().regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z_\-0-9]+\.)+[a-zA-Z]{2,}))/)
              .required().error(() => {return {message: 'Please provide a valid email id'};}),
      password:Joi.string().required().error(() => {return {message: 'Password can not be empty'};})
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      firstName: Joi.string().required().error(() => {return {message: 'Firstname can not be empty'};}),
      lastName: Joi.string().required().error(() => {return {message: 'Lastname can not be empty'};}),
      mobileNumber: Joi.string().regex(/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{3,15}$/).required().error(() => {return {message: 'Please provide a valid mobile number'};}),
      email: Joi.string().regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z_\-0-9]+\.)+[a-zA-Z]{2,}))/)
              .required().error(() => {return {message: 'Please provide a valid email id'};})
    },
    params: {
      userId: Joi.string().hex().required().error(() => {return {message: 'Userid can not be empty'};})
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required().error(() => {return {message: 'Username can not be empty'};}),
      password: Joi.string().required().error(() => {return {message: 'Password can not be empty'};})
    }
  }
};
