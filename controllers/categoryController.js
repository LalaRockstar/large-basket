const Category = require("../model/Category");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// eslint-disable-next-line consistent-return
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  if (categories.length === 0) {
    return next(new AppError("No category is created", 404));
  }

  res.status(200).json({
    status: "success",
    categories,
    noOfCategories: categories.length,
  });
});
// eslint-disable-next-line no-unused-vars
exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    status: "success",
    category,
  });
});
