const mongoose = require("mongoose");
const shoppingcartSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  productList: {
    type: Array,
    required: false,
  },
});

const ShoppingCart = mongoose.model("ShoppingCart", shoppingcartSchema);
module.exports = ShoppingCart;