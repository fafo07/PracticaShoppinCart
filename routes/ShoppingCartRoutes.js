const express = require("express");
const ShoppingCartController = require("./../controllers/ShoppingCartController");
const authController = require("./../controllers/authController");
const ShoppinCartRouter = express.Router();
//routes
ShoppinCartRouter
  .route("/product")
  .all(authController.protect)
  .post(ShoppingCartController.AddItemShoppinCart);

  ShoppinCartRouter
  .all(authController.protect)
  .route("/product/:id")
  .delete(ShoppingCartController.DeleteItemShoppinCart);

  ShoppinCartRouter
  .all(authController.protect)
  .route("/pay")
  .post(ShoppingCartController.PayShoppingCart);

module.exports = ShoppinCartRouter;
