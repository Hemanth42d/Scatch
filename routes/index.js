const express = require("express");
const isLoggendIn = require("../middlewares/isLoggendIn");
const router = express.Router();

router.get("/", (req,res) => {
    // let error = req.flash("error");
    // res.render("index", { error });
    res.render("index");
});

router.get("/shop", (req,res) => {
    res.render("shop");
})


module.exports = router;