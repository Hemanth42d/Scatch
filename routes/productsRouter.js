const express = require("express");
const isOwnerLoggedIn = require("../middlewares/isOwnerLoggedIn");
const { createProduct } = require("../controllers/ownerAuthControllers");

const router = express();

router.get("/", (req,res) => {
    res.send("hey it's working");
});

router.post('/create', isOwnerLoggedIn, createProduct);

module.exports = router;


