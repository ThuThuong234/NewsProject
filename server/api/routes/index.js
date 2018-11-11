var express = require("express");
var router = express.Router();
router.get("/", (req,res,next) => {
    res.status(200).json({
        message: "post success",
    })
});

module.exports = router;