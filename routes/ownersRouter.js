const express = require("express");
const router = express();
const ownerModel = require("../models/owners-model");
const bcrypt = require("bcrypt");
const { loginOwner, logoutOwner, createProduct } = require("../controllers/ownerAuthControllers");
const isOwnerLoggedIn = require("../middlewares/isOwnerLoggedIn");
const productModel = require("../models/product-model");


// validate using joi
if(process.env.NODE_ENV == "development"){
    router.post("/create", async (req,res) => {
        let {fullname, email, password} = req.body;
        let owners = await ownerModel.find();
        if(owners.length > 0){
            return res
                .status(503)
                .send("YOu don't have permission to create owner");
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt , async (err,hash) => {
                if(err) return res.send(err.message);
                else{
                    let createdOwner = await ownerModel.create({
                        email,
                        password : hash,
                        fullname
                    });
                    res
                        .status(201)
                        .send(createdOwner);
                } 
            });
        });
        
    });
}

router.get("/admin", isOwnerLoggedIn , async (req,res) => {
    let products = await productModel.find();
    res.render("admin", { products })
});

router.get('/login', async (req,res) => {
    res.render("ownerLogin")
});

router.get("/create/product", isOwnerLoggedIn, (req,res) => {
    res.render("createProducts")
});


router.post("/login", loginOwner);

router.get("/logout", logoutOwner);


module.exports = router;


