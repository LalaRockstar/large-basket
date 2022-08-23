const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "A category must have a name"],
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
});
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
