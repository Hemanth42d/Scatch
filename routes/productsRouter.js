const express = require("express");
const isOwnerLoggedIn = require("../middlewares/isOwnerLoggedIn");
const { createProduct } = require("../controllers/ownerAuthControllers");
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

const router = express();

router.get("/", (req,res) => {
    res.send("hey it's working");
});

router.post('/create/product', isOwnerLoggedIn, upload.single("image") ,createProduct);

router.get("/delete/:productid", isOwnerLoggedIn, async (req,res) => {
    let product = await productModel.findOneAndDelete( { _id : req.params.productid });
    console.log(product)
    res.redirect("/owners/admin");
});

module.exports = router;


