var express = require("express");
const app = express();
const newsRoutes =  require("./news");
app.use("/news",newsRoutes);

app.get("/",(req,res,next) => {
    res.status(200).json({
        message: "get success",
    })
});
module.exports = app;