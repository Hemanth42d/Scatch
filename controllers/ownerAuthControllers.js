const ownerModel = require("../models/owners-model");
const bcrypt = require("bcrypt");
const productModel = require("../models/product-model");
const { generateTokenOwners } = require("../utils/generateTokenOwners");
const ownersModel = require("../models/owners-model");
const jwt = require("jsonwebtoken")

module.exports.loginOwner = async (req,res) => {
    try{
        let { email, password } = req.body;
        let owner = await ownerModel.findOne({ email });
        if(!owner) return res.send("Something went wrong");

        bcrypt.compare(password, owner.password, (err,result) => {
            if(result){r
                let token = generateTokenOwners(owner);
                res.cookie("token", token);
                res.redirect("/owners/admin")
            }else{
                res.send("Email or password is incorrect")
            }
        });

    }catch(err){
        res.send(err.message)
    }

};

module.exports.logoutOwner = (req,res) => {
    res.cookie("token", "");
    res.redirect("/owners/login");
}

module.exports.createProduct = async (req,res) => {
    try {
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

module.exports.ownersMyAccount = async (req,res) => {
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY_SECOND);
            let owner = await ownersModel
                .findOne({ email : decoded.email })
                .select("-password");
        res.render("ownersMyAccount", { owner });  
    } catch (error) {
        res.send(error.message)
    }
};


module.exports.myAcountDetails = async (req,res) => {
    try {
        let owner = await ownerModel.findOneAndUpdate(
            { email : req.owner.email },
            {
                fullname : req.body.fullname,
                contact : req.body.contact,
                gstin : req.body.gstin,
                picture : req.file.buffer
            }
        );
res.render("ownersMyAccount", { owner });
    } catch (error) {
        res.send(error.message);
    }
};