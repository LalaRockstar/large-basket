const express = require("express");

const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

// router.get("/base", (req, res) => {
//   res.status(200).render("base");
// });
router.get("/", viewController.getLoginForm);
router.use(authController.protect);

router.get(
  "/dashboard",

  // eslint-disable-next-line comma-dangle
  viewController.getAdminPanel
);

router.get("/configuration", viewController.configuration);
// router.get("/configuration/category", viewController.configCategory);
router.get("/configuration/sub-category", viewController.configSubCategory);
router.get("/configuration/brand", viewController.configBrand);
router.get("/configuration/store", viewController.configStore);
router.get("/configuration/product-size", viewController.configProductSize);
router.get("/products", viewController.getProducts);

module.exports = router;
