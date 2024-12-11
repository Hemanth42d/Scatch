const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } =require("../utils/generateToken");

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
                    res.send("User created succesfully");
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
            res.send("You can login");
        }else{
            res.send("Email or password is incorrect")
        }
    });
};

module.exports.logout = (req,res) => {
    res.cookie("token", "");
    res.redirect("/");
};