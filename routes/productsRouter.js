const express = require("express");
const isOwnerLoggedIn = require("../middlewares/isOwnerLoggedIn");
const { createProduct } = require("../controllers/ownerAuthControllers");
const upload = require("../config/multer-config");

const router = express();

router.get("/", (req,res) => {
    res.send("hey it's working");
});

router.post('/create/product', isOwnerLoggedIn, upload.single("image") ,createProduct);

module.exports = router;


