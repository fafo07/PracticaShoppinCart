const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  idProduct: {
    type: Number,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  description: {
    type: String,
    required: false,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
