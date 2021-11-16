const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        required: [true, 'Please provide password'],
        min: 6,
        max: 2048
      },
    externalId : {
        type: String,
        required: false      
      },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: Date,
    passwordToken: {
      type: String,
    },
    passwordTokenExpirationDate: {
      type: Date,
    }  
 },
{ timestamps: true });

UserSchema.pre('save', async function () {  
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
