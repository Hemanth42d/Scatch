const express = require("express");
const isLoggendIn = require("../middlewares/isLoggendIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const router = express.Router();

router.get("/", (req,res) => {
    res.render("index");
});

router.get("/shop", isLoggendIn, async (req,res) => {
    let products = await productModel.find();
    res.render("shop", { products });
})

router.get("/addToCart/:productid", isLoggendIn, async (req,res) => {
    let user = await userModel.findOne({ email : req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    res.redirect("/users/cart"); 
});


module.exports = router;