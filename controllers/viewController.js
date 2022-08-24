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
exports.getProducts = (req, res) => {
  res.status(200).render("products");
};
exports.sales = (req, res) => {
  res.status(200).render("sales");
};
exports.settings = (req, res) => {
  res.status(200).render("setting");
};
exports.deliveryAgent = (req, res) => {
  res.status(200).render("deliveryagent");
};
exports.users = (req, res) => {
  res.status(200).render("users");
};
exports.report = (req, res) => {
  res.status(200).render("report");
};
exports.orders = (req, res) => {
  res.status(200).render("orders");
};
