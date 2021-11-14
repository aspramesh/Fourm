const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const responseFormatter = require('../middleware/responseFormatter');

const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require('../utils');

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json(responseFormatter("success", '', users));
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password');
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json(responseFormatter("success", '', user));
};

const deleteSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password');
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  await user.remove();  
  res.status(StatusCodes.OK).json(responseFormatter("success", '', user));
};

const showCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select('-password');
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.user.userId}`);
  }  
  res.status(StatusCodes.OK).json(responseFormatter("success", '',  user));
};

// update user with user.save()
const updateUser = async (req, res) => {

  const user = await User.findOne({ _id: req.user.userId });

  user.firstName = req.body.firstName,
  user.middleName = req.body.middleName,
  user.lastNamereq.body.lastName,
  user.mobileNumber = req.body.mobileNumber,
  user.email = req.body.email,    
  user.externalId = req.body.externalId    

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json(responseFormatter("success", '', { user: tokenUser }));

};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Please provide both values');
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json(responseFormatter("success", 'Success! Password Updated.'));
};

module.exports = {
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};

// update user with findOneAndUpdate
// const updateUser = async (req, res) => {
//   const { email, name } = req.body;
//   if (!email || !name) {
//     throw new CustomError.BadRequestError('Please provide all values');
//   }
//   const user = await User.findOneAndUpdate(
//     { _id: req.user.userId },
//     { email, name },
//     { new: true, runValidators: true }
//   );
//   const tokenUser = createTokenUser(user);
//   attachCookiesToResponse({ res, user: tokenUser });
//   res.status(StatusCodes.OK).json({ user: tokenUser });
// };
