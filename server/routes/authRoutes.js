const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../middleware/param-validation');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

router.post('/v1/register', validate(paramValidation.createUser), register);
router.post('/v1/login', validate(paramValidation.login), login);
router.delete('/v1/logout', authenticateUser, logout);
router.post('/v1/verify-email', validate(paramValidation.verifyEmail), verifyEmail);
router.post('/v1/reset-password', validate(paramValidation.resetPassword), resetPassword);
router.post('/v1/forgot-password', validate(paramValidation.forgotPassword), forgotPassword);

module.exports = router;