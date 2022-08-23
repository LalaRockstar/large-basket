exports.getLoginForm = (req, res) => {
  res.status(200).render("login");
};
exports.getAdminPanel = (req, res) => {
  res.status(200).render("dashboard");
};
exports.getProducts = (req, res) => {
  res.status(200).render("products");
};
exports.configuration = (req, res) => {
  res.status(200).render("configuration");
};
exports.configCategory = (req, res) => {
  res.status(200).render("category");
};
exports.configSubCategory = (req, res) => {
  res.status(200).render("subcategory");
};
exports.configBrand = (req, res) => {
  res.status(200).render("brand");
};
exports.configStore = (req, res) => {
  res.status(200).render("store");
};
exports.configProductSize = (req, res) => {
  res.status(200).render("productsize");
};
