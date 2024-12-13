const jwt = require("jsonwebtoken");
const ownersModel = require("../models/owners-model");

module.exports = async (req, res , next) => {
    if(!req.cookies.token){
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
        res.redirect('/owners/login')
    }
}
