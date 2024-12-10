const express = require("express");
const router = express();
const ownerModel = require("../models/owners-model");
const bcrypt = require("bcrypt");


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
                        password: hash,
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

router.get("/admin", (req,res) => {
    res.send("hey it's working");
});


module.exports = router;


