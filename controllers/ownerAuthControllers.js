const ownerModel = require("../models/owners-model");
const bcrypt = require("bcrypt");
const productModel = require("../models/product-model");
const { generateTokenOwners } = require("../utils/generateTokenOwners");

module.exports.loginOwner = async (req,res) => {
    try{
        let { email, password } = req.body;
        let owner = await ownerModel.findOne({ email });
        if(!owner) return res.send("Something went wrong");

        bcrypt.compare(password, owner.password, (err,result) => {
            if(result){
                console.log("Working")
                let token = generateTokenOwners(owner);
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
    try {
        console.log(req.body)
        let { name, discount, bgcolor, panelcolor, textcolor} = req.body;
        let product = await productModel.create({
            image : req.file.buffer,
            name,
            price : req.body.price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });
       res.redirect("/owners/create/product");
    } catch (error) {
        res.send(error.message);
    }
};
