const express = require("express");
const router = express();
const { registerUser, loginUser, logout, cart, discountedProducts } = require("../controllers/authController");
const isLoggendIn = require("../middlewares/isLoggendIn");
const userModel = require("../models/user-model");
const mongoose = require("mongoose");

router.get("/", (req,res) => {
    res.send("hey it's working");
});


//joi validation.(mongodb is a schema less so if we don't send any input it works fine in that way also)
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

router.get("/cart", isLoggendIn, cart);

router.get('/discount/product', isLoggendIn, discountedProducts);

router.get('/cart/:productid', isLoggendIn, async (req,res) => {
    const userId = req.user._id;
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const productObjectId = new mongoose.Types.ObjectId(req.params.productid);

    const result = await userModel.updateOne(
      { _id: userObjectId },
      { $pull: { cart: productObjectId } }
    );
    res.redirect("/users/cart");
})



module.exports = router;


