const express = require('express');
const { validate } = require('express-validation')
const paramValidation = require('../middleware/param-validation');
const { validateUpdateUser, validateUpdateUserPassword  } = paramValidation;
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');
const { getAllUsers, getSingleUser, deleteSingleUser, showCurrentUser, updateUser, updateUserPassword } = require('../controllers/userController');

router.route('/v1/').get(authenticateUser, authorizePermissions('admin'), getAllUsers);
router.route('/v1/showMe').get(authenticateUser, showCurrentUser);
router.route('/v1/updateUser').patch(validate(validateUpdateUser, {}, {abortEarly: false}), authenticateUser, updateUser);
router.route('/v1/updateUserPassword').patch(validate(validateUpdateUserPassword, {}, {abortEarly: false}), authenticateUser, updateUserPassword);
router.route('/v1/:id').get(authenticateUser, getSingleUser).delete(authenticateUser, authorizePermissions('admin'), deleteSingleUser);
//router.param('userId', authenticateUser, getSingleUser);

module.exports = router;
