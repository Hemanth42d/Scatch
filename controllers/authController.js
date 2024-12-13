const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } =require("../utils/generateToken");
const productModel = require("../models/product-model");
const { default: mongoose } = require("mongoose");

module.exports.registerUser = async (req,res) => {
    try{
        let {email, password, fullname} = req.body;

        let user = await userModel.findOne({ email });
        if(user) return res.status(401).send("You already have an account, please login");
    
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt , async (err,hash) => {
                if(err) return res.send(err.message);
                else{
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    });
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.redirect("/shop")
                } 
            });
        });
    }catch(error){
        res.send("error is :",error.message);
    }
};

module.exports.loginUser = async (req,res) => {
    try {
        let {email, password} = req.body;
    let user = await userModel.findOne({ email });
    if(!user) {
        return res.send("Email or password is incorrect");
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop")
        }else{
            res.send("Email or password is incorrect")
        }
    });
    } catch (error) {
        res.send(error.message);
    }
};

module.exports.logout = (req,res) => {
    res.cookie("token", "");
    res.redirect("/");
};


module.exports.cart = async (req,res) => {
    let user = await userModel.findOne({ email : req.user.email}).populate("cart");
    res.render("cart", { user })
};

module.exports.discountedProducts = async (req,res) => {
    let products = await productModel.find({ discount: { $gt: 0 } });
    res.render("discountProducts", { products })
}

module.exports.addToCart = async (req,res) => {
    try {
        const userId = req.user._id;
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const productObjectId = new mongoose.Types.ObjectId(req.params.productid);

        const result = await userModel.updateOne(
        { _id: userObjectId },
        { $pull: { cart: productObjectId } }
        );
    res.redirect("/users/cart");
    } catch (error) {
        res.send(error.message);
    }
};

module.exports.myaccount = async (req,res) => {
    let user = await userModel.findOne({ email : req.user.email });
    res.render("usersMyAccount", { user });
}

module.exports.myAcountDetails = async (req,res) => {
    try {
        let user = await userModel.findOneAndUpdate(
            { email : req.user.email },
            { 
                fullname : req.body.fullname,
                contact : req.body.contact, 
                address : req.body.address,
                picture : req.file.buffer 
            }
        );
        res.render("usersMyAccount", { user });
    } catch (error) {
        res.send(error.message);
    }
};