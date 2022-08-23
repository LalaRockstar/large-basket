const express = require("express");
const { signup, login, logout } = require("../controllers/authController");
const { getAllUsers } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.route("/").get(getAllUsers);

module.exports = router;
