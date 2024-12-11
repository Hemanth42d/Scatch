const express = require("express");
const router = express();
const { registerUser, loginUser, logout, cart } = require("../controllers/authController");

router.get("/", (req,res) => {
    res.send("hey it's working");
});


//joi validation.(mongodb is a schema less so if we don't send any input it works fine in that way also)
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

router.get("/cart", cart);



module.exports = router;


