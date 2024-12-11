const express = require("express");

const router = express();

router.get("/", (req,res) => {
    res.send("hey it's working");
});



module.exports = router;


