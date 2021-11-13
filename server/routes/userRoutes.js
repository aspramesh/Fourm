const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../middleware/param-validation');
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');
const { getAllUsers, getSingleUser, deleteSingleUser, showCurrentUser, updateUser, updateUserPassword } = require('../controllers/userController');

router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers);
router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(validate(paramValidation.updateUser), authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);
router.route('/:id').get(authenticateUser, getSingleUser).delete(authenticateUser, authorizePermissions('admin'), deleteSingleUser);
//router.param('userId', authenticateUser, getSingleUser);

module.exports = router;
