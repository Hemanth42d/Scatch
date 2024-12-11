const ownerModel = require("../models/owners-model");
const bcrypt = require("bcrypt");
const { generateToken } =require("../utils/generateToken");
const productModel = require("../models/product-model");

module.exports.loginOwner = async (req,res) => {
    try{
        let { email, password } = req.body;
        let owner = await ownerModel.findOne({ email });
        if(!owner) return res.send("Something went wrong");

        bcrypt.compare(password, owner.password, (err,result) => {
            console.log(result)
            if(result){
                let token = generateToken(owner);
                res.cookie("token", token);
                res.redirect("/owners/admin")
            }else{
                res.send("Email or password is incorrect")
            }
        });

    }catch(err){
        console.log(err.message)
    }

};

module.exports.logoutOwner = (req,res) => {
    res.cookie("token", "");
    res.redirect("/owners/login");
}

module.exports.createProduct = async (req,res) => {
    console.log(req.body)
    let { name, price, discount, bgcolor, panelcolor, textcolor} = req.body;
    let product = productModel.create({
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    });
    res.send(product);
}