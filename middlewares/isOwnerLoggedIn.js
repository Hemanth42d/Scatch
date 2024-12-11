const jwt = require("jsonwebtoken");
const flash = require("connect-flash");
const ownersModel = require("../models/owners-model");

module.exports = async (req, res , next) => {
    if(!req.cookies.token){
        req.flash("error", "You need to login first");
        return res.redirect("/owners/login");
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY_SECOND);
        let owner = await ownersModel
            .findOne({ email : decoded.email })
            .select("-password");
            next();
        req.owner = owner;
    } catch (error) {
        req.flash("Error", "Something Went Wrong");
        res.redirect('/owners/login')
    }
}
