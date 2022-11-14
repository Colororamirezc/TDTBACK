const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const getUsersCtrl = asyncHandler(async (req, res) => {
  const usersByArea = await User.find({ area: req.params.area }).exec();

  res.status(201).json(usersByArea);
});


module.exports = {
  getUsersCtrl,
};
