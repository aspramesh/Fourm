const Promise = require('bluebird');
const mongoose = require('mongoose');
const validator = require('validator');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const bcrypt = require('bcryptjs');


/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  firstName : {
      type: String,
      required: [true, 'Please provide first name'],
      max: 255
    },
  middleName : {
      type: String,
      required: false
    },
  lastName : {
      type: String,
      required: [true, 'Please provide last name'],
      max: 255
    },    
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{3,15}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },    
  email : {
      type: String,      
      min: 6,
      max: 255,
      //match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z_\-0-9]+\.)+[a-zA-Z]{2,}))/, 'The value of path {PATH} ({VALUE}) is not a valid email id.']
      unique: true,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      }
    },
  password : {
      type: String,
      required: true,
      min: 6,
      max: 2048
    },
  externalId : {
      type: String,
      required: false      
    },
  createdAt: {
      type: Date,
      default: Date.now
    }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */


/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
