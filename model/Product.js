const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "A product must have a description"],
  },
  richDescription: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  images: [String],
  brand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    requied: [true, "A product must have a price"],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
  },
  subCategory: {
    type: mongoose.Schema.ObjectId,
    ref: "SubCategory",
  },
  countInStock: {
    type: Number,
    required: [true, "Stock count must have a number"],
    min: 0,
    max: 1000,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  numRatings: {
    type: Number,
    default: 0,
  },

  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
