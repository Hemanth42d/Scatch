const jwt = require("jsonwebtoken");

const generateTokenOwners = (user) => {
    return jwt.sign({ email: user.email , id : user._id}, process.env.JWT_KEY_FIRST);
}

module.exports.generateTokenOwners = generateTokenOwners;