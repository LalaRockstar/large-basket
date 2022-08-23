/* eslint-disable operator-linebreak */
/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
// const { promisify } = require("util");
const User = require("../model/User");
const catchAsync = require("../utils/catchAsync");

const AppError = require("../utils/appError");

const signToken = (id) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

// eslint-disable-next-line no-unused-vars
exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    email: req.body.email,
    phNo: req.body.phNo,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // eslint-disable-next-line no-underscore-dangle
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      // eslint-disable-next-line comma-dangle
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  res.status(201).json({
    status: "success",
    token,
    user,
  });
});

// eslint-disable-next-line consistent-return
exports.login = catchAsync(async (req, res, next) => {
  // ______1. checking if email and password exists_______//
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide phone number & password", 401));
  }

  // ______2. check if the email exists and compare the password___/
  const user = await User.findOne({ email: req.body.email }).select(
    // eslint-disable-next-line comma-dangle
    "+password"
  );

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(
      // eslint-disable-next-line comma-dangle
      new AppError("Please provide valid phone number or password", 403)
    );
  }
  // eslint-disable-next-line no-underscore-dangle
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      // eslint-disable-next-line comma-dangle
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  res.status(200).json({
    status: "success",
    token,
    user,
  });
});
exports.logout = (req, res) => {
  const cookieOptions = {
    expires: new Date(
      // eslint-disable-next-line comma-dangle
      Date.now() + 5 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", "faltuneki", cookieOptions);
  res.status(200).json({
    status: "success",
  });
};
exports.protect = async (req, res, next) => {
  if (req.cookies.jwt) {
    // _______compare the token_________ //
    try {
      const decoded = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

      // _______checking if the user still exist__________ //
      const freshUser = await User.findById(decoded.id);
      if (!freshUser) {
        return next(new AppError("User doesnot exist! Please log in", 404));
      }
      // ______checking if the user change the password after the token was issued____ //

      if (freshUser.passwordChangeAfter(decoded.iat)) {
        return next(new AppError("User recently changed the password", 401));
      }
      res.locals.user = freshUser;

      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
