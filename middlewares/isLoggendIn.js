const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
    if(!req.cookies.token){
        return res.redirect("/");
    }

    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY_FIRST);
        let user = await userModel
            .findOne({ email : decoded.email })
            .select("-password");
        req.user = user;
        next();
    }catch(err) {
        res.redirect("/");
    }
};