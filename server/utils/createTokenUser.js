const createTokenUser = (user) => {
  return { name: user.email, userId: user._id, role: user.role };
};

module.exports = createTokenUser;
