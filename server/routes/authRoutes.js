const express = require('express');
//const validate = require('express-validation');
const { validate } = require('express-validation')
//const { check, validationResult } = require('express-validator');
const paramValidation = require('../middleware/param-validation');
const { validateRegister, validateLogin, validateForgotPassword, validateResetPassword, validateVerifyEmail, validateRefreshToken  } = paramValidation;
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshToken,
} = require('../controllers/authController');

router.post('/v1/register', validate(validateRegister, {}, {abortEarly: false}), register);
router.post('/v1/login', validate(validateLogin, {}, {abortEarly: false}), login);
router.post('/v1/refreshToken', validate(validateRefreshToken, {}, {abortEarly: false}), refreshToken);
router.delete('/v1/logout', authenticateUser, logout);
router.post('/v1/verify-email', validate(validateVerifyEmail, {}, {abortEarly: false}), verifyEmail);
router.post('/v1/reset-password', validate(validateResetPassword, {}, {abortEarly: false}), resetPassword);
router.post('/v1/forgot-password', validate(validateForgotPassword, {}, {abortEarly: false}), forgotPassword);

module.exports = router;