const CustomError = require('../errors');
const { isTokenValid } = require('../utils');
const Token = require('../models/Token');
const { attachCookiesToResponse } = require('../utils');

const authenticateUser = async (req, res, next) => {
const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;            
      return next();
    }
    const payload = isTokenValid(refreshToken);    
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });
    if (!existingToken || !existingToken?.isValid) {
    //if (!existingToken)  {
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
    /*if (!existingToken?.isValid) {
     // Token.findByIdAndRemove(existingToken._id, { useFindAndModify: false }).exec(); 
      throw new CustomError.UnauthenticatedError('Authentication Invalid'); 
    }*/

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
    next();
  } catch (error) {    
    throw new CustomError.UnauthenticatedError('Authentication Invalid : ' + error.message);
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
