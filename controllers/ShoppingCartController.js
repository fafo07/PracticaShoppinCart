const Product = require("../models/Product");
const ShoppinCart = require("../models/Shoppingcart");
const catchAsync = require("../utils/catchAsync");

exports.AddItemShoppinCart = catchAsync(async (req, res) => {
    let foundShoppinCart = await ShoppinCart.findOne({userName: req.body.userName,status: "PENDING"});
    let UpdateShoppinCart = null;
    if(foundShoppinCart)
    { 
        foundShoppinCart = foundShoppinCart.toObject()
        const product = await Product.findOne({idProduct: req.body.idProduct})
        const SellProduct = {"idProduct": product.idProduct,"Price":product.price,"Quantity": req.body.quantity}
        foundShoppinCart.productList.push(SellProduct)
        await ShoppinCart.findByIdAndUpdate(foundShoppinCart._id,foundShoppinCart)
        UpdateShoppinCart= await ShoppinCart.findById(foundShoppinCart._id)
    }
    else
    {
        let newShoppingCart = new ShoppinCart()
        newShoppingCart = newShoppingCart.toObject()
        newShoppingCart.userName = req.body.userName
        newShoppingCart.status = "PENDING"
        const product = await Product.findOne({idProduct: req.body.idProduct})
        const SellProduct = {"idProduct": product.idProduct,"Price":product.price,"Quantity": req.body.quantity}
        newShoppingCart.productList.push(SellProduct)
        UpdateShoppinCart = await ShoppinCart.create(newShoppingCart);
    }
    res.status(200).json({
      status: "success",
      timeOfRequest: req.requestTime,
      data: {
        ShoppinCart:  UpdateShoppinCart,
      },
    });
  });


exports.DeleteItemShoppinCart = catchAsync(async (req, res) => {
    let foundShoppinCart = await ShoppinCart.findOne({userName: req.body.userName,status: "PENDING"});
    if(foundShoppinCart)
    { 
        foundShoppinCart = foundShoppinCart.toObject()
        let id = Number(req.params.id)
        const newArray = foundShoppinCart.productList.filter((e)=> e.idProduct !== id);
        foundShoppinCart.productList = newArray
        await ShoppinCart.findByIdAndUpdate(foundShoppinCart._id,foundShoppinCart)
        res.status(200).json({
            status: "success",
            data: {
                ShoppinCart:  foundShoppinCart,
              },
          });
    }
    else
    {
        res.status(400).json({
            status: "error",
          });
    }
  });

  exports.PayShoppingCart = catchAsync(async (req, res) => {
    let foundShoppinCart = await ShoppinCart.findOne({userName: req.body.userName,status: "PENDING"});
    if(foundShoppinCart && foundShoppinCart.productList.length)
    { 
        const total_pay = foundShoppinCart.productList.map((e)=> re= e.Price*e.Quantity).reduce((e,result)=> result =  result +e)
        foundShoppinCart.status = "PAID" 
        await ShoppinCart.findByIdAndUpdate(foundShoppinCart._id,foundShoppinCart)     
        const UpdateShoppinCart = await ShoppinCart.findById(foundShoppinCart._id)
        res.status(200).json({
            status: "success",
            data: {
                total_pay:  total_pay,
                shoppincart: UpdateShoppinCart
              },
          });
       
    }
    else
    {
        res.status(400).json({
            status: "error",
          });
    }
  });
