const express = require("express");
const authController = require("../controllers/authController");
const {
  getAllCategories,
  createCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, getAllCategories)
  .post(createCategory);

module.exports = router;
