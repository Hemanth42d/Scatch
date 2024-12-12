const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } =require("../utils/generateToken");
const productModel = require("../models/product-model");

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
