const catchAsync = require("../utils/catchAsync");
const User = require("../model/User");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    users,
  });
});
