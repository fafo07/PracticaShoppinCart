const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
});


exports.getProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findOne({ idProduct: req.params.id });
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        Product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.addProduct = catchAsync(async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      Product: newProduct,
    },
  });
});


exports.putProductById = catchAsync(async(req, res) => {
  let foundProduct = await Product.findOne({ idProduct: req.params.id });
  if (foundProduct) {
    foundProduct.productName = req.body.productName
    foundProduct.price = req.body.price
    foundProduct.description = req.body.description
    console.log(foundProduct)
    await Product.findByIdAndUpdate(foundProduct._id, foundProduct);
    res.status(200).json({
      status: "success",
      data: {
        Product:  foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.deleteProductById =  catchAsync(async(req, res) => {
  let foundProduct = await Product.findOne({ idProduct: Number(req.params.id)});
  if (foundProduct) {
    await Product.findByIdAndDelete(foundProduct._id);
    res.status(200).json({
      status: "success",
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
